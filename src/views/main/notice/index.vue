<template>
  <section class="notice-list">
    <group>
      <cell
        v-for="i in notice_list"
        :title="i.title"
        :inline-desc="i.time_text"
        :key="i.article_id"
        is-link
        :link="{path: '/noticedetail', query: {id: i.article_id}}">
        <img slot="icon" src="../../assets/img/logo.png" alt="img">
      </cell>
    </group>
  </section>
</template>

<script>
  import {Cell, Group} from 'vux'
  export default {
    name: 'Notice',
    components: {
      Cell,
      Group
    },
    data () {
      return {
        notice_list: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getNoticeList()
      },
      // 获取公告列表
      getNoticeList () {
        let vue = this
        vue.get({
          url: '/api/index/notice_list',
          success: function (data) {
            vue.notice_list = data.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .notice-list {
    background-color: #fff;
  }
</style>
