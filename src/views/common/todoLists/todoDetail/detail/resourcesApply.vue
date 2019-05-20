<template>
<div id="resourcesApply">
  <article>
   <div  v-for="(mapApp,index) in resourcesApplyInfoList" :key="mapApp.index">
      <!-- 基础信息开始 -->
       <group  :gutter="0" label-width="6em" label-align="left" label-margin-right="1.0rem">
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{businessKey}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">项目名称</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.projectName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">所属系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.systemPath}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">系统开发商</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.oemName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人/电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.oemContact+'/'+mapApp.oemTelephone}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">开发商邮箱</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.oemEmail}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">运营维护部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.orgName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人/电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.userName+'/'+mobile}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">运营维护邮箱</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.email}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">申请部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgId}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人/电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName+'/'+mapApp.applyMobile?mapApp.applyMobile:''}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">申请人邮箱</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyEmail}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求概要描述</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.requirementsDescription}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">计划开始使用时</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.planStartTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">计划结束时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.planEndTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">使用用途</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.purpose}}</span>
					</cell>
        </group>
      <!-- 基础信息结束-->
      <!--硬件资源需求开始-->
      <group :gutter="10">
			<cell
				:title="('硬件资源需求')"
				is-link
				:border-intent="false"
				:arrow-direction="showHardwareContent ? 'up' : 'down'"
				@click.native="showHardwareContent = !showHardwareContent">
			</cell>
			<p class="slide" :class="showHardwareContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="5em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.id}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.demandType}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">设备类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.deviceType}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">操作类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.operationType}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">配置</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.allocation}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">应用场景</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applicationScenarios}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">部署需求</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.deployDemand}}</span>
					</cell>
          <cell value-align="left" v-if="mapApp.liveryTime">
						<span  class="f14 auto-linefeed span-font" slot="title">交付时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.liveryTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">必要性</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.necessity}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">使用率估计</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.estimatedUsageRate}}</span>
					</cell>
        	</group>
        </p>
		</group>
      <!--硬件资源需求结束-->
      <!--第三方软件需求开始-->
      <group :gutter="10">
			<cell
				:title="('软件资源需求')"
				is-link
				:border-intent="false"
				:arrow-direction="showSoftwareContent ? 'up' : 'down'"
				@click.native="showSoftwareContent = !showSoftwareContent">
			</cell>
			<p class="slide" :class="showSoftwareContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="4em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.resourceDemandId}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">软件名</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.softwareName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">软件类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.softwareType}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">软件版本</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.softwareVersion}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求内容</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.demandContent}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">选型原因</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.selectionReason}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">备注</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.remarks}}</span>
					</cell>
         	</group>
        </p>
		</group>
      <!--第三方软件需求结束-->
  </div>
    </article>
   <footer class="foot">
      <x-button type="primary"  @click.native="handleSumbitWorkOrderTaskClick()" action-type="button" style="background-color:#1B82D1">处理</x-button>
   </footer>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'
import HSpan from './HorizontalSpan'
import VSpan from './VerticalSpan'
import {
  XButton,
} from 'vux'
import {
  formatDate
} from '../../../../../utils/date'
export default {
  name: "resourcesApply",
  props: {
    processKey: {
      type: String,
      required: false
    },
    businessKey: {
      type: String,
      required: false
    }
  },
  components: {
    XButton
  },
  data() {
    return {
     /*  showBaseContent: true, */
      showHardwareContent: false,
      showSoftwareContent: false,
      resourcesApplyInfoList:  [],
    }
  },
  created: function () {
    //console.log(1)
    const businessKey = this.businessKey;
    const processKey = this.processKey;
    console.log("资源管理流程>>>>>>>>>>>>>>>>>" + processKey + ">>>>>>>>" + businessKey);
  },
  mounted: function () {
    //只执行一次
    //console.log(2)
    this.initPageData();
  },
  destroyed() {

  },
  filters: {
    formatDate(time) {
      if (time != null) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    filterIsNeedAssessment: function (value) {
      if (value == 1) {
        value = '是';
      } else if (value == 0) {
        value = '否';
      }
      return value;
    },
    filterEventAffect: function (value) {
      if (value == '1') {
        value = '重大';
      } else if (value == '2') {
        value = '严重';
      } else if (value == '3') {
        value = '一般';
      } else if (value == '4') {
        value = '无';
      }
      return value;
    },
    filterEventPri: function (value) {
      if (value == '1') {
        value = '紧急';
      } else if (value == '2') {
        value = '高';
      } else if (value == '3') {
        value = '中';
      } else if (value == '4') {
        value = '低';
      }
      return value;
    }
  },
  methods: {
    ...mapActions([
      'queryBusinessInfoByKey',
    ]),
   initPageData(){
      this.runQueryBusinessInfoByKeyApi();
    },
     async runQueryBusinessInfoByKeyApi() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          'businessKey': this.businessKey,
          'processDefinitionKey': this.processKey,
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.queryBusinessInfoByKey(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','请求工单详情失败，原因:' + error);
      }
       console.log("queryBusinessInfoByKey：",result);
      if (result.meta.success == true) {
        let returnMap=result.data.returnMap
        this.resourcesApplyInfoList = returnMap.businessKeyDetail;
        this.$store.commit('updatFormDetail',this.resourcesApplyInfoList);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载工单详情异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    },
      handleSumbitWorkOrderTaskClick(){
       let item=this.resourcesApplyInfoList[0];
       const {businessKey,  taskInfoId, processKey, currentTaskName} = this.$route.query;
       console.log("item",taskInfoId);
       this.$router.push({
            name: "taskDealType",
            query: {
              businessKey: item.businessKey,
              processKey: this.processKey,
              taskInfoId: taskInfoId,
              currentTaskName: currentTaskName,
              applyOrgId:item.applyOrgId,
              formDataStr:JSON.stringify(item),
            }
          });
    },//工单提交处理
  }
}
</script>

<style lang="less" scoped>
article {
      position: fixed;
      top: 9rem;
      bottom: 4.6rem;
      width: 99%;
      overflow: scroll;
      background-color:#FFF;
  }
.foot {
  position: fixed;
  left: 0;
  height: 4.2rem;
  line-height: 4.2rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}
.foot {
  bottom: 0;
}
</style>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/1px.less';
.slide {
  padding: 0 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.groupContent /deep/ .weui-cells:before {
    border-bottom: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cells:after {
    border-bottom: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cell:before{
  border-top: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cell:after{
  border-top: 0px solid #D9D9D9 !important;
}

</style>
