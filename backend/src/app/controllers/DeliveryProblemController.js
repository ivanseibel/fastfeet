import * as Yup from 'yup';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import CanceledDeliveryMail from '../jobs/CanceledDeliveryMail';
import Queue from '../../lib/Queue';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryProblemController {
  async store(req, res) {
    const delivery_id = req.params.id;

    const schema = Yup.object().shape({
      description: Yup.string()
        .typeError('Description must be a string')
        .strict()
        .min(3, 'Description must have 3 characters at least')
        .required('Description is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (!delivery.start_date) {
      return res.status(401).json({ error: 'Delivery is not started' });
    }

    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'Delivery is canceled' });
    }

    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery is ended' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      ...req.body,
      delivery_id,
    });

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const limitOfRecords = 10;
    const { page = 1, q } = req.query;

    const { id } = req.params;

    const descFilter = q ? { description: { [Op.iLike]: `%${q}%` } } : null;

    const where = {
      canceled_at: null,
      end_date: null,
      start_date: { [Op.ne]: null },
    };

    if (id) {
      where.id = id;
    }

    const deliveries = await Delivery.findAndCountAll({
      attributes: ['id', 'product'],
      where,
      include: [
        {
          model: DeliveryProblem,
          as: 'problem',
          attributes: ['id', 'description'],
          required: true,
          where: descFilter,
        },
      ],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
    });

    return res.json(deliveries);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: DeliveryProblem,
          as: 'problem',
          attributes: ['id', 'description'],
        },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'Delivery is already canceled' });
    }

    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery is ended' });
    }

    if (!delivery.problem[0]) {
      return res
        .status(401)
        .json({ error: 'Delivery must have one registered problem at least' });
    }

    delivery.canceled_at = new Date();
    await delivery.save();

    await Queue.add(CanceledDeliveryMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
