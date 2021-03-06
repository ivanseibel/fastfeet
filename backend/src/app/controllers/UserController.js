import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .typeError('Name must be a string')
        .strict()
        .required(),
      email: Yup.string()
        .typeError('Email must be a string')
        .strict()
        .required()
        .email('Email must be a valid email address'),
      password: Yup.string()
        .typeError('Password must be a string')
        .strict()
        .required()
        .min(6, 'Password must have 6 characters at least'),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const { email } = req.body;
    const userExists = await User.findOne({
      where: {
        email,
      },
      attributes: ['id'],
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, admin } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .typeError('Name must be a string')
        .strict(true),
      email: Yup.string()
        .typeError('Email must be a string')
        .email('Email must be a valid email address')
        .strict(true),
      password: Yup.string()
        .typeError('Password must be a string')
        .min(6, 'Password must have 6 characters at least')
        .strict(true),
      oldPassword: Yup.string()
        .typeError('Old Password must be a string')
        .strict(true)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .typeError('Confirm Password must be a string')
        .strict(true)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const { email, oldPassword, password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && user.email !== email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
    }

    if (password && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, admin } = await user.update(req.body);
    return res.json({ id, name, admin });
  }

  async index(req, res) {
    const limitOfRecords = 20;
    const { page = 1 } = req.query;
    const users = await User.findAll({
      order: [['name', 'ASC']],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
      attributes: ['id', 'name', 'email', 'admin'],
    });

    return res.json(users);
  }
}

export default new UserController();
