import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .strict()
        .required(),
      email: Yup.string()
        .strict()
        .required()
        .email(),
      password: Yup.string()
        .strict()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation fails' });
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
      name: Yup.string().strict(true),
      email: Yup.string()
        .email()
        .strict(true),
      oldPassword: Yup.string()
        .min(6)
        .strict(true),
      password: Yup.string()
        .strict(true)
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .strict(true)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && user.email !== email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
    }

    if (!(await user.checkPassword(oldPassword || ''))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, admin } = await user.update(req.body);
    return res.json({ id, name, admin });
  }
}

export default new UserController();
