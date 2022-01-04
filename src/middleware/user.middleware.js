const errorType = require("../constants/error-types");
const { getUserByName } = require("../service/user.service");
const md5password = require("../utils/password-handle");

/**
 * 用户注册接口，判断参数是否正确
 * @param {*} ctx 
 * @param {*} next 
 * @returns 
 */
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 判断用户名和密码不能为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户名不能重复
  const result = await getUserByName(name);
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTED);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password)

  await next()
};

module.exports = {
  verifyUser,
  handlePassword,
};
