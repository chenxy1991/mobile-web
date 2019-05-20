<template>
  <section class="notice-detail">
    <h1 class="title">{{notice_details.title}}</h1>
    <p class="auther">
      作者：{{notice_details.auther}} &nbsp;&nbsp;&nbsp;
      时间：{{notice_details.time_text}}
    </p>
    <div class="artical" v-html="notice_details.content"></div>
  </section>
</template>

<script>
  import {Cell, Group} from 'vux'
  export default {
    name: 'NoticeDetail',
    components: {
      Cell,
      Group
    },
    data () {
      return {
        notice_details: {}
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getNoticeDetail()
      },
      // 获取公告详情
      getNoticeDetail () {
        let vue = this
        let params = {
          article_id: vue.$route.query.id
        }
        vue.get({
          url: '/api/index/notice_detail',
          params: params,
          success: function (data) {
            vue.notice_details = data.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .notice-detail {
    background-color: #fff;
    height: 100%;
    .title {
      text-align: center;
      padding: 20px 0 10px;
    }
    .auther {
      padding: 0 15px 10px;
      font-size: 14px;
      color: #898989;
    }
    .artical {
      padding: 0 15px;
      color: #809fbb;
    }
  }
</style>
