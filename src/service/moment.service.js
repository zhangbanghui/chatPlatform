const connection = require("../app/database");

class MomentService {
  /**
   * 添加评论
   */
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;

    const result = await connection.execute(statement, [content, userId]);
    // 将 user 存储到数据库中
    return result;
  }

  /** 根据id查找评论 */
  async getMomentById(momentId) {
    const statement = `SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) author
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.id = ?;`;

    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }

  async getMomentsList(offset, size) {
    const statement = `SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) author,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?, ?`;

    try {
      const [result] = await connection.execute(statement, [offset, size]);
      return result;
    } catch (error) {
      console.log(111, error);
    }
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;

    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;

    const [result] = await connection.execute(statement, [momentId]);

    return result;
  }
}

module.exports = new MomentService();
