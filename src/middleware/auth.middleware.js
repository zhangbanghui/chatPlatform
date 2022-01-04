const jwt = require("jsonwebtoken");

const errorType = require("../constants/error-types");
const { getUserByName } = require("../service/user.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");
const { checkAuth } = require("../service/auth.service");

/**
 * 验证用户名密码是否正确
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户是否存在
  const result = await getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXIST);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断密码是否和数据库中的一致
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;

  await next();
};

/**
 * token验证用户是否登录
 */
const verifyAuth = async (ctx, next) => {
  console.log("用户验证middleware~");
  const authorization = ctx.headers.authorization;
  // 取出token
  const token = authorization?.replace("Bearer ", "");
  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

/**
 * 权限验证
 * @param {*} tableName 表名称
 * @param {*} tableName 表名称
 */
const verifyPermission = (tableName) => {
  return async (ctx, next) => {
    console.log("验证权限middleware~");

    const resourceId = ctx.params[Object.keys(ctx.params)[0]];
    const { id } = ctx.user;
    try {
      const isPermission = await checkAuth(tableName, resourceId, id);
      if (!isPermission) {
        const error = new Error(errorType.UNPERMISSINO);
        return ctx.app.emit("error", error, ctx);
      }

      await next();
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
