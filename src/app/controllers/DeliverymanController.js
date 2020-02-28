import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

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

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { name } = await deliveryman.update(req.body);

    return res.json({ id, name });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status('400').json({ error: 'Deliveryman id is required' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    await deliveryman.destroy();

    return res.json(deliveryman);
  }

  async index(req, res) {
    const limitOfRecords = 20;
    const { page = 1 } = req.query;
    const deliverymans = await Deliveryman.findAll({
      order: [['name', 'ASC']],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
    });

    return res.json(deliverymans);
  }
}

export default new DeliverymanController();
