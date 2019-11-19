/*
* cordova plugin function 封装
* 定位插件  cordova-plugin-geolocation https://www.npmjs.com/package/cordova-plugin-geolocation
*
* */

export default {
  getPosition(onSuccess,error){
   /* err 信息
   * PositionError.PERMISSION_DENIED
     当用户不允许应用检索位置信息时返回。这取决于平台。
     PositionError.POSITION_UNAVAILABLE
     当设备无法检索位置时返回。通常，这意味着设备未连接到网络或无法获得卫星定位。
     PositionError.TIMEOUT
     当设备在中timeout包含的指定时间之内无法检索位置时返回geolocationOptions。
     * 与配合使用时navigator.geolocation.watchPosition，此错误可能geolocationError每timeout毫秒重复传递给回调。
   * */
    const option = {maximumAge: 300000, timeout: 300000, enableHighAccuracy: true}
    navigator.geolocation.getCurrentPosition(onSuccess, error,option);
  },
  /*
  * 相机插件 cordova-plugin-camera  https://www.npmjs.com/package/cordova-plugin-camera
  * 可提供 获取本地照片   拍照
  * */
  // 获取本地图片
  getImage(onSuccess,onFail){
    const option = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType:0
    }
    navigator.camera.getPicture(onSuccess, onFail,option);
  },
  /*
  * 二维码插件  cordova-plugin-qrscanner  https://www.npmjs.com/package/cordova-plugin-qrscanner
  *
  * */

  openScan(onSuccess){
    QRScanner.prepare((err, status)=>{
      console.log(err)
      if(err){
        if (err.name === 'SCAN_CANCELED') {
          this.$toast('已取消扫描');
        }else if(err.name === 'BACK_CAMERA_UNAVAILABLE'){
          this.$toast('后置摄像头不可用,请检查设置!');
        }else if(err.name === 'CAMERA_ACCESS_DENIED'){
          this.$toast('用户拒绝摄像机访问!');
        }else if(err.name === 'CAMERA_ACCESS_DENIED'){
          this.$toast('摄像机访问受到限制 (由于家长控制，组织安全配置配置文件或类似原因)!');
        }else if(err.name === 'CAMERA_ACCESS_DENIED'){
          this.$toast('相机不可用，因为它不存在或无法配置!');
        }else {
          this.$toast('出现错误,原因不详,请检查手机设置!');
        }
      }
      if (status.authorized) {
        // W00t，则说明您具有摄像头访问权限，并且扫描仪已初始化。
        QRScanner.show();
        QRScanner.scan(onSuccess);
        // QRscanner.show（）应该很快。
      } else if (status.denied) {
        Vue.$dialog.confirm({
          title: '是否同意',
          message: '前往设置打开摄像访问权限?'
        }).then(() => {
          // on confirm
          QRScanner.openSettings()
        }).catch(() => {});

      } else {
        //我们没有获得许可，但是我们没有被永久拒绝。（在
        //安卓，拒绝不是永久的，除非用户检查“不要
        //再次询问”复选框。）我们可以在下次有机会相关的再次询问。
      }
    })
  },
  /*
  * 关闭扫描页  */
  closeScan(){
    QRScanner.cancelScan()
    QRScanner.hide();
    QRScanner.destroy();
  },
  /*
  * 打开灯光
  * 关闭灯光
  * */
  openLight(){
    QRScanner.enableLight();
  },
  closeLight(){
    QRScanner.disableLight();
  },

  /*
  * 震动方法   navigator.vibrate(500);
   * */
  openVibrate(time){
    navigator.vibrate(time)
  }

  /*
  * cordova-plugin-keyboard  键盘监听插件
  *  keyboardDidShow 键盘完全打开触发事件
  *  keyboardDidHide 完全关闭 触发
  * */

}
