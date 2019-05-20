<template>
<div style="font-size: 1.4rem;background-color: #ffffff;height: 100vh;overflow: auto;margin-bottom: 44px;" class="reset-cell">
  <header style="position: fixed;top: 0;left: 0;right: 0;z-index: 20;">
    <x-header class="reset-header" :left-options="{backText: '返回'}">人员选择</x-header>
    <!--  <div class="header">
      <span @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f14">返回</icon>
            </span>
      <span class="name f15">人员选择</span>
      <span></span>
    </div> -->
    <section class="itmes">
      <x-switch :title="'短信通知'" :value-map="['0', '1']" v-model="SMSValue"></x-switch>
      <x-switch :title="'邮件通知'" :value-map="['Y', 'N']" v-model="emailValue"></x-switch>
      <cell title="处理人员" class="vux-1px-b">
        <x-icon type="ios-plus" class="cell-x-icon" @click="showAddUser = true"></x-icon>
      </cell>
      <!--  <cell title="常用处理人员" class="vux-1px-b">
        <x-icon type="ios-plus" class="cell-x-icon" @click="showAddUser = true"></x-icon>
      </cell> -->
    </section>
  </header>
  <section style="margin-top:180px;position:absolute;left:0;top:0;right:0;margin-bottom:44px;padding-bottom:10px;">
    <div style="border-bottom: 1px solid #e5e5e5;background-color:rgb(237,241,240)" v-for="(item,idx) in selectUserList" :key="idx" :value="item.id">
      <cell :title="item.realName">
        <icon class="el-icon-coral-delete f14" @click="handleActions(item, 'deleteSelectUser')"></icon>
      </cell>
    </div>
  </section>
  <div class="submit">
    <button class="btn btn-full f14"  @click="showSumbitTask=true">提交</button>
  </div>
  <popup v-if="showAddUser" v-model="showAddUser" @on-hide="hideAddOrgOrUser('hide')" @on-show="showAddOrgOrUser('show')" position="right" width="100%">
    <addUser v-on:hideAddUser="returnFrom" v-on:sureSendInfo="sureSendInfo" :nextActivityId="nextActivityId" :router="router" :businessKey="businessKey"></addUser>
  </popup>
  <div v-transfer-dom>
    <confirm v-model="showSumbitTask" :close-on-confirm="false" title="操作提示" @on-confirm="handleCompleteTask">
      <p style="text-align:center;">是否确定提交工单?</p>
    </confirm>
  </div>
  <div v-transfer-dom>
    <alert v-model="showResult" title="操作结果" :content="resContent" @on-show="onAlertShow" @on-hide="onAlertHide"></alert>
  </div>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import {
  XSwitch,
  Group,
  Cell,
  Box,
  Swipeout,
  SwipeoutItem,
  Popup,
  XHeader,
  TransferDom,
  Alert,
  Confirm,
} from 'vux'
import addUser from './addUser'
import {isEmpty} from '../../../../utils/common'
export default {
  name: "",
  directives: {
    TransferDom
  },
  components: {
    XSwitch,
    Group,
    Cell,
    Box,
    Swipeout,
    SwipeoutItem,
    addUser,
    Popup,
    XHeader,
    Alert,
    Confirm,
  },
  data() {
    return {
      SMSValue: '',
      emailValue: '',
      showAddUser: false,
      nextActivityId: '',
      router: '',
      businessKey: '',
      selectUserList: [],
      showSumbitTask: false,
      resContent: "",
      showResult: false,
    }
  },
  created() {
    const {
      nextActivityId,
      router,
      businessKey,
      taskOptions,
    } = this.$route.query;
    this.nextActivityId = nextActivityId;
    this.router = router;
    this.businessKey = businessKey;
  },
  mounted() {

  },
  destroyed() {
  },
  methods: {
    ...mapActions([
      'completeTask',
    ]),
    onAlertHide() {
      console.log('on hide')
      this.$router.push({
        name: "main",
        query: {}
      });
    },
    onAlertShow() {
      console.log('on show')
    },
    async handleCompleteTask() {
      const {
        nextActivityId,
        router,
        businessKey,
        taskOptions,
        taskInfoId,
        processKey,
      } = this.$route.query;
      let userList = [];
      let orgIdList = [];
      let index = 0;
      for (let item of this.selectUserList) {
        userList.push(item.userId);
        if (index == 0) {
          orgIdList.push(item.orgId);
        } else if (orgIdList.indexOf(item.orgId) < -1) { //则不包含该元素
          orgIdList.push(item.orgId);
        }
        index++;
      }
      if(isEmpty(userList)){
        this.$vux.toast.show({
          type: 'warn',
          text: '派往机构或人员不能为空'
        });
         return false;
      }
      const sendInfo = {
        headers: {
          userId: this.storejs.get('LoginUserId'),
        },
        Jsondata: {
          'taskInfoId': taskInfoId,
          'dealOpinion': taskOptions,
          'decisionTransition': this.router,
          'nextActivityId': this.nextActivityId,
          'dealOrgId': orgIdList,
          'dealUserId': userList,
          /* 'dealUserId': JSON.stringify(userList), */
          'businessKey': this.businessKey,
          'processDefinitionKey': processKey,
        }
      };
      this.$vux.loading.show({
        text: '努力加载中...'
      });
      const result = await this.completeTask(sendInfo);
      console.log(result);
      this.$vux.loading.hide();
      if (result.meta.success == true) {
        this.resContent = "提交工单" + result.data.returnMap.businessKey+ "成功";
        this.showResult = true;
      }else{
         this.resContent = "提交工单" + this.businessKey+ "失败，原因"+result.data.returnMap.errorMsg;
         this.showResult = true;
      }
    },
    hideAddOrgOrUser(str) {
      console.log(str)
    },
    showAddOrgOrUser(str) {
      console.log(str)
    },
    onButtonClick(type) {
      alert('on button click ' + type)
    },
    returnFrom() {
      this.showAddUser = false;
    },
    sureSendInfo(value) {
      this.showAddUser = false;
      this.selectUserList = value;
      console.log('event:', value)

    },
    handleActions(item, actionType) {
      switch (actionType) {
        case 'deleteSelectUser':
          let newUserList = [];
          for (let userInfo of this.selectUserList) {
            if (userInfo.userId === item.userId) {
              //console.log(userInfo.userId);
              continue;
            } else {
              newUserList.push(userInfo);
            }
          }
          this.selectUserList = newUserList;
          console.log("删除人员", newUserList);
          break;
        case 'submitTaskIOrder':

          ;
          break;
        default:
          break;
      }
    },
  },
}
</script>

<style lang="less" scoped>
.vux-header.reset-header {
  background-color: rgb(76, 130, 193) !important;
}

.vux-header-left {
  background-color: #fff !important;
}

.demo-content {
  padding: 10px 10px;
}

.header {
  width: 100%;
  height: 4.5rem;
  line-height: 4.5rem;
  background-color: rgb(76, 130, 193);
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  opacity: 1;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  .name {
    span {
      color: #fff;
    }
  }
}

.cell-x-icon {
  display: block;
  fill: rgb(76, 130, 193);
}

.submit {
  width: 100%;
  padding: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 100;

  .btn {
    background-color: rgb(76, 130, 193);
    height: 4.3rem;
    color: #fff;
    width: 35.5rem !important;
    z-index: 100;
  }

}

.itmes {
  width: 100%;
  position: fixed !important;
  left: 0px;
  top: 45px;
  z-index: 200;
  //padding: 45px 5px 5px 5px;
  background-color: #fff;
}

.user-lists {
  position: absolute;
  top: 190px;
  left: 0;
  right: 0;
  z-index: 1;
  padding-bottom: 50px;
}
</style>
