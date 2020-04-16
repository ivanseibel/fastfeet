import * as Yup from 'yup';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/NewDeliveryMail';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .typeError('Recipient Id must be a number')
        .integer('Recipient Id must be an integer')
        .required('Recipient Id is required'),
      deliveryman_id: Yup.number()
        .typeError('Deliveryman Id must be a number')
        .integer('Deliveryman Id must be a integer')
        .required('Deliveryman Id is required'),
      product: Yup.string('Product must be a string')
        .min(3, 'Product must have 3 characters at least')
        .required('Product is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(NewDeliveryMail.key, {
      delivery,
      recipient,
      deliveryman,
    });

    return res.json({
      id: delivery.id,
      product: delivery.product,
      recipient_id,
      deliveryman_id,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { recipient_id, deliveryman_id } = req.body;

    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .typeError('Recipient Id must be a number')
        .integer('Recipient Id must be an integer'),
      deliveryman_id: Yup.number()
        .typeError('Deliveryman Id must be a number')
        .integer('Deliveryman Id must be an integer'),
      product: Yup.string('Product must be a string').min(
        3,
        'Product must have 3 characters at least'
      ),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);
      if (!recipient) {
        return res.status(404).json({ error: 'Recipient not found' });
      }
    }

    if (deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);
      if (!deliveryman) {
        return res.status(404).json({ error: 'Deliveryman not found' });
      }
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await delivery.update(req.body);

    return res.json({
      id,
      product: delivery.product,
      recipient_id,
      deliveryman_id,
    });
  }

  async index(req, res) {
    const limitOfRecords = 20;
    const { page = 1, q } = req.query;

    const where = q ? { product: { [Op.iLike]: `%${q}%` } } : null;

    const deliveries = await Delivery.findAll({
      order: [['id', 'ASC']],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
      attributes: ['id', 'product'],
      where,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json(delivery);
  }
}

export default new DeliveryController();
