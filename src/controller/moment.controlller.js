const momentService = require("../service/moment.service");

class MomentController {
  /**
   * 发布动态
   */
  async create(ctx, next) {
    ctx.body = "发表动态成功";
    // 获取数据
    const userId = ctx.user.id;
    const { content } = ctx.request.body;

    // 将数据插入到数据库中
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  /**
   * 获取单个动态详情
   * @param {*} ctx
   * @param {*} next
   */
  async getDetail(ctx, next) {
    const momentId = ctx.request.params.momentId;

    const result = await momentService.getMomentById(momentId);

    ctx.body = result;
  }

  /**
   * 获取动态列表
   * @param {*} ctx
   * @param {*} next
   */
  async list(ctx, next) {
    const { offset, size } = ctx.query;

    // 查询列表
    const result = await momentService.getMomentsList(offset, size);

    ctx.body = result;
  }

  /**
   * 修改内容
   * @param {*} ctx
   * @param {*} next
   */
  async update(ctx, next) {
    const { momentId } = ctx.request.params;
    const { content } = ctx.request.body;

    const result = await momentService.update(content, momentId);

    ctx.body = result;
  }

  /**
   * 删除动态
   */
  async remove(ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.remove(momentId);

    ctx.body = result;
  }
}

module.exports = new MomentController();
