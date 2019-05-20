<template>
  <div class="AttachmentList" style="height:100%">
<view-box ref="viewBox" >
  <div class="box2">
    <group :gutter="0">
      <cell is-link v-for="(item, index) in attachList" :key="item.id" :border-intent="false"
            :title="item.fileName"
            @click.native="handleAttachmentsClick(item)">
            <img slot="icon" width="30" style="display:block;margin-right:10px;" src="../../../../../assets/images/attachments/p50.png">
            <img  width="25"  style="display:inline" src="../../../../../assets/images/attachments/icon_附件图标.png">
            <div slot="inline-desc">
                <label>{{parseInt((item.size)/1024)}}kb</label>
            </div>
        </cell>
    </group>
</div>
</view-box>
  </div>
</template>

<script>
import { ViewBox, Cell, CellBox, Group, Badge } from 'vux'
import {
  isEmpty,getUrlKey
} from '../../../../../utils/common.js'
import {
  mapActions,mapState,mapGetters
} from 'vuex';
export default {
  name: 'AttachmentList',
   components: {
    Group,
    Cell,
    CellBox,
    Badge,
    ViewBox,
  },
  data() {
    return {
      attachList: undefined,
      offset: 0, //页数
      realId:'',//关联ID
    };
  },
  created: function () {
    console.log(1)
   /*  const {
      businessKey
    } = this.$route.query; */
    //this.realId = this.$route.query.businessKey;
  },
  mounted: function () { //只执行一次
    console.log(2)
    this.onInitData();
  },
  destroyed() {},
  filters: {
    formatDate(time) {
      if (time != null) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  },
  methods: {
    ...mapActions([
      'findAttachmentList',
    ]),
    onInitData(){
        this.queryAttachmentListData();
    },
    async queryAttachmentListData() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
            "realId": this.realId,
            "pageSize": this.offset,
            "pageNo": 10
          }
        };
      this.$vux.loading.show({ text: '努力加载中' });
      result = await this.findAttachmentList(sendInfo);
       this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','请求工单附件异常，原因:' + error);
      }
      console.log("结果集findAttachmentList>>>>>>>>" , result);
      if (result.meta.success == true) {
        let map = result.data.map;
        let attachments=map.attachments;
        this.attachList=attachments;
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载工单附件失败，原因:"+failDesc+'，' + failCaused);
      }
    },
    handleAttachmentsClick(){
        this.$vux.toast.text("程序猿努力开发中！");
    },
   /*  async handleAttachmentsClick(item) {
       this.$router.push({path:'/AttachmentDetail',query:{item:item,path: item.path,fildID: item.fildID }})
    }, */
},
}
</script>
<style lang="less" scoped>
.box2 /deep/ .vux-label {// /deep/样式穿透”
        font-size: 1.4rem;
}
.box2 /deep/ .vux-label-desc {// /deep/样式穿透”
        font-size: 1.4rem;
         color:rgb(164, 164, 164);
}
</style>
