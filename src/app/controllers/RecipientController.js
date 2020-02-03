import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .strict()
        .required(),
      street: Yup.string()
        .strict()
        .required(),
      number: Yup.number()
        .integer()
        .strict()
        .required(),
      complement: Yup.string().strict(),
      state: Yup.string()
        .strict()
        .length(2)
        .required(),
      city: Yup.string()
        .strict()
        .required(),
      postal_code: Yup.string()
        .strict()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .strict()
        .required(),
      street: Yup.string()
        .strict()
        .required(),
      number: Yup.number()
        .integer()
        .strict()
        .required(),
      complement: Yup.string().strict(),
      state: Yup.string()
        .strict()
        .length(2)
        .required(),
      city: Yup.string()
        .strict()
        .required(),
      postal_code: Yup.string()
        .strict()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid recipient id' });
    }

    const recipient = await Recipient.findByPk(id, {
      attributes: ['id'],
    });

    const { name } = await recipient.update(req.body);

    return res.json({ id, name });
  }
}

export default new RecipientController();
