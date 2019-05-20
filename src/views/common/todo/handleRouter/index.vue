<template>
<div class="dealType">
<div class="reset-cell" style="font-size: 1.4rem;height: 100vh;">
  <header class="head">
    <x-header class="reset-header" :left-options="{showBack: showBack,backText: ''}">工单处理方式</x-header>
  </header>
  <main>
    <article>
    <group gutter="0">
      <cell-box is-link v-if="showClaimTask===1" @click.native="handleClaimTas">
        签收
      </cell-box>
      <cell-box is-link v-for="(item,index) in formButtons" :key="index" @click.native="handleSelectRouter(item);">
        {{item.name}}
      </cell-box>
      <cell-box is-link v-if="followBtn===false" @click.native="handleFollow('0');">
        关注
      </cell-box>
      <cell-box is-link v-else-if="followBtn===true" @click.native="handleFollow('1');">
        取消关注
      </cell-box>
      <cell-box is-link v-if="assistInfoBtn===true" @click.native="handleAssistInfo;">
        发起协办
      </cell-box>
      <div v-if="!formButtons">
        <load-more :tip="'正在加载'"></load-more>
      </div>
    </group>
    </article>
  </main>
  <div v-transfer-dom>
    <confirm v-model="showSignInTask" :close-on-confirm="false" title="操作提示" @on-confirm="handleSignInTask">
      <p style="text-align:center;">是否确定签收?</p>
    </confirm>
  </div>
  <div v-transfer-dom>
    <alert v-model="showResult" title="操作结果" :content="resContent" @on-show="onAlertShow" @on-hide="onAlertHide"></alert>
  </div>
  <div v-transfer-dom>
    <confirm v-model="showFollowFlag" show-input :title="'请选择关注分组'" :input-attrs="{type: 'text'}" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
    </confirm>
  </div>
 </div>
</div>
</template>

<script>
//import storejs from 'storejs';
import {
  isEmpty
} from '../../../../utils/common.js'
import {
  mapActions
} from 'vuex';
import {
  Confirm,
  Alert,
  TransferDom,
} from 'vux'
export default {
  name: "dealType",
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Alert,
  },
  data() {
    return {
      formButtons: undefined,//表单按钮
      taskInfoId: '',//任务编号
      showClaimTask: '', //显示签收按钮
      followBtn: false, //关注按钮
      assistInfoBtn: false, //协办按钮
      businessKey: '',//业务主键
      resContent: "",//提示文本
      showSignInTask: false,//显示签收
      showResult: false,
      showFollowFlag: false, //显示关注提示框
      showBack:true,//返回图标
    }
  },
  created() {
    let token= this.$route.query.token;
    if(!isEmpty(token)){
       this.showBack=false;
    }
    let formDataMap=JSON.parse(this.$route.query.formDataMap);
    this.businessKey =formDataMap.businessKey;
    this.taskInfoId = formDataMap.taskInfoId;
    let processKey=formDataMap.processDefinitionKey
    if (processKey == 'requirementClarify' || processKey == 'requirementAnalysis' || processKey == 'executeArrange') {
      this.assistInfoBtn = true;
    }
  },
  mounted() {
     this.initPageData();
  },
  destroyed() {

  },
  computed: {

  },
  methods: {
    ...mapActions([
      'getInitShowBtns',
      'findRouterInfoByTaskInfoId',
      'signInTask',
    ]),
    initPageData(){
        let formDataMap=JSON.parse(this.$route.query.formDataMap);
        let formButtons = formDataMap.taskFormButtons;
        let showClaimTaskFlag = formDataMap.showClaimTaskFlag;
        if (showClaimTaskFlag === 1) {
          this.showClaimTask = showClaimTaskFlag;//签收按钮
        }
        this.formButtons = formButtons;//路由按钮
        console.log("formDataMap>>>>>>>>", formDataMap);
        this.verifyShowFollowBtn();
    },
    async verifyShowFollowBtn() {
      let result = {};
     // alert(111);
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      //let userId=JSON.parse(this.storejs.get('LoginUserId'));
     //  alert(userId);
      try {
        const sendInfo = {
          headers: {
            userId: userId,
          },
          Jsondata: {
          'businessKey': this.businessKey
        }
      };
        result = await this.getInitShowBtns(sendInfo);
      } catch (error) {
        console.error(error);
        this.showToast(false, 'warn', '初始化页面失败，原因:' + error);
      }
      console.log("结果集getInitShowBtns>>>>>>>>", result);
      if (result.meta.success == true) {
        let map = result.data.map;
        let delFlag = map.delFlag;
        if (delFlag === 1) {
          this.followBtn = true;
        } else {
          this.followBtn = false;
        }
      } else {
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn','请求服务失败，原因:' +failDesc+","+ failCaused);
      }
     /*  this.$vux.loading.hide(); */
    }, //是关注或者是非关注
    handleClaimTas() {
      this.showSignInTask = true
    }, //操作关注
    async handleSignInTask() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
        const sendInfo = {
          headers: {
            userId: userId,
          },
          Jsondata: {
          "taskInfoId": this.taskInfoId,
        }
      };
        this.$vux.loading.show({ transition: '', text: '正在处理...' });
         setTimeout(() => {
        this.showSignInTask = false
        this.$vux.loading.hide()
        }, 1000);
        result = await this.signInTask(sendInfo);
      } catch (error) {
        console.error(error);
        this.showToast(false, 'warn', '签收工单异常，原因:' + error);
      }
      console.log("signInTask>>>>>>>>", result);
      if (result.meta.success == true) {
        this.resContent = "签收工单" + this.businessKey + "成功";
        this.showResult = true;
        this.showClaimTask = 0;
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn','签收工单失败，原因:' +failDesc+","+ failCaused);
      }
    }, //签收工单
    handleSelectRouter(formButtons) {
      console.log(formButtons, "handleSelectRouter");
      //弹出窗口路由
       this.enterNextRouter(formButtons)
    }, //操作选的路由
    enterNextRouter(formButtons) {
      let formDataMap=JSON.parse(this.$route.query.formDataMap);
      this.$set(formDataMap, 'taskFormButtons', formButtons);
      this.$router.push({
        name: "handleSubmitTodo",
        query: {
          formDataMap: JSON.stringify(formDataMap),
          token:this.$route.query.token,
        }
      });
    }, //进入下一路由
    handleFollow(data) {
      this.showFollowFlag = true;
      console.log(data, "handleFollow");
      let delFlag; //1:关注 /0:取消关注
      let businessKey = this.businessKey;
      /* 	if($("#gz").text()=="关注"){
      		delFlag=true
      		top.layer.open({
      		type : 2,
      		title : '请选择关注分组',
      		area : [ '50%', '50%' ],
      		content : "${ctxAdmin}/taskInfo/toAttentionGroup?delFlag="+delFlag+"&businessKey="+businessKey,
      		btn:['确定','取消'],
      		yes: function(index, layero){
      		var iframeWin = window[layero.find('iframe')[0]['name']];
      		var attentionGroup = iframeWin.getAttentionGroup();
      		var url = "${ctxAdmin}/taskInfo/doOrCancelAttention?delFlag="+delFlag+"&businessKey="+businessKey+"&attentionGroup="+attentionGroup;
      		doSubmitAttention(url,delFlag,businessKey);
      		   	    layer.close(index);
      		    },
      		    cancel: function(index){

      		        }
      		});
      		return;
      	}else{
      		delFlag=false;
      	}
      	var url = "${ctxAdmin}/taskInfo/doOrCancelAttention?delFlag="+delFlag+"&businessKey="+businessKey;
      	doSubmitAttention(url,delFlag,businessKey) */

    }, //操作关注按钮
    handleAssistInfo() {
      alert('开发中');
      console.log("handleAssistInfo");
    }, //操作协办
  },
}
</script>

<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  height: 4.6rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}

.head {
  top: 0;
}

main{
      position: fixed;
      top:4.6rem;
      bottom: 0rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
/* main {
    position: fixed;
    top: 4.6rem;
    overflow-y: auto;
    height: 100vh;
    width:100%;
    -webkit-overflow-scrolling: touch;
  } */
</style>

