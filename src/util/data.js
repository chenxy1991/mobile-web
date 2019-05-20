export const countHandle = (count) => {
    let wCount = parseInt(count / 100000);
    if (wCount > 0) {
        return wCount + '万';
    } else {
        return count;
    }
};

/**
 * @param code
 * @returns {string}
 */
export const compile = (code) => {
    const codeStr = `${code}`;
    let c = String.fromCharCode(codeStr.charCodeAt(0) + codeStr.length);
    for (let i = 1; i < codeStr.length; i++) {
        c += String.fromCharCode(codeStr.charCodeAt(i) + codeStr.charCodeAt(i - 1));
    }
    c = escape(c.split('').join(' '));
    return c;
};

/**
 * @param code
 * @returns {string}
 */
export const unCompile = (code) => {
    let codeStr = `${code}`;
    codeStr = unescape(codeStr).split(' ').join('');
    let c = String.fromCharCode(codeStr.charCodeAt(0) - codeStr.length);
    for (let i = 1; i < codeStr.length; i++) {
        c += String.fromCharCode(codeStr.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
};

/**
 * 格式化url params
 * @param paramsStr
 */
export const formatUrlParams = (paramsStr) => {
    const paramsObj = {};
    const params = paramsStr.split('&');
    for (let param of params) {
        const pair = param.split('=');
        paramsObj[pair[0]] = pair[1];
    }

    return paramsObj;
};
