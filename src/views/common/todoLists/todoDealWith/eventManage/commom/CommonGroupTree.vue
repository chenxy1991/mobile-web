<template>
<div class="CommonGroupTree">
<div  class="reset-cell" style="font-size: 1.4rem;height: 100vh;">
  <!--头部固定-->
  <header class="head">
    <x-header class="reset-header" :left-options="{backText: '',preventGoBack:true}" @click.native="returnFrom">常用小组</x-header>
    <!-- <search v-model="searchValue" position="absolute" auto-scroll-to-top placeholder="输入部门名称、成员名称" top="46px" ref="search">
      <aside>
        <div class="animate" @touchmove.prevent>
        </div>
      </aside>
    </search> -->
  </header>
   <main>
  <article>
    <aside class="f14">
      <group gutter="0">
        <cell  :border-intent="false" :title="item.groupName" is-link @click.native="handleGroupTreeClick(item)" v-for="(item,idx) in groupZtreeList" :key="idx"   >
         <span class="comtreeIndex" slot="icon" width="20" style="display:inline-block;margin-right:0.5rem;">{{idx+1}}</span>
         <div slot="inline-desc">
           <label class="f12 c999 " v-html="item.orgPathName"></label>
         </div>
       </cell>
      </group>
    </aside>
    <aside class="f14">
      <load-more v-if="groupZtreeList.length===0" :show-loading="false" :tip="'暂无相关数据'" background-color="#fbf9fe">
      </load-more>
      <load-more v-if="!groupZtreeList" :tip="'正在加载'"></load-more>
    </aside>
  </article>
   <footer>
  </footer>
  </main>
</div>
</div>
</template>
<style lang="less" scoped>
 .head{
  position: fixed;
  left: 0;
  right: 0;
  height:4.4rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}
.head {
  top: 0;
}
article{
      position: fixed;
      left: 0;
      right: 0;
      top:4.4rem;
      bottom: 0rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }
</style>
<script>
import {
  mapActions
} from "vuex";
import {
  XHeader,
  Search,
  Cell,
  CellBox,
  Checker,
  CheckerItem,
  Panel,
 LoadMore,
} from "vux";
export default {
  name: 'CommonGroupTree',
  model: {},
  props: {
    activityId: {
      type: [String, Number],
      required: false
    },
    processDefinitionKey: {
      type: [String, Number],
      required: false
    },
    decisionTransition: {
      type: [String, Number],
      required: false
    },

  },
  components: {
    XHeader,
    Search,
    Cell,
    CellBox,
    Checker,
    CheckerItem,
    Panel,
    LoadMore,
  },
  data() {
    return {
      groupZtreeList: [],
      type: 4,
    }
  },
  created() {},
  mounted() {
    //加载常用小组树
    this.loadGroupZtree();
  },
  destroyed() {

  },
  computed: {},
  methods: {
    ...mapActions(["getGroupZtree"]),
    returnFrom() {
      this.$emit("hideComGroupTreeDialog");
    }, //隐藏常用小组页面返回表单
    async loadGroupZtree() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          activityId: this.activityId,
          processDefinitionKey: this.processDefinitionKey,
          decisionTransition: this.decisionTransition,
        }
      };
     this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.getGroupZtree(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','获取常用联系人或组异常，原因:' + error);
      }
      console.log("常用联系人或组getGroupZtree：",result);
      if (result.meta.success == true) {
        let groupZtreeList = result.data.groupZtreeList;
        console.log("返回常用联系人或组信息", groupZtreeList);
        this.groupZtreeList = groupZtreeList;
      } else {
         let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"获取常用联系人或组失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //获取常用小组
    handleGroupTreeClick(data){
         console.log("选中的常用联系人或组", data);
          let haveCheckerUserList = [];
          let checkerUserItem=data.userInfo;
         for (let User of checkerUserItem) {
            haveCheckerUserList.push(User.userId);
          }
          this.$set(data, 'haveCheckerUserList', haveCheckerUserList);
          console.log("返回的信息>>>>>>>", data);
          this.$emit("sureComGroupTreeBtn", data);
    },
  }
}
</script>

<style>
.comtreeIndex {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    border-radius: 50%;
    margin-bottom: 0.5rem;
    color: rgb(28, 130, 212);
    background-color: rgb(205, 228, 255);
}
</style>
