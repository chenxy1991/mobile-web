import {
  ApiBasePath
}
from '../constants/index';

export default {
  /**
   * 查询待办已领取未领取的角标
   * @param {*} params
   */
  queryTaskInfoCount(parms) {
   return new Promise((resolve, reject) => {
      Vue.axios({
          headers: parms.headers,
          method: 'post',
          url: `${ApiBasePath}/api/todo/queryTaskInfoCount`,
          data: parms.Jsondata,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error("网络请求异常！请稍后再试", error);
          reject(error);
        });
    })
  },
/**
 * 查询待办类型流程环节名称编码
 * @param {*} parms
 */
queryToDoTaskCodeByType(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/todo/queryToDoTaskCodeByType`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},

/**
 * 查询待办类型详情
 * @param {*} parms
 */
queryToDoTaskDetailByType(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/todo/queryToDoTaskDetailByType`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},
  /**
    *查询待办流程类型
    * @param {*} params
    */
  queryTodoTaskFlowTypeLists(params) {
     return new Promise((resolve, reject) => {
       Vue.axios({
           headers: params.headers,
           method: 'post',
           url: `${ApiBasePath}/api/workspaceTask/queryTodoTaskFlowTypeLists`,
           data: params.Jsondata,
         })
         .then((response) => {
           resolve(response);
         })
         .catch((error) => {
           console.error("网络请求异常！请稍后再试", error);
           reject(error);
         });
     })
  },

  /**
   *通过类型查询待办类型明细
   * @param {*} params
   */
  queryTodoTaskTypeDetailByType(params) {
     return new Promise((resolve, reject) => {
       Vue.axios({
           timeout: 10000,
           headers: params.headers,
           method: 'post',
           url: `${ApiBasePath}/api/workspaceTask/queryTaskTypeDetailByType`,
           data: params.Jsondata,
         })
         .then((response) => {
           resolve(response);
         })
         .catch((error) => {
           console.error("网络请求异常！请稍后再试", error);
           reject(error);
         });
     })
  },
  /**
   * 根据taskInfoId和processDefinitionKey获取对应工单信息
   * @param {*} params
   */
  queryBusinessInfoByKey(params) {
     return new Promise((resolve, reject) => {
       Vue.axios({
           timeout: 10000,
           headers: params.headers,
           method: 'post',
           url: `${ApiBasePath}/api/workspaceTask/getBusinessInfoByKey`,
           data: params.Jsondata,
         })
         .then((response) => {
           resolve(response);
         })
         .catch((error) => {
           console.error("网络请求异常！请稍后再试", error);
           reject(error);
         });
     })
  },


  /**
   * 根据businessKey获取对应工单流程信息
   * @param {*} params
   */
  queryFlowInfoByBusinessKey(params) {
     return new Promise((resolve, reject) => {
       Vue.axios({
           timeout: 10000,
           headers: params.headers,
           method: 'post',
           url: `${ApiBasePath}/api/workspaceTask/queryFlowInfoByBusinessKey`,
           data: params.Jsondata,
         })
         .then((response) => {
           resolve(response);
         })
         .catch((error) => {
           console.error("网络请求异常！请稍后再试", error);
           reject(error);
         });
     })
  },
  /**
   * 获取附件列表信息
   * @param {*} parms
   */
  findAttachmentList(parms) {
    return new Promise((resolve, reject) => {
      Vue.axios({
          timeout: 10000,
          headers: parms.headers,
          method: 'post',
          url: `${ApiBasePath}/api/todo/findAttachmentList`,
          data: parms.Jsondata,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error("网络请求异常！请稍后再试", error);
          reject(error);
        });
    })
  },
  /**
   * 初始化是否显示按钮信息
   * @param {*} parms
   */
  getInitShowBtns(parms) {
    return new Promise((resolve, reject) => {
      Vue.axios({
          headers: parms.headers,
          method: 'post',
          url: `${ApiBasePath}/api/workspaceTask/getInitShowBtns`,
          data: parms.Jsondata,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error("网络请求异常！请稍后再试", error);
          reject(error);
        });
    })
  },
  /**
   * 根据taskInfoId查看路由信息
   * @param {*} parms
   */
  findRouterInfoByTaskInfoId(parms) {
    return new Promise((resolve, reject) => {
      Vue.axios({
          headers: parms.headers,
          method: 'post',
          url: `${ApiBasePath}/api/workspaceTask/getRouterInfoByTaskInfoId`,
          data: parms.Jsondata,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error("网络请求异常！请稍后再试", error);
          reject(error);
        });
    })
  },
   /**
    * 根据taskInfoId签收工单
    * @param {*} params
    */
   signInTask(parms) {
      return new Promise((resolve, reject) => {
        Vue.axios({
            headers: parms.headers,
            method: 'post',
            url: `${ApiBasePath}/api/workspaceTask/claimTask`,
            data: parms.Jsondata,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.error("网络请求异常！请稍后再试", error);
            reject(error);
          });
      })
   },

   /**
    * 执行流程屏蔽路由表单规则
    * @param {*} parms
    */
   executionHideRouteFlowRulesXunit(parms) {
     return new Promise((resolve, reject) => {
       Vue.axios({
           headers: parms.headers,
           method: 'post',
           url: `${ApiBasePath}/api/workspaceTask/executionHideRouteFlowRulesXunit`,
           data: parms.Jsondata,
         })
         .then((response) => {
           resolve(response);
         })
         .catch((error) => {
           console.error("网络请求异常！请稍后再试", error);
           reject(error);
         });
     })
   },

/**
 * 获取打开窗口路由按钮信息
 * @param {*} parms
 */
findOpenRouteButtons(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/findOpenRouteButtons`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},


  /**
   * 根据businessKey获取对应工单路由信息
   * @param {*} params
   */
  findTaskRouterByBusinessKey(params) {
    return Vue.axios({
      headers: params.headers,
      method: 'post',
      url: `${ApiBasePath}/api/workspaceTask/findTaskRouterByBusinessKey`,
      data: params.Jsondata,
    });
  },

  /**
   * 根据路由等信息获取对应工单派往机构和人员信息
   * @param {*} params
   */
  findTaskSelectOrgAndStaff(params) {
    return Vue.axios({
      headers: params.headers,
      method: 'post',
      url: `${ApiBasePath}/api/workspaceTask/findTaskSelectOrgAndStaff`,
      data: params.Jsondata,
    });
  },

  /**
   * 根据taskInfoId完成对应的环节任务
   * @param {*} params
   */
  completeTask(params) {
    return Vue.axios({
      headers: params.headers,
      method: 'post',
      url: `${ApiBasePath}/api/workspaceTask/completeTask`,
      data: params.Jsondata,
    });
  },




  /**
   * 根据userId和businessKey获取常用意见
   * @param {*} params
   */
  getCommonOpinionByBusinessKey(params) {
    return Vue.axios({
      headers: params.headers,
      method: 'post',
      url: `${ApiBasePath}/api/workspaceTask/getCommonOpinion`,
      data: params.Jsondata,
    });
  },





/**
 * 查询默认派往机构用户信息
 * @param {*} parms
 */
selectDefualtOrgUsers(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/selectDefualtOrgUsers`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},
/**
 * 查询派往人员信息
 * @param {*} parms
 */
findSelectUsers(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/findSelectUsers`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},
/**
 * 查询异步机构树信息
 * @param {*} parms
 */
findTaskOrgAsyncData(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/findTaskOrgAsyncData`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},
/**
 * 查询上一环节满意度字典值信息
 * @param {*} parms
 */
findSatisfactionDegree(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/findSatisfactionDegree`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},

/**
 * 查询常用小组
 * @param {*} parms
 */
getGroupZtree(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/getGroupZtree`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},

/**
 * 提交保存事件表单
 * @param {*} parms
 */
saveTaskInfoFrom(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/saveTaskInfoFrom`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},
/**
 * 动态加载DIV
 * @param {*} parms
 */
dynamicLoadingBlock(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/dynamicLoadingBlock`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},






/**
 * 根据搜索条件查询组待办详情列表
 * @param {*} parms
 */
queryToDoDetailLikeKeyWord(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/todo/queryToDoDetailLikeKeyWord`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},

/**
 * 根据类型获取故障原因树
 * @param {*} parms
 */
getCauseOfFailureTree(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/workspaceTask/getCauseOfFailureTree`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},
/**
 * 异步加载预处理内容字典值
 * @param {*} parms
 */
getPreDealContOptionByDictType(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/todo/getPreDealContOptionByDictType`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},

/**
 * 获取集团满意度评价下拉值
 * @param {*} parms
 */
getJTSatisfyDegreeOption(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/todo/getJTSatisfyDegreeOption`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},


/**
 * 获取集团事件解决情况下拉值
 * @param {*} parms
 */
getJTEndCode(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/todo/getJTEndCode`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},


/**
 * 表单前置规则
 * @param {*} parms
 */
openFormPreRules(parms) {
  return new Promise((resolve, reject) => {
    Vue.axios({
        headers: parms.headers,
        method: 'post',
        url: `${ApiBasePath}/api/todo/openFormPreRules`,
        data: parms.Jsondata,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("网络请求异常！请稍后再试", error);
        reject(error);
      });
  })
},













}