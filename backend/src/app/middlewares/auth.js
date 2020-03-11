import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';
import authConf from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConf.secret);
    const { id } = decoded;

    const { admin = false } = await User.findByPk(id, {
      attributes: ['admin'],
    });

    req.userId = id;
    req.userIsAdmin = admin;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  return next();
};
