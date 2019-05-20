<template>
<div>
  <div class="header">
    <span @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f14">返回</icon>
            </span>
    <span class="f15 name">回复:省对口业务部门审核</span>
    <span></span>
  </div>
  <box style="padding:45px 10px 45px 10px;">
    <group>
      <cell title="常用意见">
        <x-icon type="ios-arrow-down" class="cell-x-icon" @click="show=true"></x-icon>
      </cell>
      <x-textarea :max="200" :show-counter="true" :rows=8 :autosize="true" :placeholder="'请输入内容(最多200字符)'"></x-textarea>
    </group>
    <br>
    <div v-if="demo2==true">
      <span>会签方式</span> <span> <check-icon :value.sync="demo1"> 并行({{ demo1 }})</check-icon></span>
    </div>
    <!--   <group :title="'set width=100px'">
    <cell-box is-link>
         <check-icon :value.sync="demo1"> 并行({{ demo1 }})</check-icon>
        </cell-box>
        <cell-box is-link>
         <check-icon :value.sync="demo2"> 并行({{ demo2 }})</check-icon>
        </cell-box>
        <cell-box is-link>
         <check-icon :value.sync="demo3"> 并行({{ demo3 }})</check-icon>
        </cell-box>
        </group> -->
    <checklist :title="'选择处理方式'" :options="commonList" v-model="radioValue" :max="1" @on-change="change">
    </checklist>
  </box>

  <div class="submit">
    <button class="btn btn-full f14"  @click="handleActions({}, 'selectUser')">确定</button>
  </div>
  <div v-transfer-dom>
    <x-dialog v-model="show" class="dialog-demo">
      <p>
        <cell title="常用意见" class="f16" style="background-color: rgb(76, 130, 193);color:#fff;line-height: 20px;">
          <span @click="show=false" style="background-color: rgb(76, 130, 193);color:#fff;">
                <icon class="el-icon-coral-close f16"></icon>
             </span>
        </cell>
      </p>
      <div class="img-box">

        <cell-box is-link>
          同意
        </cell-box>
        <cell-box is-link>
          不同意
        </cell-box>
        <cell-box is-link>
          同意
        </cell-box>
        <cell-box is-link>
          不同意
        </cell-box>
        <cell-box is-link>
          不同意
        </cell-box>
        <cell-box is-link>
          不同意
        </cell-box>
        <cell-box is-link>
          不同意
        </cell-box>
        <cell-box is-link>
          不同意
        </cell-box>
        <cell-box is-link>
          不同意
        </cell-box>
        <cell-box>
        </cell-box>
      </div>
    </x-dialog>
  </div>
</div>
</template>

<script>
import {
  TransferDom,
  Group,
  XDialog,
  Cell,
  CellBox,
  Box,
  XTextarea,
  Checklist,
  XButton,
  CheckIcon,
} from 'vux'

export default {
  components: {
    TransferDom,
    Group,
    XDialog,
    Cell,
    CellBox,
    Box,
    XTextarea,
    Checklist,
    CheckIcon,
    XButton,

  },
  directives: {
    TransferDom
  },
  data() {
    return {
      demo1: false,
      demo2: false,
      demo3: false,
      show: false,
      commonList: ['前进到:省企信审核', '转交', '回退到:拟稿'],
      radioValue: ['转交'],
      error: '',
    }
  },
  async activated() {
    //const currentUserId = parseInt(window.localStorage.getItem('SeawaterLoginUserId'));
    /* var businessKey = this.$route.params.businessKey;
    if (businessKey != undefined) {
      window.sessionStorage.setItem('title', businessKey);
      this.title = window.sessionStorage.getItem('title');
    } */

    //await this.initTodoTypeData(this.activeTab);
  },
  deactivated() {
    //this.todoType = undefined;
  },
  created() {},
  mounted() {
    //const {id} = this.$route.params;
    const ele = document.getElementById("loading");
    ele.style.display = "none";
  },
  methods: {
    handleActions(item, actionType) {
      alert(item + "1111" + actionType);
      switch (actionType) {
        case 'selectUser':
          this.$router.push({
            name: actionType,
            params: {

            }
          });
          break;
        case 'return':
          this.$router.push('/');
          break;
        default:
          break;
      }
    },
    change(val, label) {
      console.log('change', val, label)
    },
    log(str) {
      console.log(str)
    },
    click(key) {
      console.log(key)
    },
  }
}
</script>

<style lang="less">
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
  z-index: 5;

  .name {
    span {
      color: #fff;
    }
  }
}

.submit {
  width: 100%;
  padding: 0.05rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;

  .btn {
    background-color: rgb(76, 130, 193);
    height: 0.43rem;
    color: #fff;
    width: 3.55rem !important;
  }

}

.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}

.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }

  .img-box {
    height: 200px;
    padding: 5px 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}

.vux-x-icon {
  fill: #F70968;
}

.cell-x-icon {
  display: block;
  float: left;
  text-align: left;
  fill: green;
  margin-right: 5px;
}
</style>
