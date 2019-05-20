//import Vue from 'vue';
//import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
/*引入资源请求插件*/
import Axios from 'axios';
import VueAxios from 'vue-axios';
import {
  ToastPlugin,
  LoadingPlugin,
  ConfirmPlugin,
  DatetimePlugin,
  AlertPlugin,
  LoadMore,
  Msg,
  Group,
  Cell,
  CellBox,
  XHeader,
  XButton,
  XInput,
  ViewBox,
} from 'vux';
import VueScroller from 'vue-scroller';
/* import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'; */
import App from './App.vue';
import store from './store/index';
import storejs from 'storejs';
import routes from './router/routers';
import './less/app.less';
import './fonts/iconfont.css';
import 'vue-search-bar/dist/vue-search-bar.min.css';
import 'babel-polyfill'
import MescrollVue from 'mescroll.js/mescroll.vue'
import {
  SearchBar
} from 'vue-search-bar';

import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.config.productionTip = false
//import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 通过插件的形式挂载
const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'), // 中文语言包
    'en-US': require('./common/lang/en') // 英文语言包
  }
})
Vue.use(MescrollVue);
Vue.use(SearchBar);

// 注册为全局组件
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-header', XHeader)
Vue.component('cell-box', CellBox)
Vue.component('load-more', LoadMore)
Vue.component('msg', Msg)
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('view-box', ViewBox)
Vue.use(VueRouter);
Vue.use(VueAxios, Axios);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(DatetimePlugin);
Vue.use(AlertPlugin);
Vue.use(VueScroller);
//Vue.use(VueQuillEditor);

//在全局中定义该函数
// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
  error: require('./assets/others/404.png'),
  loading: require('./assets/others/loading.jpg'),
  attempt: 1
});
//-------设置-------- start
Vue.prototype.store = store;
Vue.prototype.storejs = storejs;
Vue.prototype.resErrMsg = '网络请求异常！请稍后再试'; //网络请求异常提示语

//公用的弹窗(全局变量)
Vue.prototype.showToast = function (showPositionValue, type, text, width = "10em") {
  this.$vux.toast.show({
    showPositionValue: false,
    type: type, //success, warn, cancel, text
    text: text,
    width: width,
    position: 'middle',
    time: 3000
  })
} //弹出提示(参数：显示的文字)
//公用alert confirm
const Message = {};
Message.install = () => {
  const msg = {
    alert: config => {
      let def = {
        title: '提示',
        content: '系统异常，请重新登录后再试！',
        buttonText: '确定'
      }
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.alert.show(Object.assign(def, {
          content: config
        }));
      } else {
        Vue.$vux.alert.show(Object.assign(def, config));
      }
    },
    confirm: config => {
      let isConfirm = false;
      let def = {
        title: '提示',
        content: '系统异常，请重新登录后再试！',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          isConfirm = true;
        }
      }
      if (typeof config === 'string' || typeof config === 'number') {
        Vue.$vux.confirm.show(Object.assign(def, {
          content: config
        }));
      } else {
        Vue.$vux.confirm.show(Object.assign(def, config));
      }
      /*return new Promise((resolve,reject) => {
       if(isConfirm){
       resolve();
       }
       })*/
    },


  }
  Object.entries(msg).forEach(([method, fn]) => {
    Vue.prototype[method] = fn;
  })
}
Vue.use(Message)
//-------设置-------- end
//-------全局公用函数-------- start
var onPlusReady = function (callback, context = this) {
  if (window.plus) {
    callback.call(context)
  } else {
    document.addEventListener('plusready', callback.bind(context))
  }
}
Vue.mixin({
      beforeCreate() {
        onPlusReady(() => {
          this.plusReady = true
        }, this)
      },
      methods: {
        onPlusReady: onPlusReady
      }
  })


Vue.prototype.$onError = function (error) {
  var error_msg = '网络错误';
  var toastFlag = true;
  switch (error.errorCode) {
    case 401:
      error_msg = '请先登录';
      break;
    case 500:
      error_msg = '服务器错误';
      break;
    case 504:
      error_msg = '网络超时'
      break;
    case 20000:
      toastFlag = false;
      this.$router.push({ path: 'invalidIdentity' });
      break;
  }
  if (toastFlag) {
    this.$Toast({
      message: error_msg,
      position: 'bottom',
      duration: 2000,
      callback: () => {
        this.$router.push({ path: 'error' });
      }
    })
  }
}

/* 下面举例一个借口siteService.sales(this.time).then(res => {
  vm.salesInfo = res.data;
  vm.details = vm.salesInfo.details;
  vm.saleSum = vm.salesInfo.saleSum;
  vm.time = vm.salesInfo.time;
}, err => {
  this.$onError(err);
}); */
Vue.prototype.phoneTpye = function () {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) {
    return this.mtype = 'android'
  } else if (isiOS) {
    return this.mtype = 'ios'
  }
} //判断手机类型(ios或android)
Vue.prototype.checkPhone = function (s) {
  let reg = /^(0|86|17951)?1(3[0-9]|4[579]|5[012356789]|6[6]|7[35678]|8[0-9]|9[89])\d{8}$/
  return reg.test(s)
} //验证手机号码(参数：手机号)

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
    const Authorization = storejs.get('Authorization');
    if (Authorization) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  }
  next();
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
// http request 拦截器
Axios.interceptors.request.use(
  config => {
    const Authorization = storejs.get('Authorization');
    if (Authorization) {
     /*  alert(Authorization); */
       config.headers.authorization = Authorization;
    }
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
 //封装过期控制代码
 Vue.prototype.set = function(key, value) {
   var curTime = new Date().getTime();
  storejs.set(key, JSON.stringify({
     data: value,
     time: curTime
   }));
 }

Vue.prototype.get = function (key, exp) {
   var data = storejs.get(key);
   var dataObj = JSON.parse(data);
   if (new Date().getTime() - dataObj.time > exp) {
     console.log('信息已过期');
     alert("信息已过期")
   } else {
     //console.log("data="+dataObj.data);
     //console.log(JSON.parse(dataObj.data));
     var dataObjDatatoJson = JSON.parse(dataObj.data)
     return dataObjDatatoJson;
   }
 }

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    //console.log("响应错误信息", response);
    return response;
  },
  error => {
    const {response} = error;
    //console.log("响应错误信息error111", error);
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
      storejs.remove('UserInfo');
      storejs.remove(`Authorization`);
      storejs.remove(`TabActiveIndex`);
    } else {
      Vue.$vux.toast.show({
        type: 'warn',
        text: error,
        time: 8000
      });
    }
    return Promise.reject(error);
  }
);



const routerApp = new Vue({
  i18n, // 不要忘记
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default routerApp;
