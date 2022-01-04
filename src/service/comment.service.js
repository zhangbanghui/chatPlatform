const connection = require("../app/database");

class CommentService {
  /**
   * 发表评论
   * @param {*} content 评论内容
   * @param {*} momentId 被评论的动态id
   * @param {*} userId 用户id
   */
  async create(content, momentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;

    try {
      const [result] = await connection.execute(statement, [
        content,
        momentId,
        userId,
      ]);
      return result;
    } catch (error) {
      console.log(error);
      return "sql错误";
    }
  }

  /**
   * 回复评论
   * @param {*} content 评论内容
   * @param {*} momentId 被评论的动态id
   * @param {*} userId 用户id
   * @param {*} commentId 回复的评论id
   * @returns
   */
  async reply(content, momentId, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;

    try {
      const [result] = await connection.execute(statement, [
        content,
        momentId,
        userId,
        commentId,
      ]);
      return result;
    } catch (error) {
      console.log(error);
      return "sql错误";
    }
  }

  /**
   * 修改评论
   * @param {*} content 新的评论内容
   * @param {*} commentId 评论id
   */
  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`;

    const [result] = await connection.execute(statement, [content, commentId]);

    return result;
  }

  /**
   * 删除评论
   * @param {*} commentId 评论id
   */
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;

    const [result] = await connection.execute(statement, [commentId]);

    return result;
  }
}

module.exports = new CommentService();
