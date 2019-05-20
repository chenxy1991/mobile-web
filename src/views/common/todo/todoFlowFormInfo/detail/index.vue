<template>
<div id="index">
  <eventManage v-if="processKey==='eventManage'"  :formDataMap="formDataMap" ></eventManage>
  <requirement v-else-if="processKey==='requirement'"   :formDataMap="formDataMap" ></requirement>
  <resourcesApply v-else-if="processKey==='resourcesApply'"   :formDataMap="formDataMap" ></resourcesApply>
  <versionManageProcess v-else-if="processKey==='versionManageProcess'"   :formDataMap="formDataMap"  ></versionManageProcess>
  <assistHandleProcess v-else-if="processKey==='assistHandleProcess'"  :formDataMap="formDataMap"  ></assistHandleProcess>
  <supervision v-else-if="processKey==='supervision'"   :formDataMap="formDataMap" ></supervision>
  <issues v-else-if="processKey==='issues'"  :formDataMap="formDataMap" ></issues>
  <onlineAcceptance v-else-if="processKey==='onlineAcceptance'"  :formDataMap="formDataMap" ></onlineAcceptance>
  <dispatch v-else-if="processKey==='dispatch'" :formDataMap="formDataMap"  ></dispatch>
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


export default {
  name: "index",
  props: {
    processKey: {
      type: String,
      required: false
    },
    formDataMap: {
      type: Object,
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
