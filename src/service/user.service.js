const connnection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;

    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`;

    const result = connnection.execute(statement, [name, password]);
    // 将 user 存储到数据库中
    return result;
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users where name = ?;`;
    const result = await connnection.execute(statement, [name]);

    return result[0];
  }

}

module.exports = new UserService();
