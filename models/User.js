const bcrypt = require('bcrypt');

const knex = require('../database/connection');

class User {
  async create (name, email, password) {
    try {
      let hash = await bcrypt.hash(password, 10)

      await knex
        .insert({ name, email, password: hash, role: 0 })
        .table('users');
    } catch (e) {
      console.error(e);
    }
  }

  async findEmail (email) {
    try {
      let result = await knex
        .select('*')
        .from('users')
        .where({ email: email, })

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findUsers () {
    try {
      let result = await knex
        .select(['id', 'name', 'email', 'role'])
        .table('users');

      return result;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async findById (id) {
    try {
      let result = await knex
        .select(['id', 'name', 'email', 'role'])
        .table('users')
        .where({ id: id });

      return result;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async update (id, name, email, role) {
    let user = await this.findById(id);

    if(user != undefined) {
      let editUser = {};

      if (email != undefined) {
        if (email != user.email) {
          let result = await this.findEmail(email);

          if (result === false) {
            editUser.email = email;
          } else {
            return {
              status: false,
              err: 'O e-mail já está cadastrado'
            }
          }
        }
      }

      if (name != undefined) {
        editUser.name = name;
      }

      if (role != undefined) {
        editUser.role = role;
      }

      try {
        await knex
          .update(editUser)
          .where({ id: id })
          .table('users');

          return { status: true };
      } catch (e) {
        return {
          status: false,
          err: e
        }
      }
    } else {
      return {
        status: false,
        err: 'Usuário não existe no banco de dados'
      }
    }
  }

  async delete (id) {
    let user = await this.findById(id);

    if (user != undefined ) {
      try {
        await knex
          .delete()
          .where({ id: id })
          .table('users');

        return {
          status: true,
        };
      } catch (e) {
        return { 
          status: false,
          err: e,
        };
      }
      
    } else {
      return { 
        status: false,
        err: 'Usuário inexistente no banco de dados',
      };
    }
  }
}

module.exports = new User;
