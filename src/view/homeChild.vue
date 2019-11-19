<template>
  <div class="homeChild">
    <van-nav-bar
      title="智能揽投"
      border
    ></van-nav-bar>
    <div id="map"></div>
    <div class="model">
      <van-row class="row">
        <van-col class="title" span="8">总件量</van-col>
        <van-col class="title" span="8">已投</van-col>
        <van-col class="title" span="8">待投</van-col>
      </van-row>
      <van-row class="row">
        <van-col class="text" span="8">{{SumNum}}</van-col>
        <van-col class="text" span="8">{{YTNum}}</van-col>
        <van-col class="text" span="8">{{WTNum}}</van-col>
      </van-row>
    </div>
    <div class="buttons">
      <van-button @click="openScan(1)" class="button left-button" type="default">下段扫描</van-button>
      <van-button @click="openScan(2)" class="button right-button" type="default">装车扫描</van-button>
    </div>
  </div>
</template>
<script>
  import userMessenger from '../assets/img/userMessenger.png'
  import box from '../assets/img/box.png'
    export default {
      name: "test",
      data(){
        return {
          map:{},
          SumNum:0,
          YTNum:0,
          WTNum:0,
        }
      },
      mounted(){
        this.initMap()
        this.getLine()
      },
      methods:{
        initMap(){
          var that = this;
          this.map = new BMap.Map('map') // 创建地图实例
          var point = new BMap.Point(116.391641, 40.068351) // 创建点坐标
          this.map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
          // this.plugins.getPosition((position)=>{
          //   console.log(position)
          //   var pt = new BMap.Point(position.coords.longitude, position.coords.latitude);
          //   new BMap.Convertor().translate([pt],1,5,(data)=>{
          //     var myIcon = new BMap.Icon(userMessenger, new BMap.Size(20,20),{imageSize: new BMap.Size(20,20)});
          //     var marker = new BMap.Marker(data.points[0],{icon:myIcon});  // 创建标注
          //     this.map.addOverlay(marker)
          //     this.map.setViewport(pt)
          //   })
          //
          // })

          var options={
            enableHighAccuracy:true,//开启高精度
            maximumAge:1000
          }
          if(navigator.geolocation){
            //浏览器支持geolocation
            navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
          }else{
            //浏览器不支持geolocation
            this.$toast('您的浏览器不支持地理位置定位');
          }
          //失败时
          function onError(error){
            var status = true;
            switch(error.code){
              case error.PERMISSION_DENIED:
                this.$toast("定位失败,用户拒绝请求地理定位");
                break;
              case error.POSITION_UNAVAILABLE:
                this.$toast("定位失败,位置信息是不可用");
                break;
              case error.TIMEOUT:
                this.$toast("定位失败,请求获取用户位置超时");
                break;
              case error.UNKNOWN_ERROR:
                this.$toast("定位失败,定位系统失效");
                break;
            }
          }
         // 2，成功时我们进行百度地图经纬度转换
          function onSuccess(position){
            console.log(position)
            //经度
            var longitude = position.coords.longitude;
            //纬度
            var latitude = position.coords.latitude;

            var ggPoint = new BMap.Point(longitude,latitude);
            //坐标转换完之后的回调函数
            var translateCallback = function (data){
              if(data.status === 0) {
                var myIcon = new BMap.Icon(userMessenger, new BMap.Size(40,40),{imageSize: new BMap.Size(40,40)});
                var marker = new BMap.Marker(data.points[0],{icon:myIcon});
                that.map.addOverlay(marker);
                that.map.setCenter(data.points[0]);
              }
            }

            setTimeout(function(){
              var convertor = new BMap.Convertor();
              var pointArr = [];
              pointArr.push(ggPoint);
              convertor.translate(pointArr, 1, 5, translateCallback)
            }, 1000);
          }
        },
        openScan(){
          this.$router.push('scanPage')
          this.plugins.openScan((err, text)=>{
            if(err){
              console.log(err)
              if(err.name == 'SCAN_CANCELED'){
                this.$toast('已取消扫描');
              }
            } else {
              // The scan completed, display the contents of the QR code:
              this.plugins.openVibrate(500)
              this.$toast(text);
              this.$router.goBack()
            }
          })
        },
        getLine(){
         this.$get('home/getData',{
           id:this.$store.state.user.id,
           deptCode:this.$store.state.user.deptCode,
         }).then(res => {
            console.log(res)
            this.$toast(res.message)
            this.SumNum = res.SumNum
            this.WTNum = res.WTNum
            this.YTNum = res.YTNum
           res.node.map((item)=>{
             var pt = new BMap.Point(item.longitude, item.latitude);
             var myIcon = new BMap.Icon(box, new BMap.Size(17,15),{imageSize: new BMap.Size(17,15)});
             var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
             this.map.addOverlay(marker);
           })
           let path = []
           res.path.map((item)=>{
             path.push(new BMap.Point(item.lng, item.lat))
           })
           if(path.length > 1){
             var polyline = new BMap.Polyline(path, {strokeColor:"#0091ff", strokeWeight:2}); //创建折线
             this.map.addOverlay(polyline);   //增加折线
             this.map.setViewport(path)
           }

         })

        }
      }
    }
</script>

<style scoped lang="scss">
.homeChild{
  #map{
    width: 100%;
    height: 100%;
  }
  .model{
    text-align: center;
    width: 343px;
    height: 46px;
    position: absolute;
    top: 53px;
    left: 16px;
    background: #fff;
    box-shadow: 0 2px 4px 0;
    border-radius: 6px;
    .row{
      height: 23px;
      line-height: 23px;
    }
    .title{
      font-size: 12px;
      color: #A7A7A7;
    }
    .text{
      font-size: 18px;
      color: #0091FF;
    }
  }
  .buttons{
    position: absolute;
    bottom: 81px;
    .button{
      width: 92px;
      height: 30px;
      line-height: 30px;
      background: #0091FF;
      border-radius: 6px;
      color: #fff;
      font-size: 13px;
      text-align: center;
    }
    .left-button{
      margin-left: 73px;
      margin-right: 47px;
    }
  }
}
</style>
