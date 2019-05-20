<template>
<div id="supervision">
<article>
  <div  v-for="(mapApp,index) in supervisionInfoList" :key="mapApp.index">
      <!-- 督办管理流程基础信息开始 -->
      <group  :gutter="0" label-width="4em" label-align="left" label-margin-right="1.0rem">
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{businessKey}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">督办标题</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.worksheetTitle}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">督办级别</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.supervisionLevel}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">期望完成时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.expectedCompletionTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">督办原因</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.supervisionReason}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.createTime|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">涉及系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.involveSystemName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">被督办部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.supervisionOrgName}}</span>
					</cell>
        </group>
      <!-- 督办基础信息结束-->
      <!--督办关联事件内容开始-->
      <group :gutter="10" >
			<cell
				:title="('事件信息')"
				is-link
				:border-intent="false"
				:arrow-direction="showEventContent ? 'up' : 'down'"
				@click.native="showEventContent = !showEventContent">
			</cell>
			<p class="slide" :class="showEventContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="5em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">事件编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.relaBusinessKey}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">事件标题</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.title}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">事件发生时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.happenDate|formatDate}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">业务类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessType}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">影响范围</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.regionName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">事件性质</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.eventKind}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">申告现象</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyPhenomena}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">事件影响度</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.eventAffect|filterEventAffect}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">事件优先级</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.eventPri|filterEventPri}}</span>
					</cell>
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">拟稿部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgName}}</span>
					</cell>
        </group>
        </p>
		</group>
      <!--督办关联事件内容结束-->
      <!--督办内容开始-->
      <group :gutter="10" >
			<cell
				:title="('督办内容')"
				is-link
				:border-intent="false"
				:arrow-direction="showSupervisionContent ? 'up' : 'down'"
				@click.native="showSupervisionContent = !showSupervisionContent">
			</cell>
			<p class="slide" :class="showSupervisionContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="4em" label-align="right" label-margin-right="1.0rem" >
          <cell value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">督办内容</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.supervisionDesc}}</span>
					</cell>
       </group>
        </p>
		</group>
      <!--督办内容结束-->
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
    XButton,
  },
  data() {
    return {
      showEventContent: false,
      showSupervisionContent: false,
      supervisionInfoList: [],

    }
  },
  created: function () {
    //console.log(1)
     const businessKey = this.businessKey;
    const processKey = this.processKey;
    console.log("督办管理流程>>>>>>>>>>>>>>>>>" + processKey + ">>>>>>>>" + businessKey);
  },
  mounted: function () {
    //只执行一次
    //console.log(2)
     this.initPageData();
  },
  destroyed() {
    this.supervisionInfoList = [];
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
        this.supervisionInfoList = returnMap.businessKeyDetail;
        this.$store.commit('updatFormDetail',this.supervisionInfoList);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载工单详情异常，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    },
      handleSumbitWorkOrderTaskClick(){
        let item=this.supervisionInfoList[0];
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
