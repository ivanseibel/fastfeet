import * as Yup from 'yup';
import { parseISO, isBefore, startOfDay } from 'date-fns';

import Delivery from '../models/Delivery';

class DeliveryEndController {
  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date()
        .typeError('End Date must be a date')
        .required('End Date is required'),
      signature_id: Yup.number()
        .typeError('Signature Id must be a number')
        .integer('Signature Id must be an integer')
        .strict(),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const { name, value, path: field, errors } = error;
      return res.status(400).json({ error: { name, value, field, errors } });
    }

    const { id } = req.params;
    const { end_date } = req.body;

    const parsedDate = parseISO(end_date);

    if (isBefore(startOfDay(parsedDate), startOfDay(new Date()))) {
      return res.status(401).json({ error: 'Your date is in the past' });
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery is already ended' });
    }

    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'Delivery is already canceled' });
    }

    if (!delivery.start_date) {
      return res.status(401).json({ error: 'Delivery must be started' });
    }

    if (!isBefore(delivery.start_date, delivery.end_date)) {
      return res
        .status(401)
        .json({ error: 'End Date must be after Start Date' });
    }

    await delivery.update(req.body);

    return delivery;
  }
}

export default new DeliveryEndController();
