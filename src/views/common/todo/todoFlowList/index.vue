<template>
<div class="todoFlowList"  id="todoFlowList">
  <div class="reset-cell"  style="font-size: 1.4rem;background-color: #ffffff;height: 100vh;">
    <header class="head">
      <x-header class="reset-header" :left-options="{backText: ''}">{{title}}
      </x-header>
       <search   @result-click="resultClick"
              placeholder="输入流程名称、流程类型、标题"
              @on-change="getResult"
              :results="results"
              v-model="keyWord"
              position="absolute"
              auto-scroll-to-top top="46px"
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit" ref="search">
      </search>
    </header>
  <!--mescroll滚动区域的基本结构-->
  <main>
  <mescroll-vue ref="mescroll" id="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
    <article>
    <!--内容...-->
   <div class="types" v-if="taskLinkTypeList.length>0">
      <div class="type f12" :class="{'type-active':type.isActive}" v-for="(type,index) in taskLinkTypeList" @click="handleTaskLinkTypeChange(type)" :key="index">
        {{type.taskLinkName}}
      </div>
    </div>
    <div class="block">
      <div class="block-content items" @click="handleActions(item, 'todoFlowFormInfo')" v-for="(item,index) in dataList" :key="index">
        <div class="content-main  group-content-main">
          <div class="info" :class="{'grey-bg': index % 2 == 0}">
            <div class="info-item">
              <span class="f14 info-span-item-title">{{item.worksheetTitle}}</span>
            </div>
            <div class="info-item">
              <span>
                  <span class="f12 c999">{{item.processName}}</span>
              </span>
              <span>
                  <span class="f12 c999">{{item.taskName}}</span>
              </span>
              <span>
                  <span class="f12 c999">{{item.createTime|formatDate}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div v-if="dataList.length<5">
          <load-more :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>
    </div>
    </article>
  </mescroll-vue>
  </main>
  </div>
</div>
</template>

<script>
import FilterBar from '../../../../components/vueFilterBar/FilterBar'
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'
import {isEmpty} from '../../../../utils/common'
import {
  mapActions
} from 'vuex';
import {
  formatDate
} from '../../../../utils/date.js';
import {
  Group,
  Cell,
  XHeader,
  Search,
} from "vux";
export default {
  name: "todoFlowList",
  components: {
    Group,
    Cell,
    XHeader,
    FilterBar,
    Search,
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      taskLinkTypeList: [{
        isActive: true,
        taskLinkCode: "all",
        taskLinkName: "全部"
      }], //任务环节类型
      taskLinkCode:undefined, //流程任务环节编码
      title: '',//标题
      keyWord:'',//搜索关键子
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
          src: "../../../../../static/images/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "../../../../../static/images/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [] // 列表数据
    }
  },
  beforeRouteEnter(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  created: function () {
    const {processKey,todoType,processName} = this.$route.query;
    this.title = processName;
  },
  mounted: function () { //只执行一次
    this.initPageData();
  },
  destroyed() {},
  filters: {
    formatDate(time) {
      if (time != null) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  },
  methods: {
    ...mapActions([
      'queryToDoTaskCodeByType',
      'queryToDoTaskDetailByType',
      'queryToDoDetailLikeKeyWord',
    ]),
    initPageData(){
      this.runQueryToDoTaskCodeByTypeApi();
    },
    async runQueryToDoTaskCodeByTypeApi() {
      const {
        processKey,
        todoType,
        processName
      } = this.$route.query;
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
        const sendInfo = {
          headers: {
            userId: userId,
          },
          Jsondata: {
            "processKey": processKey,
            "todoType": todoType,
          }
        };
        this.$vux.loading.show({	text: '加载中...'});
        result = await this.queryToDoTaskCodeByType(sendInfo);
        this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        this.alert('初始化流程编码失败，原因:' + error);
      }
      console.log("结果集queryToDoTaskCodeByType>>>>>>>>", result);
      if (result.meta.success == true) {
        let resMap = result.data.map;
        let toDoTaskCode = resMap.toDoTaskCode;
         for (let taskLinkType of toDoTaskCode) {
          this.$set(taskLinkType, 'isActive', false);
        }
        this.taskLinkTypeList = this.taskLinkTypeList.concat(toDoTaskCode);
        console.log("taskLinkTypeList>>>>>>>>",toDoTaskCode);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.alert('请求流程环节类型异常，原因:' +failDesc+","+ failCaused);
      }
    },//初始化环节名称类型
    handleTaskLinkTypeChange(data) {
      this.taskLinkTypeList.forEach(function (obj) {
        obj.isActive = false;
      });
      data.isActive = !data.isActive;
      console.log("点击", data);
      if (data.taskLinkCode === 'all') {
        //刷新当前页面加载全部
        this.taskLinkCode = undefined;
      } else {
        this.taskLinkCode = data.taskLinkCode;
      }
      let page = {
        "num": 1,
        "size": 10,
        "time": null
      }
      this.upCallback(page, this.mescroll);
    },//点击流程环节类型触发事件
    //搜索框相关
    setFocus() {
      this.$refs.search.setFocus()
    },
    onSubmit() {
      this.$refs.search.setBlur()
      let page = {
        "num": 1,
        "size": 10,
        "time": null
      }
      console.log("mmm",this.keyWord);
      this.upCallback(page, this.mescroll);
    },
    onFocus() {
      console.log('on focus')
    },
    onCancel() {
      console.log('on cancel');
       let page = {
        "num": 1,
        "size": 10,
        "time": null
      }
      this.keyWord="";
      console.log("mmm",this.keyWord);
      this.upCallback(page, this.mescroll);
    },
     // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      // 联网请求
       // 联网请求
      if(isEmpty(this.keyWord)){
       //获取流程编码
      this.getAsyncTodoDetail(page, mescroll);
      }else{
      this.getAsyncTodoDetailLikeKeyWord(page, mescroll);
      }
    },
    async getInitData() {
      //获取流程编码
      this.getAsyncTodoTaskCode();
    },
    async getAsyncTodoDetail(page, mescroll) {
      let result = {};
      const {processKey,todoType,processName} = this.$route.query;
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
        const sendInfo = {
          headers: {
            userId: userId,
          },
          Jsondata: {
            "taskCode": this.taskLinkCode,//环节任务编码
            "processKey": processKey,
            "todoType": todoType,
            "pageSize": page.num, // 页码
            "pageNo": page.size, // 每页长度
          }
        };
        this.$vux.loading.show({	text: '努力加载中'});
        result = await this.queryToDoTaskDetailByType(sendInfo);
        this.$vux.loading.hide();
      } catch (error) {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
        console.error(error);
        this.alert('请求工单详情失败，原因:' + error);
      }
      console.log(">>>>>>>>queryToDoTaskDetailByType结果集：", result);
      if (result.meta.success == true) {
        // 请求的列表数据
        let map=result.data.map;
        let arr =map.toDoDetail;
        //let arr =[];
        // 如果是第一页需手动制空列表
        if (page.num === 1){
           this.dataList = []
        }
        // 把请求到的数据添加到列表
        this.dataList = this.dataList.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.alert('下拉刷新列表失败，原因:' +failDesc+","+ failCaused);
      }
    },
    async getAsyncTodoDetailLikeKeyWord(page, mescroll) {
      let result = {};
      const {processKey,todoType,processName} = this.$route.query;
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
        const sendInfo = {
          headers: {
            userId: userId,
          },
          Jsondata: {
            "taskCode": this.taskLinkCode,//环节任务编码
            "processKey": processKey,
            "todoType":todoType,
            "keyWord":this.keyWord,
            "pageSize": page.num, // 页码
            "pageNo": page.size, // 每页长度
          }
        };
        this.$vux.loading.show({	text: '努力加载中'});
        result = await this.queryToDoDetailLikeKeyWord(sendInfo);
        this.$vux.loading.hide();

      } catch (error) {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
        console.error(error);
        this.alert('搜索工单详情失败，原因:' + error);
      }
      //const resJsonData = JSON.stringify(result);
      console.log(">>>>>>>>queryToDoDetailLikeKeyWord结果集:", result);
      if (result.meta.success == true) {
        // 请求的列表数据
        let arr = result.data.map.toDoDetail;
        //let arr =[];
        // 如果是第一页需手动制空列表
        if (page.num === 1){
          this.dataList = []
        }
        // 把请求到的数据添加到列表
        this.dataList = this.dataList.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.alert('下拉刷新列表失败，原因:' +failDesc+","+ failCaused);
      }
    },

    handleActions(item, actionType) {
      console.log(item);
      switch (actionType) {
        case 'todoFlowFormInfo':
          this.$router.push({
            name: actionType,
            query: {
              businessKey: item.businessKey,
              taskInfoId: item.taskInfoId,
            }
          });
          break;
        case 'return':
          this.$router.go(-1);
          break;
        case 'search':
          this.isSearching = true;
          this.searchText = '';
          this.$nextTick(() => {
            this.$refs.todoSearch.setFocus();
            this.taskTypeDetailList = [];
          });
          break;
        case 'todoSearchCancel':
          this.isSearching = false;
          this.$nextTick(() => {
            this.getInitData();
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  height: 9rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}

.head {
  top: 0;
}

main{
      position: fixed;
      top: 9rem;
      bottom: 0rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
   /*以fixed的方式固定mescroll的高度*/
   .mescroll {
    position: fixed;
    top:9rem;
    bottom: 0;
    height: auto;
  }
</style>
<style lang="less" scoped>


 /* main {
      padding: 9rem 0 0 0;
      height: 100vh;
      overflow-y: scroll;
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
  } */
 /*  .box{
  //overflow-y: scroll;
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
	} */
</style>
<style lang="less" scoped>
  .grey-bg {
    background-color: #eee;
  }
.types {
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .type {
    width: 10.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: 0.3rem 0.3rem 0;
    background-color: #fff;
    color: #28b1ea;
    text-align: center;
    border: 0.1rem solid #39b7f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 6px;
  }

  .type-active {
    background-color: #28b1ea;
    color: #fff;
  }
}
    .block-content {
      width: 100%;
      padding: 0 0.05rem 0.07rem 0.05rem;
      box-sizing: border-box;
      .content-main {
        background: #fff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .group-content-main {
        height: 9rem;

        .avatar {
          padding: 0 0.5rem;

          img {
            width: 8.2rem;
            height: 8.6rem;
            vertical-align: middle;
            border-radius: 4px;
          }
        }

        .info {
          flex: 1;
          height: 100%;
          box-sizing: border-box;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-bottom: 0.5px solid #ccc;

          .info-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .info-span-item-title {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
    }



  /**背景图片这里背景容器要写成相对位置*/
  .aaa {
    background: url('../../../../assets/home/icon-screen.png');
    width: 100px;
    height: 100px;
    position: relative;
  }

  /**挡在前边的图，这里要是用相对位置我标红了*/
  .bbb {
    background: url('../../../../assets/home/icon-screen.png');
    width: 10px;
    height: 10px;
    position: absolute;
    top: 30px;
    left: 325px;
  }

</style>
