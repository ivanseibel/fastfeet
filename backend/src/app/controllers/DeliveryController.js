import * as Yup from 'yup';
import { Op } from 'sequelize';

import sequelize from '../../database/index';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Avatar from '../models/Avatar';
import Signature from '../models/Signature';
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
        .nullable()
        .typeError('Deliveryman Id must be a number')
        .integer('Deliveryman Id must be a integer'),
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

    let deliveryman = {};
    if (deliveryman_id) {
      deliveryman = await Deliveryman.findByPk(deliveryman_id);

      if (!deliveryman) {
        return res.status(404).json({ error: 'Deliveryman not found' });
      }
    }

    const delivery = await Delivery.create(req.body);

    if (deliveryman_id) {
      await Queue.add(NewDeliveryMail.key, {
        delivery,
        recipient,
        deliveryman,
      });
    }

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
        .nullable()
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

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }

  async index(req, res) {
    const limitOfRecords = 10;
    const { page = 1, q } = req.query;
    let { with_problems } = req.query;

    // converting string to boolean true/false
    if (with_problems) {
      with_problems = JSON.parse(with_problems);
    } else {
      with_problems = false;
    }

    let where = q ? { product: { [Op.iLike]: `%${q}%` } } : null;

    if (with_problems === true) {
      const tempSQL = sequelize.connection.dialect.QueryGenerator.selectQuery(
        'delivery_problems',
        {
          attributes: ['delivery_id'],
        }
      ).slice(0, -1); // to remove the ';' from the end of the SQL
      // where = { $notIn: sequelize.connection.literal(`(${tempSQL})`) };
      where = {
        ...where,
        id: { [Op.in]: sequelize.connection.literal(`(${tempSQL})`) },
      };
    }

    // const deliveries = await Delivery.findAndCountAll({
    const deliveries = await Delivery.findAndCountAll({
      order: [['id', 'ASC']],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
      attributes: [
        'id',
        'product',
        'end_date',
        'canceled_at',
        'start_date',
        'status',
      ],
      where,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: Avatar,
              as: 'avatar',
              attributes: ['url', 'path'],
            },
          ],
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

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
        },
        {
          model: Signature,
          as: 'signature',
          // include: ['path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }
}

export default new DeliveryController();
