<template>
<div class="HandlingOpinions">
  <div class="reset-cell" style="font-size: 1.4rem;background-color:rgb(242,243,238);height: 100vh;">
     <header class="head">
      <x-header class="reset-header" :left-options="{showBack:showBack,backText: ''}">工单处理</x-header>
    </header>
        <article>
   <!--  <article style="position:absolute;top: 4.4rem;left: 0;right: 0;padding-bottom:4.6rem"> -->
       <div id="appendTbody">
        <satisfaction-degree   v-if="showAppendTbody==true"
          :businessKey="preStepEventForm.businessKey"
          :businessType="preStepEventForm.businessType"
          :currentTaskInfoId="preStepEventForm.taskInfoId"
          :currentTaskName="preStepEventForm.currentTaskName"
          :contentTemplateIndex="preStepEventForm.contentTemplateIndex"
          :causeOfFailureTree="preStepEventForm.causeOfFailureTree"
          :currentDealOrgId="preStepEventForm.currentDealOrgId"
          :isPreDeal="preStepEventForm.isPreDeal"
          @selectCaseOfFailureItem="handleSelectCaseOfFailureItem"
          @changeSatisfiedOptions="handleChangeSatisfiedOptions"
          v-model="notSatisfyReason"
         @changeOnLineIssueOptions="handleChangeOnLineIssueOptions"
         @changeRelatedEventsOptions="handleChangeRelatedEventsOptions"
         @blurRelatedEventsDesc="handleBlurRelatedEventsDesc"
         @changeIsPreDealOptions="handleChangeIsPreDealOptions"
         @changePreDealContOptions="handleChangePreDealContOptions"
          >
          </satisfaction-degree>
      </div>
       <group :gutter="10" >
			<cell
				:title="('签写意见')"
				is-link
				:border-intent="false"
				:arrow-direction="showSuggested ? 'up' : 'down'"
				@click.native="showSuggested = !showSuggested">
         <img style="display: inline-block;width: 20px;" src="../../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showSuggested?'animate':''">
          <section style="padding:0.5px 10px; background-color: rgb(242,243,238);">
            <aside style="background-color: #ffffff;margin-top:10px;">
              <cell title="常用意见">
                <img class="img-icon" src="../../../../../../assets/images/icon/msg.svg" slot="icon">
                <x-icon type="ios-arrow-down" class="cell-x-icon" @click="showOptionPopup=true"></x-icon>
              </cell>
              <div v-transfer-dom>
                <popup v-model="showOptionPopup">
                  <popup-header :left-text="'取消'" :right-text="'确定'" :title="'常用意见'" :show-bottom-border="false" @on-click-left="showOptionPopup = false" @on-click-right="showOptionPopup = false"></popup-header>
                  <group gutter="0" class="reset-pop">
                    <radio :options="opinionRadio" v-model="dealOpinion"></radio>
                  </group>
                </popup>
              </div>
            </aside>
            <aside style="margin-top:20px;">
              <textarea id="taskOptions" name="taskOptions" v-model="dealOpinion" maxlength="200" rows="6" style="text-indent:2em;font-size:16px;background-color: #ffffff;height:100%;width:100%;" placeholder="请输入内容(最多200字符)"></textarea>
            </aside>
          </section>
         </p>
	   	</group>
     </article>
    <footer class="foot">
      <x-button type="primary"  @click.native="handleCompleteTask()" action-type="button" style="background-color:#1B82D1">提交</x-button>
    </footer>
  </div>

  </div>
</template>
<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  height:4.6rem;
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
  height:4.3rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}
.foot{
  bottom:0;
}
article{
      position: fixed;
      top:4.6rem;
      bottom: 4.3rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
</style>
<script>
import SatisfactionDegree from '../commom/SatisfactionDegree'
import {
  mapActions,
  mapState,
  mapGetters,
  mapMutations
} from 'vuex';
import {
  TransferDom,
  Radio,
  PopupHeader,
  Popup,
  XSwitch,
} from "vux";

//import _ from "lodash";
import {isEmpty} from "../../../../../../utils/common.js";
export default {
  name: "HandlingOpinions",
  components: {
    PopupHeader,
    Radio,
    Popup,
    XSwitch,
    SatisfactionDegree
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      preStepEventForm: [], //上一步表单内容
      showSuggested: true, //是否展开折叠意见信息
      opinionRadio: ["同意", "不同意"],//加载常用意见列表
      showOptionPopup: false, //显示常用意见开关
      showAppendTbody:false,//显示异步加载的DIV
      dealOpinion: "", //处理意见
      satisfactionTaskInfoId: "", //上一环节满意度
      satisfactionValue: "", //满意度评价值
      notSatisfyReason: "", //满意度评价不满意原因
      isEditionCauseProblems:"",//是否版本上线引发问题
      isMajorBatchEvent:"",//是否关联重大事件/批量事件
      majorBatchEventExplain:"",//重大事件/批量事件说明
      isPreDeal:"",//是否预处理（1：是；0：否）
      preDealCont:"",//预处理内容
      selectRoutebtnValue:[],//选择的路由
      caseOfFailureValue:'',//故障原因值
      showBack:true,//返回图标
    };
  },
  created: function() {
    let token=this.$route.query.token;
    if(!isEmpty(token)){
       this.showBack=false;
    }
    console.log("进来了",this.$route.query);
    this.preStepEventForm =JSON.parse(this.$route.query.preStepEventForm);
     console.log("进来了 this.preStepEventForm", this.preStepEventForm);
    this.selectRoutebtnValue = JSON.parse(this.$route.query.selectRoutebtnValue);

  },
  mounted: function() {
    //只执行一次
    this.initPageData();
    //console.log(2)
  },
  destroyed() {},
  filters: {},
  methods: {
    ...mapActions([
      "getCommonOpinionByBusinessKey",
      "saveTaskInfoFrom"
    ]),
    initPageData(){
      //初始化常用意见
      this.loadCommonOpinionRadio();
      //初始化动态模板
      this.showAppendTbody=true;
    }, //初始化页面数据
     async loadCommonOpinionRadio() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
     try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          businessKey:this.preStepEventForm.businessKey
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.getCommonOpinionByBusinessKey(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化加载常用意见异常，原因:' + error);
      }
      console.log("加载常用意getCommonOpinionByBusinessKey：",result);
      //获取常用意见
      if (result.meta.success == true) {
        const comOpinionList = result.data.commonOpinionList;
        if (comOpinionList.length > 0) {
          for (let item of comOpinionList) {
            this.opinionRadio = this.opinionRadio.concat(item.opinionContent);
          }
        }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"初始化加载常用意见失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    },
     /**预处理 */
    handleChangeIsPreDealOptions(isPreDeal){
      this.isPreDeal = JSON.parse(JSON.stringify(isPreDeal))
      console.log("是否预处理：this.isPreDeal",this.isPreDeal)
    },//是否预处理

    handleChangePreDealContOptions(preDealCont){
        this.preDealCont = JSON.parse(JSON.stringify(preDealCont))
        console.log("预处理内容：this.preDealCont",this.preDealCont)
    },//预处理内容
     /**引发问题 */
      handleChangeOnLineIssueOptions(isEditionCauseProblems){
          this.isEditionCauseProblems=isEditionCauseProblems;
          console.log("是否版本上线引发问题：isEditionCauseProblems",isEditionCauseProblems)
      },//是否版本上线引发问题
      handleChangeRelatedEventsOptions(isMajorBatchEvent){
          this.isMajorBatchEvent=isMajorBatchEvent;
          console.log("是否关联重大事件/批量事件:isMajorBatchEvent",isMajorBatchEvent)
      },//是否关联重大事件/批量事件的值
      handleBlurRelatedEventsDesc(majorBatchEventExplain){
          this.majorBatchEventExplain=majorBatchEventExplain;
          console.log("重大事件/批量事件说明的值：majorBatchEventExplain",majorBatchEventExplain)
      },//重大事件/批量事件说明的值
       /**故障原因 */
      handleSelectCaseOfFailureItem(caseOfFailureValue){
          this.caseOfFailureValue=caseOfFailureValue[0].id;
          console.log("故障原因：caseOfFailureValue", this.caseOfFailureValue)
      },//故障原因的值
      /**满意度评价 */
      handleChangeSatisfiedOptions(satisfiedOptionValue){
          this.satisfactionValue=satisfiedOptionValue;
          console.log("满意度评价：satisfiedOptionValue",satisfiedOptionValue)
      },//满意度评价的值

    handleCompleteTask() {
      if (!this.validSaveTask()) {
        return;
      }
      let self = this;
      this.confirm({
        title: "提示",
        content: "确定要提交表单内容",
        onConfirm() {
          self.runSaveTaskInfoApi();
        }
      });
    },
    runSaveTaskInfoApi() {
      if (!this.validSaveTask()) {
        return;
      }
      let self = this;
      this.confirm({
        title: "提示",
        content: "确定要提交表单内容",
        onConfirm() {
          self.runSaveTaskInfoApi();
        }
      });
    },
    async runSaveTaskInfoApi() {
      let selectRoutebtnValue = this.selectRoutebtnValue;
      let formDataStr=this.$route.query.formDataStr;
      console.log("formDataStr"+formDataStr);
      let formData=JSON.parse(formDataStr.replace(/\n/g,"\\n").replace(/\r/g,"\\r"));
       let satisfaction="";
       let satisfactionTaskInfoId="";
      // JSON.parse(JSON.stringify(this.satisfiedOptions[satisfyOption-1]))
      if(!isEmpty(this.satisfactionValue)){
          console.log("满意度",this.satisfactionValue);
         let satisfactionObj= this.satisfactionValue;
         console.log("满意度",satisfactionObj);
         satisfaction=satisfactionObj.key;
         satisfactionTaskInfoId=satisfactionObj.lastTaskInfo.task_info_id;
      }
      let assigneeUserId=[];
      if(!isEmpty(this.preStepEventForm.assigneeUserId)){
          assigneeUserId=JSON.parse(this.preStepEventForm.assigneeUserId);
      }
      console.log("assigneeUserId",assigneeUserId)
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          autoCompleteFirstTask: false,
          satisfaction: satisfaction,
          satisfactionTaskInfoId: satisfactionTaskInfoId, //上一环节满意°任务编号
          satisfactionEvaluation: this.notSatisfyReason,
          dealOpinion: this.dealOpinion,

          formData:formData,
          dealOrgId: this.preStepEventForm.dealOrgId,
          othersystemBillType:formData.othersystemBillType,
          processDefinitionKey: this.preStepEventForm.processDefinitionKey,
          businessKey: this.preStepEventForm.businessKey,
          taskInfoId: this.preStepEventForm.taskInfoId,
          assigneeUserId:assigneeUserId,
          currentTaskName: this.preStepEventForm.currentTaskName,
          applyOrgId: this.preStepEventForm.applyOrgId,

          selectRoutebtnValue: selectRoutebtnValue, //路由信息
          nextActivityId: selectRoutebtnValue.nextActivityId,//下一环节
          decisionTransition: selectRoutebtnValue.decisionTransition,//路由

          isEditionCauseProblems:this.isEditionCauseProblems,//是否版本上线引发问题
          isMajorBatchEvent:this.isMajorBatchEvent,//是否关联重大事件/批量事件
          majorBatchEventExplain:this.majorBatchEventExplain,//重大事件/批量事件说明
          isPreDeal:this.isPreDeal,//是否预处理（1：是；0：否）
          preDealCont:this.preDealCont,//预处理内容
          causeOfFailure:this.caseOfFailureValue,//故障原因
        }
      };
      this.saveTaskEnabled = false;
      this.$vux.loading.show({ transition: '', text: '正在提交处理工单，请稍后...' });
      result = await this.saveTaskInfoFrom(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','处理工单异常，原因:' + error);
      }
      console.log("处理工单saveTaskInfoFrom：",result);
      this.saveTaskEnabled = true;
      if (result.meta.success == true) {
        let token=this.$route.query.token;
        this.showResTaskMsg = true;
        let message = result.data.successMsg;
        //跳转到成功页面
          let code=result.meta.code;
					let icon = "";
          let buttons = [];
          if(code===1001){
              icon = "info";
              if(isEmpty(token)){
                	buttons = [{
								show: true,
								type: 'primary',
								text: '返回登陆',
								link: {
									name: 'login',
									query: {}
								}
              }];
              }
            if(!isEmpty(message)) {
            this.$router.push({
              name: 'resultPage',
              query: {
                description: message,
                title: '处理结果',
                icon: icon,
                buttons: JSON.stringify(buttons),
              }
            });
          }
          }else if(code===1008){
              this.showToast(false,'success',message);
          }else{
          icon = "success"
          if(isEmpty(token)){
             buttons = [{
            show: true,
            type: 'primary',
            text: '返回任务列表',
            link: {
              name: 'todoLists',
              query: {
                type: 'person',
              }
            }
          }, {
            show: true,
            type: 'default',
            text: '回到首页',
            link: {
              name: 'main',
              query: {}
            }
          }];
          }
           if(!isEmpty(message)) {
            this.$router.push({
              name: 'resultPage',
              query: {
                description: message,
                title: '处理结果',
                icon: icon,
                buttons: JSON.stringify(buttons),
              }
            });
          }
          }
      } else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"处理工单失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    },
    validSaveTask() {
      let selectRoutebtnValue = this.selectRoutebtnValue;
      //满意度信息校验
       let satisfaction="";
       let satisfactionTaskInfoId="";
       let satisfactionObj= this.satisfactionValue;
      let contentTemplateId=selectRoutebtnValue.contentTemplateId;
        //初始化满意度评价
      if (contentTemplateId ==="contentTemplateId_satisfaction" && isEmpty(satisfactionObj)) {
        this.showToast(false, "warn", "满意度评价不能为空,请选择！");
        return false;
      } else {
         satisfaction=satisfactionObj.key;
        if (this.satisfaction === "4" || this.satisfaction === "5") {
          if (isEmpty(this.notSatisfyReason)) {
            this.showToast(false, "warn", "不满意原因不能为空,请输入！");
            return false;
          }
        }
      }
       let causeOfFailureTree=this.preStepEventForm.causeOfFailureTree;
        if (!isEmpty(causeOfFailureTree)) {//故障原因数
         if (isEmpty(this.caseOfFailureValue)) {
            this.showToast(false, "warn", "故障原因不能为空,请选择！");
            return false;
          }
        }
     /*   if (this.showPreDealDiv) {//预处理
            if (isEmpty(this.preDealCont)) {
            this.showToast(false, "warn", "预处理内容不能为空,请输入！");
            return false;
           }
        } */
      //意见信息校验
      if (isEmpty(this.dealOpinion)) {
        this.showToast(false, "warn", "处理意见不能为空，请输入！");
        return false;
      }
     let beforeConfirmOfDialogYes=selectRoutebtnValue.beforeConfirmOfDialogYes;
     if(!isEmpty(beforeConfirmOfDialogYes)){
        let self=this;
        this.confirm({
        title: "提示",
        content: "温馨提示：高额预警事件单不允许退回工单申告环节，请重新选择!",
        onConfirm() {
           self.$router.go(-1);
        }
      });
       return false;
     }
      return true;
    },

  }
};
</script>

<style lang="less" scoped>

.content{
  padding:10 0rem;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
/* .slide {
  padding: 0 2rem;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
} */
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
/* .span-font{
  font-family: '黑体';
  color: black;
} */
.groupContent /deep/ .weui-cells:before {
    border-bottom: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cells:after {
    border-bottom: 0px solid #D9D9D9 !important;
}
/* .groupContent /deep/ .weui-cell:before{
  border-top: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cell:after{
  border-top: 0px solid #D9D9D9 !important;
} */



.cell-x-icon {
  display: block;
  float: left;
  text-align: left;
  fill: #1B82D1;
  margin-right: 5px;
}

.img-icon {
  /*  padding-right: 10px; */
  /* margin-top: -5px; */
  /*  display:block; */
  margin-right: 5px;
  display: inline-block;
  width: 22px;
}

.checker-item {
  width: 110px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: rgb(237, 241, 240);
  margin: 3px 3px;
}

.checker-item-selected {
  background: #ffffff
    url("../../../../../../assets/images/checker/checked_active.svg") no-repeat
    right bottom;
  border-color: #1296db;
}
</style>
