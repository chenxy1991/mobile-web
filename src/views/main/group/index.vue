<template>
  <div>
    <x-header :left-options="{backText: ''}">积分管理</x-header>
    <div class="showIntegral">你当前的积分为222分</div>
    <group class="cellView">
        <cell
          :title="('积分兑换')"
          is-link
          :border-intent="false"
          :arrow-direction="showContent004 ? 'up' : 'down'"
          @click.native="showContent004 = !showContent004"></cell>
      <p class="slide" :class="showContent004?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>
    </group>
    <group class="cellView">
        <cell
          :title="('积分兑换')"
          is-link
          :border-intent="false"
          :arrow-direction="showContent003 ? 'up' : 'down'"
          @click.native="showContent003 = !showContent003"></cell>
      <p class="slide" :class="showContent003?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>
    </group>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
    name: "index",
        data() {
            return {
                show4: false,
                showContent004: false,
                showContent003: false
            };
        },
  components: {
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  methods: {
  }
}
</script>

<style scoped>
    .showIntegral{
        height: 44px;
        width: 100%;
        text-align: center;
        line-height: 44px;
        color: #269e62;
    }
    .cellView{
        background-color: #f5f5f5;
        height: 31px;
    }
    .slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>