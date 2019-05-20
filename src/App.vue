<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"> </router-view> -->
    <!-- 这里是不被缓存的视图组件！ -->
  </div>
</template>

<style lang="less">
@import "../src/assets/css/common.css";
@import "../src/assets/css/comstyle.css";

@import "~vux/src/styles/center.less";
@import "~vux/src/styles/1px.less"; //1px 方案在 VUX 组件内应用广泛，
//包括 Grid, ButtonTab, XTable, XButton, Cell 等等。
//利用 Flexbox + 1px 你可以实现复杂的宫格布局

//关闭图标主要应用于弹窗(dialog)关闭按钮以及弹窗(popup)头部的关闭按钮。
@import "~vux/src/styles/close.less";

@import "~vux/src/styles/reset.less";
body {
  height: 100%;
  background-color: #fbf9fe;
  line-height: 1.2;
  overflow-x: hidden;
}

.icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 0.48rem;
  height: 0.48rem;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
 	normalize.css 中也包含这行 */
  overflow: hidden;
}
</style>
<script>
import store from 'storejs';
import { isEmpty } from "../src/utils/common.js";
import { TransferDom, ViewBox } from "vux";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "app",
  directives: {
    TransferDom
  },
  data() {
    return {};
  },
  components: {
    ViewBox
  },
  created() {},
  beforeCreate() {
      /* var iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", "data:text/plain;");
      document.documentElement.appendChild(iframe);
      window.frames[0].window.alert("Hello，你好");
      window.frames[0].window.confirm('Hello，你好');
      window.frames[0].window.prompt('Hello，你好，叫什么名字?',"匿名"); */
document.addEventListener("plusready",function() {
   plus.key.addEventListener('backbutton', function () {
        if (location.href.indexOf('/main') != -1) {
          //first = new Date().getTime(); //记录第一次按下回退键的时间
          console.log('再按一次退出应用'); //给出提示
          //plus.nativeUI.alert("再按一次退出应用！");
          //       history.go(-1)//回退到上一页面
              // 显示自动消失的提示消息
            //plus.nativeUI.toast( "再按一次退出应用!",3000);
            plus.nativeUI.confirm('是否确认退出ITSM？', function(e){
            console.log((e.index==0)?"Yes!":"No!" );
            if(e.index==0){
              let allKeys =store.keys();
            console.log(allKeys, 'allKeys==')
            allKeys.forEach(function (key, val) {
              console.log(key, '==', val)
              if (key === "userName" || key === "userPass") {
                console.log(key, '==1111111111', val)
              } else {
                store.remove(key)
              }
            })
              plus.runtime.quit();
            }
            },'温馨提示')
        } else if (location.href.indexOf('/login') != -1) { //如果是登陆页面
          plus.runtime.quit(); //那么就退出app
        } else {
          history.go(-1) //回退到上一页面
        }
         }, false);
      },false);
   },
  /* beforeCreate() {
    document.addEventListener(
      "plusready",
      function() {
      },
      false
    );
  }, */
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      //showLoading: state => state.showLoading, //相当于把state中的loading映射到loading上
      // loadingText: state => state.loadingText //相当于把state中的loading映射到loading上
    })
  }
};
</script>
