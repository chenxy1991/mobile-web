<template>
    <div class="user-login-register-container"  v-bind:style="{height: height + 'px' }">
       <img class="login-border" src="../../../assets/home/itsm_logo.png">
       <div class="login-body">
       <aside  style="background-color:transparent;padding: 0 20px;"   >
          <x-input style="background-color:transparent;"   required v-model="loginForm.username"  placeholder="用户名">
           <img slot="label" style="padding-right: 10px; margin-top: -5px;display:inline-block;" src="../../../assets/images/png/login_user.png" width="22" height="22">
         </x-input>
         <x-input style="background-color:transparent;"  :type="inputType"  placeholder="密码" required v-model="loginForm.password">
           <img slot="label" style="padding-right: 10px; margin-top: -5px;display:inline-block;" src="../../../assets/images/png/login_key.png" width="22" height="22">
           <em slot="right" :class="openPass?'pass-see':'pass-off'" @click="seePass('pass')"></em>
         </x-input>
         <x-input style="background-color:transparent;" disabled></x-input>
        <div class="rememberPwd" style="padding-left: 10px;margin-bottom: 10px;text-align: left;font-size: inherit;">
					<check-icon :value.sync="rememberPwd"> 记住密码</check-icon>
				</div>
         <div  style="padding: 10px;">
           <x-button v-if="loginEnabled" plain type="primary" class="custom-primary-btn"  @click.native="handleLoginClick">登录</x-button>
           <x-button v-else plain type="primary" class="custom-primary-btn-disabled">登录</x-button>
         </div>
        </aside>
        </div>
    </div>
</template>
<script >
import {
  mapActions
} from 'vuex';
import {
  XButton,
  XInput,
  Group,
  CheckIcon,
} from 'vux';
import RegExp from '../../../constants/regExp';
import CryptoJS from 'crypto-js';
export default {
  data() {
    return {
     loginForm: {
        username: 'itsm',//itsm
        password: 'tis#@!123',//tis#@!123
        phone: '',
        auth: '',
      },
      loginEnabled: true,
      inputType: 'password',
      qrtype: 'password',
      qropenPass:false,
      openPass: false,//密码是否显示
      height: '',//高度
      rememberPwd: false,
    };
  },

  components: {
    XButton,
    XInput,
    Group,
    CheckIcon,
  },
  created: function () {
    //console.log(1)
    	//一进来就检测本地存储，如果有的话，显示在账号、密码栏中
			let storeUserName = this.storejs.get('userName');
			let storePwd = this.storejs.get('userPass');
			if(storeUserName) {
				this.loginForm.username = storeUserName;
			}
			if(storePwd) {
				this.loginForm.password = storePwd;
				this.rememberPwd = true;
			}
  },
  mounted: function () { //只执行一次
    this.initPage()
  },
 destroyed() {
   document.body.style.background = '';
 },
  methods: {
    ...mapActions([
      'login',
      'tokenKey',
     ]),
      initPage() {
        this.height = window.innerHeight + 'px';
        document.body.style.background = 'rgb(27, 130, 209)';
      },
     async handleLoginClick() {
      if (!this.validLogin()) {
        return;
      }
      this.loginEnabled = false;
      this.showToast(false,'text',"正在验证登陆信息，请稍等...");
      let result = {};
      let tokenKeyResult = {};
      try {
        tokenKeyResult = await this.tokenKey();
        if (tokenKeyResult.meta.success == true) {
          let userKey_ = tokenKeyResult.data.userKey;
          let tokenKey = tokenKeyResult.data.tokenKey;
          let ivHex = tokenKey;
          let encryptPwd=this.getAesString(this.loginForm.password, tokenKey, ivHex)
          console.log("encryptPwd>>>>>>>>>",encryptPwd);
          const sendInfo = Object.assign({}, this.loginForm, {
            password:encryptPwd,
            methodName: 'login',
            auth: this.loginForm.auth || '1234',
            phone: this.loginForm.phone || '00000000000',
            userKey: userKey_,
            timestamp: new Date()
          });
          result = await this.login(sendInfo);
        }else{
          let failDesc=tokenKeyResult.meta.msg;
          let failCaused=tokenKeyResult.data.errorMsg;
          this.showToast(false,'warn',"登陆失败,"+failDesc+"原因:"+failCaused);
          this.loginEnabled = true;
        }
      } catch (error) {
        console.error(error);
        this.showToast(false,'warn','网络请求异常，原因:' + error+",请稍后再试!");
        this.loginForm.password = '';
        this.loginEnabled = true;
      }
      this.$vux.loading.hide();
      console.log(result);
      if (result.meta.code ===1003) {
        	let userName = this.loginForm.username;
					//传入账号
					this.storejs.set('userName',userName);
					//判断有没有勾选记住密码
					if(this.rememberPwd) {
						let userPass = this.loginForm.password;
						//传入密码
					this.storejs.set('userPass',userPass);
					} else {
						//不勾选则清空密码
						this.storejs.remove('userPass');
					}
        this.showToast(false,'text',"登录成功");
        let user=result.data.user;
        console.log(">>>>>登录信息" + JSON.stringify(user));
        this.storejs.set('Authorization',result.data.jwt);
        this.storejs.set('UserInfo', user);
        this.storejs.set('LoginUserId',user.userId);
        this.storejs.set("activeIndex",0);
        if (this.storejs.get('UserInfo')) {
          this.$router.push({
            path: '/main',
            query: {}
          })
        }
      }else{
        let failDesc=tokenKeyResult.meta.msg;
        let failCaused=tokenKeyResult.data.errorMsg;
        this.showToast(false,'warn',"登陆失败,"+failDesc+"原因:"+failCaused);
        }
      this.loginEnabled = true;
    },
    getAesString(data, key, iv) { //加密
      var key = CryptoJS.enc.Utf8.parse(key);
      var iv = CryptoJS.enc.Utf8.parse(iv);
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString(); //返回的是base64格式的密文
    },
    validLogin() {
      const {
        username,
        password
      } = this.loginForm;

      if (!username) {
        this.showToast(false,'warn',"用户名不能为空");
        return false;
      }
      if (!password) {
        this.showToast(false,'warn',"密码不能为空");
        return false;
      }
      return true;
    },
     seePass(type) {
        if (type == 'pass') {
          this.openPass = !this.openPass
          if (this.inputType == 'password') {
            this.inputType = 'text'
          } else {
            this.inputType = 'password'
          }
        }
        else {
          this.qropenPass = !this.qropenPass
          if (this.qrtype == 'password') {
            this.qrtype = 'text'
          } else {
            this.qrtype = 'password'
          }
        }
      },//密码隐藏/显示
   /*  handleTabItemClick(index) {
      if (index == 1) {
        this.$vux.toast.text('程序猿努力开发中！');
      } else {
        this.index = index;
      }

    },
 */
  }
};

</script>
<style lang="less"  scoped>
.user-login-register-container {
    height: 100%;
    min-height: 100%;
    background-color: rgb(27, 130, 209);
    position: relative;
    .bg-color {
        height: 7.5rem;
        background-color:  rgb(27, 130, 209);
        position: absolute;
        img {
            width: 8.4rem;
           /*  height: 6.5rem; */
            position: absolute;
            left: 50vw;
            top: 15vh;
            transform: translate(-50%, -30%);
        }
    }
    .login-border {
        width: 100vw;
    }
    .login-body {
        position: absolute;
        top: 22rem;
        width: 100vw;
    }
    .login-title{
      width: 100vw;
      position: absolute;
      font-family: '宋体', Helvetica, STHeiTi, Arial, sans-serif;
      top: 15rem;
      text-align: center;
      font-size: 2.5rem;
      color:  #ffffff;
    }
    .pass-off {
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    background: url("./pass-see.png") no-repeat left bottom;
    -webkit-background-size: 100% 200%;
    background-size: 100% 200%;
  }

  .pass-see {
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    background: url("./pass-see.png") no-repeat left top;
    -webkit-background-size: 100% 200%;
    background-size: 100% 200%;
  }
  .custom-primary-btn {
  border-radius: 99px!important;
  border-color: rgb(255, 255, 255)!important;
  background-color:rgb(255, 255, 255) !important;
  color: rgb(27, 130, 209)!important;
  &:active {
    border-color: rgb(237, 241, 240)!important;
    color:#ccc!important;
    background-color: transparent;
  }
 }
 .custom-primary-btn-disabled{
  border-radius: 99px!important;
  border-color: #ccc!important;
  background-color :#ccc !important;
  color: rgb(27, 130, 209)!important;
  &:active {
    border-color: rgb(237, 241, 240)!important;
    color:#ccc!important;
    background-color: transparent;
  }
 }
}
</style>
