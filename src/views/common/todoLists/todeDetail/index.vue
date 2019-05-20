<template>
<div>
  <div class="header">
    <span @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f15">返回</icon>
            </span>
    <span class="f16 name">{{title}}</span>
    <span @click="handleActions({}, 'groupAdd')">
       <icon class="el-icon-coral-brush f15">处理</icon>
         </span>
  </div>
  <div class="nav">
    <tab class="tab-container" bar-active-color="#28b1ea" active-color="#28b1ea">
      <tab-item :selected="activeTab==='JB'" @on-item-click="handleTabItemClick('JB')">
        <div class="tab-item-container">
          <span class="text f13">基本内容</span>
        </div>
      </tab-item>
      <tab-item :selected="activeTab==='LC'" @on-item-click="handleTabItemClick('LC')">
        <div class="tab-item-container">
          <span class="text f13">流程过程</span>
        </div>
      </tab-item>
      <tab-item :selected="activeTab==='BD'" @on-item-click="handleTabItemClick('BD')">
        <div class="tab-item-container">
          <span class="text f13">表单附件</span>
        </div>
      </tab-item>
    </tab>
  </div>
  <div class="mT90" :class="{pB55 :activeTab === 'JB'}">
    <div v-if="activeTab === 'JB'">
      <pending-details>
      </pending-details>
    </div>
    <div v-if="activeTab === 'LC'">
      <flow-process></flow-process>
    </div>
    <div v-if="activeTab === 'BD'">
      <div>表单附件</div>
    </div>
  </div>
  <div class="submit" v-if="activeTab === 'JB'">
    <button class="btn btn-full f14"  @click="handleActions({}, 'todoDealWith')">处理</button>
  </div>

</div>
</template>

<script>
import {
  Tab,
  TabItem,
  Sticky,
  Divider,
  XButton,
  SwiperItem,
  XHeader,
  Scroller,
  Group
} from 'vux'
import PendingDetails from './PendingDetails'
import FlowProcess from './FlowProcess'
import FromAppendage from './FromAppendage'
export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    PendingDetails,
    FlowProcess,
    FromAppendage,
    XHeader,
    Scroller,
    Group,
  },
  data() {
    return {
      activeTab: window.sessionStorage.getItem('SeawaterGroupTabActive') || 'JB',
      title: window.sessionStorage.getItem('title'),
    }
  },
  async activated() {
    //const currentUserId = parseInt(window.localStorage.getItem('SeawaterLoginUserId'));
    var businessKey = this.$route.params.businessKey;
    if (businessKey != undefined) {
      window.sessionStorage.setItem('title', businessKey);
      this.title = window.sessionStorage.getItem('title');
    }

    //await this.initTodoTypeData(this.activeTab);
  },
  deactivated() {
    this.todoType = undefined;
  },
  created() {},
  mounted() {
    //const {id} = this.$route.params;
    const ele = document.getElementById("loading");
    ele.style.display = "none";
  },
  methods: {
    handleActions(item, actionType) {
      const {
        id
      } = this.$route.params;

alert("111"+actionType);
      switch (actionType) {
        case 'return':
          this.$router.back();
          break;
        case 'groupAdd':
          this.$router.push({
            name: 'groupAdd',
            params: {

            }
          });
          break;
          case 'todoDealWith':
          this.$router.push({
            name: 'todoDealWith',
            params: {
              id
            }
          });
          break;

        default:
          break;
      }
    },
    handleTabItemClick(name) {
      this.activeTab = name;
      window.sessionStorage.setItem('SeawaterGroupTabActive', name);
    },
    switchTabItem(index) {
      console.log('on-before-index-change', index)
      this.$vux.loading.show({
        text: 'loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.index = index
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 0.45rem;
  line-height: 0.45rem;
  background-color: rgb(76, 130, 193);
  padding: 0 0.1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
  opacity: 1;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  .name {
    span {
      color: #fff;
    }
  }
}

.mT90 {
  margin-top: 90px;
}

.pB55 {
  width: 100%;
  padding-bottom: 55px;
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

.top {
  margin-bottom: 0px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: rgb(76, 130, 193);
}

.tab {
  margin-top: 46px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
}

.item {
  position: relative;
  left: 0;
  top: 92px;
  width: 100%;
  z-index: 0;
}

.submit {
  width: 100%;
  padding: 0.05rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index:100;

  .btn {
    background-color: rgb(76, 130, 193);
    height: 0.43rem;
    color: #fff;
    width: 3.55rem !important;
    z-index:100;
  }

}

.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>
