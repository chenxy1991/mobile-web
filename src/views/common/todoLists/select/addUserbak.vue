<template>
<div>
  <div class="header">
    <span @click="handleActions({}, 'return')">
         <icon class="el-icon-coral-return f14">返回</icon>
            </span>
    <span class="f16">部门管理</span>
    <span @click.native="showSearchInput = true">搜索</span>
  </div>
 <box class="itmes">
  <search-bar  :onChange="onChange" :onSearch="onSearch"> 搜索页面 推荐标签搜索提示等等...
    <ul v-for="list in searchData">
      <li>
        <span>{{list.name}}</span>
        <span>{{list.date}}</span>
        <span>{{list.depart}}</span>
      </li>
    </ul>
  </search-bar>
    <cell  primary="content" class="vux-1px-b">
     <span>dadasdasd</span>  <span>dadasdasd</span><span>dadasdasd</span><span>dadasdasd</span><span>dadasdasd</span><span>dadasdasd</span><span>dadasdasd</span>
    </cell>
  </box>
   <box class="item-conment">

   </box>
  <!-- <div  style="margin-top: 46px;" v-if="showSearchInput"
            <search
                ref="encySearch"
                v-model="searchText"
                position="absolute"
                @on-change="handleSearchChange"
                @on-focus="handleActions({}, 'encySearch')"
                @on-cancel="handleActions({}, 'encySearchCancel')"
            >
            </search>
    </div> -->
</div>
</template>

<style lang="less" scoped>
.itmes {
  width: 100%;
  position: fixed !important;
  left: 0px;
  top: 45px;
  z-index: 200;
  //padding: 45px 5px 5px 5px;
  background-color: #fff;
}

.item-conment {
  position: absolute !important;
  top: 90px;
  left: 0;
  right: 0;
  z-index: -1;
  padding-bottom: 50px;
}
.info {
  font-size: 18px;
  margin-top: 15px;
  line-height: 2.3333333;
  width: 100%;
  margin: 0 10px;
  color: #fff;
  text-align: center;
  border-radius: 25px;
  background-color: green;
  z-index: -100;
}

.header {
  width: 100%;
  height: 4.5rem;
  line-height: 4.5rem;
  background-color: rgb(76, 130, 193);
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  color: #fff;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
  opacity: 1;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;

  .name {
    span {
      color: #fff;
    }
  }
}
</style>

<script>
import {
  XHeader,
  XTable,
  Search,
  Box,
  XButton,
  Cell
} from 'vux'

export default {
  name: '',
  data() {
    return {
      showSearchInput: false,
      page: 1,
      count: 0,
      search: '',
      searchData: [
        //假数据
        {
          name: "数据1",
          date: '2018-01-04',
          depart: '泸化工1'
        },
        {
          name: "数据2",
          date: '2018-01-25',
          depart: '泸化工2'
        },
        {
          name: "数据3",
          date: '2018-02-10',
          depart: '泸化工3'
        },
        {
          name: "数据4",
          date: '2018-03-04',
          depart: '泸化工4'
        },
        {
          name: "数据5",
          date: '2018-05-24',
          depart: '泸化工5'
        },
        {
          name: "数据6",
          date: '2018-10-29',
          depart: '泸化工6'
        }
      ]

    }
  },
  components: {
    XHeader,
    XTable,
    Search,
    Box,
    XButton,
    Cell
  },
  created() {},
  mounted() {

  },
  computed: {},
  methods: {
    btn: function () {

      var search = this.search;
      if (search) {
        this.searchData = this.products.filter(function (product) {
          console.log(product)
          return Object.keys(product).some(function (key) {
            console.log(key)
            return String(product[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }

    }

  }
}
</script>
