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
        <van-col class="title" span="8">已揽</van-col>
        <van-col class="title" span="8">待揽</van-col>
      </van-row>
      <van-row class="row">
        <van-col class="text" span="8">{{SumNum}}</van-col>
        <van-col class="text" span="8">{{YTNum}}</van-col>
        <van-col class="text" span="8">{{WTNum}}</van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="title">
        待揽收 {{mailSum}}件
      </div>
      <div class="subContent">
            <div v-for="(item,index) in collectionList" class="lists">
              <div class="row">
                <div class="left wrap">
                  <span class="index">{{index+1}}</span>
                  <div class="top-text">{{item.senAddress}}</div>
                  <div class="bottom-text">{{item.sender}} {{item.senPhone}}</div>
                </div>
                <div class="middle-line"></div>
                <div class="right wrap">
                  <a :href="`tel:${item.senPhone}`">
                    <i class="iconfont icon-tuotou_dianhua left-icon"></i>
                  </a>
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
        map:{},
        SumNum:0,
        YTNum:0,
        WTNum:0,
        mailSum:0,
        collectionList:[],
      }
    },
    mounted(){
      this.initMap()
      this.getData()
    },
    methods:{
      getData(){
        this.$get('collection/getCollectionNum',{
          userId:this.$store.state.user.id,
        }).then((res)=>{
          console.log(res)
          this.SumNum = res.ZL
          this.WTNum = res.WL
          this.YTNum = res.YL
        })
        this.$get('collection/getCollection',{
          userId:this.$store.state.user.id,
          // deptCode:this.$store.state.user.deptCode,
        }).then((res)=>{
          console.log(res)
          this.$toast(res.message)
          this.mailSum = res.mailSum
          this.collectionList = res.collectionList
          this.collectionList.map((item,index)=>{
            var point = new BMap.Point(item.longitude,item.latitude);
            var opts = {
              position : point,    // 指定文本标注所在的地理位置
              offset   : new BMap.Size(0, 0)    //设置文本偏移量
            }
            var label = new BMap.Label(index+1, opts);  // 创建文本标注对象
            label.setStyle({
              color : "#0091ff",
              boxShadow: "0 2px 4px 0",
              border : "1px solid #0091ff",
              textAlign : "center",
              fontSize : "14px",
              width:"18px",
              height : "18px",
              lineHeight : "18px",
              fontFamily:"微软雅黑",
              borderRadius:'50%'
            });
            this.map.addOverlay(label);
          })
        })

      },
      initMap(){
        var that = this;
        this.map = new BMap.Map('map') // 创建地图实例
        var point = new BMap.Point(116.391641, 40.068351) // 创建点坐标
        this.map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
        let geolocation = new BMap.Geolocation()
        geolocation.enableSDKLocation() // 允许SDK辅助
        geolocation.getCurrentPosition( (res) =>{
          if (geolocation.getStatus() === 0) {
            console.log(res)
            var point = new BMap.Point(res.longitude,res.latitude)
            var myIcon = new BMap.Icon(userMessenger, new BMap.Size(40, 40), {imageSize: new BMap.Size(40, 40)});
            var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
            this.map.addOverlay(marker)
            this.map.setCenter(point)
          }else if(geolocation.getStatus() === 2){
            this.$toast('位置未知,请稍后再试!')
          }else if(geolocation.getStatus() === 8){
            this.$toast('定位超时,请稍后再试!')
          }else if(geolocation.getStatus() === 6){
            this.$toast('没有定位权限!')
          }
        },{
          enableHighAccuracy:true,
          SDKLocation:true,
          maximumAge:0,
          timeout:60000,
        })
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
    height: 300px;
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
          min-height: 44px;
          text-align: left;
          font-size: 0;
          margin-top: 4px;
          vertical-align: top;
          .wrap{
            display: inline-block;
            font-size: 0;
            text-align: left;
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
            width: 246px;
            padding-left: 11px;
            .index{
              vertical-align: top;
              font-size: 13px;
              color: #0091FF;
              text-align: center;
              display: inline-block;
              width: 16px;
            }
            .top-text{
              width: 80%;
              font-size: 13px;
              color: #000;
              vertical-align: top;
              display: inline-block;
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
            vertical-align: top;
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
