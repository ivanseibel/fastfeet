import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .typeError('Email must be a string')
        .email('Email must be a valid email address')
        .required('Email is required'),
      password: Yup.string()
        .typeError('Password must be a string')
        .required('Password is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'password_hash', 'admin'],
    });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const passwordMatch = await user.checkPassword(password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
