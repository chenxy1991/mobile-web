import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import {
  ToastPlugin,
  LoadingPlugin,
  ConfirmPlugin,
  DatetimePlugin
} from 'vux';
import VueScroller from 'vue-scroller';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import App from './App.vue';
import store from './store';
import routes from './routers';
import './less/app.less';
import './fonts/iconfont.css';
import cryptoJS from '../src/services/utils';
Vue.prototype.$CryptoJS = cryptoJS;
// 注册为全局组件
Vue.use(VueRouter);
Vue.use(VueAxios, Axios);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(DatetimePlugin);
Vue.use(VueScroller);
Vue.use(VueQuillEditor);
// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
  error: require('./assets/404.png'),
  loading: require('./assets/loading.jpg'),
  attempt: 1
});

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    console.log(savedPosition);
    return savedPosition;
  } else {
    let position = {};
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash;
    } // 如果meta中有scrollTop
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0;
      position.y = 0;
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position;
  }
};

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
  scrollBehavior
});

router.beforeEach((to, from, next) => {

  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    meta.content = to.meta.content;
    head[0].appendChild(meta)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requireAuth) {
    const Authorization = localStorage.getItem('Authorization');
    if (Authorization) {
      next();
    } else {
      window.sessionStorage.removeItem(`TabActiveIndex`);
      next({
        path: '/'
      })
    }
  }
    next();
});

// http request 拦截器
Axios.interceptors.request.use(
  config => {
    const Authorization = window.localStorage.getItem('Authorization');
    config.headers.Authorization = Authorization;
    return config;
  },
  error => {
    Vue.$vux.toast.show({
      type: 'warn',
      text: '请求异常，请稍后重试',
      time: 3000
    });
    return Promise.reject(error);
  }
);

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      response
    } = error;
    const errorCodes = [502, 504];
    const logoutCodes = [400, 401];
    if (errorCodes.includes(response.status)) {
      Vue.$vux.toast.show({
        type: 'warn',
        text: '请求异常，请稍后重试',
        time: 3000
      });
    } else if (logoutCodes.includes(response.status)) {
      Vue.$vux.toast.show({
        type: 'warn',
        text: `登录失效，请重新登录`,
        time: 8000
      });
      window.localStorage.removeItem('UserInfo');
      window.localStorage.removeItem(`Authorization`);
      window.sessionStorage.removeItem(`TabActiveIndex`);
    } else {
      Vue.$vux.toast.show({
        type: 'warn',
        text: response.data.message,
        time: 8000
      });
    }

    return Promise.reject(error);
  }
);

const routerApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default routerApp;
