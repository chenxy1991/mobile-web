<template>
<div id="detailList">

  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell title="标题" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">我正在褐色的长桌上收拾书本，发现手机里QQ闪动着几条来自大二学妹的消息。 “学姐，我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox orient="vertical" class="vux-1px-b" :gutter="0">
    <flexbox-item style="border-bottom:1px dashed #e5e5e5;">
      <cell title="详细信息" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:10px;">
        <font class="flex-font">我正在褐色的长桌上收拾书本，发现手机里QQ闪动着几条来自大二学妹的消息。 “学姐，我最近跟舍友相处不融洽我正在褐色的长桌上收拾书本，发现手机里QQ闪动着几条来自大二学妹的消息。 “学姐，我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell title="备注" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell title="涉及系统" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3.5">
      <cell title="期望完成时间" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">2018-05-06</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell title="来源" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell title="重要程度" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell title="涉及范围" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox class="vux-1px-b" :gutter="0">
    <flexbox-item :span="3">
      <cell title="工单类型" style="padding-right:0px"></cell>
    </flexbox-item>
    <flexbox-item>
      <cell-box style="padding-left:0px;">
        <font class="flex-font">我最近跟舍友相处不融洽</font>
      </cell-box>
    </flexbox-item>
  </flexbox>
  <flexbox orient="vertical" class="vux-1px-b" :gutter="0">
    <flexbox-item style="border-bottom:1px dashed #e5e5e5;">
      <cell  is-link :title="name" :border-intent="false" :arrow-direction="showContent ? 'up' : 'down'" @click.native="showContent = !showContent">
        <!-- <icon class="el-icon-coral-enter f20"></icon> -->
      </cell>
    </flexbox-item>
    <template v-if="showContent">
      <flexbox class="vux-1px-b" :gutter="0">
        <flexbox-item :span="3">
          <cell title="单号" style="padding-right:0px"></cell>
        </flexbox-item>
        <flexbox-item>
          <cell-box style="padding-left:0px;">
            <font class="flex-font">我最近跟舍友相处不融洽</font>
          </cell-box>
        </flexbox-item>
      </flexbox>
      <flexbox class="vux-1px-b" :gutter="0">
        <flexbox-item :span="3">
          <cell title="申请人" style="padding-right:0px"></cell>
        </flexbox-item>
        <flexbox-item>
          <cell-box style="padding-left:0px;">
            <font class="flex-font">我最近跟舍友相处不融洽</font>
          </cell-box>
        </flexbox-item>
      </flexbox>
      <flexbox class="vux-1px-b" :gutter="0">
        <flexbox-item :span="3">
          <cell title="申请时间" style="padding-right:0px"></cell>
        </flexbox-item>
        <flexbox-item>
          <cell-box style="padding-left:0px;">
            <font class="flex-font">我最近跟舍友相处不融洽</font>
          </cell-box>
        </flexbox-item>
      </flexbox>
      <flexbox class="vux-1px-b" :gutter="0">
        <flexbox-item :span="3">
          <cell title="联系电话" style="padding-right:0px"></cell>
        </flexbox-item>
        <flexbox-item>
          <cell-box style="padding-left:0px;">
            <font class="flex-font">我最近跟舍友相处不融洽</font>
          </cell-box>
        </flexbox-item>
      </flexbox>
      <flexbox class="vux-1px-b" :gutter="0">
        <flexbox-item :span="3">
          <cell title="所属部门" style="padding-right:0px"></cell>
        </flexbox-item>
        <flexbox-item>
          <cell-box style="padding-left:0px;">
            <font class="flex-font">我最近跟舍友相处不融洽</font>
          </cell-box>
        </flexbox-item>
      </flexbox>
    </template>
  </flexbox>
</div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  Divider,
  CellBox,
  Group,
  Cell,
} from 'vux'

export default {
  name: "detailLists",
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    CellBox,
    Group,
    Cell,
  },
  methods: {
    onClick() {
      console.log('on click')
    }
  },
  data() {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      showContent: false,
      name: "详细信息",
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.flex-font {
  font-size: 14px;
  line-height: 20px;
}

/*
.flex-left {
  width: 4.5em;
  text-align: right;
  margin-right: 2em;

}
 */
</style>
