<template>
<div  class="CauseOfFailureTree">
<div  class="reset-cell" style="font-size: 1.4rem;background-color: #ffffff;padding:0 0.5rem;">
  <!--头部固定-->
  <header class="head">
    <x-header class="reset-header" :left-options="{backText: '',preventGoBack:true}" @click.native="returnFrom">故障原因树</x-header>
    <!--tabbar-->
    <aside style="background-color: #ffffff;">
      <!--已选标题栏-->
      <div class="weui-cell vux-tap-active weui-cell_access vux-cell-no-border-intent">
        <div class="vux-cell-bd vux-cell-primary ellipsy">
          <span @click="returnMainNode">主节点</span><span v-for="(node,idx) in chooseNodeList" :key="idx" @click="returnPrew(node)"> >{{node.name}}</span>
        </div>
        <div class="weui-cell__ft vux-cell-arrow-transition" @click="showNodeAll = !showNodeAll" :class="showNodeAll?'vux-cell-arrow-up':'vux-cell-arrow-down'"></div>
      </div>
      <!--弹出已点击标题栏-->
      <div class="slide" :class="showNodeAll?'animate':''" @touchmove.prevent>
        <div style="background-color: #ffffff;padding: 0 15px;line-height: 42px;">
          <span @click="returnMainNode">主节点</span><span v-for="(node,idx) in chooseNodeList" :key="idx" @click="returnPrew(node)"> > {{node.name}}</span>
        </div>
      </div>
    </aside>
  </header>
  <main>
    <article>
 <!-- <article style="position:absolute;top:8.6rem;left: 0;right: 0;"> -->
    <aside style="background-color: #ffffff;;padding-bottom: 0.5rem;" class="f14">
      <ul>
        <li class="no-select-li"><img src="../../../../../../assets/images/icon/fault.svg" alt="">故障类型</li>
          <!--tab选项-->
          <template v-if="showFaultTab===true">
            <cell  v-for="(tab,idx) in tabList" :key="idx" class="sub-item"   @click.native="changeTabItem(tab)" :title="tab.name">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" v-bind:src="tab.activeTab == false ? imgUrl : imgActiveUrl" >
            </cell>
          </template>
        <li class="no-select-li"><img src="../../../../../../assets/img/config.png" alt="">下级节点</li>
          <!--列表选项-->
          <template v-if="showNodeList">
            <div style="border-bottom: 1px solid #e5e5e5;">
               <cell  v-for="(node,idx) in nodeList" :key="idx" class="sub-item"   @click.native="changeNodeItem(node)" :title="node.name" is-link>
                  <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../../../../assets/images/icon/openNode.svg">
               </cell>
            </div>
          </template>
      </ul>
    </aside>
   </article>
    <footer class="foot">
      <cell :title="'已选['+checkerNodeItem.length+']'" style="width: 70px;max-width: 100px;display: inline-block;color: #ff7900" is-link :border-intent="false" :arrow-direction="showChooseAll ? 'down' : 'up'" @click.native="showChooseAll = !showChooseAll"></cell>
      <span class="sure-btn" @click="submitItem">确定</span>
    </footer>
   </main>
    <div class="slidefoot" @touchmove.prevent :class="showChooseAll?'animatefoot':''">
      <div class="pot-bottom">
        <p class="pot-tom-cancel"><img @click="showChooseAll = !showChooseAll" src="../../../../../../assets/img/check-cancel.png" alt=""></p>
          <checker v-model="checkercancel" type="checkbox" default-item-class="checks-item-selected" selected-item-class="">
            <checker-item v-for="(item,idx) in checkerNodeItem" :key="idx" :value="item.id" @on-item-click="cancelItem(idx)">{{item.name}}
            </checker-item>
          </checker>
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
  Search,
  Checker,
  CheckerItem
} from "vux";
import { isEmpty } from '../../../../../../utils/common';

export default {
  name: "sendInfoDialog",
  props: {
    businessType: {
      type: [String, Object, Array],
      required: true
    }
  },
  data() {
    return {
      chooseNodeList: [],//已选项的节点集合
      showNodeAll: false, //是否已选项展开
      showNodeList: false, //是否向下展开列表选项
      nodeList:  [], //列表节点选项List
      checkerNodeItem:  [], //已选择的节点
      showChooseAll: false, //是否展开已选择的节点
      checkercancel: [], //cancel
      showFaultTab:false,
      tabList:[],
      imgUrl:require('../../../../../../assets/images/icon/check_node.svg'),
      imgActiveUrl:require('../../../../../../assets/images/icon/check_node_active.svg'),
    };
  },
  components: {
    Search,
    Checker,
    CheckerItem
  },
  created: function () {
      console.log("businessType",this.businessType);
  },
  mounted: function () {
    //只执行一次
    //console.log(2)
    this.onInitData();
  },
  destroyed() {},
  methods: {
    ...mapActions(["getCauseOfFailureTree"]),
    onInitData() {
      let businessType=this.businessType;
      if(!isEmpty(businessType)){
        //初始化小组树
         this.initCauseOfFailureTree(null);
      }
    },
     async initCauseOfFailureTree(item) {
       let id=null;
       if(!isEmpty(item)){
          id=item.id;
       }
     let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          businessType: this.businessType,
          id:id,
        }
      };
       this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.getCauseOfFailureTree(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化故障原因树异常，原因:' + error);
      }
      console.log("故障原因树getCauseOfFailureTree:",result);
      if (result.meta.success == true) {
          let returnMap= result.data.returnMap;
          let causeOfFailureTreeNodes = returnMap.causeOfFailureTreeNodes;
          console.log("收到失败原因树信息", causeOfFailureTreeNodes);
           this.nodeList = causeOfFailureTreeNodes;
           this.showNodeList =true;
           let causeOfFailureTypes = returnMap.causeOfFailureTypes;
           console.log("收到失败原因树信息", causeOfFailureTypes);
           this.tabList = causeOfFailureTypes;
           this.showFaultTab=true;
       } else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载故障原因树失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //选故障原因树
    changeTabItem(item){
      let self = this;
      self.tabList.forEach(function (obj) {
        obj.activeTab = false;
      });
      item.activeTab = !item.activeTab;
      self.checkerNodeItem=[];
      self.checkerNodeItem.push(item);
    },
    cancelItem(idx) {
      let self = this;
      self.checkerNodeItem.splice(idx, 1);
    }, //弹框取消选择项
    changeNodeItem(item) {
      console.log("点击", item);
      //判断是否组人接单派单标记(0：不接单；1：组/人接单；2：组接单；3：人接单)sendFlag
      this.initCauseOfFailureTree(item);
        //再请求后台
      let self = this;
      self.checkerNodeItem=[];
      self.chooseNodeList.push(item);
    }, //列表选中
    returnMainNode() {
    this.showNodeList=true, //是否向下展开列表选项
      //重新获取第一次的列表，并清空已选值
     this.chooseNodeList = [];
     this.initCauseOfFailureTree(null);
     this.checkerNodeItem = [];
    }, //返回主目录
    returnPrew(item) {
      this.checkerNodeItem = [];
      let checker = item.name;
      this.initCauseOfFailureTree(item);
      let nodeList = [];
      for (let node of this.chooseNodeList) {
           nodeList.push(node);
        if (node.name === checker) {
          break;
        }
      }
      this.chooseNodeList = nodeList;
    }, //      是列表的就获取赋值
    returnFrom() {
      this.$emit("hideCaseOfFailureDialog");
    }, //隐藏故障原因页面
    submitItem() {
      let resultContent = [];
      if (this.checkerNodeItem.length > 0) {
        let item = this.checkerNodeItem[this.checkerNodeItem.length - 1];
        console.log("选中的？？？？？？", item);
        resultContent.push(item);
        this.$emit("submitCaseOfFailureItemBtn", resultContent);
        } else {
          this.showToast(false,'text','故障原因不能为空！');
        }
    },
  }
};
</script>
<style lang="less" scoped>

.foot /deep/ .weui-cell_access .weui-cell__ft {
    position: relative!important;
    padding-right: 3.5rem;
    bottom: 1.5rem;
}
.head{
  position: fixed;
  left: 0;
  right: 0;
  height:9rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}

.head {
  top: 0;
}
.foot{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height:4.1rem;
  width: 100%;
  background-color:#ffffff;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 100;
}
.foot{
  bottom:0;
}
article{
      position: fixed;
      left: 0;
      right: 0;
      top:9rem;
      bottom: 4.1rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
</style>
<style scoped>
.slide {
  overflow: hidden;
  max-height: 0;
  position: absolute;
  top: 88px;
  /* 143 */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  box-sizing: border-box;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
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
  background-color: #f7f7f7;
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
  background: #c8c9c9;
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
  background: #ffffff url(../../../../../../assets/img/cancel.png) no-repeat right bottom;
  background-size: 12%;
  border-color: #3cbed7;
}

.checks-item-selected {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  margin-right: 6px;
  position: relative;
  background: #ffffff url("../../../../../../assets/img/cancel.png") no-repeat right bottom;
  background-size: 12%;
  border: 1px solid #3cbed7;
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
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
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
