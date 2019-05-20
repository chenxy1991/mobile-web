<template>
<div>
    <keep-alive>
      <transition name="fade">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件！ -->
      </router-view>
    </transition>
</div>
</template>
<style lang="less">
@import "../src/assets/css/common.css";
@import '../src/assets/css/comstyle.css';

@import '~vux/src/styles/center.less';
@import '~vux/src/styles/1px.less'; //1px 方案在 VUX 组件内应用广泛，
//包括 Grid, ButtonTab, XTable, XButton, Cell 等等。
//利用 Flexbox + 1px 你可以实现复杂的宫格布局

//关闭图标主要应用于弹窗(dialog)关闭按钮以及弹窗(popup)头部的关闭按钮。
@import '~vux/src/styles/close.less';

@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
  line-height: 1.2;
  overflow-x: hidden;
}
.icon {
  /* 通过设置 font-size 来改变图标大小 */
  width:  0.48rem;; height:  0.48rem;;
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
import {
  TransferDom,
  ViewBox
} from 'vux'
import {
  mapState,
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  name: 'app',
  directives: {
    TransferDom
  },
  data() {
    return {

      }
  },
  components: {
    ViewBox,
  },
   computed: {

      // 使用对象展开运算符将此对象混入到外部对象中
     ...mapState({
        //showLoading: state => state.showLoading, //相当于把state中的loading映射到loading上
       // loadingText: state => state.loadingText //相当于把state中的loading映射到loading上
      })
    }
};
</script>
