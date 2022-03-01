class UserController {
  async index (req, res, next) {
  }

  async create (req, res, next) {
    console.log(req.body);
    res.send('Pegando o corpo da requisição');
  }
}

module.exports = new UserController();
