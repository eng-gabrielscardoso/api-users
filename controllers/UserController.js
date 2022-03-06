const User = require('../models/User');
class UserController {
  async index (req, res, next) {
  }

  async create (req, res, next) {
    let { name, email, password } = req.body;

    if (!name || name === undefined || name.length < 3) {
      res.status(400);
      res.json({ "err": "Nome inválido" });
      return;
    } 

    if (!email || email === undefined) {
      res.status(400);
      res.json({ "err": "E-mail inválido" });
      return;
    } 

    if (!password || password === undefined) {
      res.status(400);
      res.json({ "err": "Senha inválida"});
      return;
    }

    const emailExists = await User.findEmail(email);

    if (emailExists) {
      res.status(406)
      res.json({ "err": "E-mail já está cadastrado no banco de dados" });
      return;
    }

    await User.create(name, email, password);

    res.status(200);
    res.json({ "status": "Usuário cadastrado com sucesso" });
  }
}

module.exports = new UserController();
