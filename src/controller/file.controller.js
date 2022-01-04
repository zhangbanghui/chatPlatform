const fileService = require("../service/file.service");

class FileController {
  /**
   * 新增头像
   */
  async savaAvatarInfo(ctx, next) {
    console.log(ctx.req)
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    const result = await fileService.createAvatar(
      filename,
      mimetype,
      size,
      id
    );

    ctx.body = result;
  }
}

module.exports = new FileController();
