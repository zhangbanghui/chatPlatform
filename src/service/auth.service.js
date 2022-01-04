const connection = require("../app/database");

class AuthService {
  async checkAuth(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    try {
      const [result] = await connection.execute(statement, [id, userId]);
      return result.length !== 0;
    } catch (error) {
      console.log("sql 错误");
      console.log(error);
    }
  }
}

module.exports = new AuthService();
