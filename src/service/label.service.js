const connection = require('../app/database')

class LabelService {
  /**
   * 创建标签
   * @param {*} name 标签名
   */
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`

    const [result] = await connection.execute(statement, [name])
    return result
  }
}

module.exports = new LabelService()