import Signature from '../models/Signature';

class SignatureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const signature = await Signature.create({ name, path });

    return res.json(signature);
  }

  async update(req, res) {
    const { originalname: name, filename: path } = req.file;

    const signature = await Signature.findByPk(req.params.id);

    if (!signature) {
      return res.status(400).json({ error: 'Signature not found' });
    }

    await signature.update({
      name,
      path,
    });

    return res.json(signature);
  }
}

export default new SignatureController();
