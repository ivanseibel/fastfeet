import Avatar from '../models/Avatar';

// TODO: Implement phisical remotion of old avatar file after update
class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const avatar = await Avatar.create({ name, path });

    return res.json(avatar);
  }

  async update(req, res) {
    const { id, originalname: name, filename: path } = req.file;

    const avatar = await Avatar.findByPk(id);

    if (!avatar) {
      return res.status(400).json({ error: 'Avatar not found on database' });
    }

    await avatar.update({
      name,
      path,
    });

    return res.json(avatar);
  }
}

export default new AvatarController();
