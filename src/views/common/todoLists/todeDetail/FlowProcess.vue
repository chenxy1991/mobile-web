<template>
<div class="home-container" id="flow">
  <box gap="10px 10px">
    <aside class="flow-aside">
      <div class="flow-encircle">
        <span  class="flow-node" ></span>
        <span class="flow-line"></span>
      </div>
      <div class=""style="padding-top: 10px;">
      <p style="padding: 0 25px;"><span>环节名称:申请</span></p>
      <p style="padding: 0 28px;"><span>处理人:<a>刘娇娇</a></span></p>
      <p style="padding: 0 28px;"><span>处理意见:请协助调查，谢谢</span></p>
      <p style="padding: 0 28px;"><span>附件:</span></p>
      <p style="padding: 0 28px;"><span>2017-02-15 16:30:47</span></p>
      </div>
    </aside>
   <aside class="flow-aside">
      <div class="flow-encircle">
        <span  class="flow-node" ></span>
        <span class="flow-line"></span>
      </div>
      <div style="padding-top: 10px;">
      <p style="padding: 0 25px;"><span>环节名称:</span></p>
      <p style="padding: 0 28px;"><span>处理人:</span></p>
      <p style="padding: 0 28px;"><span>处理意见:</span></p>
      <p style="padding: 0 28px;"><span>附件:</span></p>
      <p style="padding: 0 28px;"><span>2017-02-15 16:30:47</span></p>
      </div>
    </aside>
   <aside class="flow-aside">
      <div class="flow-encircle">
        <span  class="flow-node" ></span>
        <span class="flow-line"></span>
      </div>
      <div style="padding-top: 10px;">
      <p style="padding: 0 25px;"><span>环节名称:</span></p>
      <p style="padding: 0 28px;"><span>处理人:</span></p>
      <p style="padding: 0 28px;"><span>处理意见:</span></p>
      <p style="padding: 0 28px;"><span>附件:</span></p>
      <p style="padding: 0 28px;"><span>2017-02-15 16:30:47</span></p>
      </div>
    </aside>
   <aside class="flow-aside">
      <div class="flow-encircle">
        <span  class="flow-node" ></span>
        <span class="flow-line"></span>
      </div>
      <div style="padding-top: 10px;">
      <p style="padding: 0 25px;"><span>【已创建】环节名称:省公司对口业务部门审核</span></p>
      <p style="padding: 0 28px;"><span>处理人:</span></p>
      <p style="padding: 0 28px;"><span>处理意见:</span></p>
      <p style="padding: 0 28px;"><span>附件:</span></p>
      <p style="padding: 0 28px;"><span>2017-02-15 16:30:47</span></p>
      </div>
    </aside>
     <aside class="flow-aside">
      <div class="flow-encircle">
        <span  class="flow-node" ></span>
      </div>
    </aside>
  </box>
</div>
</template>

<style scoped>
.flow-aside {
  position: relative;
  border-bottom: 1px solid #e5e5e5;
  height: 100px;
}

.flow-encircle {
  width: 10px;
  height: 150px;
  position: absolute;
  left: 10px;
  top: 0;
}

.flow-node {
  display: block;
  width: 12px;
  height: 12px;
  background-color: #c8c8cd;
  border-radius: 50%;
  position: absolute;
  top: -2px;
  left: -5px;
  z-index: 10;
  margin-top: 10px;
}

.flow-line {
  display: block;
  width: 4px;
  height: 100px;
  background-color: #c8c8cd;
  margin-top: 10px;
}
</style>

<script>
import {
  Group,
  Cell,
  Box
} from 'vux'
export default {
  name: 'register',
  data() {
    return {}
  },
  components: {
    Box
  },
  created() {},
  mounted() {

  },
  computed: {},
  methods: {}

}
</script>
