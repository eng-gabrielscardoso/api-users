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

  async findUsers (req, res, next) {
    try {
      const users = await User.findUsers();

      res.status(200);
      res.json(users);
    } catch (e) {
      res.status(500);
      res.json({ 
        "err": "Não foi possível encontrar os usuários",
        "message": `${e}`
      });
    }
  }

  async findUser (req, res, next) {
    
    try {
      let { id } = req.params;
      const user = await User.findById(id)  ;

      if (isNaN(id) || id === undefined) {
        res.status(404);
        res.json({ "err": "Parâmetro passado é inválido" });
        return;
      }

      if (user.length === 0) {
        res.status(404);
        res.json({ "status": "Usuário com o ID passado não foi encontrado no banco de dados" });
        return;
      }

      res.status(200);
      res.json(user);
    } catch(e) {
      res.status(500);
      res.json({
        "err": "Não foi possível encontrar o usuário",
        "message": `${e}`
      });
    }
  }
}

module.exports = new UserController();
