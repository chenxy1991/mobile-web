<template>
<div id="dispatch">
   <article>
 <!--  <div  v-for="(mapApp,index) in dispatchInfoList" :key="mapApp.index"> -->
      <!-- 集团派发流程基础信息开始 -->
        <group  :gutter="0" label-width="4em" label-align="left" label-margin-right="1.0rem">
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
            <span class="f14 auto-linefeed c999" slot>{{mapApp.dispatchTime| formatDate}}</span>
          </cell>

          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">拟稿部门</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.submitorDepartment}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">拟稿人</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.submitorName}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">拟稿人联系电话</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.submitorMobile}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">拟稿人邮箱</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.submitorEmail}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">拟稿人办公电话</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.submitorTelephone}}</span>
          </cell>
         <!--   <h-span label='归档时间' :value='mapApp.fileTime'></h-span> -->
      </group>
      <!-- 集团派发流程基础信息开始-->
      <!--派发内容开始-->
       <group :gutter="10">
			<cell
				:title="('工单内容')"
				is-link
				:border-intent="false"
				:arrow-direction="showDispatchContent ? 'up' : 'down'"
				@click.native="showDispatchContent = !showDispatchContent">
			</cell>
			<p class="slide" :class="showDispatchContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="4em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">是否需要考核</span>
            <span class="f14 auto-linefeed c999" slot>{{(mapApp.isNeedAssessment)|filterIsNeedAssessment}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">集团要求回单时间</span>
            <span class="f14 auto-linefeed c999" slot>{{(mapApp.returnDate)?(mapApp.returnDate|formatDate):''}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">要求接收时间</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.receiveDate|formatDate}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">订单编号</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.orderId}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">关联单号</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.relaDispatch}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">所属专业</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.affiliatedSector}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">派发级别</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.level}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">保密级别</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.secretLevel}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">紧急程度</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.urgent}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">审批级别</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.issueLevel}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">流程类型</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.taskClass}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">实际完成时间</span>
            <span class="f14 auto-linefeed c999" slot>{{(mapApp.trueRetrunDate)?(mapApp.trueRetrunDate|formatDate):''}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">派发单类型</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.type}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">派发单子类</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.typeClassify}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">派发内容</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.content}}</span>
          </cell>
           <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">备注</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.remark}}</span>
          </cell>
       	</group>
        </p>
		</group>
      <!--派发内容结束-->
      <!-- 集团高额预警基础信息开始  -->
     <!-- 集团高额预警基础信息结束  -->
         <!-- 10000号基础信息开始  -->
      <!-- 10000号基础信息结束  -->
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
import {
  XButton,
} from 'vux'
import { formatDate } from '../../../../../utils/date'
export default {
  name: "dispatch",
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
      /*  showBaseContent: true, */
       showDispatchContent: false,
        mapApp: '',//任务派发工单详情信息
    }
  },
   created: function () {
    this.mapApp=this.formDataMap.mapApp;
    console.log("集团任务派发>>>>>>>>>>>>>>>>>" , mapApp);
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
