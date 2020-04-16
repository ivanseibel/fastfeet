import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .typeError('Name must be a string')
        .strict()
        .required('Name is required'),
      street: Yup.string()
        .typeError('Street must be a string')
        .strict()
        .required('Street is required'),
      number: Yup.number()
        .typeError('Number must be a number')
        .integer('Number must be an integer number')
        .strict()
        .required('Number is required'),
      complement: Yup.string()
        .typeError('Complement must be a string')
        .strict(),
      state: Yup.string()
        .typeError('State must be a string')
        .strict()
        .length(2, 'State must have 2 characters')
        .required('State is required'),
      city: Yup.string()
        .typeError('City must be a string')
        .strict()
        .required('City is required'),
      postal_code: Yup.string()
        .typeError('Postal Code must be a string')
        .strict()
        .length(8, 'Postal Code must have 8 characters')
        .required('Postal code is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .typeError('Name must be a string')
        .strict()
        .required('Name is required'),
      street: Yup.string()
        .typeError('Street must be a string')
        .strict()
        .required('Street is required'),
      number: Yup.number()
        .typeError('Number must be a number')
        .integer('Number must be an integer number')
        .strict()
        .required('Number is required'),
      complement: Yup.string()
        .typeError('Complement must be a string')
        .strict(),
      state: Yup.string()
        .typeError('State must be a string')
        .strict()
        .length(2, 'State must have 2 characters')
        .required('State is required'),
      city: Yup.string()
        .typeError('City must be a string')
        .strict()
        .required('City is required'),
      postal_code: Yup.string()
        .typeError('Postal Code must be a string')
        .strict()
        .length(8, 'Postal Code must have 8 characters')
        .required('Postal Code is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid recipient id' });
    }

    const recipient = await Recipient.findByPk(id, {
      attributes: ['id'],
    });

    const { name } = await recipient.update(req.body);

    return res.json({ id, name });
  }

  async index(req, res) {
    const limitOfRecords = 20;
    const { page = 1, q } = req.query;

    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : null;

    const recipients = await Recipient.findAll({
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
      where,
      order: [['name', 'ASC']],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
    });

    return res.json(recipients);
  }
}

export default new RecipientController();
