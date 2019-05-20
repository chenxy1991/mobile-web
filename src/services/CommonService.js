import Vue from 'vue';
import {ApiBasePath} from '../constants/index';

export default {
   /**
    * 获取手机版本信息
    * @param {*} params
    */
   getAppInfo(parms) {
     return new Promise((resolve, reject) => {
        Vue.$vux.loading.show({
          text: '加载中...'
        })
       Vue.axios({
           headers: parms.headers,
           method: 'post',
           url: `${ApiBasePath}/api/todo/getAppInfo`,
           data: parms.Jsondata,
         })
         .then((response) => {
           Vue.$vux.loading.hide()
           resolve(response);
         })
         .catch((error) => {
          Vue.$vux.loading.hide()
           console.error("网络请求异常！请稍后再试", error);
           reject(error);
         });
     })
   },
};
