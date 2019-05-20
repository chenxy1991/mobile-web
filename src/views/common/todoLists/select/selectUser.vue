<template>
<div>
  <div class="header">
    <span @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f14">返回</icon>
            </span>
    <span class="name f15">人员选择</span>
    <span></span>
  </div>
  <box class="itmes">
    <x-switch :title="'短信通知'" :value-map="['0', '1']" v-model="SMSValue"></x-switch>
    <x-switch :title="'邮件通知'" :value-map="['Y', 'N']" v-model="emailValue"></x-switch>
    <cell title="处理人员" class="vux-1px-b">
      <x-icon type="ios-plus" class="cell-x-icon" @click="handleActions({}, 'addUser')"></x-icon>
    </cell>
  </box>
  <box class="user-lists">
     <swipeout>
      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">收藏</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          陈飞
        </div>
      </swipeout-item>
</swipeout>
    <cell title="chenddd" >
      <icon class="el-icon-coral-delete f14">删除</icon>
    </cell>
   <cell title="sadas" ></cell>
   <cell title="dsa" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
   <cell title="陈飞" ></cell>
  </box>

  <div class="submit">
    <button class="btn btn-full f14"  @click="handleActions({}, 'submit')">提交</button>
  </div>
</div>
</template>

<script>
import {
  XSwitch,
  Group,
  Cell,
  Box,
   Swipeout, SwipeoutItem, SwipeoutButton,
} from 'vux'

export default {
  components: {
    XSwitch,
    Group,
    Cell,
    Box,
    Swipeout, SwipeoutItem, SwipeoutButton,
  },
   async activated() {
    //const currentUserId = parseInt(window.localStorage.getItem('SeawaterLoginUserId'));
  /*   var businessKey = this.$route.params.businessKey;
    if (businessKey != undefined) {
      window.sessionStorage.setItem('title', businessKey);
      this.title = window.sessionStorage.getItem('title');
    }
 */
    //await this.initTodoTypeData(this.activeTab);
  },
  deactivated() {
    /* this.todoType = undefined; */
  },
  created() {},
  mounted() {
    //const {id} = this.$route.params;
    const ele = document.getElementById("loading");
    ele.style.display = "none";
  },
  methods: {
     onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    },
    handleActions(item, actionType) {
      switch (actionType) {
        case 'return':
          this.$router.push('/');
          break;
        case 'addUser':
          this.$router.push({
            name: actionType,
            params: {

            }
          });
          break;
        default:
          break;
      }
    },
  },
  data() {
    return {
      SMSValue: '',
      emailValue: '',
    }
  }
}
</script>

<style lang="less" scoped>
.demo-content {
  padding: 10px 10px;
}
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

.cell-x-icon {
  display: block;
  fill: rgb(76, 130, 193);
}

.submit {
  width: 100%;
  padding: 0.05rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 100;
  .btn {
    background-color: rgb(76, 130, 193);
    height: 0.43rem;
    color: #fff;
    width: 3.55rem !important;
     z-index: 100;
  }

}

.itmes {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 45px;
  //padding: 45px 5px 5px 5px;
  background-color: #fff;
  z-index: 100;
}

.user-lists {
  position: absolute;
  top:190px;
  left: 0;
  right: 0;
  z-index: 1;
  padding-bottom: 50px;
}
</style>
