<template>
<div id="eventManage">
  <article>
   <!--  <div  v-for="(mapApp,index) in eventInfoList" :key="mapApp.index"> -->
       <!-- 事件基础信息开始 -->
      <group  :gutter="0" label-width="4em" label-align="left" label-margin-right="1.0rem">
			<cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >工单编号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.businessKey}}</span>
			</cell>
     <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >工单标题</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.title}}</span>
			</cell>
      <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >工单类型</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.othersystemBillTypeName}}</span>
			</cell>
      <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >拟稿人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyUserName}}</span>
			</cell>
      <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >拟稿部门</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyOrgName}}</span>
			</cell>
      <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >拟稿时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.createTime | formatDate}}</span>
			</cell>
      <!-- <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >超时时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.expirationTime| formatDate}}</span>
			</cell> -->
     <!--  <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >归档时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.filetime| formatDate}}</span>
			</cell>
      <cell value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >接触流水号</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.serialNumber}}</span>
			</cell> -->
		</group>
      <!-- 事件基础信息结束-->
      <!--  <group  :gutter="10">
        <cell
          :title="('积分兑换')"
          is-link
          :border-intent="false"
          :arrow-direction="showContent004 ? 'up' : 'down'"
          @click.native="showContent004 = !showContent004"></cell>
      <p class="slide" :class="showContent004?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>
    </group> -->
      <!--事件内容开始-->
    <group :gutter="10" >
			<cell
				:title="('事件内容')"
			  is-link
        :border-intent="false"
        :arrow-direction="showEventContent ? 'up' : 'down'"
				@click.native="showEventContent =!showEventContent">
			</cell>
         <!-- <template v-if="showEventContent"> -->
			<p class="slide" :class="showEventContent?'animate':''">
				<group class="groupContent" :gutter="0" label-width="5em" label-align="right" label-margin-right="1.0rem" >
					<cell style=" padding-bottom:  0rem!important;" id="regionName" value-align="left">
						<span class="f14 auto-linefeed span-font" slot="title" >影响范围</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.regionName}}</span>
					</cell>
					<cell style=" padding-bottom:  0rem!important;" id="contactsUser" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.contactsUser}}</span>
					</cell>
					<cell style=" padding-bottom:  0rem!important;" id="contactsMobile" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">联系人电话</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.contactsMobile}}</span>
					</cell>
					<cell   style=" padding-bottom:  0rem!important;" id="applyPhenomena" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">申告现象</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.applyPhenomena}}</span>
					</cell>
          <cell   style=" padding-bottom:  0rem!important;" id="happenDate" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">发生时间</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.happenDate| formatDate}}</span>
					</cell>
           <cell   style=" padding-bottom:  0rem!important;" id="primarySystem" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">首要系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.primarySystem}}</span>
					</cell>
           <cell   style=" padding-bottom:  0rem!important;" id="relatedSystem" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">相关系统</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.relatedSystem}}</span>
					</cell>
           <cell   style=" padding-bottom:  0rem!important;" id="eventAffect" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">影响度</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.eventAffect|filterEventAffect}}</span>
					</cell>
           <cell   style=" padding-bottom:  0rem!important;" id="eventPri" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">优先级</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.eventPri|filterEventPri}}</span>
					</cell>
          <cell   style=" padding-bottom:  0rem!important;" id="eventPri" value-align="left">
						<span  class="f14 auto-linefeed span-font" slot="title">事件描述</span>
						<span class="f14 auto-linefeed c999" slot>{{mapApp.eventDesc}}</span>
					</cell>
          </group>
         <!--   </template> -->
        </p>
     </group>

          <!--  <h-span label='事件性质' :value='mapApp.eventKind'></h-span> -->
          <!--  <h-span label='挂起状态' :value='mapApp.hang_status'></h-span> -->
          <!--  <h-span label='外系统申告类别' :value='mapApp.fault_kind_name'></h-span> -->
          <!--  <h-span label='申告现象ID' :value='mapApp.fault_phenomena_id'></h-span> -->
          <!--  <h-span label='是否越级投诉' :value='mapApp.is_over_complain_order'></h-span>
          <h-span label='联系人地址' :value='mapApp.contace_address'></h-span> -->

      <!--需求内容结束-->
      <!-- 集团高额预警基础信息开始  -->
      <!-- 集团高额预警基础信息结束  -->
      <!-- 10000号基础信息开始  -->
      <!-- 10000号基础信息结束  -->


  <!--  </div> -->
   </article>
   <footer class="foot">
      <x-button type="primary"  @click.native="handleSumbitWorkOrderTaskClick()" action-type="button" style="background-color:#1B82D1">处理</x-button>
   </footer>
</div>
</template>
<script>
import store from 'storejs';
import {
  mapActions
} from 'vuex'
import {
  XButton
} from 'vux'
import {
  formatDate
} from '../../../../../utils/date'
export default {
  name: "eventManage",
  props: {
    formDataMap: {
      type: Object,
      required: false
    },
  },
  components: {
    XButton
  },
  data() {
    return {
      mapApp: '',//事件工单详情信息
      showEventContent: false,//显示事件内容
    }
  },
  created: function () {
    this.mapApp=this.formDataMap.mapApp;
    console.log("事件",this.formDataMap);
  },
  mounted: function () {
       //this.initPageData();
  },
  destroyed() {
  },
  filters: {
    formatDate(time) {
      if (time != null) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    filterEventKind: function (value) {
      if (value == '10') {
        value = '客户投诉';
      } else if (value == '11') {
        value = '系统故障';
      }
      return value;
    },
    filterEventAffect: function (value) {
      if (value == '1') {
        value = '重大';
      } else if (value == '2') {
        value = '严重';
      } else if (value == '3') {
        value = '一般';
      } else if (value == '4') {
        value = '无';
      }
      return value;
    },
    filterEventPri: function (value) {
      if (value == '1') {
        value = '紧急';
      } else if (value == '2') {
        value = '高';
      } else if (value == '3') {
        value = '中';
      } else if (value == '4') {
        value = '低';
      }
      return value;
    }
  },
  methods: {
    ...mapActions([
      '',
    ]),
    initPageData(){
      //this.runQueryBusinessInfoByKeyApi();
    },
    handleSumbitWorkOrderTaskClick(){
    let formDataMap=this.formDataMap;
    console.log("item",formDataMap);
    this.$router.push({
          name: "handleRouter",
          query: {
            formDataMap:JSON.stringify(formDataMap),
            token:this.$route.query.token,
          }
        });
  },//工单提交处理
   /*  async runQueryBusinessInfoByKeyApi() {
      let result = {};
      let userId=JSON.parse(store.get('LoginUserId'));
       try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          'businessKey': this.businessKey,
          'processDefinitionKey': this.processKey,
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.queryBusinessInfoByKey(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','请求工单详情异常，原因:' + error);
      }
       console.log("queryBusinessInfoByKey：",result);
      if (result.meta.success == true) {
        let returnMap=result.data.returnMap
        this.eventInfoList = returnMap.businessKeyDetail;
        this.$store.commit('updatFormDetail',this.eventInfoList);
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"加载工单详情失败，原因:"+failDesc+'，' + failCaused);
      }
    }, *///工单详情

  }
}
</script>
<style  scoped>
article {
      position: fixed;
      top: 9rem;
      bottom: 4.6rem;
      width: 99%;
      overflow: scroll;
      background-color:#FFF;
  }
.foot {
  position: fixed;
  left: 0;
  height: 4.2rem;
  line-height: 4.2rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}
.foot {
  bottom: 0;
}
</style>

<style lang="less" scoped>
.slide {
  padding: 0 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.groupContent /deep/ .weui-cells:before {
    border-bottom: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cells:after {
    border-bottom: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cell:before{
  border-top: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cell:after{
  border-top: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cell{
    padding: 1rem 0rem;
    position: relative;
    display: flex;
    align-items: center;
}
</style>
