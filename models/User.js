const bcrypt = require('bcrypt');

const knex = require('../database/connection');

class User {
  async create (name, email, password) {
    try {
      await knex
        .insert({ name, email, password, role: 0 })
        .table('users');
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new User;
