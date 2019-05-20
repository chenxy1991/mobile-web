<template>
<div class="todoFlowFormInfo">
 <!--  margin-bottom: 4.6rem; -->
<div class="reset-cell" style="font-size: 1.4rem;background-color: #ffffff;height: 100vh;" >
    <header  class="head">
      <x-header class="reset-header" :left-options="{showBack: showBack,backText: '',preventGoBack:true}" @click.native="phoneBackButtonListener">
        {{title}}
      </x-header>
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
   <!--  <main v-if="activeTab==='JB'" style="padding-bottom: 4.6rem!important;"> -->
     <aside  v-if="activeTab === 'JB'">
        <index-details  :processKey="processKey"  :formDataMap="formDataMap" ></index-details>
     </aside>
      <article v-else >
      <aside   v-if="activeTab === 'LC'">
         <flow-process :businessKey="businessKey"></flow-process>
      </aside>
       <aside v-else-if="activeTab === 'FJ'">
         <attachment-list :taskInfoId="taskInfoId" :businessKey="businessKey"></attachment-list>
       </aside>
      </article>
   <!--  <footer>
    <div class="submit">
      <x-button type="primary"  @click.native="handleSumbitWorkOrderTaskClick()" action-type="button" style="background-color:#1B82D1">处理</x-button>
    </div>
    </footer> -->
</div>
</div>
</template>
<script>
import { isEmpty } from "../../../../utils/common";

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
import store from 'storejs';
import {
  isEmpty,getUrlKey
} from '../../../../utils/common.js'
import {
  Tab,
  TabItem,
  Divider,
  TransferDom,
  ViewBox,
} from "vux";
import {
  mapActions,mapState,mapGetters
} from 'vuex';
import { querystring } from 'vux'
import IndexDetails from "./detail/index";
import FlowProcess from "./flow/FlowProcess";
import AttachmentList from "./file/AttachmentList";
export default {
  name: "todoFlowFormInfo",
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
    ViewBox,
  },
  data() {
    return {
      activeTab: "",
      title: "工单详情",//标题
      taskInfoId: "",//任务ID
      processKey: "",//流程key
      isHeaderShow:true,//是否显示头部
      showBack:true,//返回图标
      formDataMap:'',//后台返回信息
    };
  },
  created: function () {
    //console.log(1)
     console.log("this.$route.query3333",this.$route.query);
    const {
      businessKey,
      taskInfoId,
     /*  processKey,
      currentTaskName,
      processType,
      applyOrgId, */
    } = this.$route.query;

    let token=this.$route.query.token;
    if(!isEmpty(token)){
       alert(token);
       this.showBack=false;
    }
    this.businessKey = businessKey;
    this.taskInfoId = taskInfoId;
    this.activeTab='JB';
    console.log(">>>>>>>>>>>hhh" + businessKey);
  },
  mounted: function () {
     // 将phoneBackButtonListener方法绑定到window下面，提供给外部调用
   /*   window['phoneBackButtonListener'] = () => {
        this.phoneBackButtonListener()
     } */
    //只执行一次
    //console.log(2)
    this.onLoadPage();
  },
  destroyed: function () {
    // this.taskTypeDetailList = undefined;
  },
  /**获取vuex值的两种方式 */
  computed:{
      ...mapState({
        formDetail:state=>state.formDetail,
        showBack: state => state.showBack
    }),
    ...mapGetters([
      'getFormDetail',
    ]),
  },
  methods: {
    ...mapActions([
      'openFormPreRules',
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
    onLoadPage(){
      this.loadFormInfoByTaskInfoId();
    },
    async loadFormInfoByTaskInfoId() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
        const sendInfo = {
          headers: {
            userId: userId,
          },
          Jsondata: {
            "taskInfoId": this.taskInfoId,//
          }
        };
        this.$vux.loading.show({	text: '加载中...'});
        result = await this.openFormPreRules(sendInfo);
        this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        this.alert('加载表单信息失败，原因:' + error);
      }
      //const resJsonData = JSON.stringify(result);
      console.log(">>>>>>>>openFormPreRules结果集:", result);
      if (result.meta.success == true) {
         let returnMap=result.data.returnMap;
         let dealStatus=returnMap.dealStatus;
         if(isEmpty(dealStatus)){
         this.formDataMap=returnMap;
         let activityId=returnMap.activityId;
         let currentTaskName=returnMap.currentTaskName;
         this.title = currentTaskName;
         let processDefinitionKey=returnMap.processDefinitionKey;
         this.processKey = processDefinitionKey;
          }else{
            let message=returnMap.message;
            this.alert(message);
            let token=this.$route.query.token;
            if(isEmpty(token)){
              this.$router.push({name: "main"});
            }else{
              this.$router.push({name: "notfound"});
            }
          }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.alert('加载表单失败，原因:' +failDesc+","+ failCaused);
      }
    },
     handleTabItemClick(name) {
      this.activeTab = name;
      document.body.scrollTo(0, 0);
    },//tab转换
  }
};
//在全局中定义该函数

</script>
<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  height: 9rem;
  line-height: 9rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}

.head {
  top: 0;
}

article {
      position: fixed;
      top: 9rem;
      bottom: 0rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
.pB55 {
  width: 100%;
  padding-bottom: 5rem!important;
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
  background-color: #1B82D1;
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
