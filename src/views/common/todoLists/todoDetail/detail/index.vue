<template>
<div id="index">
  <eventManage v-if="processKey==='eventManage'"  :processKey="processKey" :businessKey="businessKey"></eventManage>
  <requirement v-else-if="processKey==='requirement'"   :processKey="processKey" :businessKey="businessKey"></requirement>
  <resourcesApply v-else-if="processKey==='resourcesApply'"   :processKey="processKey" :businessKey="businessKey"></resourcesApply>
  <versionManageProcess v-else-if="processKey==='versionManageProcess'"   :processKey="processKey" :businessKey="businessKey"></versionManageProcess>
  <assistHandleProcess v-else-if="processKey==='assistHandleProcess'"  :processKey="processKey" :businessKey="businessKey"></assistHandleProcess>
  <supervision v-else-if="processKey==='supervision'"   :processKey="processKey" :businessKey="businessKey"></supervision>
  <issues v-else-if="processKey==='issues'"  :processKey="processKey" :businessKey="businessKey"></issues>
  <onlineAcceptance v-else-if="processKey==='onlineAcceptance'"   :processKey="processKey" :businessKey="businessKey"></onlineAcceptance>
  <dispatch v-else-if="processKey==='dispatch'"  :processKey="processKey" :businessKey="businessKey"></dispatch>
</div>
</template>

<script>
import resourcesApply from './resourcesApply' //资源管理流程
import requirement from './requirement' //需求管理流程
import versionManageProcess from './versionManageProcess' //版本管理流程
import assistHandleProcess from './assistHandleProcess' //协办管理流程
import eventManage from './eventManage' //事件管理流程
import supervision from './supervision' //督办管理流程
import issues from './issues' //问题管理流程
import onlineAcceptance from './onlineAcceptance' //IT项目/系统上线验收流程
import dispatch from './dispatch' //集团任务派发流程

import {
  Flexbox,
  FlexboxItem,
  CellBox,
  Group,
  Cell,
  ViewBox,
  CellFormPreview
} from 'vux'

export default {
  name: "index",
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
    resourcesApply,
    requirement,
    versionManageProcess,
    assistHandleProcess,
    eventManage,
    supervision,
    issues,
    onlineAcceptance,
    dispatch,

  },
  data() {
    return {}
  },
  created: function() {
    const processType = this.processKey;
  },
  mounted: function() {
    //只执行一次
    //console.log(2)
  },
  destroyed() {

  },
  filters: {
    /*  filterType: function (value) {
       if (value == 'group') {
         value = '未领取';
       } else if (value == 'person') {
         value = '已领取';
       }
       return value;
     }, */
    /*   filterBtnTxt: function (value) {
        if (value == 'waitPay') {
          value = '立即支付';
        } else if (value == 'waitGet') {
          value = '确认收货';
        } else if (value == 'waitAccess') {
          value = '立即评价';
        }
        return value;
      } */
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
</style>
