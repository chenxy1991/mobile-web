<template>
<div class="reset-cell" style="font-size: 1.6rem;overflow: auto;"  v-show="allowAccessTo">
    <header style="position: fixed;top: 0;left: 0;right: 0;z-index: 100;">
      <div  v-if="isHeaderShow">
      <x-header class="reset-header" :left-options="{backText: '',preventGoBack:true}" @click.native="phoneBackButtonListener">
        {{title}}
      </x-header>
      </div>
      <tab class="tab-container"  bar-active-color="rgb(27, 130, 210)" active-color="rgb(27, 130, 210)">
        <tab-item :selected="activeTab==='JB'" @on-item-click="handleTabItemClick('JB')">
          <div class="tab-item-container">
            <span class="text f13">基本内容</span>
          </div>
        </tab-item>
        <tab-item :selected="activeTab==='LC'" @on-item-click="handleTabItemClick('LC')">
          <div class="tab-item-container">
            <span class="text f13">流程过程</span>
          </div>
        </tab-item>
        <tab-item :selected="activeTab==='FJ'" @on-item-click="handleTabItemClick('FJ')">
          <div class="tab-item-container">
            <span class="text f13">表单附件</span>
          </div>
        </tab-item>
      </tab>
    </header>
   <section  :class="{pT9Rem:isHeaderShow,pT44px:!isHeaderShow}">
    <div class="content"  :class=" {pB55 :activeTab === 'JB'}">
      <index-details v-if="activeTab==='JB'"  :processKey="processKey" :taskInfoId="taskInfoId" :businessKey="businessKey"></index-details>
      <flow-process v-else-if="activeTab === 'LC'" :processKey="processKey" :taskInfoId="taskInfoId" :businessKey="businessKey"></flow-process>
      <attachment-list v-else-if="activeTab === 'FJ'"></attachment-list>
    </div>
   </section>
</div>
</template>
<script>

function phoneBackButtonListener() {
    if (isHeaderShow) {
       // 你们自己处理
      this.$router.go(-1);//返回上一层
       return true;
    } else {
       return false; // 表示关闭你们整个页面，这个由我们这边处理
    }
}
</script>
<script>
import {
  isEmpty,getUrlKey
} from '../../../../utils/common.js'
import {
  Tab,
  TabItem,
  Divider,
  TransferDom,
  XHeader,
  Group,
  ViewBox,
} from "vux";
import {
  mapActions,mapState,mapGetters
} from 'vuex';
import IndexDetails from "./detail/index";
import FlowProcess from "./flow/FlowProcess";
import AttachmentList from "./file/AttachmentList";
export default {
  name: "",
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Divider,
    IndexDetails,
    FlowProcess,
    AttachmentList,
    XHeader,
    Group,
    ViewBox,
  },
  data() {
    return {
      activeTab: this.storejs.get("GroupTabActive"),
      title: "",//标题
      taskInfoId: "",//任务ID
      processKey: "",//流程key
      isHeaderShow:true,//是否显示头部
      allowAccessTo:true,//是否运行第三方访问
    };
  },
  created: function () {
    //console.log(1)
    const {
      businessKey,
      taskInfoId,
      processKey,
      currentTaskName,
      processType,
      applyOrgId,
    } = this.$route.query;
    this.title = currentTaskName;
    this.businessKey = businessKey;
    this.processKey = processKey;
    this.taskInfoId = taskInfoId;
    if(processType=="group"){
      this.showSignIn=true;
    }
    let url= window.location.href;
    let token=getUrlKey("token");
    if(!isEmpty(token)){
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.allowAccessTo=false;
      this.isHeaderShow=false;
      alert(JSON.stringify(token));
      this.moaTokenVerifyLogin(token);
    }
    this.activeTab='JB';
    console.log(">>>>>>>>>>>hhh" + businessKey);
  },
  mounted: function () {
     // 将phoneBackButtonListener方法绑定到window下面，提供给外部调用
     window['phoneBackButtonListener'] = () => {
        this.phoneBackButtonListener()
     }
    //只执行一次
    //console.log(2)
  },
  destroyed: function () {
    console.log(4);

    // this.taskTypeDetailList = undefined;
  },
  /**获取vuex值的两种方式 */
  computed:{
      ...mapState({
        formDetail:state=>state.formDetail,
    }),
    ...mapGetters([
      'getFormDetail',
    ]),
  },
  methods: {
    ...mapActions([
      'thirdPartyTokenVerificationLogin',
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
     alert("进来了moaTokenVerifyLogin");
      let result = {};
      try {
        /*  timeout:100, */
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
        this.allowAccessTo=true;//可以允许进入第三方
        console.log(">>>>>登录信息" + JSON.stringify(result.data.user));
        let userInfo= result.data.user;
        window.localStorage.setItem('token',token);
        window.localStorage.setItem('Authorization',result.data.jwt);
        window.localStorage.setItem('UserInfo', JSON.stringify(userInfo));
        window.localStorage.setItem('LoginUserId',userInfo.userId);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn','第三方验证登陆异常，原因:' +failDesc+","+ failCaused);
        //跳转到404页面
      }
    },//第三方验证登陆
     handleTabItemClick(name) {
      this.activeTab = name;
      document.body.scrollTo(0, 0);
      window.localStorage.setItem("GroupTabActive", name);
    },//tab转换

  }
};
//在全局中定义该函数

</script>
<style lang="less" scoped>
.pT44px{
  margin-top: 4.4rem !important;
}
.pT9Rem{
  margin-top: 9rem !important;
}
.pB55 {
  width: 100%;
  padding-bottom: 5.5rem;
}

.pT44Rem {
    margin-top: 4.4rem !important;
  }
.nav {
  position: fixed;
  width: 100%;
  z-index: 10;
  height: 0;
  .vux-tab {
    height: 38px;
  }

  .tab-container {
    .text {
      color: #9b9b9b;
    }

    .tab-item-container {
      line-height: 38px;
    }

    .vux-tab-selected {
      .text {
        color: #28b1ea;
      }
    }
  }
}

.top {
  margin-bottom: 0px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgb(76, 130, 193);
}

.tab {
  margin-top: 46px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
}

.item {
  position: relative;
  left: 0;
  top: 92px;
  width: 100%;
  z-index: 0;
}



.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>
