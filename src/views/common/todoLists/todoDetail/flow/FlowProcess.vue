<template>
<div class="timeline-demo">
  <timeline>
    <timeline-item v-for="(item, index) in taskFlowList" :key="index">
      <h4 :class="[item.status === '处理中'? 'recent' : '']">【{{item.status}}】环节名称:{{item.taskName}}</h4>
      <p  style="padding: 0 8px;"><span class="f14 c999 " :class="[item.status === '处理中'? 'recent' : '']"></span></p>
      <p  style="padding: 0 8px;"><span class="f14 c999 " :class="[item.status === '处理中'? 'recent' : '']">处理组/人:{{item.dealOrgPath}}</span></p>
      <p  style="padding: 0 8px;"><span class="f14 c999 " :class="[item.status === '处理中'? 'recent' : '']">所属部门:{{item.defaultOrgPath}}</span></p>
      <p  style="padding: 0 8px;"><span class="f14 c999 " :class="[item.status === '处理中'? 'recent' : '']">处理意见:{{item.dealOpinion}}</span></p>
      <p  style="padding: 0 8px;"><span class="f14 c999 " :class="[item.status === '处理中'? 'recent' : '']" >附件:{{item.file}}</span></p>
      <p  style="padding: 0 8px;"><span class="f12 c999 " :class="[item.status === '处理中'? 'recent' : '']">开始时间:{{item.createTime|formatDate}}</span></p>
      <p  style="padding: 0 8px;"><span class="f12 c999 " :class="[item.status === '处理中'? 'recent' : '']">完成时间:{{item.completeTime|formatDate}}</span></p>
      <p  style="padding: 0 8px;"><span class="f12 c999 " :class="[item.status === '处理中'? 'recent' : '']">环节超时时间:{{item.expirationTime|formatDate}}</span></p>
      <p  style="padding: 0 8px;"><span class="f12 c999 " :class="[item.status === '处理中'? 'recent' : '']">环节耗时时间:{{item.costTime|formatDate}}</span></p>
    </timeline-item>
  </timeline>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'
import {
  formatDate
} from '../../../../../utils/date'
import {
  Timeline,
  TimelineItem,
  XButton
} from 'vux'

export default {
  name: "FlowProcess",
  props: {
    businessKey: {
      type: String,
      required: true
    }
  },
  components: {
    Timeline,
    TimelineItem,
    XButton
  },
  data() {
    return {
      taskFlowList: {}
    }
  },
  created: function () {
    console.log("属性初始化>>>>>>>>>>")
    const businessKey = this.businessKey;
    console.log(">>>>>>>>>>>>>>>>>" + businessKey);

  },
  mounted: function () {
    //只执行一次
    console.log("AJax请求>>>>>>>>>>>>")
    this.initPageData();
  },
  destroyed() {

  },
  filters: {
    formatDate(time) {
       if(time!=null){
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
         }
    }
  },
  methods: {
    ...mapActions([
      'queryFlowInfoByBusinessKey',
    ]),
    initPageData(){
      this.runQueryFlowInfoByBusinessKeyApi();
    },
    async runQueryFlowInfoByBusinessKeyApi() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          'businessKey': this.businessKey,
        }
      };
      this.$vux.loading.show({ text: '努力加载中' });
      result = await this.queryFlowInfoByBusinessKey(sendInfo);
       this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','请求工单流程转向异常，原因:' + error);
      }
       console.log("queryFlowInfoByBusinessKey",result);
      if (result.meta.success == true) {
        let map= result.data.map;
        this.taskFlowList = map.taskInfoOpinion;
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载工单流程转向失败，原因:"+failDesc+'，' + failCaused);
      }
    }
  },

}
</script>

<style lang="less" scoped>
.timeline-demo {
  p {
    color: #888;
    font-size: 0.8rem;
  }

  h4 {
    color: #666;
    font-weight: normal;
  }

  .recent {
    color: rgb(4, 190, 2)
  }
}
</style>
