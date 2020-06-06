import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Avatar from '../models/Avatar';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .typeError('Name must be a string')
        .strict()
        .required('Name is required'),
      email: Yup.string()
        .typeError('Email must be a string')
        .email('Email must be a valid email address')
        .strict()
        .required('Email is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status('400').json({ error: 'Deliveryman id is required' });
    }

    const schema = Yup.object().shape({
      name: Yup.string()
        .typeError('Name must be a string')
        .strict(),
      email: Yup.string()
        .typeError('Email must be a string')
        .email('Email must be a valid email address')
        .strict(),
      avatar_id: Yup.number()
        .typeError('Avatar Id must be a number')
        .integer('Avatar Id must be an integer number')
        .strict(true),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const { avatar_id } = req.body;

    if (avatar_id) {
      const avatarIsValid = await Avatar.findByPk(avatar_id);

      if (!avatarIsValid) {
        return res
          .status(400)
          .json({ error: 'There is no avatar with this id' });
      }
    }

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { name } = await deliveryman.update(req.body);

    return res.json({ id, name });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    await deliveryman.destroy();

    return res.json(deliveryman);
  }

  async index(req, res) {
    const limitOfRecords = 10;
    const { page = 1, q } = req.query;

    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : null;

    const deliverymen = await Deliveryman.findAndCountAll({
      where,
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: [['name', 'ASC']],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
    });

    return res.json(deliverymen);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliverymen = await Deliveryman.findByPk(id, {
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliverymen) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    return res.status(200).json(deliverymen);
  }
}

export default new DeliverymanController();
