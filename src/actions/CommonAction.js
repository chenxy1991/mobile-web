
import CommonService from '../services/CommonService';


/**
 * 获取APP手机版本信息
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function getAppInfo({
    commit
  }, params) {
    const response = await CommonService.getAppInfo(params);
    return response.data || {};
}



