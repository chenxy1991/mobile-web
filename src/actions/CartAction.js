import CartService from '../services/CartService';

/**
 * 获取购物车通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCartById({commit}, params) {
    const response = await CartService.getCartById(params);
    return response.data || {};
}
/**
 * 获取所有购物车通过userId
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCartsByUserId({commit}, params) {
    const response = await CartService.getCartsByUserId(params);
    return response.data || {};
}

/**
 * 获取购物车通过groupId
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCartByGroupIdAndUserId({commit}, params) {
    const response = await CartService.getCartByGroupIdAndUserId(params);
    return response.data || {};
}

/**
 * 获取团单下所有购物车
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function getCartUnderUserByGroupId({commit}, params) {
    const response = await CartService.getCartUnderUserByGroupId(params);
    return response.data;
}

/**
 * 添加购物车
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function addCart({commit}, params) {
    const response = await CartService.addCart(params);
    return response.data || {};
}

/**
 * 更新购物车
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateCart({commit}, params) {
    const response = await CartService.updateCart(params);
    return response.data || {};
}

/**
 * 添加明细到购物车
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function addDetailToCart({commit}, params) {
    const response = await CartService.addDetailToCart(params);
    return response.data || {};
}

/**
 * 更新购物车明细
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateCartDetail({commit}, params) {
    const response = await CartService.updateCartDetail(params);
    return response.data || {};
}

/**
 * 获取购物车下的所有明细
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getDetailsByCartId({commit}, params) {
    const response = await CartService.getDetailsByCartId(params);
    return response.data || {};
}

/**
 * 删除明细在购物车里
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function subDetailById({commit}, params) {
    const response = await CartService.subDetailById(params);
    return response.data || {};
}

/**
 * 获取购物车金额通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCartCountById({commit}, params) {
    const response = await CartService.getCartCountById(params);
    return response.data || {};
}

/**
 * 删除明细从购物车中
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function deleteDetailById({commit}, params) {
    const response = await CartService.deleteDetailById(params);
    return response.data || {};
}

/**
 * 更新购物车是否已支付
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateCartPay({commit}, params) {
    const response = await CartService.updateCartPay(params);
    return response.data || {};
}

/**
 * 删除购物车
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function deleteCartById({commit}, params) {
    const response = await CartService.deleteCartById(params);
    return response.data || {};
}

/**
 * 缺货
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function calculateLost({commit}, params) {
    const response = await CartService.calculateLost(params);
    return response.data || {};
}

/**
 * 报损
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function calculateDamage({commit}, params) {
    const response = await CartService.calculateDamage(params);
    return response.data || {};
}

/**
 * 更新购物车及明细
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateCartAndDetail({commit}, params) {
    const response = await CartService.updateCartAndDetail(params);
    return response.data || {};
}

/**
 * 确定购买
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function confirmCart({commit}, params) {
    const response = await CartService.confirmCart(params);
    return response.data || {};
}
