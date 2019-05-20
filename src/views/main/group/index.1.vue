<template>
  <div>
    <header class="head">顶部固定区域</header>
    <article
      class="main"
       id="wrapper"
    >  
          <div>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
            <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
             <p>当内容欲出隐藏时，灰色区域可上下拖动</p>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
                <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
          <input
          type="text"
          value=""
          class="inputtext"
        > <br>
          <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
           <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
            <input
          type="text"
          value=""
          class="inputtext"
        > <br>
             content <br>
            content <br>
            content <br>
            content <br>
            content <br>
            content <br>
            content <br>
            content <br>
            content <br>
          </div>
    </article>
    <footer class="foot">底部固定区域</footer>
  </div>
</template>


<script>
import {
  Tab,
  TabItem,
  Sticky,
  Divider,
  XButton,
  XHeader,
  Cell,
  Group,
  Swiper,
  SwiperItem
} from "vux";
import jsonData from "../../../../static/datas/workOrder.json";
import homeSwiperImageRes from "../../../../static/datas/homeSwiperImageLists.json";
export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    XHeader,
    Cell,
    Group,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      homeSwiperImageList: [
        {
          url: "javascript: void(0);",
          imgName: "itsm_logo"
        }
      ], //首页图片
      activeTab: "0",
      orderFunList: jsonData.orderFunList, //工单处理功能
      outBoundFunList: jsonData.outBoundFunList, //外呼客户
      selfServiceList: jsonData.selfServiceList //自助服务
    };
  },
  created() {}, //初始化
  mounted() {
    //只执行一次
    //获取轮播图片数据
    if (homeSwiperImageRes != undefined) {
      this.homeSwiperImageList = this.homeSwiperImageList.concat(
        homeSwiperImageRes.data
      );
    }
  },
  destroyed() {},
  methods: {
    handleTabItemClick(index) {
      console.log("on-before-index-change", index);
      this.$vux.loading.show({
        text: "loading"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.activeTab = index;
      }, 1000);
    },
    handleActions(item, actionType) {
      console.log("进入待办详情", item);
      switch (actionType) {
        case "orderTask":
          this.$router.push({
            name: actionType,
            query: {
              title: item.title
            }
          });
          break;
        case "groupDetail":
          this.$router.push({
            name: actionType,
            params: {
              id: compile(item.id)
            }
          });
          break;
        case "todoSearchCancel":
          this.isSearching = false;
          this.search.active = true;
          this.$nextTick(() => {
            /*   this.initNavStyle();
              this.initDetailsByType(this.activeTab); */
          });
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.head,
.foot {
  position: fixed;
  left: 0;
  height: 38px;
  line-height: 38px;
  width: 100%;
  background-color: #99cc00;
}
.head {
  top: 0;
}
.foot {
  bottom: 0;
}
.main {
  position: fixed;
  top: 38px;
  bottom: 38px;
  width: 100%;
  overflow: scroll;
  background-color: #bababa;
}
</style>