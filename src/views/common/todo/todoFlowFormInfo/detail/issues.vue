<template>
<div id="detailList">
   <article>
   <!-- <div  v-for="(mapApp,index) in issuesInfoList" :key="mapApp.index"> -->
      <!-- 问题基础信息开始 -->
       <group  :gutter="0" label-width="4em" label-align="right" label-margin-right="1.0rem">
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessKey}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单标题</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.title}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.createTime|formatDate}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName}}</span>
					</cell>
          <!--  <h-span label='归档时间' :value='mapApp.fileTime'></h-span> -->
      </group>
      <!-- 问题基础信息结束-->
      <!--问题内容开始-->
       <group :gutter="10" >
			<cell
				:title="('问题内容')"
				is-link
				:border-intent="false"
				:arrow-direction="showIssuesContent ? 'up' : 'down'"
				@click.native="showIssuesContent = !showIssuesContent">
			</cell>
			<p class="slide" :class="showIssuesContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="4em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">影响范围</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.regionName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.contactsUser}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.contactsMobile}}</span>
					</cell>

           <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">首要系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.primarySystemName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">问题来源</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.problemSourceName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">问题优先级</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.problemPriName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">关联的变更单号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.relationChangeId}}</span>
					</cell>
           <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">问题描述</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.problemContext}}</span>
					</cell>
       	</group>
        </p>
		</group>
      <!--问题内容结束-->
      <!-- 集团高额预警基础信息开始  -->
     <!-- 集团高额预警基础信息结束  -->
         <!-- 10000号基础信息开始  -->
      <!-- 10000号基础信息结束  -->
<!--   </div> -->
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
import { formatDate } from '../../../../../utils/date'
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
      mapApp: '',//问题流程
     /*  showBaseContent: true, */
      showIssuesContent: false,
    }
  },
 created: function () {
    this.mapApp=this.formDataMap.mapApp;
    console.log("问题流程",this.formDataMap);

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
      }else if (value == '3') {
        value = '一般';
      }else if (value == '4') {
        value = '无';
      }
      return value;
    },
    filterEventPri: function (value) {
      if (value == '1') {
        value = '紧急';
      } else if (value == '2') {
        value = '高';
      }else if (value == '3') {
        value = '中';
      }else if (value == '4') {
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
