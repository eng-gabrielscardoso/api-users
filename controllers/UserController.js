class UserController {
  async index (req, res, next) {
  }

  async create (req, res, next) {
    let { name, email, password } = req.body;

    if (!name || name === undefined || name.length < 3) {
      res.status(400);
      res.json({ "err": "Nome inválido" });
    } 

    if (!email || email === undefined) {
      res.status(400);
      res.json({ "err": "E-mail inválido" });
    } 

    if (!password || password === undefined) {
      res.status(400);
      res.json({ "err": "Senha inválida"});
    }

    res.status(200);
    res.json({ "status": "Usuário cadastrado com sucesso" });
  }
}

module.exports = new UserController();
