import jwt from 'jsonwebtoken';
import { promisify } from 'util';

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
    req.userID = id;
  } catch (error) {
    console.log(error);
    return res.send(error);
    //    return res.status(401).json({ error: 'Invalid token' });
  }

  return next();
};
