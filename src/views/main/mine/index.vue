<template>
  <div class="mine-tab-container">
    <header class="head">
      <div class="top-img">
        <img
          style="background-color: #1B82D1; width: 100vw;"
          src="../../../assets/home/itsm_logo.png"
          alt="我的设置头图"
        >
      </div>
    </header>
    <article>
      <div class="content">
        <div class="wrap">
          <div class="user-info">
            <div class="avatar">
              <img
                :src="avatarImgPath || require('../../../assets/others/default_avatar.svg')"
                alt="用户头像"
              >
            </div>
            <div class="others">
              <span
                class="name f18"
                style="padding-left:2rem"
              >{{realName}}</span>
              <p>
                <i><img src="../../../assets/mime/ic_phone.png"></i>
                <span class="f14">电话：{{mobile}}</span>
              </p>
              <p>
                <i><img src="../../../assets/mime/ic_dp.png"></i>
                <span class="f14">部门：广东公司</span>
              </p>
            </div>
          </div>
          <div class="items">
            <div
              class="item border-bottom-1 border-top-1"
              @click="handleActions('selfInfo')"
            >
              <div class="icon">
                <img
                  src="../../../assets/others/setting_icon1.svg"
                  alt="个人信息"
                >
              </div>
              <div class="group">
                <span>个人信息</span>
              </div>
              <div class="arrow">
                <icon class="el-icon-coral-enter"></icon>
              </div>
            </div>
            <div
              class="item border-bottom-1"
              @click="checkUpdate()"
            >
              <div class="icon">
                <img
                  src="../../../assets/others/setting_icon3.svg"
                  alt="版本更新"
                >
              </div>
              <div class="group">
                <span>版本更新</span>
              </div>
              <div class="arrow">
                <div class=" weui-cell__ft"> {{version}} <icon class="el-icon-coral-enter"></icon>
                </div>
              </div>
            </div>

            <div
              class="item border-bottom-1"
              @click="handleActions('mySetting')"
            >
              <div class="icon">
                <img
                  src="../../../assets/others/setting_icon4.svg"
                  alt="我的设置"
                >
              </div>
              <div class="group">
                <span>我的设置</span>
              </div>
              <div class="arrow">
                <icon class="el-icon-coral-enter"></icon>
              </div>
            </div>

            <div
              class="item border-bottom-1"
              @click="handleActions('feedBack')"
            >
              <div class="icon">
                <img
                  src="../../../assets/others/setting_icon5.svg"
                  alt="意见反馈"
                >
              </div>
              <div class="group">
                <span>意见反馈</span>
              </div>
              <div class="arrow">
                <icon class="el-icon-coral-enter"></icon>
              </div>
            </div>

            <div
              class="item border-bottom-1"
              @click="handleLogout()"
            >
              <div class="icon">
                <img
                  src="../../../assets/others/setting_icon6.svg"
                  alt="退出登录"
                >
              </div>
              <div class="group">
                <span>退出登录</span>
              </div>
              <div class="arrow">
                <icon class="el-icon-coral-enter"></icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { AvatarBasePath } from "../../../constants/index";
import { XButton, TransferDom, Confirm } from "vux";
export default {
  name: "mine",
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    XButton
  },
  data() {
    return {
      currentUserInfo: {},
      realName: "",
      mobile: "",
      showLogoutFlag: false,
      version: "" //版本号
    };
  },
  created() {
    let currentUser = this.storejs.get("UserInfo");
    //alert(user);
    //const currentUser = JSON.parse(user);
    console.log("用户信息", currentUser);
    this.realName = currentUser.realName;
    this.mobile = currentUser.mobile;
  }, //初始化
  mounted() {
    let self=this;
    this.onPlusReady(function () {
          let uuid = plus.device.uuid;
          //alert(uuid);
        // 获取本地应用资源版本号
          plus.runtime.getProperty(plus.runtime.appid, function (inf) {
            self.version = inf.version;
            console.log("当前应用版本：" + self.version);
          });
    })
    //只执行一次
  },
  destroyed() {},
  filters: {
    formatDate(time) {
      if (time != null) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    }
  },

  methods: {
    ...mapActions(["getUserAvatar", "logout","getAppInfo"]),
   async checkUpdate(){
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
      let platformType=this.phoneTpye();
      alert(platformType);
      try {
        const sendInfo = {
          headers: {
            userId:userId,
          },
          Jsondata: {
            'appName': '掌上ITSM',
            'appType': platformType,
          }
        };
        plus.nativeUI.showWaiting("检测更新...");
        result = await this.getAppInfo(sendInfo);
        plus.nativeUI.closeWaiting();
      } catch (error) {
        alert(error);
        console.error(error);
        this.alert("请求版本信息失败"+error);
      }
      console.log("请求版本信息", result);
      if (result.meta.success == true) {
        let map=result.data.returnMap;
        let version=this.version;
        console.log("本地版本：" + this.version);
        let serverVersion=map.appVersion;
        let remark=map.remark;
        let packageName = map.packageName;
        /* let releasePath = process.env.BASE_API + "/" + response.data.path + "/" + response.data.packageName; */
        let releasePath = map.path + "/" +packageName;
        console.log("服务器版本：" + map.appVersion);
        if (version < serverVersion) {
          //$rootScope.$state.isLogin = false;
          localStorage.setItem("appUpgrade", "0");
          localStorage.removeItem("password");
          //退出登录
          let self = this;
          this.confirm({
             title: '发现新版本：' + serverVersion + ',' + '请进行升级',
             content: remark,
             onConfirm() {
              if (platformType == 'android') {
                console.log("---Android升级中,请稍后---");
                self.alert('---Android升级中,请稍后---');
                self.upgradeForAndroid(releasePath, packageName);
              } else {
                console.log("---Ios升级中,请稍后---");
                this.alert("开发中....！");
                //cordova.plugins.externalExtension.openURL(response.data.path.toString());
              }
            }
          });
        } else {
              this.alert("无新版本可更新！");
          }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        console.log("检测更新失败！");
        this.alert("检测更新失败！原因:" +failDesc+","+ failCaused);
       // this.showToast(false,'warn','页面加载异常，原因:' +failDesc+","+ failCaused);
        //跳转到404页面
      }
    },
    upgradeForAndroid(releasePath, packageName) {
      let url = releasePath; //apk所在的服务器路径
      let targetPath = releasePath + packageName; //要下载的目标路径及文件名
      let trustHosts = true;
      let options = {};

      console.log("url:" + url);
      console.log("targetPah:" + targetPath);
      console.log("trustHost:" + trustHosts);
      let wgtUrl = 'http://demo.dcloud.net.cn/test/update/H55CE5700.wgt';
    plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload(wgtUrl, { filename: "_doc/update/" }, function (d, status) {
      console.log("status:", status);
       console.log("d:", d);
      if (status == 200) {
        console.log("下载wgt成功：" + d.filename);
        installWgt(d.filename);	// 安装wgt包
      } else {
        console.log("下载wgt失败！");
        plus.nativeUI.alert("下载wgt失败！");
      }
      plus.nativeUI.closeWaiting();
    }).start();
    },
    handleActions(actionType) {
      switch (actionType) {
        case "selfInfo":
          this.$router.push({
            name: actionType,
            query: {}
          });
          break;
        case "clearCaching":
          this.$vux.toast.text("程序猿努力开发中！");
          this.$router.push({
            name: actionType,
            query: {}
          });
          break;
        case "myNews":
          this.$vux.toast.text("程序猿努力开发中！");
          this.$router.push({
            name: actionType,
            query: {}
          });
          break;
        case "mySetting":
          this.$vux.toast.text("程序猿努力开发中！");
          this.$router.push({
            name: actionType,
            query: {}
          });
          break;
        case "feedBack":
          this.$vux.toast.text("程序猿努力开发中！");
          this.$router.push({
            name: actionType,
            query: {}
          });
          break;
      }
    },

    handleLogout() {
      let self = this;
      this.confirm({
        title: "确定退出",
        content: "确定退出登录吗？",
        onConfirm() {
          self.runLogoutApi();
        }
      });
    },
    async runLogoutApi() {
      const sendInfo = {
        headers: {
          userId: JSON.parse(this.storejs.get("LoginUserId"))
        },
        Jsondata: {}
      };
      this.$vux.loading.show({
        transition: "",
        text: "正在退出..."
      });
      const result = await this.logout(sendInfo);
      console.log(result);
      let self = this;
      if (result.meta.success == true) {
        let allKeys = self.storejs.keys();
        console.log(allKeys, "allKeys==");
        allKeys.forEach(function(key, val) {
          console.log(key, "==", val);
          if (key === "userName" || key === "userPass") {
            console.log(key, "==1111111111", val);
          } else {
            self.storejs.remove(key);
          }
        });
        self.showToast(false, "success", "退出登录成功");
        self.$router.push("/login");
      } else {
        self.showToast(false, "warn", result.data.meta.msg);
      }
      self.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  position: fixed;
  left: 0;
  height: 16rem;
  width: 100%;
  background-color: #ffffff;
  z-index: 100;
}

.head {
  top: 0;
}

article {
  position: fixed;
  top: 16rem;
  width: 100%;
  bottom: 0rem;
  overflow: scroll;
  background-color: #fff;
}
</style>
<style lang="less" scoped>
.mine-tab-container {
  .top-img {
    /*  width: 100%;
    height: 16rem; */

    //height: 2.4rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    width: 100%;
    box-sizing: border-box;

    /* padding: 0 0rem; */
    .wrap {
      width: 100%;
      padding: 0.5rem;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      transform: translateY(-0.4rem);

      .user-info {
        display: flex;
        flex-direction: row;

        .avatar {
          width: 8rem;
          height: 8.5rem;
          overflow: hidden;
          border-radius: 7px;
          margin-right: 1rem;

          img {
            width: 8rem;
            height: 8rem;
          }
        }

        .others {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          i {
            img {
              position: relative;
              width: 18px;
              height: 18px;
              vertical-align: middle;
            }
          }
        }
      }

      .items {
        padding: 0rem 1rem 4.4rem;

        .item {
          width: 100%;
          height: 4.3rem;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;

          .icon {
            width: 2.5rem;
            height: 2.5rem;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .group {
            padding: 0 0.5rem;

            span {
              font-size: 1.5rem;
              color: #8f8f8f;
            }
          }

          .arrow {
            flex: 1;
            text-align: right;

            .el-icon-coral-enter {
              font-size: 1.6rem;
              color: #c1c4d6;
            }
          }
        }
      }
    }
  }
}
</style>
