const connection = require("../app/database");

class FileService {
  /**
   * 创建头像
   * @param {*} filename 图片名称
   * @param {*} mimetype 图片类型
   * @param {*} size 图片大小
   * @param {*} userId 用户id
   */
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
    try {
      const [result] = await connection.execute(statement, [
        filename,
        mimetype,
        size,
        userId,
      ]);
      return result;
    } catch (error) {
      console.log(111, error);
    }
  }

  /**
   * 获取用户头像
   * @param {*} userId 用户id
   * @returns
   */
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?`;
    try {
      const [result] = await connection.execute(statement, [userId]);

      return result[0];
    } catch (error) {
      console.log('error', error);
    }
  }
}

module.exports = new FileService();
