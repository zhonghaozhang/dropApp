<template>
  <div class="lanshou">
    <van-nav-bar
      title="揽收"
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
        <van-col class="text" span="8">19</van-col>
        <van-col class="text" span="8">15</van-col>
        <van-col class="text" span="8">4</van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="title">
        待揽收 4件
      </div>
      <div class="subContent">
            <div v-for="(item,index) in 10" class="lists">
              <div class="row">
                <div class="left wrap">
                  <div class="top-text"><span class="index">{{index}}</span>北京市海淀区建材城西路65号</div>
                  <div class="bottom-text">张三 13200000000</div>
                </div>
                <div class="middle-line"></div>
                <div class="right wrap">
                  <i class="iconfont icon-tuotou_dianhua left-icon"></i>
                  <i class="iconfont icon-tuotou_daohang right-icon"></i>
                </div>
              </div>
              <div class="bottom-line"></div>
            </div>
      </div>
    </div>
  </div>

</template>

<script>
  import userMessenger from '../assets/img/userMessenger.png'
  export default {
    name: 'lanshou',
    data(){
      return {
        map:{}
      }
    },
    mounted(){
      this.initMap()
    },
    methods:{
      initMap(){
        var that = this;
        this.map = new BMap.Map('map') // 创建地图实例
        var point = new BMap.Point(116.391641, 40.068351) // 创建点坐标
        this.map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
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
      }
    }

  }
</script>

<style scoped lang="scss">
.lanshou{
  .model{
    text-align: center;
    width: 343px;
    height: 46px;
    position: absolute;
    top: 53px;
    left: 16px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
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
  #map{
    height: 331px;
    width: 100%;
  }
  .content{
    height: 222px;
    background: #f8f8f8;
    .title{
      color: #0091FF;
      font-size: 13px;
      text-align: left;
      padding-left: 16px;
      margin-top: 13px;
    }
    .subContent{
        width: 343px;
        height: 177px;
        margin-left: 16px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
        border-radius: 6px;
        margin-top: 8px;
        text-align: center;
        overflow-y: auto;
        .lists{
          font-size: 0;
        }
        .row{
          height: 44px;
          text-align: left;
          font-size: 0;
          margin-top: 4px;
          vertical-align: top;
          .wrap{
            display: inline-block;
            font-size: 0;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .middle-line{
            display: inline-block;
            font-size: 0;
            height: 20px;
            width: 2px;
            background: #F3F3F3;
            vertical-align: top;
            margin-top: 15px;
          }
          .left{
            height: 44px;
            width: 246px;
            padding-left: 11px;
            .top-text{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 80%;
              height: 50%;
              font-size: 13px;
              color: #000;
              .index{
                height: 100%;
                font-size: 13px;
                color: #0091FF;
                text-align: center;
                display: inline-block;
                width: 16px;
              }
            }
            .bottom-text{
              font-size: 11px;
              color: #A7A7A7;
              width: 80%;
              height: 50%;
              padding-left: 16px;
            }
          }
          .right{
            width: 94px;
            height: 44px;
            .iconfont{
              width: 16px;
              height: 16px;
              margin-top: 15.7px;
              vertical-align: top;
              display: inline-block;
            }
            .left-icon{
              margin-left: 22px;
              margin-right: 20px;
              color: #0091FF;
            }
            .right-icon{
              color: #FA6400;
            }
          }
        }
        .bottom-line{
          width: 319px;
          display: inline-block;
          height: 2px;
          background: #F3F3F3;
          margin-top: 2px;
        }
      }

  }
}
</style>
