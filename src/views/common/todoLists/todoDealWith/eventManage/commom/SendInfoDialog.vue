<template>
<div class="SendInfoDialog">
<div  class="reset-cell" style="font-size: 1.4rem;background-color: #ffffff;padding:0 0.5rem;">
  <!--头部固定-->
  <header class="head">
    <x-header class="reset-header" :left-options="{backText: '',preventGoBack:true}" @click.native="returnFrom">部门管理</x-header>
    <search v-model="searchValue" position="absolute" auto-scroll-to-top placeholder="输入部门名称、成员名称" top="46px" ref="search">
      <aside>
        <div class="animate" @touchmove.prevent>
        </div>
      </aside>
    </search>
    <!--tabbar-->
    <aside style="background-color: #ffffff;">
      <!--已选标题栏-->
      <div class="weui-cell vux-tap-active weui-cell_access vux-cell-no-border-intent">
        <div class="vux-cell-bd vux-cell-primary ellipsy">
          <span @click="returnMain">主目录</span><span v-for="(item,idx) in chooseOrgIdList" :key="idx" @click="returnPrew(item)"> >{{item.name}}</span>
        </div>
        <div class="weui-cell__ft vux-cell-arrow-transition" @click="showOrgIdAll = !showOrgIdAll" :class="showOrgIdAll?'vux-cell-arrow-up':'vux-cell-arrow-down'"></div>
      </div>
      <!--弹出已点击标题栏-->
      <div class="slide" :class="showOrgIdAll?'animate':''" @touchmove.prevent>
        <div style="background-color: #ffffff;padding: 0 15px;line-height: 42px;">
          <span @click="returnMain">主目录</span><span v-for="(item,idx) in chooseOrgIdList" :key="idx" @click="returnPrew(item)"> > {{item.name}}</span>
        </div>
      </div>
    </aside>
  </header>
   <article>
  <!-- <section  style="margin-top: 13rem;padding-bottom:4.3rem;"> -->
    <aside style="background-color: #ffffff;padding-bottom: 0.5rem;" class="f14"  >
      <ul >
        <li class="no-select-li"><img src="../../../../../../assets/img/man.png" alt="">人员</li>
          <!--tab选项 style="position:absolute;top:13rem;left: 0;right: 0;"-->
          <template v-if="showUserIdTab">
            <div style="margin: 10px">
              <checker v-model="checkerUserItem" type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
                <checker-item v-for="(item,idx) in checkerUserIdTabList" :key="idx" @on-item-click="onUserItemClick" :value="item">{{item.realName}}</checker-item>
              </checker>
            </div>
          </template>
        <li class="no-select-li"><img src="../../../../../../assets/img/config.png" alt="">下级组织</li>
          <!--列表选项-->
          <template v-if="showOrgIdList">
            <div style="border-bottom: 1px solid #e5e5e5;" >
              <cell  v-for="(item,idx) in checkerOrgIdList" :key="idx" class="sub-item"   @click.native="checkListItem(item)" :title="item.name" is-link>
                  <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../../../../assets/images/icon/openNode.svg">
               </cell>
             <!--  <cell-box v-for="(item,idx) in checkerOrgIdList" :key="idx" class="sub-item" is-link @click.native="checkListItem(item)">{{item.name}}
              </cell-box> -->
            </div>
          </template>
      </ul>
    </aside>
   <!-- </section> -->
   </article>
    <footer class="foot">
      <cell :title="'已选['+checkerUserItem.length+']'" style="width: 70px;max-width: 100px;display: inline-block;color: #ff7900" is-link :border-intent="false" :arrow-direction="showChooseAll ? 'down' : 'up'" @click.native="showChooseAll = !showChooseAll"></cell>
      <span class="sure-btn" @click="sureSendInfo">确定</span>
   </footer>
  <div class="slidefoot" @touchmove.prevent :class="showChooseAll?'animatefoot':''">
      <section class="pot-bottom">
        <p class="pot-tom-cancel"><img @click="showChooseAll = !showChooseAll" src="../../../../../../assets/img/check-cancel.png" alt=""></p>
          <checker v-model="checkercancel" type="checkbox" default-item-class="checks-item-selected" selected-item-class="">
            <checker-item v-for="(item,idx) in checkerUserItem" :key="idx" :value="item.id" @on-item-click="cancelItem(idx)">{{item.realName}}
            </checker-item>
          </checker>
      </section>
     </div>
</div>
</div>
</template>
<style lang="less" scoped>
 /*  main {
      position: fixed;
      box-sizing: border-box;
      top: 13rem;
      overflow-y: scroll;
      height: 100vh;
      width:100%;
      -webkit-overflow-scrolling: touch;
    } */
</style>
<script>
import {
  mapActions
} from "vuex";
import {
  Search,
  Checker,
  CheckerItem
} from "vux";
import { isEmpty } from '../../../../../../utils/common';

export default {
  name: "sendInfoDialog",
  props: {
    OrgList: {
      type: [String, Object, Array],
      required: true
    },
    parms: {
      type: [Object, Array],
      required: true
    },
    decisionTransition: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      searchValue: "", //搜索值
      showOrgIdAll: false, //是否向下展开
      showChooseAll: false, //已选项展开
      showOrgIdList: true, //下级是否列表
      showUserIdTab: false, //下级是否选项
      checkerUserItem: [], //tab多选值
      checkercancel: [], //cancel
      checkerOrgIdList: [{
        name: "组织机构"
      }],
      chooseOrgIdList: [],
      checkerUserIdTabList: undefined
    };
  },
  components: {
    Search,
    Checker,
    CheckerItem
  },
  created: function () {
    this.checkerOrgIdList = this.OrgList;
    console.log("选人>>>>>>>>>>>>>>>>>", this.checkerOrgIdList);
  },
  mounted: function () {
    //只执行一次
    //console.log(2)
    this.onInitData();
  },
  destroyed() {},
  methods: {
    ...mapActions(["findTaskOrgAsyncData", "findSelectUsers"]),
    onInitData() {
      let dprMgrData=this.checkerOrgIdList;
      if(isEmpty(dprMgrData)){
        //初始化小组树
         this.getOrgAsyncDataTree();
      }
    },
    onUserItemClick(value) {
      console.log("onUserItemClick>?????", value);
      let self = this;
      if (this.decisionTransition != "转他人处理") {
        if (value.sendFlag === 2) { //该处理组只允许“组接单”，无需选人！'
          var index = self.checkerUserItem.indexOf(value.id);
          self.checkerUserItem.splice(index, 1); //不被选中
          self.alert('该处理组只允许“组接单”，无需选人！');
        }
      }
    },
    cancelItem(idx) {
      let self = this;
      self.checkerUserItem.splice(idx, 1);
    }, //弹框取消选择项
    checkListItem(item) {
      console.log("点击", item);
      //判断是否组人接单派单标记(0：不接单；1：组/人接单；2：组接单；3：人接单)sendFlag
      this.getOrgAsyncDataTree(item);
      if (item.sendFlag=== 0) {
        //判断是否组人接单派单标记(0：不接单；1：组/人接单；2：组接单；3：人接单)
        //不接单，不做任何处理
        this.alert('抱歉,当前机构不接单');
      }
        //1：组/人接单；2：组接单；3：人接单
        //再请求后台
        let self = this;
        self.checkerUserItem = [];
        if (item.isParent) {
          this.chooseOrgIdList.push(item);
        } else {
          this.chooseOrgIdList = [];
        }

    }, //列表选中
    returnMain() {
      this.checkerOrgIdList = this.OrgList;
      this.showOrgIdList = true;
      this.showUserIdTab = false;
      //          重新获取第一次的列表，并清空已选值
      this.chooseOrgIdList = [];
      this.checkerUserItem = [];
    }, //返回主目录
    returnPrew(item) {
      this.checkerUserItem = [];
      let checker = item.name;
      this.getOrgAsyncDataTree(item);
      //再请求后台
      //      是列表的就获取赋值
      this.showOrgIdList = true;
      this.showUserIdTab = false;
      //console.log("列表选择", item);
      let newOrgIdList = [];
      for (let item of this.chooseOrgIdList) {
        newOrgIdList.push(item);
        if (item.name === checker) {
          break;
        }
      }
      this.chooseOrgIdList = newOrgIdList;
    }, //      是列表的就获取赋值
    returnFrom() {
      this.$emit("hideDepartmentManagementDialog");
    }, //隐藏选人机构页面
    sureSendInfo() {
      let resultContent = [];
      if (this.chooseOrgIdList.length > 0) {
        let item = this.chooseOrgIdList[this.chooseOrgIdList.length - 1];
        console.log("选中的？？？？？？", item);
        if(isEmpty(this.checkerUserItem)){
            this.alert('抱歉,当前处理组没人,不允许选择该处理组！');
        }else if (
          item.org_path_name.indexOf("广东公司/外系统") >= 0 ||
          item.isExistsUser === '1'
        ) { //当前处理组没人时，不允许选择该处理组
          resultContent.push(item);
          let haveCheckerUserList = [];
         for (let User of this.checkerUserItem) {
            this.$set(User, 'userId', User.user_id);
            haveCheckerUserList.push(User.user_id);
          }

          this.$set(resultContent[0], 'haveCheckerUserList', haveCheckerUserList);
          this.$set(resultContent[0], 'userInfo', this.checkerUserItem);
          /*    console.log("返回的信息>>>>>>>", resultContent); */
          this.$emit("sureDprMgrBtn", resultContent);
        } else {
          this.alert('抱歉,当前处理组没人,不允许选择该处理组！');
        }
      }

    },
    async getOrgAsyncDataTree(item) {
      const parms = this.parms;
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          processBaseId: parms.processBaseId,
          processBaseVersion: parms.processBaseVersion,
          activityId: parms.activityId,
          nextActivityId: parms.nextActivityId,
          processDefinitionKey: parms.processDefinitionKey,
          clickOrgIds: parms.clickOrgIds,
          topOrgIds: parms.topOrgIds,
          exclusionOrgNames: parms.exclusionOrgNames,
          applyOrgId: parms.applyOrgId,
          currentDealOrgId: parms.currentDealOrgId,
          businessKey: parms.businessKey,
          businessType: parms.businessType,
          decisionTransition: parms.decisionTransition,
          taskInfoId: parms.taskInfoId,
          parentOrgId: item.org_id
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.findTaskOrgAsyncData(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','获取机构树异常，原因:' + error);
      }
      console.log("获取机构树findTaskOrgAsyncData：",result);
      if (result.meta.success == true) {
        let orgList = result.data.orgList;
        console.log("返回returnMap信息", orgList);
        this.checkerOrgIdList = orgList;
        if (orgList.length > 0) {
          this.showOrgIdList = true;
        }
        this.getToselectUsersTree(item.org_id, item.sendFlag);
      } else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载异步加载机构树异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //选机构树
    async getToselectUsersTree(orgId, sendFlag) {
     let result = {};
     let userId=JSON.parse(this.storejs.get('LoginUserId'));
     try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          orgId: orgId
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.findSelectUsers(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化异步加载机构树异常，原因:' + error);
      }
      console.log("收到异步加载用户信息findSelectUsers：",result);
      if (result.meta.success == true) {
        let defaultSendInfoList = result.data.sendUserList;
        this.checkerUserIdTabList = defaultSendInfoList;
        if (defaultSendInfoList.length > 0) {
          for (let userInfo of this.checkerUserIdTabList) {
            this.$set(userInfo, 'realName', `${userInfo.real_name}`);
            this.$set(userInfo, 'sendFlag', sendFlag);
          }
          this.showUserIdTab = true;
        } else {
          // alert("该组下无处理人员！");
        }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载异步加载机构树异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    } //异步加载用户树
  }
};
</script>
<style lang="less" scoped>

.foot /deep/ .weui-cell_access .weui-cell__ft {
    position: relative!important;
    padding-right: 3.5rem;
    bottom: 1.5rem;
}
.head{
  position: fixed;
  left: 0;
  right: 0;
  height:13rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}

.head {
  top: 0;
}
.foot{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height:4.1rem;
  width: 100%;
  background-color:#ffffff;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 100;
}
.foot{
  bottom:0;
}
/* .foot-style {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  background: #ffffff;
} */
article{
      position: fixed;
      left: 0;
      right: 0;
      top:13rem;
      bottom: 4.1rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
</style>
<style scoped>
.slide {
  overflow: hidden;
  max-height: 0;
  position: absolute;
  top: 134px;
  /* 143 */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  box-sizing: border-box;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
  background-color: rgba(0, 0, 0, 0.2);
}

.animate {
  overflow: visible;
  /* max-height: 9999px; */
  min-height: 9999px;
  display: block;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}

.no-select-li {
  height: 42px;
  background-color: #f7f7f7;
  padding: 0 15px;
  line-height: 49px;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  position: relative;
}

.no-select-li:after {
  content: " ";
  display: inline-block;
  height: 40px;
  width: 6px;
  position: absolute;
  top: 2px;
  left: 0;
  background: #c8c9c9;
}

.no-select-li img {
  padding-right: 10px;
  margin-top: -5px;
  display: inline-block;
  width: 22px;
}

.check-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
  position: relative;
}

.check-item-selected {
  background: #ffffff url("../../../../../../assets/img/cancel.png") no-repeat right bottom;
  background-size: 12%;
  border-color: #3cbed7;
}

.checks-item-selected {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  margin-right: 6px;
  position: relative;
  background: #ffffff url("../../../../../../assets/img/cancel.png") no-repeat right bottom;
  background-size: 12%;
  border: 1px solid #3cbed7;
}

.slidefoot {
  overflow: hidden;
  max-height: 100vh;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 43px;
  box-sizing: border-box;
  display: none;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.animatefoot {
  overflow: visible;
  max-height: 100vh;
  min-height: 100px;
  display: block;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
  z-index: 1000;
}

.pot-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  min-height: 6px;
  padding: 10px;
}

.pot-tom-cancel {
  /*  background-color: rgb(237,237,237); */
  height: 20px;
  position: relative;
}

.pot-tom-cancel img {
  width: 20px;
  position: absolute;
  right: 0px;
  top: 0px;
}



.sure-btn {
  display: inline-block;
  width: 60px;
  height: 42px;
  line-height: 42px;
  background: #23ade5;
  position: absolute;
  right: 0;
  text-align: center;
}

.ellipsy {
  width: 130px !important;
  margin-right: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
