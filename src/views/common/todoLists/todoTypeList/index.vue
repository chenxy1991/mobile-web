<template>
<div class="tido-list-container" id="tido-list-container">
  <div style="height: 44px" v-if="isSearching">
    <search ref="todoSearch" v-model="searchText" position="absolute" auto-scroll-to-top @on-change="handleSearchChange"  @on-cancel="handleActions({}, 'todoSearchCancel')">
    </search>
  </div>
  <div v-else>
    <div class="Header">
      <x-header slot="header" class="top">待办列表
        <a slot="right" class="a-right"  @click="handleActions({}, 'search')">
            <icon class="el-icon-coral-search"></icon>搜索</a>
      </x-header>
    </div>
  </div>
  <scroller :on-refresh="handleDataRefresh">
    <div class="items" :class="{pT05Rem: isSearching}" v-if="todoLists&&todoLists.length!==0">
      <cell :title="item.flow_name" v-for="item in todoLists" :key="item.business_key" is-link @click.native="handleActions(item, 'todoType')">
        <div class="badge-value">
         <!--  <span class="vertical-middle"> {{item.create_time }}&nbsp;</span> -->
          <badge :text="item.count"></badge>
        </div>
      </cell>
      <cell></cell>
    </div>
  </scroller>

  <div v-if="isSearching">
    <div v-if="!searchText&&todoLists&&todoLists.length===0" class="more-description">
      请输入你的搜索条件~~~
    </div>
    <div v-if="searchText&&todoLists&&todoLists.length===0" class="more-description">
      暂无符合条件的数据~~~
    </div>
  </div>
  <div v-else>
    <div v-if="todoLists===undefined">
      <load-more tip="努力加载中"></load-more>
    </div>
    <div v-if="todoLists&&todoLists.length===0" class="more-description">
      暂无符合条件的数据~~~
    </div>
  </div>
</div>
</template>

<script>
const list = () => [{
    business_key: "SJSZ2018081401261",
    title: "请协助核实并提供修改用户摘要信息的联系方式",
    flow_name: "需求1管理流程",
    create_time: "2018-08-14",
    count: "1"
  },
  {
    business_key: "SJDG2018082001502",
    title: "CRM+ 用户号码076948372231状态正常，但是无法申报故障，故障预处理界面显示用户号码停机，麻烦核实，谢谢",
    flow_name: "事件1管理流程",
    create_time: "2018-08-20",
    count: "1"
  },
  {
    business_key: "SJDG2018082200113",
    title: "149、199无限量套餐无法受理副卡包优惠",
    flow_name: "需求2管理流程",
    create_time: "2018-08-21",
    count: "1"
  },
  {
    business_key: "SJSZ2018081401264",
    title: "请协助核实并提供修改用户摘要信息的联系方式",
    flow_name: "事件2管理流程",
    create_time: "2018-08-14",
    count: "1"
  },
  {
    business_key: "SJDG2018082001505",
    title: "CRM+ 用户号码076948372231状态正常，但是无法申报故障，故障预处理界面显示用户号码停机，麻烦核实，谢谢",
    flow_name: "事件3管理流程",
    create_time: "2018-08-20",
    count: "1"
  },
  {
    business_key: "SJDG2018082200116",
    title: "149、199无限量套餐无法受理副卡包优惠",
    flow_name: "事件4管理流程",
    create_time: "2018-08-21",
    count: "1"
  }
]

import {
  Group,
  Cell,
  Badge,
  XHeader,
  Search,
  LoadMore
} from "vux";
export default {
  name: "daiban",
  components: {
    Group,
    Cell,
    Badge,
    XHeader,
    Search,
    LoadMore
  },
  data() {
    return {
      currentUserId: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
      todoLists: undefined,
      isSearching: false,
      searchText: '',
      searchTimer: null,
      currentItem: {},
    };
  },
  async activated() {
    const {
      id
    } = this.$route.params;
    //const currentUserId = parseInt(window.localStorage.getItem('SeawaterLoginUserId'));

    await this.initTodoListsByType(this.activeTab);
  },

  deactivated() {
    this.todoLists = undefined;
  },
  created() {
    /*  let vue = this.$store;
     vue.commit("updateShowAsideMenu", true);
     vue.commit("updateShowBack", true);
     vue.commit("updateTitle", "待办列表");
     vue.commit("updateBackText", "返回");
     vue.commit("updatShowHeader", true); */
  },
  mounted() {
    //const {id} = this.$route.params;
    const ele = document.getElementById("loading");
    ele.style.display = "none";
  },
  methods: {
    async initTodoListsByType(type) {
      this.todoLists = list();
      window.sessionStorage.setItem('todoLists',JSON.stringify(list()));
      return this.todoLists;
    },
    handleSearchChange() {
      if (this.searchText) {
        window.clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(async () => {
         /*  this.details = await this.getDetailsByBillId({
             id: this.group.bill_id,
             name: this.searchText
           }); */
           this.todoLists=[];
           var searDate=JSON.parse(window.sessionStorage.getItem('todoLists'));
      //逻辑-->根据input的value值筛选goodsList中的数据
      for (var i = 0; i < searDate.length; i++) {
        //for循环数据中的每一项（根据name值）
         console.log(this.searchText);
        console.log(searDate[i].flow_name);
        if (searDate[i].flow_name.search(this.searchText) != -1) {
          //判断输入框中的值是否可以匹配到数据，如果匹配成功
          this.todoLists.push(searDate[i]);
          //向空数组中添加数据
        }
      }
        }, 500);
      }
    },
    async handleDataRefresh(done) {
      const {
        id
      } = this.$route.params;
      //获取Lists
      /*   const groupId = unCompile(id);
        this.group = (await this.getGroupById({id: groupId}))[0] || {}; */
      done();
    },
    handleActions(item, actionType) {
      switch (actionType) {
        case 'todoType':
          this.$router.push({
            name: actionType,
            params: {
              businessKey: item.flow_name,
            }
          });
          break;
        case 'return':
          this.$router.push('/');
          break;
        case 'search':
          this.isSearching = true;
          this.searchText = '';
          this.$nextTick(() => {
            this.$refs.todoSearch.setFocus();
            this.todoLists = [];
          });
          break;
        case 'todoSearchCancel':
          this.isSearching = false;
          this.$nextTick(() => {
            this.initTodoListsByType(this.activeTab);
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less">
.tido-list-container {
  min-height: 100%;

  * {
    font-size: 14px;
  }

  .Header {
    .vux-header-title {
      font-size: 16px;
    }

    .vux-header-back {
      font-size: 14px;
      color: #fff;
    }

    .a-right {
      font-size: 14px;
      color: #fff;
    }

    .menu {
      margin-right: 70px;
    }

    .menu div {
      color: #000;
    }

    .menu:before {
      right: -70px;
    }

    .top {
      margin-bottom: 0px;
      width: 100%;
      position: relative;
      left: 0;
      top: 0;
      z-index: 100;
      background-color: rgb(76, 130, 193);
    }
  }

  .items {
    margin-top: 44px;
  }

  .pT05Rem {
    padding-top: 0.5rem;
    margin-top: 0 !important;
  }

  .badge-value {
    display: inline-block !important;
  }

  .vertical-middle {
    vertical-align: middle;
  }

  .more-description {
    font-size: 16px;
    text-align: center;
    margin-top: 100px;
  }
}
</style>
