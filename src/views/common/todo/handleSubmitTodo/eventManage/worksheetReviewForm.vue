<template>
<div class="worksheetReviewForm">
 <div class="reset-cell">
    <header class="head">
      <x-header class="reset-header" :left-options="{showBack: showBack,backText: ''}">回复:{{dealEventForm.currentTaskName}}</x-header>
    </header>
    <main>
    <article>
      <group :gutter="10" >
			<cell
				:title="('路由选择')"
				is-link
				:border-intent="false"
				:arrow-direction="showRouter ? 'up' : 'down'"
				@click.native="showRouter = !showRouter">
         <img style="display: inline-block;width: 20px;" src="../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showRouter?'animate':''">
				<group class="groupContent" :gutter="0" label-width="5em" label-align="right" label-margin-right="1.0rem" >
          <checklist :label-position="'right'" required :options="routerBtnRadioList" v-model="defaulRouteBtn" :max="1" @on-change="routerBtnChange">
          </checklist>
      	</group>
        </p>
	   	</group>
     <group :gutter="10" v-show="showSendDiv">
			<cell
				:title="('派往')"
				is-link
				:border-intent="false"
				:arrow-direction="showSendOrgAndUser ? 'up' : 'down'"
				@click.native="showSendOrgAndUser = !showSendOrgAndUser">
         <img style="display: inline-block;width: 20px;" src="../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showSendOrgAndUser?'animate':''">
            <group gutter="0" v-show="showAddSelectSend">
            <cell title="部门">
              <x-icon type="ios-plus" class="cell-x-icon" @click="showDepartmentManagement = true"></x-icon>
            </cell>
            <cell is-link @click.native="showComGroupTree = true">
              <span slot="title" style="vertical-align:middle;">常用小组
              </span>
            </cell>
            </group>
            <group class="groupContent" :gutter="0">
            <div v-for="(selectedSend,idx) in selectedSendList" :key="idx">
              <div style="background-color: #ffffff;padding: 0.5rem 1.5rem;line-height: 2.5rem;">
                <span  style="color:blue;" v-html="selectedSend.orgPathName">
                  <span v-if="deleteIconFlag===true" @click="handleActions(selectedSend, 'deleteSelectOrg')"><img class="img-icon" src="../../../../../assets/images/icon/delete.svg" slot="icon"></span>
                </span>
              </div>
              <div style="position:relative;left:0;top:0;right:0;color:blue;">
                 <div>
                <!-- <div style="border-bottom: 1px solid #e5e5e5;background-color:#fff"> -->
                  <checker v-model="haveCheckerUserList" type="checkbox" default-item-class="checker-item" selected-item-class="checker-item-selected">
                    <checker-item v-for="(item,idx) in selectedSend.userInfo" :key="idx" :value="item.userId">{{item.realName}}</checker-item>
                  </checker>
                </div>
              </div>
            </div>
            </group>
        </p>
	   	</group>
    </article>
     <footer class="foot">
      <x-button type="primary"  @click.native="handleWorkOrderTaskClick()" action-type="button" style="background-color:#1B82D1">下一步</x-button>
     </footer>
    </main>
    <!--显示部门管理-->
      <popup v-if="showDepartmentManagement" v-model="showDepartmentManagement" @on-hide="hideAddOrgOrUser('hide')" @on-show="showAddOrgOrUser('show')" position="right" width="100%">
        <send-info-dialog v-on:hideDepartmentManagementDialog="closeDepartmentManagementDialog" :parms="dprMarEntryParameter" :decisionTransition="dealEventForm.decisionTransition" :OrgList="openDialogOrgList" v-on:sureDprMgrBtn="sureDprMgrBtn"></send-info-dialog>
      </popup>
      <!--显示常用小组-->
      <popup v-if="showComGroupTree" v-model="showComGroupTree" @on-hide="hideComGroupTree('hide')" @on-show="showComGroupTree('show')" position="right" width="100%">
        <common-group-tree v-on:hideComGroupTreeDialog="closeComGroupTreeDialog" :activityId="dealEventForm.activityId" :processDefinitionKey="dealEventForm.processDefinitionKey" :decisionTransition="dealEventForm.decisionTransition" v-on:sureComGroupTreeBtn="sureComGroupTreeBtn"></common-group-tree>
      </popup>
  </div>
</div>

</template>
<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  right: 0;
  height:4.6rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 20;
}

.head {
  top: 0;
}
.foot{
  position: fixed;
  left: 0;
  right: 0;
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
      left: 0;
      right: 0;
      top:4.6rem;
      bottom: 4.3rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }

</style>
<script>
import {
  mapActions,
  mapState,
  mapGetters,
  mapMutations
} from 'vuex';
import {
  TransferDom,
  Checklist,
  Checker,
  CheckerItem,
  Popup,
} from "vux";
import SendInfoDialog from "./commom/SendInfoDialog";
import CommonGroupTree from "./commom/CommonGroupTree";
import {isEmpty} from "../../../../../utils/common.js";
export default {
  name: "worksheetReviewForm",
  components: {
    Checklist,
    Checker,
    CheckerItem,
    Popup,
    SendInfoDialog,
    CommonGroupTree,
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      currentTaskName:"",//顶部标题
      showRouter: true, //是否展开折叠路由信息
      routerBtnRadioList:  [], //路由列表按钮信息
      defaulRouteBtn: "", //默认选中的路由按钮信息
      showSendOrgAndUser: true, //是否展开折叠派往的机构或人员信息
      showAddSelectSend: true, //是否显示增加处理人员按钮
      showSendDiv: true, //是否显示派往DIV
      //hiddenRouteButton: "", //隐藏路由按钮
      selectedSendList:  [], //选中派往信息
      dprMarEntryParameter:  [],//部门管理入参
      showDepartmentManagement: false, //显示部门管理窗口
      openDialogOrgList:  [], //打开部门管理初始化机构值
      haveCheckerUserList:  [],//已经选中要派往待办的用户
      deleteIconFlag: undefined, //是否显示删除机构标识
      showComGroupTree: false, //是否显示常用小组树
       dealEventForm: {
      activityId:"",//当前环节
      processBaseId:'',
      processBaseVersion:'',
      processDefinitionKey:"",//流程定义key
      businessKey:"",
      taskInfoId:"",
      currentTaskName:"",
      applyOrgId:"",
      businessType:'',//业务类型
      currentDealOrgId:'',//当前处理组
      currentDealUserId:'',//当前处理人
      othersystemBillType:'',//外系统工单类型

      nextActivityId:'',//下一环节ID
      decisionTransition:"",//路由
      assigneeUserId:"",
      isPreDeal:'',
      causeOfFailureTree:'',//失败原因树
      dealOrgId:'',//派往的处理组
      contentTemplateId:'',
      },//处理事件表单内容
      selectRoutebtnValue: "", //选中路由按钮路由信息
      showBack:true,//返回图标
    };
  },
  created: function() {
   let token=this.$route.query.token;
    if(!isEmpty(token)){
      this.showBack=false;
    }
    console.log("回复分公司",this.$route.query);
    let formDataMap=JSON.parse(this.$route.query.formDataMap);
    Object.assign(this.dealEventForm, {
              processBaseId:formDataMap.processBaseId,
              processBaseVersion:formDataMap.processBaseVersion,
              processDefinitionKey:formDataMap.processDefinitionKey,
              businessKey:formDataMap.businessKey,
              taskInfoId:formDataMap.taskInfoId,
              currentTaskName:formDataMap.currentTaskName,
              applyOrgId:formDataMap.mapApp.applyOrgId,
              businessType:formDataMap.mapApp.businessType,
              currentDealOrgId:formDataMap.taskLinkInfoVo.dealOrgId,
              currentDealUserId:formDataMap.currentUserId,
              activityId:formDataMap.activityId,
              othersystemBillType:formDataMap.mapApp.othersystemBillType,
          });
    console.log("formDataMap",formDataMap);
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
      "executionHideRouteFlowRulesXunit",
      "findOpenRouteButtons",
      "selectDefualtOrgUsers",
      "findSelectUsers",
      "findTaskOrgAsyncData",
    ]),
    handleWorkOrderTaskClick(){
       //派往信息校验
        if(this.showSendDiv){
          if (isEmpty(this.selectedSendList)) {
            this.showToast(false, "warn", "派往机构或人员不能为空!");
            return false;
          }
          if (!isEmpty(this.selectedSendList)) {
            this.dealEventForm.assigneeUserId=JSON.stringify(this.haveCheckerUserList);
          }
        }
        let formDataMap=JSON.parse(this.$route.query.formDataMap);
       console.log("formData111111111111111111",formDataMap);
       if (!isEmpty(this.dealEventForm)) {
            let dealOrgId = [];
            for (let send of  this.selectedSendList) {
                console.log("88888888888888提交了",send);
                if(dealOrgId.indexOf(send.orgId)==-1){//未找到则返回 -1。
                  dealOrgId.push(send.orgId);
                }
              }
            this.dealEventForm.dealOrgId=dealOrgId;
            let preStepEventForm=JSON.stringify(this.dealEventForm);
           console.log("this.preStepEventForm>>>>>>>下一步",this.preStepEventForm);
           let selectRoutebtnValue=JSON.stringify(this.selectRoutebtnValue);
            this.$router.push({
            name: "handlingEventOpinions",
            query: {
              formDataMap:JSON.stringify(formDataMap),
              preStepEventForm:preStepEventForm,
              token:this.$route.query.token,
            }
        });
       }

    },//下一步操作
     initPageData(){
      /*
      formButtons{
      name	是	String
      beforeOnclick	否	String	点击操作按钮前执行事件
      onclick	否	String	点击操作按钮触发事件，为空时，默认触发打开选人窗口
      initDialogSuccess	否	String	初始化完成选人窗口执行的方法
      defaultFirstSelected	否	String	是否默认选中第一个路由	1：是；0：否（默认0）
      hiddenRouteButton	否	String	打开窗口，需要隐藏的路由	一般配合beforeOnclick函数使用，$(“#hiddenRouteButton”).val(“”)
      routeButtons	是	JSON	弹出窗口路由}
       */
      let formDataMap=JSON.parse(this.$route.query.formDataMap);
      let formButtons = formDataMap.taskFormButtons;
      console.log("1111111111111111",formButtons);
      let name = formButtons.name;
      let beforeOnclick = formButtons.beforeOnclick;
      let onclick = formButtons.onclick;
      let initDialogSuccess = formButtons.initDialogSuccess;
      let defaultFirstSelected = formButtons.defaultFirstSelected;
      let routeButtons = formButtons.routeButtons; //是	JSON	弹出窗口路由
      if (!isEmpty(beforeOnclick)) {
        if (beforeOnclick === "f_beforeOpenDialog") {
          this.f_beforeOpenDialog();
        } else if (beforeOnclick === "f_beforeOpenDialog_exit") {
          this.f_beforeOpenDialog_exit();
        }
      } else if (isEmpty(onclick)) {
        //alert("点击操作按钮触发事件，为空时，默认触发打开选人窗口");
        this.getOpenRouteButtons("");
      }
      //路由规则
      console.log("任务分配前置规则 (下一环节)-派往", formButtons);
    }, //初始化页面数据
    async f_beforeOpenDialog() {
      let formDataMap=JSON.parse(this.$route.query.formDataMap);
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          operType: "屏蔽路由",
          formDataMap: formDataMap,
          // mobileType: String(this.phoneTpye())
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.executionHideRouteFlowRulesXunit(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        this.alert(error);
        this.showToast(false,'warn','请求隐藏路由规则异常，原因:' + error);
      }
      console.log("提交屏蔽路由规则executionHideRouteFlowRulesXunit：",result);
      if (result.meta.success == true) {
        let data = result.data.returnMap;
        let othersystemBillType=this.dealEventForm.othersystemBillType;
        //alert(othersystemBillType);
        let hiddenRouteButton="";
        let routeType=data.routeType===null?"":data.routeType;
          if(othersystemBillType=="HF"){
              //高额预警单
              //3区县分公司，2，市级分公司 1 省公司
              if(routeType!="1"){
                  hiddenRouteButton="回复分公司";
              }else{
                  hiddenRouteButton="通过";
              }
          }else{//原来逻辑
              if(data.showReportRoute1=="1"){
                  hiddenRouteButton="通过";
              }else{
                  hiddenRouteButton="回复分公司";
              }
          }
        console.log("隐藏的路由hiddenRouteButton", hiddenRouteButton);
        //第二
         this.getOpenRouteButtons(hiddenRouteButton);
      } else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"请求隐藏路由规则失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //提交隐藏路由信息
   async f_beforeOpenDialog_exit() {
      let result = {};
      let formDataMap=JSON.parse(this.$route.query.formDataMap);
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          operType: "屏蔽路由",
          formDataMap: formDataMap,
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.executionHideRouteFlowRulesXunit(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        this.alert(error);
        this.showToast(false,'warn','请求隐藏路由规则异常，原因:' + error);
      }
      console.log("退回路由规则executionHideRouteFlowRulesXunit：",result);
      if (result.meta.success == true) {
        let data = result.data.returnMap;
        let hiddenRouteButton="";
        if(data.showReportRoute!="1"&&data.showReportRoute3=="0"){
            	 hiddenRouteButton="退回上报,上报（省）";
            	//$("#hiddenRouteButton").val("退回上报");
            	} else{
            		hiddenRouteButton="退回上报,一线处理";
            	}
        console.log("隐藏的路由hiddenRouteButton", hiddenRouteButton);
          //第二
         this.getOpenRouteButtons(hiddenRouteButton);
     }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"请求隐藏路由规则失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //退回隐藏路由信息
    async getOpenRouteButtons(hiddenRouteButton) {
      console.log("父级页面是hiddenRouteButton", hiddenRouteButton);
      let formDataMap=JSON.parse(this.$route.query.formDataMap);
      let formButtons = formDataMap.taskFormButtons;
      let defaultFirstSelected = formButtons.defaultFirstSelected;
      let routeButtons = formButtons.routeButtons; //是	JSON	弹出窗口路由
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          routeButtons: routeButtons,
          hiddenRouteButton: hiddenRouteButton
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.findOpenRouteButtons(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化页面异常，原因:' + error);
      }
      console.log("收到路由信息findOpenRouteButtons：",result);
      if (result.meta.success == true) {
        let resRouter = result.data.routeButtonsMapList;
        console.log("返回resRouter信息", resRouter);
        if (isEmpty(defaultFirstSelected)) {
          this.defaulRouteBtn = [resRouter[0].key]; //默认选中第一个
        } else {
          let index = Number(defaultFirstSelected) - 1;
          console.log("Number", index);
          this.defaulRouteBtn = [resRouter[index].key]; //默认选中第一个
        }
        this.routerBtnRadioList = resRouter;
        //contentTemplateId
      } else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载页面异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //初始化路由按钮

    routerBtnChange(val, label) {
       let key = val;
      if (!isEmpty(key)) {
         let selectRoutebtnValue = this.routerBtnRadioList[key - 1].item;
         this.selectRoutebtnValue = selectRoutebtnValue;
        console.log("路由列表信息改变的key", selectRoutebtnValue);
           /*
      routeButtons.name 是 String 路由名称
     routeButtons.decisionTransition 是 String 路由（ 提交给引擎用）
     routeButtons.nextActivityId 是 String 下一环节
     routeButtons.jumpToActivity 否 String 是否自由跳转 1： 是； 0： 否
     routeButtons.contentTemplateId 否 String 点击路由， 必填的表单个性字段,
     多个模板用英文逗号隔开
     routeButtons.js 否 String 点击本路由时， 需加载的src\ main\ webapp\ static - resources\ js\ 目录下的个性js文件,
     多个js用英文逗号隔开
     routeButtons.onLoadJsSuccess 否 String 加载完个性js文件后， 需执行的js里面的函数方法
     routeButtons.hiddenRouteOperbutton 否 String 是否屏蔽路由右侧的操作按钮 1： 是； 0： 否
     routeButtons.hiddenSendInfoMark 否 String 是否隐藏派往路径信息 1： 是； 0： 否
     routeButtons.countersign 否 String 是否会签任务 1： 是； 0： 否
     routeButtons.afterOnclick 否 String 点击路由后触发的事件
     routeButtons.beforeConfirmOfDialogYes 否 String 点击弹出窗口确定按钮时触发事件 返回值： true: 确认提交； false: 不能提交 */
          let decisionTransition=selectRoutebtnValue.decisionTransition;
          let contentTemplateId=selectRoutebtnValue.contentTemplateId;
          let nextActivityId=selectRoutebtnValue.nextActivityId;
          Object.assign(this.dealEventForm, selectRoutebtnValue);
           //加载模板
         /*  if (contentTemplateId ==="contentTemplateId_satisfaction") {
            //初始化满意度评价
            this.satisfactionIdFlag = true;
          } */
          let hiddenSendInfoMark = selectRoutebtnValue.hiddenSendInfoMark; //是否显示派往信息
          //派往机构初始化
          if (hiddenSendInfoMark != 1) {//是否屏蔽路由右侧的操作按钮
            this.showSendDiv = true;
            this.showAddSelectSend = true;
            this.getDefualtOrgUsersTreeData(selectRoutebtnValue);
          } else {
            //隐藏派往机构用户信息
            this.showSendDiv = false;
          }
        //countersign 是否会签任务 1：是；0：否
        let countersign = selectRoutebtnValue.countersign; //排序的机构
        if (countersign === 1) {
          console.log("会签环节");
        } else {
          console.log("非会签环节");
        }
         let afterOnclick = selectRoutebtnValue.afterOnclick; //点击路由后触发的事件
         this.dealEventForm.causeOfFailureTree="1";
        if (!isEmpty(afterOnclick)) {
          //执行方法
           if(afterOnclick=="f_afterOnclick_hideCause"){//隐藏故障原因数
              this.dealEventForm.causeOfFailureTree="";
          }
        }
        let beforeConfirmOfDialogYes = selectRoutebtnValue.beforeConfirmOfDialogYes; //点击弹出窗口确定按钮时触发事件
      }
    }, //点击路由按钮触发的事件
       async getDefualtOrgUsersTreeData(selectRoutebtnValue) {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      let formDataMap=JSON.parse(this.$route.query.formDataMap);
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          processBaseId:this.dealEventForm.processBaseId,
          processBaseVersion:this.dealEventForm.processBaseVersion,
          processDefinitionKey: this.dealEventForm.processDefinitionKey,
          currentDealOrgId:this.dealEventForm.currentDealOrgId,
          activityId:this.dealEventForm.activityId,
          businessKey:this.dealEventForm.businessKey,
          currentDealUserId:this.dealEventForm.currentDealUserId,
          taskInfoId: this.dealEventForm.taskInfoId,
          nextActivityId:selectRoutebtnValue.nextActivityId,
          clickOrgIds: "",
          topOrgIds: "",
          exclusionOrgNames: selectRoutebtnValue.exclusionOrgNames||"",
          applyOrgId: this.dealEventForm.applyOrgId,
          decisionTransition: selectRoutebtnValue.decisionTransition
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.selectDefualtOrgUsers(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化页面异常，原因:' + error);
      }
      console.log("收到派往信息selectDefualtOrgUsers", result);
      if (result.meta.success == true) {
        let returnMap = result.data.returnMap;
        this.selectedSendList = [];
        this.haveCheckerUserList = [];
        console.log("返回returnMap信息", returnMap);
        if (returnMap.defualtOrgsAndUsersList) {
          if (returnMap.defualtOrgsAndUsersList.length === 1) {
            this.deleteIconFlag = false;
            this.getToselectUsersTree(returnMap);
          }
        } else {
          if (returnMap.defualtCountersignOrgsAndUsersList) {
             this.alert("会签处理组正在开发中...");
            //设置默认会签处理组及人员
            //会签 this.setDefualtCountersignOrgsAndUsers(data.defualtCountersignOrgsAndUsersList);
          }
        }
         //是否屏蔽路由右侧的部门操作按钮
        let hiddenRouteOperbutton = selectRoutebtnValue.hiddenRouteOperbutton; //是否屏蔽路由右侧的操作按钮
        if (hiddenRouteOperbutton!= 1) {
          this.getOrgAsyncDataTree(returnMap);
          this.dprMarEntryParameter = returnMap;
          console.log(returnMap);
          Object.assign(this.dealEventForm, {
               clickOrgIds: returnMap.clickOrgIds,
               topOrgIds: returnMap.topOrgIds,
               exclusionOrgNames: returnMap.exclusionOrgNames,
          });
          console.log(">>>>>>>>>>>>>rrrr>>>>>>>>>>this.dealEventForm",this.dealEventForm);
        }else{
         this.showAddSelectSend = false;
        }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载页面异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //是否加载默认机构和人员树
    async getToselectUsersTree(returnMap) {
     let orgId = returnMap.defualtOrgsAndUsersList[0].org_user_id;
     let result = {};
     let userId=JSON.parse(this.storejs.get('LoginUserId'));
     try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          orgId: orgId,
          defualtOrgsAndUsers: "1"
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
        console.log(
          "defaultSendInfoList》》》》》》》》》》》》》》》》",
          defaultSendInfoList
        );
        for (let userInfo of defaultSendInfoList) {
           this.haveCheckerUserList.push(userInfo.userId+","+userInfo.userAccount+","+userInfo.realName);
        }
        let  orgPathName=returnMap.defualtOrgsAndUsersList[0].path;
        this.$set(defaultSendInfoList, "userInfo", defaultSendInfoList);
        this.$set( defaultSendInfoList, "orgPathName",orgPathName );
        this.$set( defaultSendInfoList, "orgId",orgId );
        this.selectedSendList.push(defaultSendInfoList);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载异步加载机构树异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //异步加载机构人员树
    async getOrgAsyncDataTree(parms) {
      console.log(">>>>>>>>>>>>>>>>>>", parms);
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
          processDefinitionKey: parms.processDefinitionKey,
          activityId: parms.activityId,
          nextActivityId: parms.nextActivityId,
          clickOrgIds: parms.clickOrgIds,
          topOrgIds: parms.topOrgIds,
          exclusionOrgNames: parms.exclusionOrgNames,
          applyOrgId: parms.applyOrgId,
          currentDealOrgId: this.dealEventForm.currentDealOrgId,
          businessKey: parms.businessKey,
          businessType: this.dealEventForm.businessType,
          decisionTransition: parms.decisionTransition,
          taskInfoId: parms.taskInfoId
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.findTaskOrgAsyncData(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        this.showToast(false,'warn','初始化异步机构异常，原因:' + error);
      }
      console.log("收到异步机构信息findTaskOrgAsyncData：",result);
      if (result.meta.success == true) {
        let orgList = result.data.orgList;
        console.log("返回returnMap信息", orgList);
        this.openDialogOrgList = orgList;
      } else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载异步机构异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //异步机构

    closeDepartmentManagementDialog() {
      this.showDepartmentManagement = false;
    }, //关闭部门管理窗口
    closeComGroupTreeDialog() {
      this.showComGroupTree = false;
    }, //关闭常用小组窗口
    sureDprMgrBtn(value) {
      this.showDepartmentManagement = false;
      if (value.length > 0) {
        this.selectedSendList = [];
        let selectOrg = value[0] || [];
        this.selectedSendList.push(selectOrg);
        for (let org of this.selectedSendList) {
          this.$set(org, "orgPathName", `${org.org_path_name}`);
          this.$set(org, "orgId", `${org.org_id}`);
        }
        this.haveCheckerUserList = selectOrg.haveCheckerUserList;
        this.deleteIconFlag = true;
      }
      //this.selectUserList = value;
    },
    sureComGroupTreeBtn(value) {
      if (!isEmpty(value)) {
        this.selectedSendList = [];
        this.selectedSendList.push(value);
        this.showComGroupTree = false;
        this.haveCheckerUserList = value.haveCheckerUserList;
      }
    }, //常用小组确定按钮
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
    url("../../../../../assets/images/checker/checked_active.svg") no-repeat
    right bottom;
  border-color: #1296db;
}
</style>
