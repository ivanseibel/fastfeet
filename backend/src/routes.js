import { Router } from 'express';
import multer from 'multer';

// import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';
import DeliverymanController from './app/controllers/DeliverymanController';
import UserController from './app/controllers/UserController';
import AvatarController from './app/controllers/AvatarController';
import multerConfig from './config/multer';
import DeliveryController from './app/controllers/DeliveryController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import DeliveryStartController from './app/controllers/DeliveryStartController';
import DeliveryEndController from './app/controllers/DeliveryEndController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = Router();
const upload = multer(multerConfig);

function OnlyAdmin(req, res, next) {
  if (!req.userIsAdmin) {
    return res.status(401).json({ error: 'User must be administrator' });
  }
  return next();
}

routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:id', DeliverymanController.show);
routes.get('/deliverymen/:id/deliveries', DeliveryStatusController.index);

routes.use(authMiddleware);

routes.post('/recipients', OnlyAdmin, RecipientController.store);
routes.put('/recipients/:id', OnlyAdmin, RecipientController.update);
routes.get('/recipients', OnlyAdmin, RecipientController.index);

routes.post('/users', OnlyAdmin, UserController.store);
routes.put('/users', OnlyAdmin, UserController.update);
routes.get('/users', OnlyAdmin, UserController.index);

routes.post('/deliverymen', OnlyAdmin, DeliverymanController.store);
routes.put('/deliverymen/:id', OnlyAdmin, DeliverymanController.update);
routes.get('/deliverymen', OnlyAdmin, DeliverymanController.index);
routes.delete('/deliverymen/:id', OnlyAdmin, DeliverymanController.delete);

routes.post('/deliveries', OnlyAdmin, DeliveryController.store);
routes.put('/deliveries/:id', OnlyAdmin, DeliveryController.update);
routes.get('/deliveries', OnlyAdmin, DeliveryController.index);
routes.get('/deliveries/:id', OnlyAdmin, DeliveryController.show);
routes.delete('/deliveries/:id', OnlyAdmin, DeliveryController.delete);

routes.put('/deliveries/:id/start', DeliveryStartController.update);
routes.put('/deliveries/:id/end', DeliveryEndController.update);

// Delivery Problems routes
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.delete(
  '/problem/:id/cancel-delivery',
  OnlyAdmin,
  DeliveryProblemController.delete
);

routes.post(
  '/avatars',
  OnlyAdmin,
  upload.single('file'),
  AvatarController.store
);
routes.put(
  '/avatars/:id',
  OnlyAdmin,
  upload.single('file'),
  AvatarController.update
);

routes.post(
  '/signatures',
  OnlyAdmin,
  upload.single('file'),
  SignatureController.store
);
routes.put(
  '/signatures/:id',
  OnlyAdmin,
  upload.single('file'),
  SignatureController.update
);

export default routes;
