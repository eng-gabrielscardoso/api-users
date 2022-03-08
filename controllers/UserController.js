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

    let emailExists = await User.findEmail(email);

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
      let users = await User.findUsers();

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
      let user = await User.findById(id)  ;

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

  async edit (req, res, next) {
    let { id, name, email, role } = req.body;

    let result = await User.update(id, name, email, role);

    if (result != undefined) {
      if (result.status === true) {
        res.status(200);
        res.json({ "status": "Usuário atualizado"});
      } else {
        res.status(404);
        res.json(result);
      }
    } else {
      res.status(406);
      res.json(result);
    }
  }

  async delete (req, res, next) {
    let { id } = req.params;

    let result = await User.delete(id);

    if (result.status) {
      res.status(200);
      res.json({ "status": "Usuário deletado com sucesso" });
    } else {
      res.status(406);
      res.json(result.err);
    }
  }
}

module.exports = new UserController();
