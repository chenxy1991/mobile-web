/**
 * 判断是否为空，包括null, undefined, '', {}, []等
 */
export const isEmpty = (val) => {
    if (!val && val !== 0) {
        return true;
    } else if (typeof val === 'string' && !val.trim()) {
        return true;
    } else if (Array.prototype.isPrototypeOf(val) && val.length === 0) {
        return true;
    } else if (Object.prototype.isPrototypeOf(val) && Object.keys(val).length === 0) {
        return true;
    }

    return false;
};
/**
 * 获取url参数值
 * @param {*} name
 */
 export const getUrlKey = (name) => {
   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
 }
/**
 * 构造表单
 * @param {*} params
 */
export const toFormData = (params) => {
    const formData = new window.FormData();
    for (let key of Object.keys(params)) {
        formData.append(key, params[key]);
    }

    return formData;
};

/**
 * 获取系统状态栏高度
 */
export function statusbarHeight() {
  let isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
  // 检测是否支持沉浸式 支持沉浸式状态栏则返回true
  let _statusbarHeight = "24px"; // 设置默认值
  if (isImmersedStatusbar) {
    _statusbarHeight = plus.navigator.getStatusbarHeight(); // 获取系统状态栏高度
  }
  return _statusbarHeight;
}