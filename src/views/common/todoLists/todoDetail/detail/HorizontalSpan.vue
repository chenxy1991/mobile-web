<template>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell-box>
        <font class="f14">{{label}}</font>
      </cell-box>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="f14 c999">{{value}}</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  CellBox,
   Cell,
} from 'vux'
export default {
  props: {
    label: {
      type: String,
      default: '',
      required: false
    },
    value: {
      type: Object,
      required: false
    }
  },
  name: "horizontal-span",
  components: {
    Flexbox,
    FlexboxItem,
    CellBox,
     Cell,
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
</style>
