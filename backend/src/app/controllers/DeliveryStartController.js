import {
  parseISO,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

class DeliveryStart {
  async update(req, res) {
    const { id } = req.params;
    const { start_date } = req.body;

    const parsedDate = parseISO(start_date);

    const startHour = setSeconds(setMinutes(setHours(parsedDate, 7), 59), 59);
    const endHour = setSeconds(setMinutes(setHours(parsedDate, 18), 0), 0);
    if (!(isAfter(parsedDate, startHour) && isBefore(parsedDate, endHour))) {
      return res
        .status(401)
        .json({ error: 'You can only start a delivery between 8am to 6pm' });
    }

    if (isBefore(startOfDay(parsedDate), startOfDay(new Date()))) {
      return res.status(401).json({ error: 'Your date is in the past' });
    }

    // TODO: Put this parameter in an ENV file
    const limitOfDeliveries = 5;
    const totalDeliveries = await Delivery.count({
      where: {
        start_date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });
    if (totalDeliveries === limitOfDeliveries) {
      return res.status(401).json({
        error: `You had been exceeded daily delivery limit (${limitOfDeliveries})`,
      });
    }

    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.start_date) {
      return res
        .status(401)
        .json({ error: 'This delivery is already started' });
    }

    if (delivery.end_date) {
      return res
        .status(401)
        .json({ error: 'This delivery is already finished' });
    }

    if (delivery.canceled_at) {
      return res
        .status(401)
        .json({ error: 'This delivery is already canceled' });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }
}

export default new DeliveryStart();
