<template>
<div class="thirdLogin  reset-cell" style="font-size: 1.4rem;background-color: #ffffff" >
    <header  class="head">
       <x-header class="reset-header" :left-options="{showBack: false,backText: ''}" >
         首页
      </x-header>
    </header>
    <article>
        <div style="padding-top:50%;" class="auto-linefeed">{{message}}</div>
    </article>
    <footer>
    </footer>
</div>
</template>
<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  height: 4.6rem;
  line-height: 4.6rem;
  width: 99%;
  background-color:#ffffff;;
  z-index: 100;
}

.head {
  top: 0;
}

article {
      position: fixed;
      top:4.6rem;
      left:1rem;
      bottom: 0rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
</style>
<script>

/* function phoneBackButtonListener() {
    if (isHeaderShow) {
       // 你们自己处理
      this.$router.go(-1);//返回上一层
       return true;
    } else {
       return false; // 表示关闭你们整个页面，这个由我们这边处理
    }
} */
</script>
<script>
import store from 'storejs';
import { querystring } from 'vux'
import { base64 } from 'vux'
import {
  isEmpty,getUrlKey
} from '../../../../utils/common.js'
import {
  TransferDom,
  XHeader,
} from "vux";
import {
  mapActions
} from 'vuex';
export default {
  name: "thirdLogin",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
  },
  data() {
    return {
      message: "",//响应信息
    };
  },
  created() {
 /*    const {
      businessKey,
      taskInfoId,
      processKey,
      currentTaskName,
      processType,
      applyOrgId,
    } = this.$route.query; */
    alert("1");
     //let url= window.location.href;
    console.log("this.$route.query",this.$route.query);
  },
  mounted() {
    let token=this.$route.query.token;
    //let token=getUrlKey("token");
      alert(JSON.stringify(token));
   if(!isEmpty(token)){
      this.moaTokenVerifyLogin(token);
    }
     // 将phoneBackButtonListener方法绑定到window下面，提供给外部调用
    /*  window['phoneBackButtonListener'] = () => {
        this.phoneBackButtonListener()
     } */
    //只执行一次
    //console.log(2)
  },
  destroyed() {
    console.log(4);

  },
  /**获取vuex值的两种方式 */
  computed:{
  },
  methods: {
    ...mapActions([
      'thirdPartyTokenVerificationLogin',
      'displayTaskForm'
    ]),
    phoneBackButtonListener() {
        if (this.isHeaderShow) {
          // 你们自己处理
          this.$router.go(-1);//返回上一层
          return true;
        } else {
          return false; // 表示关闭你们整个页面，这个由我们这边处理
        }
    },//第三方操作返回事件
  async moaTokenVerifyLogin(token) {
    /*  alert("进来了moaTokenVerifyLogin"); */
      let result = {};
      try {
      const sendInfo = {
        headers: {
          token:token
        },
        Jsondata: {
        }
      }
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.thirdPartyTokenVerificationLogin(sendInfo);
      this.$vux.loading.hide();
       } catch (error) {
        console.error(error);
        this.showToast(false, 'warn', '第三方验证登陆失败，原因:' + error);
      }
      console.log("thirdPartyTokenVerificationLogin>>>>>>>>结果集:", result);
      if (result.meta.success == true) {
        console.log(">>>>>登录信息" + JSON.stringify(result.data.user));
        let userInfo= result.data.user;
        this.storejs.set('token',token);
        this.storejs.set('Authorization',result.data.jwt);
        this.storejs.set('UserInfo', userInfo);
        this.storejs.set('LoginUserId',userInfo.userId);
         if (this.storejs.get('UserInfo')) {
          //获取路由信息
           this.asyncOpenFormPre(token,userInfo.userId);
        }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn','第三方验证登陆异常，原因:' +failDesc+","+ failCaused);
        //跳转到404页面
      }
    },//第三方验证登陆
   async asyncOpenFormPre(token,userId) {
     alert("2");
      let result = {};
      let self=this;
      let taskInfoId=this.$route.query.taskInfoId;
      try {
      const sendInfo = {
        headers: {
          token:token,
          userId:userId
        },
        Jsondata: {
          taskInfoId:taskInfoId
        }
      }
      self.$vux.loading.show({ text: '努力加载中'  });
      result = await self.displayTaskForm(sendInfo);
      self.$vux.loading.hide();
       } catch (error) {
        console.error(error);
        self.showToast(false, 'warn', '打开表单失败，原因:' + error);
      }
      console.log("displayTaskForm>>>>>>>>结果集:", result);
      if (result.meta.success == true) {
        console.log("result.meta.code",result.meta.code);
        if(result.meta.code===1000){
          let successMsg= result.data.successMsg;
          self.showToast(false,'text',successMsg);
         console.log("successMsg",successMsg);
          self.message=successMsg;
        }else{
        self.message="密钥验证通过，欢迎进入省ITSM移动待办页面...";
        let returnMap= result.data.returnMap;
        let taskLinkInfoVo=returnMap.taskLinkInfoVo;
         if (taskLinkInfoVo) {
          //获取路由信息
              const {
            taskInfoId,
            processType,
            applyOrgId,
            processKey,
          } = self.$route.query;
         self.$router.push({
            name: 'todoDetail',
            query: {
              businessKey: taskLinkInfoVo.businessKey,
              taskInfoId: taskInfoId,
              processKey:processKey,
              currentTaskName: taskLinkInfoVo.taskName,
              processType: processType,
              applyOrgId: applyOrgId,
              token:token,
              taskLinkInfoVo:taskLinkInfoVo,
            }
         })
        }
        }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        self.showToast(false,'warn','打开表单异常，原因:' +failDesc+","+ failCaused);
        //跳转到404页面
      }
    },//打开表单前置
  }
};
//在全局中定义该函数

</script>
