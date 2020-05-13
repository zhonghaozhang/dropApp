<template>
  <div class="lanshou">
    <van-nav-bar
      :title="`揽收-${activeName}`"
      border
    ></van-nav-bar>
    <div id="map"></div>
    <div class="model">
      <van-row class="row">
        <van-col class="title" span="8">总单量</van-col>
        <van-col class="title" span="8">{{activeName == '待揽收' ?'已揽':'已接' }}</van-col>
        <van-col class="title" span="8">{{activeName == '待揽收' ?'待揽':'待接' }}</van-col>
      </van-row>
      <van-row class="row">
        <van-col class="text" span="8">{{SumNum}}</van-col>
        <van-col class="text" span="8">{{YTNum}}</van-col>
        <van-col class="text" span="8">{{WTNum}}</van-col>
      </van-row>
    </div>
    <div class="content">
      <van-row class="title-tab">
        <van-col :class="activeName == '待揽收' ? 'active':''" @click="clickTab(1)" span="12">待揽收({{mailSum}})</van-col>
        <van-col :class="activeName == '待接单' ? 'active':''" @click="clickTab(2)" span="12">待接单({{mailSum2}})</van-col>
      </van-row>
      <div class="subContent">
<!--            <div v-for="(item,index) in collectionList" class="lists">-->
<!--              <div class="row">-->
<!--                <div class="left wrap">-->
<!--                  <span class="index">{{index+1}}</span>-->
<!--                  <div class="top-text">{{item.senAddress}}</div>-->
<!--                  <div class="bottom-text">{{item.sender}} {{item.senPhone}}</div>-->
<!--                </div>-->
<!--                <div class="middle-line"></div>-->
<!--                <div class="right wrap">-->
<!--                  <a :href="`tel:${item.senPhone}`">-->
<!--                    <i class="iconfont icon-tuotou_dianhua left-icon"></i>-->
<!--                  </a>-->
<!--                  <i class="iconfont icon-tuotou_daohang right-icon" @click="openApp(item)"></i>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="bottom-line"></div>-->
<!--            </div>-->
        <!--   待揽收     -->
        <div v-if="activeName=='待揽收'" class="lists" v-for="(item,index) in collectionList">
          <van-row>
            <van-col class="darkText" style="text-align: center" span="2">{{item.serialNo}}</van-col>
            <van-col class="darkText" span="17">订单编号:{{item.orderNumber}}</van-col>
            <van-col class="text" span="5" @click="gotoPage(1,item)">查看详情 ></van-col>
          </van-row>
          <van-row>
            <van-col offset="2" span="17">
              <div class="layout address">{{item.originProv+item.originCity+item.originCounty+item.originAddr}}</div>
              <div class="layout info">{{item.senderName}} {{item.senderPhone}}</div>
              <div class="layout info">预约揽收时间: <label>{{item.preCollPeriod}}</label></div>
              <div class="layout info">{{item.sendType == 1?'系统派发':'人工派发'}} 未逾期</div>
            </van-col>
            <van-col class="right-action" span="5">
              <van-row>
                <van-col span="4"><div class="line"></div></van-col>
                <van-col span="6">
                  <a :href="`tel:${item.senderPhone}`"><i class="iconfont icon-tuotou_dianhua left-icon"></i></a>
                </van-col>
                <van-col offset="3" span="6"><i class="iconfont icon-tuotou_daohang right-icon" @click="openApp(item)"></i></van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
        <!--        待接单-->
        <div v-if="activeName=='待接单'" class="lists" v-for="(item,index) in collectionList">
          <van-row>
            <van-col class="darkText" style="text-align: center" span="2">{{item.serialNo}}</van-col>
            <van-col class="darkText" span="17">订单编号:{{item.orderNumber}}</van-col>
            <van-col class="text" span="5" @click="gotoPage(2,item)">查看详情 ></van-col>
          </van-row>
          <van-row>
            <van-col offset="2" span="17">
              <div class="layout address">{{item.originProv+item.originCity+item.originCounty+item.originAddr}}</div>
              <div class="layout info">{{item.senderName}} {{item.senderPhone}}</div>
              <div class="layout info">派单时间: <label> {{item.sendTime}} </label> {{item.sendType == 1?'系统派发':'人工派发'}} </div>
              <div class="layout info">预约揽收时间: <label>{{item.preCollPeriod}}</label></div>
            </van-col>
            <van-col class="right-action" span="5">
              <van-row>
                <van-col span="4"><div class="line"></div></van-col>
                <van-col offset="2" span="6"><i class="iconfont icon-tuotou_daohang right-icon" @click="openApp(item)"></i></van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import userMessenger from '../assets/img/userMessenger-lanshou.png'
  import errMessage from '../assets/img/err-message.png'
  export default {
    name: 'lanshou',
    data(){
      return {
        map:{},
        errMessage,
        isShow:false,
        isShowErr:true,
        activeName:'待揽收',
        SumNum:0,
        YTNum:0,
        WTNum:0,
        mailSum:0,
        mailSum2:0,
        collectionList:[],
      }
    },
    mounted(){
      setTimeout(()=>{
        this.initMap()
      },700)
      this.getData()
    },
    methods:{
      getData(){
        let api = 'coll_dispatch_app/preCollectList'
        if(this.activeName == '待揽收'){
          api = 'coll_dispatch_app/preCollectList'
        }else{
          api = 'coll_dispatch_app/preReceiveList'
        }
        this.$get(api,{
          postman_id:this.$store.state.user.id,
          // deptCode:this.$store.state.user.deptCode,
        }).then((res)=>{
          console.log(res)
          // this.$toast(res.message)
          this.SumNum = res.totalAmount
          this.YTNum = res.completedAmount
          this.WTNum = res.toCollectAmount
          this.mailSum = res.toCollectAmount
          this.mailSum2 = res.toReciveAmount
          this.collectionList = res.results
          this.collectionList.map((item,index)=>{
            var point = new BMap.Point(item.originAddrLng,item.originAddrLat);
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
      openApp(item){
        this.plugins.getBaiduPosition().then((res)=>{
          if(res == undefined || res == null ){
            this.$toast('当前定位获取不到,无法导航,请手动打开app自行导航!')
            return
          }
          var data ={
            startlat:res.latitude,
            startlng:res.longitude,
            endlat:item.latitude,
            endlng:item.longitude,
            addr:item.senAddress,
          }
          this.plugins.openBaiduMap(data)
        })
      },
      initMap(){
        this.map = new BMap.Map('map') // 创建地图实例
        var point = new BMap.Point(116.391641, 40.068351) // 创建点坐标
        this.map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
        var res = this.plugins.getBaiduPosition().then((res)=>{
          var point = new BMap.Point(res.longitude,res.latitude)
          var myIcon = new BMap.Icon(userMessenger, new BMap.Size(40, 40), {imageSize: new BMap.Size(40, 40)});
          var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
          this.map.addOverlay(marker)
          this.map.setCenter(point)
          marker.addEventListener("click",this.getPositionMessage);
        })
      },
      getPositionMessage(){
        this.isShow = true
      },
      clickTab(flag){
        if(flag == 1){
          this.activeName = '待揽收'
        } else {
          this.activeName = '待接单'
        }
        this.getData()
      },
      gotoPage(flag,item){
        if(flag == 1){
          this.$router.push({
            name:'lanshouDetails',
            params:{
              orderId : item.orderId,
              detailId : item.detailId,
              serialNo : item.serialNo,
            }
          })
        }else {
          this.$router.push({
            name:'jiedanDetails',
            params:{
              orderId : item.orderId,
              detailId : item.detailId,
              serialNo : item.serialNo,
            }
          })
        }
      },
      enter(){
        this.isShowErr = false
      },
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
    height: 272px;
    width: 100%;
  }
  .content{
    height: 282px;
    background: #f8f8f8;
    text-align: center;
    .title-tab{
      font-size: 14px;
      color: #666666;
      margin-top: 2px;
      letter-spacing: 0;
      .active{
        color: #0091FF;
      }
    }
    .subContent{
        height: 253px;
        overflow-y: auto;
        margin-top: 2px;
        padding-bottom: 5px;
        .lists{
          width: 343px;
          height: 120px;
          margin-left: 16px;
          font-size: 0;
          background: #FFFFFF;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
          border-radius: 6px;
          text-align: center;
          margin-top: 5px;
          padding-top: 5px;
          padding-bottom: 8px;
          .layout{
            margin-top: 6px;
          }
          .address{
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: left;
          }
          .info{
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            text-align: left;
            label{
              font-size: 12px;
              color: #000000;
              letter-spacing: 0;
              text-align: left;
            }
          }
          .darkText{
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
            text-align: left;
          }
          .text{
            font-size: 12px;
            color: #666666;
            letter-spacing: 0;
            text-align: left;
          }
          .right-action{
            margin-top: 39px;
            .line{
              width: 2px;
              height: 20px;
              background: #F3F3F3;
            }
            .left-icon{
              color: #0091FF;
            }
            .right-icon{
              color: #FA6400;
            }
          }
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
  .popup{
    height: 244px !important;
    padding-left: 35px;
    .title{
      margin-top: 13px;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
    }
    .address{
      margin-top: 21px;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      text-align: left;
    }
    .text{
      margin-top: 14px;
      font-size: 14px;
      color: #999999;
      letter-spacing: 0;
      text-align: left;
    }
  }

</style>
