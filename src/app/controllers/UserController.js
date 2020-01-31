import User from '../models/User';

class UserController {
  async store(req, res) {
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
}

export default new UserController();
