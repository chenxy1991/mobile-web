<template>
  <div id="Header"  :show="showHeader">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:rgb(76, 130, 193);"
              :left-options="{showBack: showBack, backText: backText}"
             >{{title}}
              <a slot="right"  @click="showMenus = true" :show="isShowAsideMenu"><icon class="el-icon-coral-search"></icon>搜索</a>
    </x-header>

    <div v-transfer-dom>
      <popup v-model="showMenus" position="right">
        <div style="width:200px;">
          <group>
            <cell v-for="(menu,value) in menuList" :title="menu.title" :value="menu.value"
                  @click.native="goToUrl(menu.url)" :class="menu.class" v-bind:key="menu.key"></cell>
          </group>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {XHeader, TransferDom, Popup, Group, Cell, cookie} from 'vux'

  export default {
    name:"Header",
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Popup,
      Group,
      Cell
    },
    computed: {
      ...mapState({
        showBack: state => state.showBack,
        title: state => state.title,
        backText: state => state.backText,
        isShowAsideMenu: state => state.isShowAsideMenu,
        showHeader: state => state.showHeader
      })
    },
    data () {
      return {
        menuList: [
          {title: 'userInfo', value: '', url: '/userInfo'},
          {title: '', value: 'userInfo', url: '/userInfo', class: 'menu'},
          {title: 'userInfo', value: '', url: '/userInfo'},
          {title: '', value: 'userInfo', url: '/userInfo', class: 'menu'}
        ],
        showMenus: false
      }
    },
    methods: {
      goToUrl(path) {
        if (path) {
          console.log(path)
        }
        let vue = this
      }
    }
  }
</script>
<style>
  *{font-size: 14px}
  #Header .vux-header-title {
    font-size: 16px;
  }
  #Header .vux-header-back{
      font-size: 15px;
      color: #fff;

  }

  #Header .menu {
    margin-right: 70px;
  }
  #Header .menu div {
    color: #000;
  }
  #Header .menu:before {
    right: -70px;
  }
</style>
