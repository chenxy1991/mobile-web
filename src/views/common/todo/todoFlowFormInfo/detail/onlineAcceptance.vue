<template>
<div id="detailList">
<article>
 <!--  <div  v-for="(mapApp,index) in onlineAcceptanceInfoList" :key="mapApp.index"> -->
      <!-- 上线验收基础信息开始 -->
     <group  :gutter="0" label-width="5em" label-align="left" label-margin-right="1.0rem">
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessKey}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单标题</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.title}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交日期</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.createTime|formatDate}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgId}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserId}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交人手机</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyMobile}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">首要系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.primarySystemName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">业务确认</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessConfirmation}}</span>
					</cell>
           <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">内容描述</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.content}}</span>
					</cell>
          <!-- <h-span label='归档时间' :value='mapApp.fileTime|formatDate'></h-span> -->
        </group>
      <!-- 上线验收信息结束-->
      <!-- 资源工单信息开始-->
      <group :gutter="10" >
			<cell
				:title="('资源工单信息')"
				is-link
				:border-intent="false"
				:arrow-direction="showOnlineAcceptanceContent ? 'up' : 'down'"
				@click.native="showOnlineAcceptanceContent = !showOnlineAcceptanceContent">
			</cell>
			<p class="slide" :class="showOnlineAcceptanceContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="5em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">资源工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.relaBusinessKey}}</span>
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
						<span  class="f14 auto-linefeed span-font" slot="title">联系人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.oemContact}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.oemTelephone}}</span>
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
						<span  class="f14 auto-linefeed span-font" slot="title">联系人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.userName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.mobile}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">运营维护邮箱</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.email}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">申请部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyMobile}}</span>
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
						<span  class="f14 auto-linefeed span-font" slot="title">计划开始使用时间</span>
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
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">扩容类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.dilatationType}}</span>
					</cell>
        	</group>
        </p>
		</group>
      <!-- 资源工单信息结束-->
      <!-- 硬件资源需求开始-->
      <group :gutter="10" >
			<cell
				:title="('硬件资源需求')"
				is-link
				:border-intent="false"
				:arrow-direction="showHardwareResourceContent ? 'up' : 'down'"
				@click.native="showHardwareResourceContent = !showHardwareResourceContent">
			</cell>
			<p class="slide" :class="showHardwareResourceContent?'animate':''">
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
          <cell value-align="left">
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
      <!-- 硬件资源需求结束-->
   <!-- </div> -->
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
  name: "eventManage",
  props: {
    formDataMap: {
      type: Object,
      required: false
    },
  },
  components: {
    XButton,
  },
  data() {
    return {
      mapApp:  '',
     /*  showBaseContent: true, */
      showOnlineAcceptanceContent: false,
      showHardwareResourceContent: false,

    }
  },
  created: function () {
     this.mapApp=this.formDataMap.mapApp;
    console.log("系统上线验收流程",this.formDataMap);
  },
  mounted: function () {
    //只执行一次
    //console.log(2)
  },
  destroyed() {
  },
  filters: {
    formatDate(time) {
       if(time!=null){
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
         }
    },
    filterEventKind: function (value) {
      if (value == '10') {
        value = '客户投诉';
      } else if (value == '11') {
        value = '系统故障';
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
      handleSumbitWorkOrderTaskClick(){
         let formDataMap=this.formDataMap;
          console.log("item",formDataMap);
          this.$router.push({
                name: "handleRouter",
                query: {
                  formDataMap:JSON.stringify(formDataMap),
                  token:this.$route.query.token,
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
.cellView{
      background-color: #f5f5f5;
      height: 3.1rem;
  }
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
