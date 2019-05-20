<template>
<div class="main-container">
  <view-box>
    <div class="content" v-if="activeFlow==='eventManage'">
      <eventApplyForm v-if="activeForm==='eventApplyForm'"></eventApplyForm>
      <eventControlForm v-else-if="activeForm==='eventControlForm'"></eventControlForm>
      <preEventHandleForm v-else-if="activeForm==='preEventHandleForm'"></preEventHandleForm>
      <eventHandleForm v-else-if="activeForm==='eventHandleForm'"></eventHandleForm>
      <worksheetReviewForm v-else-if="activeForm==='worksheetReviewForm'"></worksheetReviewForm>
      <declarationConfirmationForm v-else-if="activeForm==='declarationConfirmationForm'"></declarationConfirmationForm>
    </div>
   <!--  <div class="content" v-if="activeFlow==='assistHandleProcess'">
      <ondev></ondev>
    </div> -->
    <ondev v-else></ondev>
  </view-box>
</div>
</template>

<script>
import {
  ViewBox,
} from 'vux';
//事件
import eventApplyForm from './eventManage/eventApplyForm';
import eventControlForm from './eventManage/eventControlForm';
import preEventHandleForm from './eventManage/preEventHandleForm';
import eventHandleForm from './eventManage/eventHandleForm';
import worksheetReviewForm from './eventManage/worksheetReviewForm';
import declarationConfirmationForm from './eventManage/declarationConfirmationForm';

import ondev from '../../../../components/ondev'
export default {
  data() {
    return {
      activeForm: '',//表单
      activeFlow: '',//流程
    };
  },
  components: {
    ViewBox,
    eventApplyForm,//工单申告
    eventControlForm,//一线处理
    preEventHandleForm, //工单分派
    eventHandleForm, //二线处理
    worksheetReviewForm, //工单复核
    declarationConfirmationForm, //申告人确认
    ondev,//在开发中

  },
  created() {
    let formDataMap=JSON.parse(this.$route.query.formDataMap);
    this.activeFlow = formDataMap.processDefinitionKey;
    this.activeForm = formDataMap.taskLinkInfoVo.form;
    console.log("activeFlow", this.activeFlow);
    console.log("activeFrom ", this.activeForm);
  },
  mounted() { //只执行一次
    //console.log(2)
  },
  destroyed() {},
  filters: {},
  methods: {

  }
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  .content {
    position: relative;
    max-width: 640px;
    min-width: 320px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
