import ErrorMsg from '../constants/errorMsg';

/**
 * 验证表单，city做单独验证，因为city使用的是selector组件
 * @param children
 * @returns {*}
 */
const groupValidator = (children) => {
    for (let child of children) {
        if (!child.valid && child.name !== 'city') {
            return {
                status: false,
                errorMsg: getMatchedErrorMsg(child.name)
            };
        }
    }

    return {
        status: true
    };
};

const getMatchedErrorMsg = (searchKey) => {
    for (let msg of ErrorMsg) {
        if (msg[searchKey]) {
            return msg[searchKey];
        }
    }

    return '未知错误，请稍后重试';
};

export default {
    groupValidator
};
