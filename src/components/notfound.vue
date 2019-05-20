<template>
  <div class="notfound">
    <div class="reset-cell">
      <header class="head">
        <x-header
          class="reset-header"
          :left-options="{showBack: showBack,backText: ''}">提示</x-header>
      </header>
      <main>
        <article>
        <h1 style="text-align: center">404 not found</h1>
        <img src="../assets/others/404.png" alt="loading"  style="text-align:center;width: 100%;">
      </article>
      </main>
    </div>
  </div>
</template>

<script>
  import { XImg } from 'vux'
  export default {
    name: 'Notfound',
    components: {
      XImg,
    },
    data () {
      return {
      }
    }
  }
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
