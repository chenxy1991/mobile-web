/**
 *  路由配置
 */
const router = [{
    path: '/', //父页面的路径
    redirect: '/welcome' //父页面重定向后的路径
  }
  , {
    path: '/welcome',
    name: 'welcome',
    component: resolve => require(['../../src/components/welcome/Welcome.vue'], resolve), //父页面的组件
    meta: {
      title: '加载首页',
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../../src/views/user/loginRegister/index.vue'], resolve),
    meta: {
      title: '登录',
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/main',
    name: 'main',
    component: resolve => require(['../../src/views/main/index.vue'], resolve),
    meta: {
      title: '首页',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  },
   {
     path: '/todoLists',
     name: 'todoLists',
     component: resolve => require(['../../src/views/common/todoLists/todoTypeList/index.vue'], resolve),
     meta: {
       title: '待办列表',
       scrollToTop: true,
       keepAlive: false // 需要被缓存
     }
   }, {
    path: '/todoType',
    name: 'todoType',
    component: resolve => require(['../../src/views/common/todoLists/todoType/index.vue'], resolve),
    meta: {
      title: '待办类型列表',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  }, {
    path: '/todoDetail',
    name: 'todoDetail',
    component: resolve => require(['../../src/views/common/todoLists/todoDetail/index.vue'], resolve),
    meta: {
      title: '待办详情',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  }, {
    path: '/todoDealWith',
    name: 'todoDealWith',
    component: resolve => require(['../../src/views/common/todoLists/todoDealWith/index.vue'], resolve),
    meta: {
      title: '待办处理界面',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  }, {
    path: '/selectUser',
    name: 'selectUser',
    component: resolve => require(['../../src/views/common/todoLists/select/selectUser.vue'], resolve),
    meta: {
      title: '待办选人界面',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  }, {
    path: '/addUser',
    name: 'addUser',
    component: resolve => require(['../../src/views/common/todoLists/select/addUser.vue'], resolve),
    meta: {
      title: '待办添加成员界面',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  }, {
    path: '/feedBack',
    name: 'feedBack',
    component: resolve => require(['../../src/views/main/mine/FeedBack.vue'], resolve),
    meta: {
      title: '待办添加成员界面',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  }, {
     path: '/taskDealType',
     name: 'taskDealType',
     component: resolve => require(['../../src/views/common/todoLists/todoRouter/dealType.vue'], resolve),
    meta: {
      title: '待办任务处理方式',
      scrollToTop: true,
      keepAlive: false // 需要被缓存
    }
  },
    {
      path: '/moreTaskList',
      name: 'moreTaskList',
      component: resolve => require(['../../src/views/main/home/MoreTaskList.vue'], resolve),
      meta: {
        title: '查看更多待办明细',
        scrollToTop: true,
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/AttachmentList',
      name: 'AttachmentList',
      component: resolve => require(['../../src/views/common/todoLists/todoDetail/file/AttachmentList.vue'], resolve),
      meta: {
        title: '待办附件信息',
        scrollToTop: true,
        keepAlive: false // 需要被缓存
      }
    },
     {
       path: '/AttachmentDetail',
       name: 'AttachmentDetail',
       component: resolve => require(['../../src/views/common/todoLists/todoDetail/file/AttachmentDetail.vue'], resolve),
       meta: {
         title: '待办详情信息',
         scrollToTop: true,
         keepAlive: false // 需要被缓存
       }
     },
      {
        path: '/handlingOpinions',
        name: 'handlingOpinions',
        component: resolve => require(['../../src/views/common/todoLists/todoDealWith/eventManage/commom/HandlingOpinions.vue'], resolve),
        meta: {
          title: '待办详情信息',
          scrollToTop: true,
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/resultPage',
        name: 'resultPage',
        component: resolve => require(['../../src/components/resultPage/index.vue'], resolve),
        meta: {
          title: '处理结果',
          scrollToTop: true,
          keepAlive: false // 需要被缓存
        }
      },
       {
         path: '/thirdPartyMOALogin',
         name: 'thirdPartyMOALogin',
         component: resolve => require(['../../src/views/common/todoLists/thirdPartyMOA/index.vue'], resolve),
         meta: {
           title: 'MOA密钥验证登陆',
         }
       },
       {
         path: '/selfInfo',
         name: 'selfInfo',
         component: resolve => require(['../../src/views/main/mine/selfInfo.vue'], resolve),
         meta: {
           title: '个人信息',
           scrollToTop: true,
           keepAlive: false // 需要被缓存
         }
       },
       {
         path: '/todoFlowTypeList',
         name: 'todoFlowTypeList',
          component: resolve => require(['../../src/views/common/todo/todoFlowTypeList'], resolve),
          meta: {
            title: '待办流程类型列表',
            scrollToTop: true,
            keepAlive: false // 需要被缓存
          }
        },{
         path: '/todoFlowList',
         name: 'todoFlowList',
         component: resolve => require(['../../src/views/common/todo/todoFlowList'], resolve),
          meta: {
            title: '待办流程列表',
            scrollToTop: true,
            keepAlive: false // 需要被缓存
          }
        },{
         path: '/todoFlowFormInfo',
         name: 'todoFlowFormInfo',
         component: resolve => require(['../../src/views/common/todo/todoFlowFormInfo/index.vue'], resolve),
          meta: {
            title: '待办流程表单信息',
            scrollToTop: true,
            keepAlive: false // 需要被缓存
          }
        }, {
         path: '/notfound',
         name: 'notfound',
          component: resolve => require(['../../src/components/notfound.vue'], resolve),
          meta: {
            title: '404界面',
            scrollToTop: true,
            keepAlive: false // 需要被缓存
          }
        },{
         path: '/handleRouter',
         name: 'handleRouter',
         component: resolve => require(['../../src/views/common/todo/handleRouter/index.vue'], resolve),
          meta: {
            title: '路由操作',
            scrollToTop: true,
            keepAlive: false // 需要被缓存
          }
        }, {
         path: '/handleSubmitTodo',
         name: 'handleSubmitTodo',
          component: resolve => require(['../../src/views/common/todo/handleSubmitTodo/index.vue'], resolve),
          meta: {
            title: '待办任务提交',
            scrollToTop: true,
            keepAlive: false // 需要被缓存
          }
        }, {
         path: '/handlingEventOpinions',
         name: 'handlingEventOpinions',
          component: resolve => require(['../../src/views/common/todo/handleSubmitTodo/eventManage/handlingOpinions/index.vue'], resolve),
          meta: {
            title: '事件任务提交',
            scrollToTop: true,
            keepAlive: false // 需要被缓存
          }
        },
]

/**
 *  路由出口
 */
export default router
