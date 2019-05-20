<template>
<div>

    <main class="main">
      <view-box>
      <home v-if="activeIndex===0"></home>
      <ency v-else-if="activeIndex===1"></ency>
      <group v-else-if="activeIndex===2"></group>
      <tool v-else-if="activeIndex===3"></tool>
      <mine v-else-if="activeIndex===4"></mine>
      </view-box>
    </main>

    <tabbar slot="bottom">
      <tabbar-item :selected="activeIndex===0" @on-item-click="handleTabItemClick(0)">
        <img src="../../assets/tabbar/menu1_off.svg" slot="icon">
        <img src="../../assets/tabbar/menu1_on.svg" slot="icon-active">
        <span slot="label">首页</span>
      </tabbar-item>
     <!--  <tabbar-item :selected="activeIndex===1" @on-item-click="handleTabItemClick(1)">
        <img src="../../assets/tabbar/menu2_off.svg" slot="icon">
        <img src="../../assets/tabbar/menu2_on.svg" slot="icon-active">
        <span slot="label">提单</span>
      </tabbar-item> -->
      <!-- <tabbar-item :selected="activeIndex===2" @on-item-click="handleTabItemClick(2)">
        <img src="../../assets/tabbar/menu3_off.svg" slot="icon">
        <img src="../../assets/tabbar/menu3_on.svg" slot="icon-active">
        <span slot="label">测试</span>
      </tabbar-item>
      <tabbar-item :selected="activeIndex===3" @on-item-click="handleTabItemClick(3)">
        <img src="../../assets/tabbar/menu4_off.svg" slot="icon">
        <img src="../../assets/tabbar/menu4_on.svg" slot="icon-active">
        <span slot="label">应用</span>
      </tabbar-item> -->
      <tabbar-item :selected="activeIndex===4" @on-item-click="handleTabItemClick(4)">
        <img src="../../assets/tabbar/menu5_off.svg" slot="icon">
        <img src="../../assets/tabbar/menu5_on.svg" slot="icon-active">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>

</div>
</template>

<script>
import {
  ViewBox,
  Tabbar,
  TabbarItem
} from 'vux';
import Home from './home/index.vue';
import Ency from './ency/index.vue';
import Group from './group/index.vue';
import Tool from './tool/index.vue';
import Mine from './mine/index.vue';
import {isEmpty} from '../../utils/common'
export default {
  data() {
    return {
      activeIndex: '',
    };
  },

  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    Home,
    Ency,
    Group,
    Tool,
    Mine
  },
  created: function () {

  },
  mounted: function () { //只执行一次
   let index=this.storejs.get("activeIndex");
  if(isEmpty(index)){
    this.activeIndex =0;
  }else{
    this.activeIndex =index;
  }
    //console.log(2)
  },
  destroyed() {},
  filters: {},
  methods: {
    handleTabItemClick(index) {
      if (index !== this.activeIndex) {
        this.storejs.set("activeIndex",index);
        this.activeIndex = index;
      }
    },

  }
};
</script>

<style lang="less" scoped>
main {
    padding: 0 0;
    overflow-y: scroll;
    height: 100vh;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
  }

/* main{
      background-color: #fff;
      padding: 0 0;
      width: 100vw;
      height: 100vh;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
  } */
</style>
