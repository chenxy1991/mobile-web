<template>
<div class="todoTypeList" id="todoTypeList" >
  <div class="reset-cell" style="font-size: 1.4rem;background-color: #ffffff;height: 100vh;">
    <header class="head">
      <x-header class="reset-header" :left-options="{backText: ''}">{{type|filterType}}待办列表
      </x-header>
    </header>
    <main>
  <!--mescroll滚动区域的基本结构-->
  <mescroll-vue id="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <article>
      <group :gutter="0">
      <cell  :border-intent="false" :title="item.processName" is-link @click.native="handleTaskFlowTypeClick(item, 'todoType')" v-for="(item,idx) in todoTaskFlowTypeLists" :key="idx"   >
         <span class="taskIndex" slot="icon" width="20" style="display:inline-block;margin-right:0.5rem;">{{idx+1}}</span>
         <div>
           <span style="color: red">{{item.tasknum}}</span>
         </div>
         <!-- <div slot="inline-desc">
           <label class="f12 c999 ">{{item.taskId}}</label>
					 <label class="f12 c999 ">{{item.createUserName}}</label>
         </div> -->
      </cell>
      </group>
     <div v-if="todoTaskFlowTypeLists.length<5">
          <load-more :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>
    </div>
    </article>
   </mescroll-vue>
   </main>
  </div>
</div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import {
  mapActions
} from 'vuex';
import {
  Group,
  Cell,
  Badge,
  XHeader,
  Search,
  LoadMore
} from "vux";
export default {
  name: "todoTypeList",
  components: {
    Group,
    Cell,
    Badge,
    XHeader,
    Search,
    LoadMore,
    MescrollVue
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
			mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          //回到顶部按钮
          src: "static/images/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "static/images/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      todoTaskFlowTypeLists: [],//流程类型集合
      type: '',//个人/组待办类型
    };
  },

  created: function () {
    console.log(1)
    const processType = this.$route.query.type;
    this.type = processType;
  },
  mounted: function () { //只执行一次
    console.log(2)

  },
  destroyed: function () {
    console.log(3)
    this.todoTaskFlowTypeLists = [];
  },
  filters: {
    filterType: function (value) {
      if (value == 'group') {
        value = '未领取';
      } else if (value == 'person') {
        value = '已领取';
      }
      return value;
    },
  },
  methods: {
    ...mapActions([
      'queryTodoTaskFlowTypeLists',
    ]),
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      const processType = this.$route.query.type;
      this.runQueryTodoTaskFlowTypeListsApi(processType,page,mescroll);
    },
    async runQueryTodoTaskFlowTypeListsApi(processType,page,mescroll) {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
        const sendInfo = {
          headers: {
            userId:userId,
          },
          Jsondata: {
            'type': processType,
            "pageSize": page.num, // 页码
            "pageNo": page.size, // 每页长度
          }
        };
        this.$vux.loading.show({text: '努力加载中'});
        result = await this.queryTodoTaskFlowTypeLists(sendInfo);
         this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        console.error(error);
        this.showToast(false,'warn','请求工单流程类型异常，原因:' + error+",请稍后再试!");
      }
      console.log("待办类型初始化", result);
      if (result.meta.success == true) {
        let map=result.data.map;
        let arr = map.taskTypeFlowList;
         // 如果是第一页需手动制空列表
        if (page.num === 1){
           this.todoTaskFlowTypeLists = []
        }
        // 把请求到的数据添加到列表
        this.todoTaskFlowTypeLists =this.todoTaskFlowTypeLists.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn','页面加载异常，原因:' +failDesc+","+ failCaused);
        //跳转到404页面
      }
    },
    handleTaskFlowTypeClick(item, actionType){
       this.$router.push({
            name: actionType,
            query: {
              processName: item.processName,
              processKey: item.processDefinitionKey,
              processType: this.type,
            }
          });
    },
  },
};
</script>
<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  height: 4.6rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}

.head {
  top: 0;
}

main{
      position: fixed;
      top: 4.6rem;
      bottom: 0rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
</style>
<style lang="less" scoped>
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 4.6rem;
  bottom: 0;
  height: auto;
}
 /* main {
      padding: 4.6rem 0 0 0;
      height: 100vh;
      width:100wh;
      overflow-y: scroll;
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
  } */
</style>
<style lang="less" scoped>
.taskIndex {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.4rem;
    text-align: center;
    border-radius: 50%;
    margin-bottom: 0.5rem;
    color: rgb(28, 130, 212);
    background-color: rgb(205, 228, 255);
}

 /*  .pT05Rem {
    padding-top: 0.5rem;
    margin-top: 0 !important;
  } */

</style>
