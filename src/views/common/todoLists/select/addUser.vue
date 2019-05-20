<template>
<div style="font-size: 1.4rem;background-color: #ffffff;height: 100vh;overflow: auto;margin-bottom: 43px;" class="reset-cell">
  <!--头部固定-->
  <header style="position: fixed;top: 0;left: 0;right: 0;z-index: 20;">
    <x-header class="reset-header" :left-options="{backText: '返回',preventGoBack:true}" @click.native="returnFrom">部门管理</x-header>
    <search v-model="searchValue" position="absolute" auto-scroll-to-top placeholder="输入部门名称、成员名称" top="46px" ref="search">
      <aside>
        <div class="animate" @touchmove.prevent>
        </div>
      </aside>
    </search>
    <!--tabbar-->
    <aside style="background-color: #ffffff;">
      <!--已选标题栏-->
      <div class="weui-cell vux-tap-active weui-cell_access vux-cell-no-border-intent">
        <div class="vux-cell-bd vux-cell-primary ellipsy">
          <span @click="returnMain">主目录</span><span v-for="(item,idx) in chooseOrgIdList" :key="idx"
                                                      @click="returnPrew(item)"> >{{item.name}}</span>
        </div>
        <div class="weui-cell__ft vux-cell-arrow-transition" @click="showOrgIdAll = !showOrgIdAll" :class="showOrgIdAll?'vux-cell-arrow-up':'vux-cell-arrow-down'"></div>
      </div>
      <!--弹出已点击标题栏-->
      <div class="slide" :class="showOrgIdAll?'animate':''" @touchmove.prevent>
        <div style="background-color: #ffffff;padding: 0 15px;line-height: 42px;">
          <span @click="returnMain">主目录</span><span v-for="(item,idx) in chooseOrgIdList" :key="idx"
                                                       @click="returnPrew(item)"> > {{item.name}}</span>
        </div>
      </div>
    </aside>
  </header>
  <section style="margin-top:130px;">
    <aside style="background-color: #ffffff;" class="f14">
      <ul>
        <li class="no-select-li"><img src="../../../../assets/img/man.png" alt="">人员</li>
          <!--tab选项-->
          <template v-if="showUserIdTab">
            <div style="margin: 10px">
              <checker v-model="checkerUserItem" type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
                <checker-item v-for="(item,idx) in checkerUserIdTabList" :key="idx" :value="item">{{item.realName}}</checker-item>
              </checker>
            </div>
          </template>
        <li class="no-select-li"><img src="../../../../assets/img/config.png" alt="">下级组织</li>
          <!--列表选项-->
          <template v-if="showOrgIdList">
            <div style="border-bottom: 1px solid #e5e5e5;">
              <cell-box v-for="(item,idx) in checkerOrgIdList" :key="idx" class="sub-item" is-link @click.native="checkListItem(item)">{{item.name}}
              </cell-box>
            </div>
          </template>
      </ul>
    </aside>

    <footer class="foot-style">
      <cell :title="'已选['+checkerUserItem.length+']'" style="width: 70px;max-width: 100px;display: inline-block;color: #ff7900" is-link :border-intent="false" :arrow-direction="showChooseAll ? 'down' : 'up'" @click.native="showChooseAll = !showChooseAll"></cell>
      <span class="sure-btn"  @click="sureSendInfo">确定</span>
    </footer>
    <div class="slidefoot" @touchmove.prevent :class="showChooseAll?'animatefoot':''">
      <div class="pot-bottom">
        <p class="pot-tom-cancel"><img @click="showChooseAll = !showChooseAll" src="../../../../assets/img/check-cancel.png"
                                         alt=""></p>
          <checker v-model="checkercancel" type="checkbox" default-item-class="checks-item-selected" selected-item-class="">
            <checker-item v-for="(item,idx) in checkerUserItem" :key="idx" :value="item.id" @on-item-click="cancelItem(idx)">{{item.realName}}
            </checker-item>
          </checker>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import {
  XHeader,
  Search,
  Cell,
  CellBox,
  Checker,
  CheckerItem
} from 'vux'

export default {
  name: "",
  props: {
    nextActivityId: {
      type: [String, Number],
      required: false
    },
    router: {
      type: [String, Number],
      required: false
    },
    businessKey: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      searchValue: '', //搜索值
      showOrgIdAll: false, //是否向下展开
      showChooseAll: false, //已选项展开
      showOrgIdList: true, //下级是否列表
      showUserIdTab: false, //下级是否选项
      checkerUserItem: [], //tab多选值
      checkercancel: [], //cancel
      checkerOrgIdList: [{
        name: '组织机构'
      }],
      checkerUserIdTabList: undefined,
      /*   checkerOrgIdList: [{
          id: 1,
          name: '组织机构'
        }, ], */ //选项列表
      /*  checkerUserIdTabList: [{
         id: 1,
         name: '陈伟'
       }],  */ //tab选项列表
      chooseOrgIdList: []
    }
  },
  components: {
    XHeader,
    Search,
    Cell,
    CellBox,
    Checker,
    CheckerItem
  },
  created: function () {
    const nextActivityId = this.nextActivityId;
    const router = this.router;
    const businessKey = this.businessKey;
    console.log("选人>>>>>>>>>>>>>>>>>", nextActivityId, router, businessKey);
  },
  mounted: function () {
    //只执行一次
    //console.log(2)
    this.onInitData(this.nextActivityId, this.router, this.businessKey);
  },
  destroyed() {},
  methods: {
    ...mapActions([
      'findTaskSelectOrgAndStaff',
    ]),
    onInitData() {
      /*  let result = {};
       this.$set(result, "name", '组织机构');

       console.log(JSON.stringify(result));
       /*  else {
             item.checked = !item.checked
           } */
      /* this.checkerOrgIdList = result;  */
    },

    cancelItem(idx) {
      let self = this
      self.checkerUserItem.splice(idx, 1)
    }, //弹框取消选择项

    async queryTaskSelectOrgAndStaff(item) {
      const sendInfo = {
        headers: {
          userId: this.storejs.get('LoginUserId'),
        },
        Jsondata: {
          'businessKey': this.businessKey,
          'nextActivityId': this.nextActivityId,
          'decisionTransition': this.router,
          'topOrgId': item.orgId,
        }
      };
      this.$vux.loading.show({
        text: '努力加载中'
      });
      const result = await this.findTaskSelectOrgAndStaff(sendInfo);
      console.log("选人再次返回结果", result);
      this.$vux.loading.hide();
      this.checkerOrgIdList = [];
      if (result.meta.success == true) {
        const taskSelectOrgIdList = result.data.eventSelectOrgId;
        const taskSelectUserIdList = result.data.eventSelectUserId;
        /* taskRouterList.forEach(function (item, idx) {
          item.key = idx
          item.value = item.name
          taskRouterList.splice(idx, 1, item)
        }); */
        if (taskSelectOrgIdList.length > 0) {
          this.checkerOrgIdList = taskSelectOrgIdList;
          this.showOrgIdList = true;
        }
        if (taskSelectUserIdList.length > 0) {
          this.checkerUserIdTabList = taskSelectUserIdList;
          this.showUserIdTab = true;
        }

      }

    },
    checkListItem(item) {
      //console.log("点击", item);
      this.chooseOrgIdList.push(item)
      //再请求后台
      this.queryTaskSelectOrgAndStaff(item);

    }, //列表选中
    returnMain() {
      this.showOrgIdList = true
      this.showUserIdTab = false
      //          重新获取第一次的列表，并清空已选值
      this.chooseOrgIdList = []
      this.checkerUserItem = []
    }, //返回主目录
    returnPrew(item) {
      let checker = item.name;
      //再请求后台
      this.queryTaskSelectOrgAndStaff(item);
      //      是列表的就获取赋值
      this.showOrgIdList = true
      this.showUserIdTab = false
      //console.log("列表选择", item);
      let newOrgIdList = [];
      for (let item of this.chooseOrgIdList) {
        newOrgIdList.push(item);
        if (item.name === checker) {
          break;
        }
      }
      this.chooseOrgIdList = newOrgIdList;
      //console.log("列表选择ddd", this.chooseOrgIdList);
      //this.chooseOrgIdList = item
    }, //      是列表的就获取赋值
    returnFrom() {
      this.$emit('hideAddUser');
    }, //隐藏选人机构页面
    sureSendInfo() {
       this.$emit('sureSendInfo',this.checkerUserItem);
    },
  },
}
</script>

<style scoped>
.vux-header.reset-header {
  background-color: #1B82D1 !important;
}

.slide {
  overflow: hidden;
  max-height: 0;
  position: absolute;
  top: 134px;
  /* 143 */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  box-sizing: border-box;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  background-color: rgba(0, 0, 0, 0.2);
}

.animate {
  overflow: visible;
  /* max-height: 9999px; */
  min-height: 9999px;
  display: block;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}

.no-select-li {
  height: 42px;
  background-color: #F7F7F7;
  padding: 0 15px;
  line-height: 49px;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  position: relative;
}

.no-select-li:after {
  content: " ";
  display: inline-block;
  height: 40px;
  width: 6px;
  position: absolute;
  top: 2px;
  left: 0;
  background: #C8C9C9;
}

.no-select-li img {
  padding-right: 10px;
  margin-top: -5px;
  display: inline-block;
  width: 22px;
}

.check-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
  position: relative;
}

.check-item-selected {
  background: #ffffff url(../../../../assets/img/cancel.png) no-repeat right bottom;
  background-size: 12%;
  border-color: #3CBED7;
}

.checks-item-selected {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  margin-right: 6px;
  position: relative;
  background: #ffffff url('../../../../assets/img/cancel.png') no-repeat right bottom;
  background-size: 12%;
  border: 1px solid #3CBED7;
}

.slidefoot {
  overflow: hidden;
  max-height: 100vh;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 43px;
  box-sizing: border-box;
  display: none;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.animatefoot {
  overflow: visible;
  max-height: 100vh;
  min-height: 100px;
  display: block;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
  z-index: 1000;
}

.pot-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  min-height: 6px;
  padding: 10px;
}

.pot-tom-cancel {
  /*  background-color: rgb(237,237,237); */
  height: 20px;
  position: relative;
}

.pot-tom-cancel img {
  width: 20px;
  position: absolute;
  right: 0px;
  top: 0px;
}

.foot-style {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  background: #ffffff;
}

.sure-btn {
  display: inline-block;
  width: 60px;
  height: 42px;
  line-height: 42px;
  background: #23ade5;
  position: absolute;
  right: 0;
  text-align: center;
}

.ellipsy {
  width: 130px !important;
  margin-right: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
