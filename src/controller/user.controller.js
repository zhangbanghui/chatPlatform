const fs = require('fs')

const userService = require("../service/user.service");
const fileService = require("../service/file.service");

class UserController {
  async create(ctx, next) {
    // 获取用户请求的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await userService.create(user);
    // 返回数据
    ctx.body = result;
  }

  /**
   * 获取用户头像信息
   */
  async getAvatarInfo(ctx, next) {
    const { userId } = ctx.request.params;
    const result = await fileService.getAvatarByUserId(userId);

    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${result.filename}`);
  }
}

module.exports = new UserController();
