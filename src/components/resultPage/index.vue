<template>
  <div class="resultPage" style="height:100%;">
    	<header style="position: fixed;top: 0;left: 0;right: 0;z-index: 20;">
		    <x-header class="reset-header":left-options="{showBack:false,backText: '',preventGoBack:true}">{{title}}</x-header>
		 </header>
     <view-box ref="viewBox">
       <div style="position:absolute;top:46px;left: 0;right: 0;">
          <msg :title="handleTitle"  :icon="icon">
            <span slot="description">{{description}}</span>
             <template slot="buttons">
              <x-button  v-for="(item,idx) in buttons" :key="idx" v-show="item.show" :type="item.type" @click.native="handleButtonClick(item.link)" >{{item.text}}</x-button>
            </template>
          </msg>
       </div>
      </view-box>
  </div>
</template>

<script>
import { Msg, Divider, XButton,XHeader,ViewBox } from 'vux'
export default {
  components: {
    Msg,
    Divider,
    XButton,
    XHeader,
    ViewBox
  },
  data () {
    return {
      description: '',//描述
      icon: '',//符号
      title:'',//标题
      buttons: [],//按钮
    }
  },
  created() {
	const {
				description,
        title,
        icon,
        buttons,
		} = this.$route.query;
   this.description = description;
   this.title = title;
   this.icon = icon;
   this.buttons=JSON.parse(buttons);
   console.log("进来了", this.buttons);
 },
  mounted() {
  },
  destroyed() {
  },
  computed: {},
  methods: {
    handleButtonClick(item){
       this.$router.push({
                name: item.name,
                query: item.query,
            });
        console.log('on click handleOrderTaskClick ', item);
    },
  },

}
</script>