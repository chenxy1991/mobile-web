
/**
 *  路由配置
 */
const router =[{
      path: '/', //父页面的路径
      redirect: '/welcome' //父页面重定向后的路径
    }, {
      path: '/welcome',
      name: 'welcome',
      component: resolve => require(['../src/components/welcome/Welcome.vue'], resolve), //父页面的组件
      meta: {
        title: '加载首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../src/views/user/loginRegister/index.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: resolve => require(['../src/views/main/index.vue'], resolve),
      meta: {
        title: '首页'
      }
    }
  ]

/**
 *  路由出口
 */
export default router

