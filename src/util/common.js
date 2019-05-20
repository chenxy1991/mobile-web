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
