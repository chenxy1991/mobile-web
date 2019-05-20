<template>
  <flexbox class="vux-1px-b" orient="vertical" :gutter="0">
    <flexbox-item :span="3" style="border-bottom:1px dashed #e5e5e5;">
      <cell-box>
        <font class="f14">{{label}}</font>
      </cell-box>
    </flexbox-item>
    <flexbox-item>
      <cell-box>
        <font class="f14 c999" v-if="value">{{value}}</font>
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
  ViewBox,
} from 'vux'
export default {
  props: {
    label: {
      type: String,
      default: '',
      required: false
    },
    value: {
      type: [String, Object, Array],
      required: false
    }
  },
  name: "vertical-span",
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
