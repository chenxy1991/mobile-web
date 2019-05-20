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
    <flexbox orient="vertical" :gutter="0">
      <flexbox-item class="dotted-line">
        <cell is-link title="派往" :border-intent="false" :arrow-direction="showSendOrgAndUser ? 'up' : 'down'" @click.native="showSendOrgAndUser = !showSendOrgAndUser">
        </cell>
      </flexbox-item>
      <flexbox :gutter="0">
        <flexbox-item>
          <template v-if="showSendOrgAndUser">
            <div style="background-color: #ffffff;padding: 0 15px;line-height: 42px;">
              <span>{{selectSendOrg}}<icon class="el-icon-coral-delete f14" @click="handleActions(item, 'deleteSelectOrg')"></icon></span>
            </div>
            <div style="position:;left:0;top:0;right:0;">
              <div style="border-bottom: 1px solid #e5e5e5;background-color:rgb(237,241,240)" v-for="(item,idx) in selectUserList" :key="idx" :value="item.id">
                <cell :title="item.realName">
                  <icon class="el-icon-coral-delete f14" @click="handleActions(item, 'deleteSelectUser')"></icon>
                </cell>
              </div>
            </div>
            <cell title="选择处理人员" class="vux-1px-b">
              <x-icon type="ios-plus" class="cell-x-icon" @click="showAddUser = true"></x-icon>
            </cell>
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
    <button class="btn btn-full f14"  @click="handleActions({}, 'selectUser')">确定</button>
  </div>
</div>
</template>

<script>
import store from 'storejs';
import {
  mapActions
} from 'vuex';
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
  XSwitch,
} from 'vux'
import _ from 'lodash'
import RouterList from './RouterList'
import UiRadio from './UiRadio'
import {
  isEmpty
} from '../../../../utils/common.js';
export default {
  name: 'todo',
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
      selectSendOrg: "广东公司/省级部门/企业信息化事业部/业务支撑中心/计费结算室/事件处理组/高额预警审核确认组 ", //选中的机构
      satisfiedOptions: ['非常满意', '满意', '一般', '不满意', '非常不满意'], //满意度评价
      showOptionPopup: false, //显示常用意见开关
      hiddenRouteButton: '', //隐藏路由按钮
      satisfactionIdFlag: false, //满意度评价开关
      nextActivityId: '',
      router: '',
      businessKey: '',
      dealTitle: '',
      taskInfoId: '',
      routeButtons: '',
      routeButtonsInfo: '',
      selectRouterItem: [], //选择路由信息
      selectUserList: [{
        realName: "李想"
      }, {
        realName: "谢晓梅"
      }]
    }
  },
  created: function () {
    const {
      selectDealInfo,
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
  mounted: function () {
    //只执行一次
    this.onInitData();
    //console.log(2)
  },
  destroyed() {

  },
  filters: {},
  methods: {
    ...mapActions([
      'findTaskRouterByBusinessKey',
      'getCommonOpinionByBusinessKey',
      'findOpenRouteButtons',
      'executionFlowRulesXunit',
    ]),
    async onInitData() {
      const parentSelectBtnInfo = JSON.parse(this.$route.query.selectDealInfo);
      //屏蔽路由规则
      console.log("屏蔽路由规则", parentSelectBtnInfo);
      //beforeOnclick点击操作按钮前执行事件
      if (parentSelectBtnInfo.beforeOnclick === "f_beforeOpenDialog") {
        this.f_beforeOpenDialog();
      } else if (parentSelectBtnInfo.beforeOnclick === "f_beforeOpenDialog_exit") {
        this.f_beforeOpenDialog_exit();
      } else {
        this.getOpenRouteButtons('');
      }
      //屏蔽路由规则
      console.log("任务分配前置规则 (下一环节)-派往", parentSelectBtnInfo);

    }, //初始化页面数据
    async f_beforeOpenDialog() {
      const sendInfo = {
        headers: {
          userId: store.get('LoginUserId'),
        },
        Jsondata: {
          operType: '屏蔽路由',
          taskInfoId: this.taskInfoId,
          applyOrgId: this.$route.query.applyOrgId
        }
      };
      this.$vux.loading.show({
        text: '努力加载中'
      });
      const result = await this.executionFlowRulesXunit(sendInfo);
      console.log("屏蔽路由规则", result);
      if (result.meta.success == true) {
        let data = result.data.returnMap;
        let hiddenRouteButton = "";
        if (data.showReportRoute == "1") {
          hiddenRouteButton = "上报,上报（省）,上报（集团）,送申告人确认";
        } else if (data.showReportRoute == "2") {
          if (data.showReportRoute3 == "1") {
            hiddenRouteButton = "提交复核,上报";
          } else {
            hiddenRouteButton = "提交复核,上报,上报（省）,上报（集团）";
          }
        } else if (data.showReportRoute == "3") {
          hiddenRouteButton = "提交复核,上报（省）,上报（集团）";
        }
        //第二
        this.getOpenRouteButtons(hiddenRouteButton);

      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: result.data.errorMsg,
          time: 3000
        });
      }
      this.$vux.loading.hide();
    }, //提交隐藏路由信息
    async f_beforeOpenDialog_exit() {
      const sendInfo = {
        headers: {
          userId: store.get('LoginUserId'),
        },
        Jsondata: {
          operType: '屏蔽路由',
          taskInfoId: this.taskInfoId,
        }
      };
      this.$vux.loading.show({
        text: '努力加载中'
      });
      const result = await this.executionFlowRulesXunit(sendInfo);
      console.log("退回路由信息", result);
      if (result.meta.success == true) {
        let data = result.data.returnMap;
        let hiddenRouteButton = "";
        if (data.showReportRoute2 != "3") {
          // $("#hiddenRouteButton").val("退回上报");
          hiddenRouteButton = "退回上报";
        }
        this.getOpenRouteButtons(hiddenRouteButton);
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: result.data.errorMsg,
          time: 3000
        });
      }
      this.$vux.loading.hide();
    }, //退回隐藏路由信息

    async getOpenRouteButtons(hiddenRouteButton) {
      console.log("父级页面是hiddenRouteButton", hiddenRouteButton);
      let parentRouteButtons = '';
      const parentSelectBtnInfo = JSON.parse(this.$route.query.selectDealInfo);
      parentRouteButtons = parentSelectBtnInfo.routeButtons;
      const sendInfo = {
        headers: {
          userId: store.get('LoginUserId'),
        },
        Jsondata: {
          routeButtons: parentRouteButtons,
          hiddenRouteButton: hiddenRouteButton,
          defaultFirstSelected: parentSelectBtnInfo.defaultFirstSelected,
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
          type: 'warn',
          text: result.data.errorMsg,
          time: 3000
        });
      }
    }, //初始化路由按钮
    routerBtnChange(val, label) {
      let key = val;
      if (!isEmpty(key)) {
        let data = this.routerBtnRadioList[key - 1];
        console.log('change', val, data);
        if (data.item.contentTemplateId === "contentTemplateId_satisfaction") {
          this.satisfactionIdFlag = true;
        }
        //派往机构初始化

        /*    routeButtons.name//路由名称
        routeButtons.decisionTransition //路由（提交给引擎用）
           data - content_template_id = "${route_button.contentTemplateId!}"
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

        let exclusionOrgNames = data.exclusionOrgNames; //排序的机构
        let hiddenSendInfoMark = data.hiddenSendInfoMark; //是否隐藏派往路径信息
        if (hiddenSendInfoMark != 1) {
          getDefualtOrgUsersTreeData(data);

        } else {
          //隐藏派往机构用户信息
        }
      }

    }, //点击路由按钮触发的事件
    getSatisfactionSelectorOption(val) {
      console.log(val);
    }, //获取满意度评价的值
    onSatisfiedOptionsChange() {

    }, //改变满意度评价事件

    handleChange(data) {
      this.resRouterInfoList.forEach(function (obj) {
        obj.isActive = false;
      });
      data.isActive = !data.isActive;
    },
    async onInitData2() {

      const sendInfo = {
        headers: {
          userId: store.get('LoginUserId'),
        },
        Jsondata: {
          'businessKey': this.businessKey
        }
      };
      this.$vux.loading.show({
        text: '努力加载中'
      });
      const commonOpinion = await this.getCommonOpinionByBusinessKey(sendInfo);
      //获取常用意见
      //console.log("常用意见", commonOpinion);
      this.$vux.loading.hide();
      if (commonOpinion.meta.success == true) {
        const comOpinionList = commonOpinion.data.commonOpinionList;
        // console.log("常用意见", comOpinionList);
        if (comOpinionList.length > 0) {
          for (let item of comOpinionList) {
            //console.log("意见",item.opinionContent);
            this.opinionRadio = this.opinionRadio.concat(item.opinionContent);
          }
        }
        this.getOpenRouteButtons();
        //获取路由信息
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: result.data.errorMsg,
          time: 3000
        });
      }
      this.$vux.loading.hide();
    },

    handleActions(item, actionType) {

      const {
        processKey,
        taskInfoId,
        businessKey
      } = this.$route.query;
      switch (actionType) {
        case 'selectUser':
          const taskOptions = document.getElementById('taskOptions').value;
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
             */
          this.$router.push({
            name: actionType,
            query: {
              nextActivityId: this.nextActivityId,
              router: this.router,
              businessKey: this.businessKey,
              taskOptions: taskOptions,
              taskInfoId: taskInfoId,
              processKey: processKey,
            }
          });
          break;
        case 'return':
          this.$router.back();
          break;
        default:
          break;
      }
    },

    log(str) {
      console.log(str)
    },
    click(key) {
      console.log(key)
    },
  }
}
</script>

<style lang="less" scoped>
.cell-x-icon {
  display: block;
  fill: #1B82D1
;
}

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
  fill: #F70968;
}

.cell-x-icon {
  display: block;
  float: left;
  text-align: left;
  fill: green;
  margin-right: 5px;
}
</style>
