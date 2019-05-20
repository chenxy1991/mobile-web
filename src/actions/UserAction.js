import UserService from '../services/UserService';

/**
 * 注册
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function register({
  commit
}, params) {
  const response = await UserService.register(params);
  return response.data;
}

/**
 * 登录
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function login({
  commit
}, params) {
  const response = await UserService.login(params);
  return response.data;
}

/**
 * 获取登录令牌
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function tokenKey({
  commit
}, params) {
  const response = await UserService.tokenKey(params);
  return response.data;
}
/**
 * 登出
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function logout({
  commit
}, params) {
  const response = await UserService.logout(params);
  return response.data;
}

/**
 * 获取用户列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getUserList({
  commit
}, params) {
  const response = await UserService.getUserList(params);
  return response.data || {};
}

/**
 * 通过id获取用户
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getUserById({
  commit
}, params) {
  const response = await UserService.getUserById(params);
  return response.data;
}

/**
 * 获取用户头像路径
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getUserAvatar({
  commit
}, params) {
  const response = await UserService.getUserAvatar(params);
  return response.data;
}

/**
 * 上传用户头像
 * @param commit
 * @param formData
 * @returns {Promise.<{}>}
 */
export async function uploadUserAvatar({
  commit
}, {
  formData
}) {
  const response = await UserService.uploadUserAvatar(formData);
  return response.data || {};
}

/**
 * 上传用户支付二维码
 * @param commit
 * @param formData
 * @returns {Promise.<{}>}
 */
export async function uploadPayQrCode({
  commit
}, {
  formData
}) {
  const response = await UserService.uploadPayQrCode(formData);
  return response.data || {};
}

/**
 * 更新用户
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateUser({
  commit
}, params) {
  const response = await UserService.updateUser(params);
  return response.data || {};
}

/**
 * 检查用户名是否重复
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function checkUsername({
  commit
}, params) {
  const response = await UserService.checkUsername(params);
  return response.data || {};
}

/**
 * 获取是否绑定手机
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function hasBindPhone({
  commit
}, params) {
  const response = await UserService.hasBindPhone(params);
  return response.data || {};
}

/**
 * 绑定手机
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function bindPhone({
  commit
}, params) {
  const response = await UserService.bindPhone(params);
  return response.data || {};
}
