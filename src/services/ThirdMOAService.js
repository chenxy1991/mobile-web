import Vue from 'vue';
import {ApiBasePath} from '../constants/index';

export default {
   /**
    * 第三方Token验证免密登陆
    * @param {*} params
    */
   thirdPartyTokenVerificationLogin(params) {
      return new Promise((resolve, reject) => {
        Vue.axios({
            headers: params.headers,
            method: 'post',
            url: `${ApiBasePath}/api/third/thirdPartyTokenVerificationLogin`,
            data: params.Jsondata,
          }).then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.error("网络请求异常！请稍后再试", error);
            reject(error);
          });
      })
   },
    /**
     * 显示表单前置
     * @param {*} params
     */
   displayTaskForm(params) {
     return new Promise((resolve, reject) => {
       Vue.axios({
           headers: params.headers,
           method: 'post',
           url: `${ApiBasePath}/api/third/displayTaskForm`,
           data: params.Jsondata,
         }).then((response) => {
           resolve(response);
         })
         .catch((error) => {
           console.error("网络请求异常！请稍后再试", error);
           reject(error);
         });
     })
   },

};
