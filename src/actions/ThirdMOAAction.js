import ThirdMOAService from '../services/ThirdMOAService';

/**
 * 第三方Token验证免密登陆
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function thirdPartyTokenVerificationLogin({
    commit
  }, params) {
    const response = await ThirdMOAService.thirdPartyTokenVerificationLogin(params);
    return response.data || {};
}
/**
 * 显示表单前置
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function displayTaskForm({
  commit
}, params) {
  const response = await ThirdMOAService.displayTaskForm(params);
  return response.data || {};
}
