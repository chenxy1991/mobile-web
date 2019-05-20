<template>
  <div class="selfInfo">
  <div class="reset-cell" style="font-size: 1.4rem;">
     <header class="head">
		<!-- <x-header class="reset-header" :left-options="{backText: '返回'}">智慧营维外呼助</x-header> -->
		<x-header class="reset-header" :left-options="{showBack: showBack,backText: ''}">个人详情</x-header>
		</header>
     <article>
    <div align="center" style="margin-top:30px">
         <img  src="../../../assets/images/icon/mine_active.svg" style="width:100px; height:100px; display:block; ">
          <p>{{name}}</p>
          <p>{{position}}</p>
    </div>
    <group >
      <cell title="账号" :value="map.username" @click.native="onClick(map.username)"></cell>
      <cell title="姓名" :value="map.realName" @click.native="onClick(map.realName)"></cell>
      <cell title="手机" :value="map.mobile" @click.native="onClick(map.mobile)"></cell>
      <cell title="联系电话" :value="map.telNum" @click.native="onClick(map.telNum)"></cell>
      <cell title="邮件" :value="map.email" @click.native="onClick(map.email)"></cell>
      <!-- <cell title="所属渠道" :value="officephone" @click.native="onClick(mobile)"></cell> -->
    </group>
   <!--  <group > -->
      <!-- <cell title="默认主叫" :value="map.mobile" @click.native="onClick(map.mobile)"></cell> -->
     <!--  <cell title="登录状态" v-show='map.managerPhone1' :value="map.managerPhone1" @click.native="onClick(map.managerPhone1)"></cell>
      <cell v-show='map.managerPhone2' title="绑定号码2" :value="map.managerPhone2" @click.native="onClick(map.managerPhone2)"></cell>
      <cell v-show='map.managerPhone3' title="绑定号码3" :value="map.managerPhone3" @click.native="onClick(map.managerPhone3)"></cell> -->
      <!-- <cell title="渠道类型" :value="map.officephone" @click.native="onClick(map.mobile)"></cell>
      <cell title="渠道管理部门" :value="map.officephone" @click.native="onClick(map.mobile)"></cell> -->
    <!-- </group> -->
    </article>
    </div>
  </div>
</template>

<script>
	import {
	  mapActions
	} from "vuex";
import { Cell, Group, XHeader } from 'vux'

export default {
  name: 'presoninfo',
	components: {
		Group,
		Cell,
		XHeader
	},
  data () {
  	return {
      map:[],
      showBack:true,
  	}
  },
   created() {
    let currentUser = this.storejs.get("UserInfo");
    this.map=currentUser;
  }, //初始化
	mounted() {
    //this.initLoadData();
  },
  destroyed() {
  },
  computed: {},
  methods: {
		...mapActions([
			'getUserInfoById',
		]),
		initLoadData () {
			this.initGetUserInfoById();
		},
	/* 	async initGetUserInfoById() {
			let result = {};
			let data = {};
      let userId=JSON.parse(window.localStorage.getItem('LoginUserId'));
      let userInfo=JSON.parse(window.localStorage.getItem('UserInfo'));
			try {
				const sendInfo = {
					headers: {
						managerCode:userInfo.managerCode,
					},
					Jsondata: {
					}
				};
				this.$vux.loading.show({
					text: '努力加载中'
				});
				result = await this.getUserInfoById(sendInfo);
			} catch (error) {
				console.error(error);
				this.showToast(false,'warn','请求失败，原因:' + error);
			}
      console.log("getUserInfoById：",result);
      	if (result.meta.success == true) {
        	let userMap=result.data.userMap;
			    this.map = userMap;
			}else{
				let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',failDesc+'，原因:' + failCaused);
			}
			this.$vux.loading.hide();
		}, */
  },


}
</script>
<style lang="less" scoped>
.head{
  position: fixed;
  left: 0;
  right: 0;
  height:4.6rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 20;
}

.head {
  top: 0;
}
.foot{
  position: fixed;
  left: 0;
  right: 0;
  height:4.3rem;
  width: 100%;
  background-color:#ffffff;;
  z-index: 100;
}
.foot{
  bottom:0;
}
article{
      position: fixed;
      left: 0;
      right: 0;
      top:4.6rem;
      bottom: 0rem;
      width: 100%;
      overflow: scroll;
      background-color:#FFF;
  }

</style>
<style lang="less" scoped>
.presoninfo /deep/ .vux-header .vux-header-left .left-arrow:before {// /deep/样式穿透”
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid #ffffff;
    border-width: 1.5px 0 0 1.5px;
    transform: rotate(315deg);
    top: 8px;
    left: 7px;
}

</style>
