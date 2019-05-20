import TaskService from '../services/TaskService';

/**
 * 通过userId获取对应用户个人查询首页待办未领取和已领取的Badge
 * @param {*} params
 */
export async function queryTaskInfoCount({
  commit
}, params) {
  const response = await TaskService.queryTaskInfoCount(params);
  return response.data || {};
}
/**
 * 查询待办类型流程名称编码
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function queryToDoTaskCodeByType({
  commit
}, params) {
  const response = await TaskService.queryToDoTaskCodeByType(params);
  return response.data || {};
}

/**
 * 查询待办类型详情
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function queryToDoTaskDetailByType({
  commit
}, params) {
  const response = await TaskService.queryToDoTaskDetailByType(params);
  return response.data || {};
}




/**
 * 获取待办流程类型
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function queryTodoTaskFlowTypeLists({
  commit
}, params) {
  const response = await TaskService.queryTodoTaskFlowTypeLists(params);
  return response.data || {};
}
/**
 * 通过类型查询待办类型明细
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function queryTodoTaskTypeDetailByType({
  commit
}, params) {
  const response = await TaskService.queryTodoTaskTypeDetailByType(params);
  return response.data || {};
}
/**
 * 根据taskInfoId和processDefinitionKey获取对应工单信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function queryBusinessInfoByKey({
  commit
}, params) {
  const response = await TaskService.queryBusinessInfoByKey(params);
  return response.data || {};
}

/**
 * 根据businessKey获取对应工单流程信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function queryFlowInfoByBusinessKey({
  commit
}, params) {
  const response = await TaskService.queryFlowInfoByBusinessKey(params);
  return response.data || {};
}
/**
 * 获取附件列表信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findAttachmentList({
  commit
}, params) {
  const response = await TaskService.findAttachmentList(params);
  return response.data || {};
}

/**
 * 是否显示关注按钮
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getInitShowBtns({
  commit
}, params) {
  const response = await TaskService.getInitShowBtns(params);
  return response.data || {};
}
/**
 * 根据taskInfoId查看路由信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findRouterInfoByTaskInfoId({
  commit
}, params) {
  const response = await TaskService.findRouterInfoByTaskInfoId(params);
  return response.data || {};
}
/**
 * 根据taskInfoId签收工单
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function signInTask({
  commit
}, params) {
  const response = await TaskService.signInTask(params);
  return response.data || {};
}
/**
 * 执行流程屏蔽路由表单规则
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function executionHideRouteFlowRulesXunit({
  commit
}, params) {
  const response = await TaskService.executionHideRouteFlowRulesXunit(params);
  return response.data || {};
}


/**
 * 获取打开窗口路由按钮信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findOpenRouteButtons({
  commit
}, params) {
  const response = await TaskService.findOpenRouteButtons(params);
  return response.data || {};
}

/**
 * 根据businessKey获取对应工单路由信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findTaskRouterByBusinessKey({
  commit
}, params) {
  const response = await TaskService.findTaskRouterByBusinessKey(params);
  return response.data || {};
}

/**
 * 根据路由等信息获取对应工单派往机构和人员信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findTaskSelectOrgAndStaff({
  commit
}, params) {
  const response = await TaskService.findTaskSelectOrgAndStaff(params);
  return response.data || {};
}

/**
 * 根据taskInfoId完成对应的环节任务
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function completeTask({
  commit
}, params) {
  const response = await TaskService.completeTask(params);
  return response.data || {};
}


/**
 * 根据userId和businessKey获取常用意见
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCommonOpinionByBusinessKey({
  commit
}, params) {
  const response = await TaskService.getCommonOpinionByBusinessKey(params);
  return response.data || {};
}

/**
 * 查询默认派往机构用户信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function selectDefualtOrgUsers({
  commit
}, params) {
  const response = await TaskService.selectDefualtOrgUsers(params);
  return response.data || {};
}
/**
 * 查询默认派往用户信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findSelectUsers({
  commit
}, params) {
  const response = await TaskService.findSelectUsers(params);
  return response.data || {};
}
/**
 * 查询默异步机构树信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findTaskOrgAsyncData({
  commit
}, params) {
  const response = await TaskService.findTaskOrgAsyncData(params);
  return response.data || {};
}

/**
 * 查询满意度评价字典信息
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function findSatisfactionDegree({
  commit
}, params) {
  const response = await TaskService.findSatisfactionDegree(params);
  return response.data || {};
}
/**
 * 查询常用小组
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getGroupZtree({
  commit
}, params) {
  const response = await TaskService.getGroupZtree(params);
  return response.data || {};
}
/**
 * 提交保存事件表单
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function saveTaskInfoFrom({
  commit
}, params) {
  const response = await TaskService.saveTaskInfoFrom(params);
  return response.data || {};
}
/**
 * 动态加载DIV
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function dynamicLoadingBlock({
  commit
}, params) {
  const response = await TaskService.dynamicLoadingBlock(params);
  return response.data || {};
}




/**
 * 根据搜索条件查询组待办详情列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function queryToDoDetailLikeKeyWord({
  commit
}, params) {
  const response = await TaskService.queryToDoDetailLikeKeyWord(params);
  return response.data || {};
}

/**
 * 根据类型获取故障原因树
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCauseOfFailureTree({
  commit
}, params) {
  const response = await TaskService.getCauseOfFailureTree(params);
  return response.data || {};
}

/**
 * 异步加载预处理内容字典值
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getPreDealContOptionByDictType({
  commit
}, params) {
  const response = await TaskService.getPreDealContOptionByDictType(params);
  return response.data || {};
}

/**
 * 获取集团满意度评价下拉值
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getJTSatisfyDegreeOption({
  commit
}, params) {
  const response = await TaskService.getJTSatisfyDegreeOption(params);
  return response.data || {};
}
/**
 * 获取集团事件解决情况下拉值
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getJTEndCode({
  commit
}, params) {
  const response = await TaskService.getJTEndCode(params);
  return response.data || {};
}

/**
 * 表单前置规则
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function openFormPreRules({
  commit
}, params) {
  const response = await TaskService.openFormPreRules(params);
  return response.data || {};
}















