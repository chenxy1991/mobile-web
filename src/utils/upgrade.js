import * as common from '@/api/common';
//检测新版本升级
export function upgradeForAndroid(releasePath, packageName) {
  AlertModule.show({
    title: '已经下载：0%'
  })
  var url = releasePath; //apk所在的服务器路径
  var targetPath = cordova.file.externalCacheDirectory + "Download/Pass/" + packageName; //要下载的目标路径及文件名
  var trustHosts = true;
  var options = {};

  console.log("url:" + url);
  console.log("targetPah:" + targetPath);
  console.log("trustHost:" + trustHosts);
  downLoadApp();

  function downLoadApp() {
    // 初始化FileTransfer对象
    var fileTransfer = new FileTransfer();
    fileTransfer.onprogress = function (progressEvent) {
      if (progressEvent.lengthComputable) {
        var downloadProgress = (progressEvent.loaded / progressEvent.total) * 100;

        var result = "已经下载：" + Math.floor(downloadProgress) + "%";
        AlertModule.show({
          title: result
        })
      }
    };
    // 调用download方法
    fileTransfer.download(
      url, //uri网络下载路径
      targetPath, //url本地存储路径
      function (entry) {
        console.log("download complete: " + entry.toURL());
        cordova.plugins.fileOpener2.open(
          targetPath,
          'application/vnd.android.package-archive', {
            error: function (e) {
              console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
              AlertModule.show({
                title: "打开下载文件失败"
              })
            },
            success: function () {

              console.log('open successfully');
            }
          })
      },
      function (error) {
        AlertModule.show({
          title: "下载失败"
        })
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
      }
    );
  }
}

/*
 * 检测升级方法
 */
export function checkUpgrade(platformType, title) {
  console.log("设备类型：" + platformType);
  var appName = "应用名字";
  var appType = platformType;
  /**
   * 从服务器获取应用的版本信息，和本地应用版本对比
   * @param appName 应用名称
   * @param appType 应用类型
   */
  common.getAppInfo(appName, appType).then(response => {


    if (response != ) {
      var packageName = response.data.packageName;
      var releasePath = process.env.BASE_API + "/" + response.data.path + "/" + response.data.packageName;
      var serverVersion = response.data.appVersion;
      //获取本地App版本;
      cordova.getAppVersion.getVersionNumber().then(function (version) {
        console.log("本地版本：" + version);
        console.log("服务器版本：" + serverVersion);
        if (version < serverVersion) {
          //$rootScope.$state.isLogin = false;
          localStorage.setItem("appUpgrade", "0");
          localStorage.removeItem("password");
          //退出登录
          appRouter.$vux.confirm.show({
            // 组件除show外的属性
            onCancel() {},
            onConfirm() {
              if (platformType == 'Android') {
                console.log("---Android升级中,请稍后---");
                upgradeForAndroid(releasePath, packageName);
              } else {
                console.log("---Ios升级中,请稍后---");
                cordova.plugins.externalExtension.openURL(response.data.path.toString());
              }
            },
            title: '发现新版本：' + serverVersion + ',' + '请进行升级',
            content: title + response.data.remark,
          })

        }
      });
    }
  }).catch(error => {
    //请求失败处理函数
    AlertModule.show({
      title: "请求错误!!"
    })
  })
  // 监听网络状况，无网络时
  document.addEventListener('offline', function () {
    debugger
    console.log("网络异常，不能连接到服务器！");
    alert({
      template: "<span class='c_white text_bold'>网络异常，不能连接到服务器！</span>"
    });

    setTimeout(function () {
      console.log("settimeOut方法");
    }, 2000);
  }, false);
}