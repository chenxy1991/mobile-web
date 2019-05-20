<template>
<div id="Welcome">
  <div class="welcome" :class="{hide:hide}">
    <img src="./logo.png">
     <div class="close" @click="closeGuide">正在加载 {{count_down}}s</div>
    <div id="loading" style="position: absolute; top: 200px; left: 50%; transform: translate(-50%, -50%)">
      <img id="loadingImg" src="./oval.svg" alt="loading" style="widows: 50px;background-color: rgb(76, 130, 193);">
      </div>
      <!--<p style="text-align:center;">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;"> {{ $t('loading') }} &nbsp;&nbsp;</span>
      <inline-loading></inline-loading>
    </p>-->
    </div>
  </div>
</template>

<script>
import {
  InlineLoading
} from 'vux'
import store from '../../store/index'
import {
  mapState,
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  store,
  name: "Welcome",
  components: {
    InlineLoading
  },
  data() {
    return {
      hide: false,
      count_down: 3,
      interval: null
    }
  },
  created() {
    document.title = 'ITSM服务管理系统欢迎你';
    let vue = this;
    this.interval = setInterval(function () {
      if ((vue.count_down--) <= 1) {
        vue.hide = true
        vue.$router.push({
          path: '/login'
        });
        window.clearInterval(vue.interval);
      }
    }, 1000);
  },
  mounted() {},
  beforeDestroy() {
   window.clearInterval(this.interval);
  },
  methods: {
    closeGuide() {
      let vue = this;
      vue.$router.push({
          path: '/login'
        });
      window.clearInterval(this.interval);
    }
  }
}
</script>

<style lang="less" scoped>
/* 被注释掉的样式不适合部分安卓机 */
.welcome {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  background-color: rgb(76, 130, 193);
  animation: welcome 0.5s;
  transition: 0.3s;
  -webkit-transition: 0.3s;
  /*    -webkit-animation: welcome 0.5s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s; */
}

.welcome img {
  width: 100%;
}

.welcome.hide {
  opacity: 0;
  visibility: hidden;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 14px;
  border: 1px solid #ffffff;
  font-size: 14px;
  border-radius: 14px;
  color: #ffffff;
}
</style>
