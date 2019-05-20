<template>
<div class="home">
    <swiper loop auto :aspect-ratio="290/748" interval="6000" class="swiper">
        <swiper-item v-for="(item, index) in homeSwiperImageList" :key="index">
          <img :src="'static/images/home/'+item.imgName+'.png'" @click="handleImageClick(item)" style="background-color: #1B82D1;">
        </swiper-item>
      </swiper>
      <div class="tab-fun">
        <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item :link="{path:'/todoFlowTypeList',query:{type:'person'}}">
            <span class="grid-center">
              <badge v-if="personBadge!=undefined" :text="personBadge" class="item-badge"></badge>
              <img slot="icon" style="height:48px;width:48px;margin-bottom:5px;" src="../../../assets/tabIcon/gdzz.png">
              <br>
              <p style='font-size:12px;color: #adadad;'>已领取待办</p>
            </span>
          </grid-item>
          <grid-item :link="{path:'/todoFlowTypeList',query:{type:'group'}}">
            <span class="grid-center">
              <badge v-if="groupBadge!=undefined" :text="groupBadge" class="item-badge"></badge>
              <img slot="icon" style="height:48px;width:48px;margin-bottom:5px;" src="../../../assets/tabIcon/gdzz.png">
              <br>
              <p style='font-size:12px;color: #adadad;'>未领取待办</p>
            </span>
          </grid-item>
           <!-- <grid-item :link="{path:'/historyWorkOrder',query:{type:'history'}}">
            <span class="grid-center">
              <badge v-if="historyBadge!=undefined" :text="historyBadge" class="item-badge"></badge>
              <img slot="icon" style="height:48px;width:48px;margin-bottom:5px;" src="../../../assets/tabIcon/gdzz.png">
              <br>
              <p style='font-size:12px;color: #adadad;'>历史工单</p>
            </span>
          </grid-item> -->
        </grid>
      </div>
      <div class="nav">
        <sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="0">
          <tab class="tab-container"  bar-active-color="#28b1ea" active-color="#28b1ea">
            <tab-item :selected="activeTab==='person'" badge-background="#38C972" badge-color="#fff" :badge-label="personBadge" @on-item-click="handleTabItemClick('person')">
                <img class="icon-order" :src="timeOrder.img" ref="timeOrderImg" />
              已领取待办
            </tab-item>
           <tab-item :selected="activeTab==='group'" badge-background="#38C972" badge-color="#fff" :badge-label="groupBadge" @on-item-click="handleTabItemClick('group')">
              <img class="icon-order" :src="timeOrder.img" ref="timeOrderImg" />
              未领取待办
            </tab-item>
          </tab>
        </sticky>
        <div class="task-list" >
          <div class="block" v-if="activeTab==='group'">
            <div v-if="!groupTaskList">
              <load-more :tip="'正在加载'"></load-more>
            </div>
            <div class="block-content items" @click="handleWorkDetailClick(item)" v-for="item in groupTaskList" :key="item.businessKey">
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
                  <span class="f12 c999">{{item.taskName}}</span>
                    </span>
                    <span>
                        <span class="f12 c999">{{item.createTime|formatDate}}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="groupBadge>2" class="margin-top10" style="text-align: center;" @click="showMoreTaskList('group')">
              <span style="color:rgb(43,185,249)">显示更多</span>
            </p>
            <p v-else class="margin-top10" style="text-align: center;" @click="showList = true">
              <load-more :show-loading="false" tip=" 我是有底线的" background-color="#fbf9fe"></load-more>
            </p>
          </div>
          <div class="block" v-else-if="activeTab==='person'">
            <div v-if="!personTaskList">
              <load-more :tip="'正在加载'"></load-more>
            </div>
            <div class="block-content items" @click="handleWorkDetailClick(item)" v-for="item in personTaskList" :key="item.businessKey">
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
                  <span class="f12 c999">{{item.taskName}}</span>
                    </span>
                    <span>
                        <span class="f12 c999">{{item.createTime|formatDate}}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="personBadge>2" class="margin-top10" style="text-align: center;" @click="showMoreTaskList('person')">
              <span style="color:rgb(43,185,249)">显示更多</span>
            </p>
            <p v-else class="margin-top10" style="text-align: center;" @click="showList = true">
              <load-more :show-loading="false" tip=" 我是有底线的" background-color="#fbf9fe"></load-more>
            </p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from "vuex";
import {
  Sticky,
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  LoadMore,
  Badge,
  Grid,
  GridItem,
  TransferDom,
} from "vux";
import {
  formatDate
} from '../../../utils/date';
import {
  isEmpty
} from '../../../utils/common.js';
import
homeSwiperImageRes
from '../../../../static/datas/homeSwiperImageLists.json';
import {
  compile,
  formatUrlParams
} from "../../../utils/data";

export default {
  name: "home",
  directives: {
    TransferDom
  },
  data() {
    return {
      userId: '',
      homeSwiperImageList: [{
        url: "javascript: void(0);",
        imgName: "itsm_logo"
      }], //首页图片
      groupBadge: undefined, //组待办条数
      groupTaskList: undefined, //组待办
      personBadge: undefined, //个人待办条数
      personTaskList: undefined, //个人待办
      activeTab: '',//tab切换标识
      timeOrder: {
        type: "default",
        img: require("@/assets/home/icon-order.png")
      }, //待办排序类型，asc升序，desc降序
      taskType: '',//任务类型
      typeList: [],
    };
  },

  components: {
    Sticky,
    Swiper,
    SwiperItem,
    LoadMore,
    Badge,
    Grid,
    GridItem,
    Tab,
    TabItem,
  },
  created() {
    this.activeTab = "person";
  }, //初始化
  mounted() {
    //只执行一次
    //获取轮播图片数据
    if (homeSwiperImageRes != undefined) {
      this.homeSwiperImageList = this.homeSwiperImageList.concat(homeSwiperImageRes.data);
    }
    this.onInitPage(); //初始化
  },
  destroyed() {
    this.groupBadge = undefined; //组待办条数
    this.groupTaskList = undefined; //组待办
    this.personBadge = undefined; //个人待办条数
    this.personTaskList = undefined; //个人待办

  },
  filters: {
    formatDate(time) {
      if (time != null) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  },
  methods: {
    ...mapActions(["queryTaskInfoCount", "queryToDoTaskDetailByType"]),
    async onInitPage() { //初始化页面
      this.runQueryTaskInfoCountApi();
    },

    async runQueryTaskInfoCountApi() {
      //获取待办条数
      let result = {};
       let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
        //获取Tab的条数
        const sendInfo = {
          headers: {
            userId:userId
          },
          Jsondata: {}
        };
        this.$vux.loading.show({	text: '努力加载中'});
        result = await this.queryTaskInfoCount(sendInfo);
        this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        this.showToast(false,'warn','网络请求异常，原因:' + error+",请稍后再试!");
      }
      console.log("待办条数queryTaskInfoCount", result);
      if (result.meta.success === true) {
        let returnMap = result.data.returnMap;
        let taskCountList =returnMap.taskCountList;
        for (let index = 0; index < taskCountList.length; index++) {
          const taskCount = taskCountList[index];
          if (taskCount.operType == "to_do") {
            this.groupBadge = taskCount.todoCount; //组待办条数
          }
          if (taskCount.operType == "claimed") {
            this.personBadge = taskCount.todoCount; //个人待办条数
          }
        }
        if(!isEmpty(taskCountList)){
          this.runQueryToDoTaskDetailByTypeApi();
        }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"页面加载失败,"+failDesc+'，原因:' + failCaused);
      }
    }, //获取所有工单的条数
    async runQueryToDoTaskDetailByTypeApi(fun, c) {
     let result = {};
     let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          todoType:this.activeTab,
          pageSize: 1,
          pageNo: 2,
        }
      };
      this.$vux.loading.show({	text: '努力加载中'});
      result = await this.queryToDoTaskDetailByType(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        this.showToast(false,'warn','网络请求异常，原因:' + error+",请稍后再试!");
      }
      console.log("待办queryToDoTaskDetailByType", result);
      if (result.meta.success == true) {
        let map=result.data.map;
        let toDoDetail=map.toDoDetail;
        if (this.activeTab === "group") {
          this.groupTaskList =toDoDetail;
        } else {
          this.personTaskList =toDoDetail;
        }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"页面加载失败,"+failDesc+'，原因:' + failCaused);
      }
    }, //获取工单信息
    showMoreTaskList(type) {
      this.taskType = type;
       this.$router.push({
            name: "moreTaskList",
            query: {
              taskType: type
            }
          });
    }, //查看更多
    handleTabItemClick(type) {
      this.activeTab = type;
      this.runQueryToDoTaskDetailByTypeApi();
    },//tab改变
    handleWorkDetailClick(item) {
      if (this.storejs.get("LoginUserId")) {
         this.$router.push({
            name: "todoDetail",
            query: {
              businessKey: item.businessKey,
              taskInfoId: item.taskInfoId,
              processKey: item.processDefinitionKey,
              currentTaskName: item.currentTaskName,
              item: item,
              processType: this.activeTab,
            }
          });
      } else {
        this.$router.push({
          name: "login",
          params: {
            workNo: item.workNo
          }
        });
      }
    }, //去查看详情
  },
};
</script>

<style lang="less" scoped>

  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }

  .icon-order {
    width: 0.6rem;
    height: 1rem;
  }
.vux-swiper-item {
    img {
      width: 100%;
    }
  }
  /* .pull-right {
    float: right;
  }

  .pull-left {
    float: left;
  } */

  .item-badge {
    position: absolute;
    left: 6rem;
    top: 1rem;
  }

  .tab-fun {
    position: relative;
    min-height: 8rem;
    background: #ffffff;
    margin-bottom: 1rem;
  }

  .task-list {
    .block-content {
      width: 100%;
      padding: 0 0.05rem 0.07rem 0.05rem;
      box-sizing: border-box;
      .content-main {
        background: #fff;
        box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.1);
        border-radius: 0.4rem;
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

  .nav {
    background: #f8f8f8;
    height: 4.4rem;
    z-index: 100;
  }

  .more-description {
    font-size: 1.6rem;
    text-align: center;
    margin-top: 10rem;
  }
</style>
