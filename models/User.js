const bcrypt = require('bcrypt');

const knex = require('../database/connection');

class User {
  async create (name, email, password) {
    try {
      const hash = await bcrypt.hash(password, 10)

      await knex
        .insert({ name, email, password: hash, role: 0 })
        .table('users');
    } catch (e) {
      console.error(e);
    }
  }

  async findEmail (email) {
    try {
      const result = await knex
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
      const result = await knex
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
      const result = await knex
        .select(['id', 'name', 'email', 'role'])
        .table('users')
        .where({ id: id });

      return result;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

module.exports = new User;
