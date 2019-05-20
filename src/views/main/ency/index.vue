<template>
<div class="reset-cell" style="font-size: 1.4rem;background-color: #ffffff;height: 100vh;overflow: auto;margin-bottom: 44px;">
  <!--头部固定-->
  <header style="position: fixed;top: 0;left: 0;right: 0;z-index: 20;">
    <x-header class="reset-header" :left-options="{backText: '返回'}">待办管理</x-header>
    <search v-model="searchValue" position="absolute" auto-scroll-to-top placeholder="输入部门名称、成员名称" top="46px" ref="search"></search>
  </header>
  <section style="margin-top: 90px;">
    <div class="task-list">
      <div class="types">
        <div class="type f12" @click="handleTypeChange(type)">
          444444
        </div>
        <div class="type f12" @click="handleTypeChange(type)">
          444444
        </div>
        <div class="type f12" @click="handleTypeChange(type)">
          444444
        </div>
        <div class="type f12" @click="handleTypeChange(type)">
          444444
        </div>
        <div class="type f12" @click="handleTypeChange(type)">
          444444
        </div>
        <!--  <div class="type f12" :class="{'type-active': activeTypes[activeTab]===type.code}" v-for="type in types" :key="type.code" @click="handleTypeChange(type)">
          444444
        </div> -->
      </div>
      <div class="block">
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <!--内容...-->
          <div class="block-content items" @click="handleActions(item, 'todoDetail')" v-for="item in moreTaskList" :key="item.businessKey">
            <div class="content-main  group-content-main">
              <div class="info">
                <div class="info-item">
                  <span class="f14 info-span-item-title">{{item.worksheetTitle}}</span>
                </div>
                <div class="info-item">
                  <span>
                        <span class="f12 c999">{{item.processName}}</span>
                  </span>
                  <span>
                        <span class="f12 c999">{{item.createTime|formatDate}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import Scroll from '../../../components/mescroll/Scroll.vue'
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'
import {
  formatDate
} from '../../../utils/date';
import {
  Search,
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Rater,
  Group,
  LoadMore,
  XHeader,
} from 'vux';

export default {
  name: '',
  props: {
    taskType: {
      type: [String, Number],
      required: false
    }
    /* , router: {
       type: [String, Number],
       required: false
     },
     businessKey: {
       type: [String, Number],
       required: false
     } */
  },
  data() {
    return {
      types: [],
      searching: false,
      searchText: '',
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
          src: "../../../components/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮

        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "../../../components/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      moreTaskList: [] // 列表数据
    }
  },
  components: {
    Search,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Rater,
    Group,
    LoadMore,
    XHeader,
    MescrollVue, // 注册mescroll组件
  },
  created() {

  }, //初始化
  mounted() {
    //只执行一次
    //this.getTaskWorderList(); //获取待办信息

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
  beforeRouteEnter(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  methods: {
    ...mapActions(["queryPersonalTask", "queryGroupTask"]),

    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    async upCallback(page, mescroll) {
      // 联网请求
      let result = {};
      const sendInfo = {
        headers: {
          userId: this.storejs.get("LoginUserId"),
        },
        Jsondata: {
          pageSize: page.num, // 页码
          pageNo: page.size // 每页长度
        }
      };
      // 请求的列表数据
      if (this.taskType === "group") {
        result = await this.queryGroupTask(sendInfo);
      } else {
        result = await this.queryPersonalTask(sendInfo);
      }
      console.log("待办返回信息", result);
      let res = {};
      if (this.taskType === "group") {
        res = result.data.groupTasks;
      } else {
        res = result.data.personTasks;
      }
      if (res.length > 0) {
        // 如果是第一页需手动制空列表
      if (page.num === 1) this.moreTaskList = []
      // 把请求到的数据添加到列表
      this.moreTaskList = this.moreTaskList.concat(res)
      // 数据渲染成功后,隐藏下拉刷新的状态
      this.$nextTick(() => {
        mescroll.endSuccess(res.length)
      })
      }

    },
    /* async upCallback(page) {
      let result = {};
      const sendInfo = {
        headers: {
          userId: this.storejs.get("LoginUserId"),
        },
        Jsondata: {
          pageSize: page.num, // 页码
          pageNo: page.size // 每页长度
        }
      };
      if (this.taskType === "group") {
        result = await this.queryGroupTask(sendInfo);
      } else {
        result = await this.queryPersonalTask(sendInfo);
      }
      console.log("待办返回信息", result);
      let res = {};
      if (this.taskType === "group") {
        res = result.data.groupTasks;
      } else {
        res = result.data.personTasks;
      }
      if (res.length > 0) {
        this.$refs.mescroll.endSuccess(res.length);
        this.moreTaskList = this.moreTaskList.concat(res)
      }
    }, */

    /*  async initTaskTypeList(type) {},
     async getTaskWorderList(fun, c) {
       let result = {};
       const sendInfo = {
         headers: {
           userId: this.storejs.get("LoginUserId"),
         },
         Jsondata: {
           pageSize: this.pageSize,
           pageNo: 10
         }
       };
       this.$vux.loading.show({
         text: "努力加载中"
       });
       if (this.taskType === "group") {
         result = await this.queryGroupTask(sendInfo);
       } else {
         result = await this.queryPersonalTask(sendInfo);
       }
       console.log("待办返回信息", result);
       this.$vux.loading.hide();
       if (result.meta.success == true) {
         let res = {};
         if (this.activeTab === "group") {
           res = result.data.groupTasks;
         } else {
           res = result.data.personTasks;
         }
         if (this.pageSize == 1) {
           if (this.activeTab === "group") {
             this.groupTaskList = [];
             this.totalPage = Math.ceil(this.groupBadge / 10); //总页数
           } else {
             this.personTaskList = [];
             this.totalPage = Math.ceil(this.personBadge / 10); //总页数
           }
         }
         if (res.length > 0) {
           console.log("数据", res);
           let morTaskWorkOrderList = [];
           res.forEach(function (item, idx) {
             morTaskWorkOrderList.push(item);
           });

           if (this.activeTab === "group") {
             this.groupTaskList = morTaskWorkOrderList;
           } else {
             this.personTaskList = morTaskWorkOrderList;
           }
           this.onFetching = false;
         }
         if (c == 2) {
           fun();
         }
       }
       //groupTaskList: undefined, //组待办
       // personTaskList: undefined, //个人待办

     }, //获取工单信息 */
    /*  onInfinite(done) {
      console.log("进来了>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.totalPage, this.page);
      if (this.activeTab === "group") {
        if (this.totalGroupPage >= this.page) {
          this.onFetching = true;
          console.log(this.page);
          this.page = this.page + 1;
          this.getTaskWorderList(done, 2);
        } else {
          self.onFetching = false;
          done();
        }
      } else {
        if (this.totalPersonPage >= this.page) {
          this.onFetching = true;
          console.log(this.page);
          this.page = this.page + 1;
          this.getTaskWorderList(done, 2);
        } else {
          self.onFetching = false;
          done();
        }
      }

    }, //滑动加载更多工单
    async getTaskWorderList(type, size = 1000) {
      this.$vux.loading.show({
        text: '努力加载中'
      });
      let result = [];
      try {
        if (this.activeTypes[this.activeTab] === 'all') {
          const result = await this.getEncyList({
            size: 20,
            category: this.activeTab
          });
          this.encyList = result['materials'] || [];
          for (let ency of this.encyList) {
            this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
          }
        } else {
          result = await this.getEncyList({
            type,
            page: 1,
            size,
            userId: this.currentUserId
          });
          this.encyList = result['materials'] || [];
          for (let ency of this.encyList) {
            this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
            if (ency.focus_id) {
              this.$set(ency, 'isFocused', true);
            } else {
              this.$set(ency, 'isFocused', false);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
      this.$vux.loading.hide();
    },
 */
    handleTabItemClick(type) {
      this.activeTab = type;
      window.sessionStorage.setItem('SeawaterEncyActiveTab', type);
      this.initRandomEncyList(type);
    },

    handleActions(item, actionType) {
      switch (actionType) {
        case 'share':
          this.currentItem = item;
          this.showSharePicker = true;
          break;
        case 'encyDetail':
          this.$router.push({
            name: actionType,
            params: {
              id: item.id
            }
          });
          break;
        case 'encySearch':
          this.searching = true;
          break;
        case 'encySearchCancel':
          this.searching = false;
          this.initRandomEncyList(this.activeTab);
          break;
        case 'focus':
          this.handleFocusEncy(item);
          break;
        default:
          break;
      }
    },

    async handleFocusEncy(ency) {
      const response = await this.focusEncy({
        user_id: this.currentUserId,
        material_id: ency.id
      });

      if (response.status === 'ok') {
        this.$set(ency, 'isFocused', !ency.isFocused);
      }
    },

    async handleTypeChange(type) {
      this.activeTypes[this.activeTab] = type.code;
      window.sessionStorage.setItem(`SeawaterEncy${this.activeTab}ActiveType`, type.code);
      this.initEncyListInType(type.code);
    },

    handleShareTypeChange(shareType) {
      this.shareType = shareType;
    },

    handleCloseSharePicker(closeType) {
      if (closeType) {
        console.log('shareType', this.shareType);
      }
    },

    async handleSearchChange() {
      if (this.searchText) {
        window.clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(async () => {
          const result = await this.getEncyList({
            name: this.searchText,
            page: 1,
            size: 100,
            userId: this.currentUserId
          });
          this.encyList = result['materials'] || [];
          for (let ency of this.encyList) {
            this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
          }
        }, 500);
      }
    },

    mapLevel(levelCode) {
      switch (levelCode) {
        case 'ry':
          return 1;
        case 'yb':
          return 3;
        case 'kn':
          return 5;
      }
    }
  }
};
</script>

<style lang="less" scoped>
  /*以fixed的方式固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
.nav {
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 44px;
  height: 0;

  .vux-tab {
    height: 38px;
  }

  .tab-container {
    .text {
      color: #9b9b9b;
    }

    .tab-item-container {
      line-height: 38px;
    }

    .vux-tab-selected {
      .text {
        color: #28b1ea;
      }
    }
  }
}

.mT40 {
  margin-top: 40px;
}

.task-list {
  /* margin-bottom: 50px; */
  /*  padding-bottom: 20px; */

  /* ;

    height:300px; */
  .types {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .type {
      width: 10.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      margin: 0.5rem 0.5rem 0 0.6rem;
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
}
</style>
