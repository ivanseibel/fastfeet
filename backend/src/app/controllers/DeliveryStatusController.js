import { Op } from 'sequelize';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';
import Delivery from '../models/Delivery';

class DeliveryStatusController {
  async index(req, res) {
    const limitOfRecords = 20;
    const { page = 1, status } = req.query;
    const deliveryman_id = req.params.id;

    const where = { deliveryman_id };
    switch (status) {
      case 'pendent':
        where.end_date = null;
        where.canceled_at = null;
        break;
      case 'delivered':
        where.end_date = { [Op.ne]: null };
        where.canceled_at = null;
        break;
      case 'canceled':
        where.canceled_at = { [Op.ne]: null };
        break;
      default:
        break;
    }

    const deliveries = await Delivery.findAll({
      where: { ...where },
      order: [['id', 'ASC']],
      limit: limitOfRecords,
      offset: (page - 1) * limitOfRecords,
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'updated_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliveryStatusController();
