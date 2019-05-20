<template>
<div id="detailList">
   <article>
    <div  v-for="(mapApp,index) in assistHandleInfoList" :key="mapApp.index">
      <!-- 协办基础信息开始 -->
       <group  :gutter="0" label-width="5em" label-align="left" label-margin-right="1.0rem">
           <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">工单编号</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.businessKey}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">关联主单号</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.relaBusinessKey}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">工单标题</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.title}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">发起协助环节</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.associatedProcess}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">协办分类</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.assistType}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">期望时间</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.updateContent|formatDate}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">变更类型</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.satisfactionDegree}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">满意度评价</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.satisfaction}}</span>
            </cell>
            <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">提交人</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName}}</span>
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
              <span  class="f14 auto-linefeed span-font" slot="title">提交人电话</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.applyMobile}}</span>
            </cell>
             <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">不满意原因</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.satisfactionEvaluation}}</span>
            </cell>
             <cell value-align="left">
              <span  class="f14 auto-linefeed span-font" slot="title">协办内容</span>
              <span class="f14 auto-linefeed c999" slot>{{mapApp.applyContent}}</span>
            </cell>
      	</group>
      <!-- 协办基础信息结束-->

      <!--IT技术评审信息开始-->
      <group :gutter="10"  >
			<cell
				:title="('评审信息')"
				is-link
				:border-intent="false"
				:arrow-direction="showReviewInfoContent ? 'up' : 'down'"
				@click.native="showReviewInfoContent = !showReviewInfoContent">
			</cell>
			<p class="slide" :class="showReviewInfoContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="5em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">实施与否</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.isExecute}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">是否关键需求</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.isImportantRequirement}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">是否专项需求</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.isProcessRequirement}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">主办科室</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.firstOrgName}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">计划完成时间</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.planCompleteTime}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">协办科室</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.secondOrgName}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">评审时间</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.checkTime}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">技术支撑要点</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.techSupportPoint}}</span>
          </cell>
      	</group>
        </p>
		</group>
      <!--IT技术评审信息结束-->
      <!--IT技术评审类时展示关联需求信息开始-->
       <group :gutter="10" >
			<cell
				:title="('需求简要')"
				is-link
				:border-intent="false"
				:arrow-direction="showDemandBriefContent ? 'up' : 'down'"
				@click.native="showDemandBriefContent = !showDemandBriefContent">
			</cell>
			<p class="slide" :class="showDemandBriefContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="5em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">提交人</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.realName}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">提交人电话</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.mobile}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">提交部门</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.orgPathName}}</span>
          </cell>

          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">提交日期</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.createTime| formatDate}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">需求负责人</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.requirementsDirectorName}}</span>
          </cell>
          <cell value-align="left">
            <span  class="f14 auto-linefeed span-font" slot="title">需求描述</span>
            <span class="f14 auto-linefeed c999" slot>{{mapApp.requirementsDescription}}</span>
          </cell>
    	</group>
        </p>
		</group>
      <!--IT技术评审类时展示关联需求信息结束-->
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
import {
  XButton,
} from 'vux'
import {
  formatDate
} from '../../../../../utils/date'
export default {
  name: "eventManage",
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
     /*  showBaseContent: true, */
      showReviewInfoContent: false,
      showDemandBriefContent: false,
      assistHandleInfoList:  [],

    }
  },
  created: function () {
    console.log(1)
    const businessKey = this.businessKey;
    const processKey = this.processKey;
    console.log("协办>>>>>>>>>>>>>>>>>" + processKey + ">>>>>>>>" + businessKey);

  },
  mounted: function () {
    //只执行一次
    console.log(2)
     this.initPageData();
  },
  destroyed() {
    this.assistHandleInfoList=[];
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
        this.assistHandleInfoList = returnMap.businessKeyDetail;
        this.$store.commit('updatFormDetail',this.assistHandleInfoList);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载工单详情异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    },
      handleSumbitWorkOrderTaskClick(){
      let item=this.assistHandleInfoList[0];
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
