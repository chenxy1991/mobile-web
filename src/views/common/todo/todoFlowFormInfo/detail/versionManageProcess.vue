<template>
<div id="versionManageProcess">
<article>
 <!--  <div  v-for="(mapApp,index) in versionManageProcessInfoList" :key="mapApp.index"> -->
      <!-- 版本基础信息开始 -->
      <group  :gutter="0" label-width="4em" label-align="left" label-margin-right="1.0rem">
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessKey}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">版本计划编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.versionPlanName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">版本标题</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.title}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.realName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.orgPathName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交日期</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.createTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">版本类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.versionTypeName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">版本变化</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.versionChangeName}}</span>
					</cell>
        </group>
      <!-- 版本基础信息结束-->
      <!--版本内容开始-->
       <group :gutter="10">
			<cell
				:title="('版本内容')"
				is-link
				:border-intent="false"
				:arrow-direction="showVersionManageProcessContent ? 'up' : 'down'"
				@click.native="showVersionManageProcessContent = !showVersionManageProcessContent">
			</cell>
			<p class="slide" :class="showVersionManageProcessContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="4em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">所属系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.systemName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">版本覆盖范围</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.versionCoverage}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">计划封版时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.planSealTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">计划交付时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.planDeliveryTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">计划上线时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.planUptime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">计划工作量(人/日)</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.planWorkload}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">实际工作量(人/日)</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.versionPlanWorkload}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">发布版本号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.releaseVersion}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">实际交付时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.actualDeliveryTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">实际测试完成时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.actualTestedTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">实际上线时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.actualOnlineTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">实际升版停机开始时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.stopStartTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">实际升版停机结束时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.stopEndTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">版本包是否入库</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.packageStored}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">是否提供程序包</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.providerPackage}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">已提供文档包</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.docPackage}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">集团业务停机</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.groupBusinessDowntime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">版本详细描述</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.detailedDescription}}</span>
					</cell>
           <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">任务说明</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.taskDescription}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">业务受理情况</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessAcceptance}}</span>
					</cell>
        </group>
        </p>
		</group>
      <!--版本内容结束-->
      <!--生产验证人员开始-->
     <!--  <flexbox orient="vertical" class="vux-1px-b" :gutter="0">
        <flexbox-item class="dotted-line">
          <cell is-link title="生产验证人员" :border-intent="false" :arrow-direction="showPrdContent ? 'up' : 'down'" @click.native="showPrdContent = !showPrdContent">
          </cell>
        </flexbox-item>
        <template v-if="showPrdContent">
          <h-span label="编号" :value="id"></h-span>
          <h-span label='环节处理组' :value='mapApp.dealOrgName'></h-span>
          <h-span label='环节处理人' :value='mapApp.dealUserName'></h-span>
          <h-span label='备注' :value='mapApp.remarks'></h-span>
        </template>
      </flexbox> -->
      <!--生产验证人员结束-->
 <!--  </div> -->
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
import {
  XButton,
} from 'vux'
import {
  formatDate
} from '../../../../../utils/date'
export default {
  name: "versionManageProcess",
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
      showVersionManageProcessContent: false,
      showPrdContent: false,
      mapApp: '',
    }
  },
  created: function () {
     this.mapApp=this.formDataMap.mapApp;
    console.log("版本管理流程",this.formDataMap);
  },
  mounted: function () {
    //只执行一次
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
/* .groupContent /deep/ .weui-cells:before {
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
} */

</style>
