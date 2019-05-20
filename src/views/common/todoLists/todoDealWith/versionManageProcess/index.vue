<template>
  <div style="font-size: 1.4rem;background-color: rgb(242,243,238);height: 100vh;overflow: auto;margin-bottom: 44px;" class="reset-cell">
    <header style="position: fixed;top: 0;left: 0;right: 0;z-index: 20;">
      <x-header class="reset-header" :left-options="{backText: '返回'}">回复:{{dealTitle}}</x-header>
    </header>
    <group gutter="0" style="position:absolute;top: 4.4rem;left: 0;right: 0;;margin-bottom: 4.5rem;">
      <!--  <section style="position:absolute;top: 46px;left: 0;right: 0;padding:0.5px 10px;"> -->
      <flexbox orient="vertical" :gutter="0">
        <flexbox-item class="dotted-line">
          <cell is-link title="选择路由" :border-intent="false" :arrow-direction="showRouter ? 'up' : 'down'" @click.native="showRouter = !showRouter">
          </cell>
        </flexbox-item>
        <flexbox :gutter="0">
          <flexbox-item>
            <template v-if="showRouter">
              <checklist :label-position="'right'" required :options="routerBtnRadioList" v-model="defaulRouteBtn" :max="1" @on-change="routerBtnChange">
              </checklist>
            </template>
          </flexbox-item>
        </flexbox>
      </flexbox>
      <flexbox orient="vertical" :gutter="0" v-if="showSendDiv">
        <flexbox-item class="dotted-line">
          <cell is-link title="派往" :border-intent="false" :arrow-direction="showSendOrgAndUser ? 'up' : 'down'" @click.native="showSendOrgAndUser = !showSendOrgAndUser">
          </cell>
        </flexbox-item>
        <flexbox :gutter="0">
          <flexbox-item>
            <template v-if="showSendOrgAndUser">
              <div v-for="(selectedSend,idx) in selectedSendList" :key="idx">
                <div style="background-color: #ffffff;padding: 0 15px;line-height: 42px;">
                  <span>{{selectedSend.orgPathName}}<icon class="el-icon-coral-delete f14" @click="handleActions(item, 'deleteSelectOrg')"></icon></span>
                </div>
                <div style="position:;left:0;top:0;right:0;">
                  <div style="border-bottom: 1px solid #e5e5e5;background-color:rgb(237,241,240)" v-for="(item,idx) in selectedSend.userInfo" :key="idx" :value="item.id">
                    <cell :title="item.userName">
                      <icon class="el-icon-coral-delete f14" @click="handleActions(item, 'deleteSelectUser')"></icon>
                    </cell>
                  </div>
                </div>
              </div>
              <cell title="选择部门" class="vux-1px-b" v-show="showAddSelectSend">
                <x-icon type="ios-plus" class="cell-x-icon" @click="showAddUser = true"></x-icon>
              </cell>
              <!-- <cell title="常用小组" class="vux-1px-b" v-show="showAddSelectSend">
                <x-icon type="ios-plus" class="cell-x-icon" @click="showAddUser = true"></x-icon>
              </cell> -->
            </template>
          </flexbox-item>
        </flexbox>
      </flexbox>

      <flexbox orient="vertical" :gutter="0" v-if="satisfactionIdFlag===true">
        <flexbox-item class="dotted-line">
          <cell is-link title="满意度评价" :border-intent="false" :arrow-direction="showSatisfiedAssess ? 'up' : 'down'" @click.native="showSatisfiedAssess = !showSatisfiedAssess">
          </cell>
        </flexbox-item>
        <flexbox :gutter="0">
          <flexbox-item>
            <template v-if="showSatisfiedAssess">
              <group gutter="0">
                <selector placeholder="请选择" v-model="defaultSatisfiedValue" ref="satisfiedRef" direction="rtl" title="评价" name="district" :options="satisfiedOptions" @on-change="onSatisfiedOptionsChange"></selector>
              </group>
            </template>
          </flexbox-item>
        </flexbox>
      </flexbox>

      <flexbox orient="vertical" :gutter="0">
        <flexbox-item class="dotted-line">
          <cell is-link title="签写意见" :border-intent="false" :arrow-direction="showSuggested ? 'up' : 'down'" @click.native="showSuggested = !showSuggested">
          </cell>
        </flexbox-item>
        <flexbox :gutter="0">
          <flexbox-item>
            <template v-if="showSuggested">
              <section style="padding:0.5px 10px; background-color: rgb(242,243,238);">
                <aside style="background-color: #ffffff;margin-top:10px;">
                  <cell title="常用意见">
                    <x-icon type="ios-arrow-down" class="cell-x-icon" @click="showOptionPopup=true"></x-icon>
                  </cell>
                  <div v-transfer-dom>
                    <popup v-model="showOptionPopup">
                      <popup-header :left-text="'取消'" :right-text="'确定'" :title="'常用意见'" :show-bottom-border="false" @on-click-left="showPopup = false" @on-click-right="showPopup = false"></popup-header>
                      <group gutter="0" class="reset-pop">
                        <radio :options="opinionRadio" v-model="checkVue"></radio>
                      </group>
                    </popup>
                  </div>
                </aside>
                <aside style="margin-top:20px;">
                  <textarea id="taskOptions" name="taskOptions" maxlength="200" rows="6" style="text-indent:2em;font-size:16px;background-color: #ffffff;height:100%;width:100%;" placeholder="请输入内容(最多200字符)">{{checkVue}}</textarea>
                </aside>
              </section>
            </template>
          </flexbox-item>
        </flexbox>
      </flexbox>

      <flexbox orient="vertical" :gutter="0" style="padding-bottom:0.5rem;">
        <flexbox-item class="dotted-line">
          <cell is-link title="其他" :border-intent="false" :arrow-direction="showOther ? 'up' : 'down'" @click.native="showOther = !showOther">
          </cell>
        </flexbox-item>
        <flexbox :gutter="0">
          <flexbox-item>
            <template v-if="showOther">
              <x-switch :title="'短信通知'" :value-map="['0', '1']" v-model="SMSValue"></x-switch>
              <x-switch :title="'邮件通知'" :value-map="['Y', 'N']" v-model="emailValue"></x-switch>
            </template>
          </flexbox-item>
        </flexbox>
      </flexbox>
      <!-- </section> -->
    </group>
    <div class="submit">
      <button class="btn btn-full f14" @click="handleActions({}, 'selectUser')">确定</button>
    </div>
    <popup v-if="showAddUser" v-model="showAddUser" @on-hide="hideAddOrgOrUser('hide')" @on-show="showAddOrgOrUser('show')" position="right" width="100%">
      <send-info-dialog v-on:hideSendInfoDialog="returnFrom" :parms="defualtOrgUsersPre" :OrgList="openDialogOrgList" v-on:sureSendInfo="sureSendInfo"></send-info-dialog>
    </popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  TransferDom,
  XHeader,
  Group,
  XDialog,
  Cell,
  CellBox,
  Box,
  XTextarea,
  Checklist,
  XButton,
  CheckIcon,
  GroupTitle,
  PopupRadio,
  PopupHeader,
  Checker,
  CheckerItem,
  Popup,
  Radio,
  Selector,
  Flexbox,
  FlexboxItem,
  XSwitch
} from "vux";
import SendInfoDialog from "./SendInfoDialog";
import _ from "lodash";
import RouterList from "./RouterList";
import UiRadio from "./UiRadio";
import { isEmpty } from "../../../../utils/common.js";
export default {
  name: "todo",
  components: {
    XHeader,
    Group,
    PopupHeader,
    XDialog,
    Cell,
    CellBox,
    Box,
    XTextarea,
    Checklist,
    CheckIcon,
    XButton,
    GroupTitle,
    PopupRadio,
    Checker,
    CheckerItem,
    Popup,
    Radio,
    Selector,
    UiRadio,
    RouterList,
    Flexbox,
    FlexboxItem,
    XSwitch,
    SendInfoDialog
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      showRouter: true, //显示路由信息
      showSendOrgAndUser: true, //显示派往的机构或人员
      showSatisfiedAssess: true, //满意度评价
      showSuggested: true, //意见
      showOther: false, //其他
      routerBtnRadioList: undefined, //路由按钮
      defaulRouteBtn: [], //默认选中
      satisfiedOptions: ["非常满意", "满意", "一般", "不满意", "非常不满意"], //满意度评价
      showOptionPopup: false, //显示常用意见开关
      hiddenRouteButton: "", //隐藏路由按钮
      satisfactionIdFlag: false, //满意度评价开关
      showAddSelectSend: true, //是否显示增加处理人员
      showSendDiv: true, //显示派往DIV
      nextActivityId: "",
      router: "",
      businessKey: "",
      dealTitle: "",
      taskInfoId: "",
      routeButtons: "",
      routeButtonsInfo: "",
      selectRouterItem: undefined, //选择路由信息
      selectedSendList: undefined, //选中派往信息
      openDialogOrgList: undefined, //打开新窗口初始化机构
      showAddUser: false,
      defualtOrgUsersPre: undefined
    };
  },
  created: function() {
    const {
      selectRouteBtns: selectRouteBtns,
      hiddenRouteButton: hiddenRouteButton,
      processKey,
      taskInfoId,
      businessKey,
      currentTaskName
    } = this.$route.query;
    //this.selectDealInfo = JSON.parse(selectDealInfo);
    this.businessKey = businessKey;
    this.dealTitle = currentTaskName;
    this.taskInfoId = taskInfoId;
    //this.f_beforeOpenDialog();
  },
  mounted: function() {
    //只执行一次
    this.onInitData();
    //console.log(2)
  },
  destroyed() {},
  filters: {},
  methods: {
    ...mapActions([
      "findTaskRouterByBusinessKey",
      "getCommonOpinionByBusinessKey",
      "findOpenRouteButtons",
      "executionFlowRulesXunit",
      "selectDefualtOrgUsers",
      "findSelectUsers",
      "findTaskOrgAsyncData"
    ]),
    /*  routeButtons.name 是 String 路由名称
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
    async onInitData() {
      const parentSelectRouteBtns = JSON.parse(
        this.$route.query.selectRouteBtns
      );
      const hiddenRouteButton = this.$route.query.hiddenRouteButton;
      //屏蔽路由规则
      console.log(
        "屏蔽路由规则666",
        parentSelectRouteBtns,
        "hiddenRouteButton",
        hiddenRouteButton
      );
      this.getOpenRouteButtons(hiddenRouteButton, parentSelectRouteBtns);
      //路由规则
      console.log("任务分配前置规则 (下一环节)-派往", parentSelectRouteBtns);
    }, //初始化页面数据

    async getOpenRouteButtons(hiddenRouteButton, parentSelectRouteBtns) {
      console.log("父级页面是hiddenRouteButton", hiddenRouteButton);
      let routeButtons = parentSelectRouteBtns.routeButtons;
      const sendInfo = {
        headers: {
          userId: this.storejs.get("LoginUserId"),
        },
        Jsondata: {
          routeButtons: routeButtons,
          hiddenRouteButton: hiddenRouteButton,
          defaultFirstSelected: parentSelectRouteBtns.defaultFirstSelected
        }
      };
      const result = await this.findOpenRouteButtons(sendInfo);
      console.log("收到路由信息", result);
      if (result.meta.success == true) {
        let resRouter = result.data.routeButtonsMapList;
        console.log("返回resRouter信息", resRouter);
        this.defaulRouteBtn = [resRouter[0].key]; //默认选中第一个
        // console.log("defaulRouteBtn", this.defaulRouteBtn);
        this.routerBtnRadioList = resRouter;
        //contentTemplateId
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: result.data.errorMsg,
          time: 3000
        });
      }
    }, //初始化路由按钮
    routerBtnChange(val, label) {
      let key = val;
      if (!isEmpty(key)) {
        let data = this.routerBtnRadioList[key - 1].item;
        console.log("change666", data);
        //加载模板
        if (data.contentTemplateId === "contentTemplateId_satisfaction") {
          //初始化满意度评价
          this.satisfactionIdFlag = true;
        }
        //派往机构初始化

        /*    routeButtons.name//路由名称
              routeButtons.decisionTransition //路由（提交给引擎用）
           route_button.contentTemplateId//
           data - hidden_route_operbutton = "${route_button.hiddenRouteOperbutton!}"
           data - countersign = "${route_button.countersign!}"
           data - operation_type = "${route_button.operationType!}"
           data - next_activity_id = "${route_button.nextActivityId!}"
           data - jump_to_activity = "${route_button.jumpToActivity!}"
           data - after_onclick = "${route_button.afterOnclick!}"
           data - after_conclck_sendorg_tree = "${route_button.afterConclckSendorgTree!}"
           data - hidden_send_info_mark = "${route_button.hiddenSendInfoMark!}"
           data - js = "${route_button.js!}"
           data - on_load_js_success = "${route_button.onLoadJsSuccess!}"
           data - before_confirm_of_dialog_yes = "${route_button.beforeConfirmOfDialogYes!}"
           data - exclusion_org_names = "${route_button.exclusionOrgNames!}" */

        let exclusionOrgNames = data.exclusionOrgNames; //排除的机构
        let hiddenSendInfoMark = data.hiddenSendInfoMark; //是否显示派往信息
        let afterOnclick = data.afterOnclick; //排序的机构
        //默认派往

        if (hiddenSendInfoMark != 1) {
          this.showAddSelectSend = true;
          this.getDefualtOrgUsersTreeData(data);
        } else {
          //隐藏派往机构用户信息
          this.showSendDiv = false;
        }
        //countersign 是否会签任务 1：是；0：否
        let countersign = data.countersign; //排序的机构
        if (countersign === 1) {
          console.log("会签环节");
        } else {
          console.log("非会签环节");
        }
        //afterOnclick
        if (afterOnclick) {
          //执行方法
        }
      }
    }, //点击路由按钮触发的事件
    getSatisfactionSelectorOption(val) {
      console.log(val);
    }, //获取满意度评价的值
    onSatisfiedOptionsChange() {}, //改变满意度评价事件

    /* handleChange(data) {
      this.resRouterInfoList.forEach(function (obj) {
        obj.isActive = false;
      });
      data.isActive = !data.isActive;
    }, */
    async getDefualtOrgUsersTreeData(inputData) {
      const sendInfo = {
        headers: {
          userId: this.storejs.get("LoginUserId"),
        },
        Jsondata: {
          taskInfoId: this.$route.query.taskInfoId,
          nextActivityId: inputData.nextActivityId,
          clickOrgIds: "",
          topOrgIds: "",
          exclusionOrgNames: inputData.exclusionOrgNames,
          applyOrgId: this.$route.query.applyOrgId,
          /*  businessType: 1, */
          decisionTransition: inputData.decisionTransition,
          processDefinitionKey: this.$route.query.processKey
        }
      };
      this.$vux.loading.show({
        text: "努力加载中"
      });
      const result = await this.selectDefualtOrgUsers(sendInfo);
      console.log("收到派往信息", result);
      if (result.meta.success == true) {
        let returnMap = result.data.returnMap;
        this.selectedSendList = [];
        console.log("返回returnMap信息", returnMap);
        if (returnMap.defualtOrgsAndUsersList) {
          if (returnMap.defualtOrgsAndUsersList.length == 1) {
            this.getToselectUsersTree(
              returnMap.defualtOrgsAndUsersList[0].org_user_id
            );
            this.showAddSelectSend = false;
          }
        } else {
          if (returnMap.defualtCountersignOrgsAndUsersList) {
            //设置默认会签处理组及人员
            //会签 this.setDefualtCountersignOrgsAndUsers(data.defualtCountersignOrgsAndUsersList);
          }
        }
        let hiddenRouteOperbutton = inputData.hiddenRouteOperbutton; //是否屏蔽路由右侧的操作按钮
        if (hiddenRouteOperbutton != 1) {
          //是否屏蔽路由右侧的操作按钮
          this.getOrgAsyncDataTree(returnMap);
        }
        this.defualtOrgUsersPre = returnMap;
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: result.data.errorMsg,
          time: 3000
        });
      }
      this.$vux.loading.hide();
    }, //路由改变。
    async getToselectUsersTree(orgId) {
      const sendInfo = {
        headers: {
          userId: this.storejs.get("LoginUserId"),
        },
        Jsondata: {
          orgId: orgId
        }
      };
      this.$vux.loading.show({
        text: "努力加载中"
      });
      const result = await this.findSelectUsers(sendInfo);
      console.log("收到异步加载用户信息", result);
      if (result.meta.success == true) {
        let defaultSendInfoList = result.data.sendUserList;
        console.log(
          "defaultSendInfoList》》》》》》》》》》》》》》》》",
          defaultSendInfoList
        );
        this.selectedSendList = defaultSendInfoList;
      }
    }, //异步加载机构树
    async getOrgAsyncDataTree(parms) {
      console.log(">>>>>>>>>>>>>>>>>>", parms);
      const sendInfo = {
        headers: {
          userId: this.storejs.get("LoginUserId"),
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
          currentDealOrgId: parms.currentDealOrgId,
          businessKey: parms.businessKey,
          businessType: parms.businessType,
          decisionTransition: parms.decisionTransition,
          taskInfoId: parms.taskInfoId
        }
      };
      this.$vux.loading.show({
        text: "努力加载中"
      });
      const result = await this.findTaskOrgAsyncData(sendInfo);
      console.log("收到异步机够信息", result);
      if (result.meta.success == true) {
        let orgList = result.data.orgList;
        console.log("返回returnMap信息", orgList);
        this.openDialogOrgList = orgList;
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: result.data.errorMsg,
          time: 3000
        });
      }
      this.$vux.loading.hide();
    }, //异步机构
    sureSendInfo(value) {
      this.showAddUser = false;
      if (value.length > 0) {
        this.selectedSendList=[];
        let selectOrg = value[0]||[];
        this.selectedSendList.push(selectOrg);
         for (let org of this.selectedSendList) {
            this.$set(org, 'orgPathName', `${org.org_path_name}`);
        }

      }
      //this.selectUserList = value;
    },

    handleActions(item, actionType) {
      // alert(this.storejs.get('taskOptions'));
      const { processKey, taskInfoId, businessKey } = this.$route.query;
      switch (actionType) {
        case "selectUser":
          const taskOptions = document.getElementById("taskOptions").value;
          /*   if (isEmpty(taskOptions)) {
              this.$vux.toast.show({
                type: 'warn',
                text: '处理意见不能为空'
              });
              return false;
            }
            if (isEmpty(this.router)) {
              this.$vux.toast.show({
                type: 'warn',
                text: '处理方式不能为空'
              });
              return false;
            }
            window.localStorage.setItem('taskOptions', taskOptions); */
          this.$router.push({
            name: actionType,
            query: {
              nextActivityId: this.nextActivityId,
              router: this.router,
              businessKey: this.businessKey,
              taskOptions: taskOptions,
              taskInfoId: taskInfoId,
              processKey: processKey
            }
          });
          break;
        case "return":
          this.$router.back();
          break;
        default:
          break;
      }
    },
    returnFrom() {
      this.showAddUser = false;
    },
    log(str) {
      console.log(str);
    },
    click(key) {
      console.log(key);
    }
  }
};
</script>

<style lang="less" scoped>
.dotted-line {
  border-bottom: 1px dashed #e5e5e5;
  background-color: #e5e5e5;
}

.screen p {
  padding: 0 15px;
}

.screen .radio {
  margin-right: 8px;
}

.vux-header.reset-header {
  background-color: #1B82D1 !important;
}

.header {
  width: 100%;
  height: 4.5rem;
  line-height: 4.5rem;
  background-color: #1B82D1;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  opacity: 1;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;

  .name {
    span {
      color: #fff;
    }
  }
}

.submit {
  width: 100%;
  padding: 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgb(242, 243, 238);

  .btn {
    background-color: #1B82D1;
    height: 4.3rem;
    color: #fff;
    width: 35.5rem !important;
  }
}

.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}

.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }

  .scroll-box {
    height: 200px;
    padding: 5px 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}

.vux-x-icon {
  fill: #1B82D1;
}

.cell-x-icon {
  display: block;
  float: left;
  text-align: left;
  fill: #1B82D1;
  margin-right: 5px;
}
</style>
