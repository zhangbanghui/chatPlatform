const CommentService = require("../service/comment.service");

class CommentController {
  /**
   * 发表评论
   */
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;

    const result = await CommentService.create(content, momentId, id);

    ctx.body = result;
  }

  /**
   * 回复评论
   */
  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;

    const result = await CommentService.reply(content, momentId, id, commentId);

    ctx.body = result;
  }

  /**
   * 修改评论
   */
  async update(ctx, next) {
    const { content } = ctx.request.body;
    const { commentId } = ctx.params;

    const result = await CommentService.update(content, commentId);
    ctx.body = result;
  }

  /**
   * 删除评论
   */
  async remove(ctx, next) {
    const { commentId } = ctx.params;

    const result = await CommentService.remove(commentId)
    ctx.body = result
  }
}

module.exports = new CommentController();
