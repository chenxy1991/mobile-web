<template>
  <div class="ondev">
    <div class="reset-cell">
      <header class="head">
        <x-header
          class="reset-header"
          :left-options="{showBack: showBack,backText: ''}"
        >提示</x-header>
      </header>
      <main>
        <article>
          <p>努力开发中...</p>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import {isEmpty} from '../utils/common'
export default {
  name: "OnDev",
  components: {},
  data() {
    return {
      showBack: true //返回
    };
  },
   created: function() {
    let token=this.$route.query.token;
    if(!isEmpty(token)){
      this.showBack=false;
    }
   }
};
</script>
<style lang="less" scoped>
.head {
  position: fixed;
  left: 0;
  right: 0;
  height: 4.6rem;
  width: 100%;
  background-color: #ffffff;
  z-index: 20;
}

.head {
  top: 0;
}
.foot {
  position: fixed;
  left: 0;
  right: 0;
  height: 4.3rem;
  width: 100%;
  background-color: #ffffff;
  z-index: 100;
}
.foot {
  bottom: 0;
}
article {
  position: fixed;
  left: 0;
  right: 0;
  top: 4.6rem;
  bottom: 0rem;
  width: 100%;
  overflow: scroll;
  background-color: #fff;
  padding: 1.5rem;
  box-sizing: border-box;
  text-align: center;
}
</style>
