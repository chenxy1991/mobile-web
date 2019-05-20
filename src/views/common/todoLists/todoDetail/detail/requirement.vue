<template>
<div id="requirement">
  <article>
  <div  v-for="(mapApp,index) in requirementInfoList" :key="mapApp.index">
      <!-- 需求基础信息开始 -->
      <group  :gutter="0" label-width="5em" label-align="left" label-margin-right="1.0rem">
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessKey}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求标题</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.title}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求关键词</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.requirementKey}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交人电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyMobile}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgPath}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">提交日期</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.createTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求负责人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.requirementsDirectorName}}</span>
					</cell>
       </group>
      <!-- 需求基础信息结束-->
      <!--需求内容开始-->
       <group :gutter="10">
			<cell
				:title="('问题内容')"
				is-link
				:border-intent="false"
				:arrow-direction="showRequirementContent ? 'up' : 'down'"
				@click.native="showRequirementContent = !showRequirementContent">
			</cell>
			<p class="slide" :class="showRequirementContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="4em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">涉及范围</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.rangeInvolved}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求重要程度</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.importanceLevel}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">IT前向嵌入人员</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.embeddedPerson}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求分类</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.declarationTypePath}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">要求独立测试报告</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.isTestReport}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">首要系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.primarySystemPath}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工作总量</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.workTotalAmount}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">相关系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.relatedSystemPath}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">系统模块</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.moduleName}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">期望完成时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.expectedCompletionTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">计划完成时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.plannedCompletionTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">是否影响客户感知</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.customerPerceptionName}}</span>
					</cell>

          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">实现方式</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.realizationWay}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">退回原因</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.reasonName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">满意度</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.satisfaction}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">是否专项需求</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.isSpecialRelationshipName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">需求描述</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.requirementsDescription}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">测试案例要求</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.testCaseInfo}}</span>
					</cell>
           <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">备注</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.remarks}}</span>
					</cell>
            <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">要求规格说明</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.implementationPlan}}</span>
					</cell>
        	</group>
        </p>
		</group>
      <!--需求内容结束-->
      <!-- 预分析意见开始  -->
      <!-- 预分析意见结束 -->

      <!-- 项目/专项关联开始  -->
      <!-- 项目/专项关联结束  -->
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
  name: "dispatch",
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
    XButton,
  },
  data() {
    return {
    /*   showBaseContent: true, */
      showRequirementContent: false,
      requirementInfoList:  [],
    }
  },
  created: function () {
    //console.log(1)
    const businessKey = this.businessKey;
    const processKey = this.processKey;
    console.log("需求管理流程>>>>>>>>>>>>>>>>>" + processKey + ">>>>>>>>" + businessKey);
  },
  mounted: function () {
    //只执行一次
    //console.log(2)
     this.initPageData();
  },
  destroyed() {
    this.requirementInfoList=[];
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
        this.requirementInfoList = returnMap.businessKeyDetail;
        this.$store.commit('updatFormDetail',this.requirementInfoList);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载工单详情异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    },
      handleSumbitWorkOrderTaskClick(){
         let item=this.requirementInfoList[0];
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
