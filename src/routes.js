import { Router } from 'express';
import multer from 'multer';

// import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';
import DeliverymanController from './app/controllers/DeliverymanController';
import UserController from './app/controllers/UserController';
import AvatarController from './app/controllers/AvatarController';

const routes = Router();
// const upload = multer()

function OnlyAdmin(req, res, next) {
  if (!req.userIsAdmin) {
    return res.status(401).json({ error: 'User must be administrator' });
  }
  return next();
}

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', OnlyAdmin, RecipientController.store);
routes.put('/recipients/:id', OnlyAdmin, RecipientController.update);

routes.post('/users', OnlyAdmin, UserController.store);
routes.put('/users', OnlyAdmin, UserController.update);

routes.post('/deliverymans', OnlyAdmin, DeliverymanController.store);
routes.put('/deliverymans/:id', OnlyAdmin, DeliverymanController.update);
routes.get('/deliverymans', OnlyAdmin, DeliverymanController.index);
routes.delete('/deliverymans/:id', OnlyAdmin, DeliverymanController.delete);

routes.post('/avatars', OnlyAdmin, AvatarController.store);
routes.put('/avatars', OnlyAdmin, AvatarController.update);

export default routes;
