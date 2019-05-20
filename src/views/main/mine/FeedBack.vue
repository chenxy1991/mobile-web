<template>
<div id=" feedback">
  <div style="font-size: 1.4rem;height: 100vh;overflow: auto;margin-bottom: 44px;" class="reset-cell">
    <!--头部固定-->
    <header style="position: fixed;top: 0;left: 0;right: 0;z-index: 20;">
      <x-header class="reset-header" :left-options="{backText: '返回'}">意见反馈</x-header>
    </header>
    <section style="position:absolute;top: 46px;left: 0;right: 0;padding:5px 10px;">
      <aside style="background-color: #ffffff;margin:10px 10px; border:1px solid #e5e5e5;border-radius: 5px;">
          <cell title="反馈类型">
            <x-icon type="ios-arrow-forward" class="cell-x-icon" @click="console"></x-icon>
          </cell>
      </aside>
      <aside style="background-color: #ffffff;margin:10px 10px;border:1px solid #e5e5e5;">
        <x-textarea title="标题" :placeholder="'请输入标题'" :show-counter="false" :rows="1" autosize></x-textarea>
        <!--<x-input :placeholder="'标题')></x-input>-->
        <x-textarea :max="200" :show-counter="true" :rows=8 :autosize="true" name="optionFeedback" :placeholder="'请输入内容(最多200字符)'"></x-textarea>
      </aside>
      <box gap="40px 0px 10px 0px">
        <x-button type="primary" action-type="button" @click.native="logout">提交</x-button>
      </box>

    </section>
  </div>

</div>
</template>

<script>
import {
  TransferDom,
  XTextarea,
  Group,
  Cell,
  XInput,
  PopupRadio,
  Box,
  XButton,
  XHeader
} from 'vux'

export default {
  name: 'feedback',
  directives: {
    TransferDom
  },
  data() {
    return {
      option: 'A',
      options: ['A', 'B', 'C', 'E', 'F', 'A', 'B', 'C', 'E', 'F', 'A', 'B', 'C', 'E', 'F']
    }
  },
  components: {
    XTextarea,
    Group,
    Cell,
    XInput,
    PopupRadio,
    Box,
    XButton,
    XHeader
  },
  created() {},
  methods: {
    onEvent(event) {
      console.log('on', event)
    }
  }
}
</script>

<style lang="less" scoped>
//对于高复用的公共组件谨慎使用scoped属性

.tar-group {
  border-left: 1px solid rgb(235, 235, 236);
  border-right: 1px solid rgb(235, 235, 236);
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.bottom-btn {
  /* 'margin-top'、'margin-right'、'margin-bottom'、'margin-left',按照顺时针方向罗列的. */
  padding: 50px 20px 0px 20px;
}

.cell-x-icon {
  display: block;
  fill: rgb(58, 122, 218);
}
.no-select-li {
  padding: 8px 0;
  height: 40px;
  background-color: #fff;
  padding: 0 15px;
  line-height: 44px;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  position: relative;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
