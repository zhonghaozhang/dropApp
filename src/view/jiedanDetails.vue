<template>
  <div class="jiedanDetails">
    <van-nav-bar
      :title="datas.serialNo+'号待接单详情'"
      border
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div id="map"></div>
    <div class="content">
      <van-row class="row-one">
        <van-col class="Text" span="24">
          <label class="Text" for="">详细地址: </label>
          <span class="darkText">{{datas.originProv+datas.originCity+datas.originCounty+datas.originAddr}}</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">寄件人: </label>
          <span class="darkText">{{datas.senderName}}</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">派单时间: </label>
          <span class="darkText">{{datas.sendTime}}</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">联系电话: </label>
          <span class="darkText">{{datas.senderPhone}}</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">派单类型: </label>
          <span class="darkText">{{datas.sendType == 2 ? '人工' : '系统'}}</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">预约揽收时间: </label>
          <span class="darkText">{{datas.preCollPeriod}}</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">派单次数: </label>
          <span class="darkText">{{datas.sendTimes}}</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">派单人: </label>
          <span class="darkText">{{datas.manualName ? datas.manualName :'某某'}}</span>
        </van-col>
      </van-row>
      <div class="buttons">
        <van-button @click="returns" class="button left-button" type="default">拒绝</van-button>
        <van-button @click="finish" class="button right-button" type="default">接收</van-button>
      </div>
    </div>
    <van-popup class="errModel" v-model="isShow2">
      <h3>接单失败</h3>
      <p>该揽收订单已经被其他投递员接单， 请选择其他订单！</p>
      <div class="img">
        <!--        <img :src="errMessage" alt="">-->
      </div>
      <van-button @click="enter"  class="enter" type="default">我知道了</van-button>
    </van-popup>
    <van-popup
      class="popup"
      v-model="isShow"
      closeable
      position="bottom">
      <div class="title">拒绝原因</div>
      <div class="line"></div>
      <div class="buttons-one">
        <van-button @click="returnSelect(1)" :class="returnReason=='距离远'?'active':''" class="button left-button" type="default">距离远</van-button>
        <van-button @click="returnSelect(2)" :class="returnReason=='重复下单'?'active':'' " class="button right-button" type="default">重复下单</van-button>
      </div>
      <div class="buttons">
        <van-button @click="returnSelect(3)" :class="returnReason=='派单错误'?'active':'' " class="button left-button" type="default">派单错误</van-button>
        <van-button @click="returnSelect(4)" :class="returnReason=='其他'?'active':'' " class="button right-button" type="default">其他</van-button>
      </div>
      <textarea v-if="returnReason=='其他'" rows="4" cols="22" placeholder="请填写退单原因"></textarea>
      <van-button @click="submit" :class="returnReason !==''?'submit-active':''" class="submit-btn" type="default">提交</van-button>
    </van-popup>
  </div>

</template>

<script>
  import userMessenger from '../assets/img/userMessenger-lanshou.png'
  export default {
    name: "jiedanDetails",
    data() {
      return {
        isShow:false,
        isShow2:false,
        returnReason:'',
        map:{},
        datas:{},
      }
    },
    mounted() {
      this.$get('coll_dispatch_app/preReceiveDetail',{
        postman_id:this.$store.state.user.id,
        orderId : this.$route.params.orderId,
        detailId : this.$route.params.detailId,
        serialNo : this.$route.params.serialNo,
      }).then((res)=>{
        this.datas = res
      })
      setTimeout(()=>{
        this.initMap()
      },700)

    },
    methods: {
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
        })
        var point = new BMap.Point(this.datas.originAddrLng,this.datas.originAddrLat)
        var myIcon = new BMap.Icon(userMessenger, new BMap.Size(40, 40), {imageSize: new BMap.Size(40, 40)});
        var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
        this.map.addOverlay(marker)
        this.map.setCenter(point)
      },
      returns(){
        this.returnReason = ''
        this.isShow = true
      },
      enter(){
        this.isShow2 = false
        this.$router.goBack()
      },
      finish(){
        this.$get('/coll_dispatch_app/receiveOrder',{
          postman_id:this.$store.state.user.id,
          orderId : this.$route.params.orderId,
          detailId : this.$route.params.detailId,
          // serialNo : this.$route.params.serialNo,
        }).then((res)=>{
          if(res.status == 1){
            this.$toast.fail(res.message)
            this.isShow2 = true
          }else {
            this.$toast.success(res.message)
            setTimeout(()=>{
              this.$router.goBack()
            },1000)
          }
        })
      },
      returnSelect(flag){
        if(flag == 1){
          this.returnReason = '距离远'
        }else if(flag == 2){
          this.returnReason = '重复下单'
        }else if(flag == 3){
          this.returnReason = '派单错误'
        }else if(flag == 4){
          this.returnReason = '其他'

        }
      },
      onClickLeft(){
        this.$router.goBack()
      },
      submit(){
        if(this.returnReason !=''){
          alert('提交')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .jiedanDetails{
    #map{
      width: 100%;
      height: 272px;
    }
    .content{
      height: 331px;
      background: #f8f8f8;
      padding-left: 35px;
      text-align: left;
      padding-top: 30px;
      .row{
        margin-top: 14px;
      }
      .Text{
        font-size: 14px;
        color: #999999;
        letter-spacing: 0;
        text-align: left;
      }
      .darkText{
        font-size: 14px;
        color: #2A2A2A;
        letter-spacing: 0;
        text-align: left;
      }
      .buttons{
        margin-top: 36px;
        .button{
          background: #0091FF;
          border-radius: 15px;
          font-size: 12px;
          color: #FFFFFF;
          letter-spacing: 0;
          width: 92px;
          height: 30px;
          line-height: 30px;
        }
        .left-button{
          margin-left: 37px;
          margin-right: 47px;
        }
      }
    }
  }
  .popup{
    height: 332px;
    .title{
      font-size: 16px;
      color: rgba(0,0,0,0.87);
      letter-spacing: 0;
      margin-top: 14px;
    }
    .line{
      height: 1px;
      background: #e5e5e5;
      margin-top: 10px;
    }
    .buttons-one{
      margin-top: 31px;
    }
    .buttons{
      margin-top: 23px;
    }
    .button{
      width: 137px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      font-size: 12px;
      color: rgba(28,28,28,0.87);
      letter-spacing: 0;
    }
    .left-button{
      margin-left: 28px;
      margin-right: 32px;
    }
    .active{
      background: rgba(0,145,255,0.10);
      border: 1px solid #0091FF;
    }
    textarea{
      width: 313px;
      height: 65px;
      border-radius: 4px;
      margin-top: 14px;
      margin-left: 32px;
    }
    .submit-btn{
      position: absolute;
      bottom: 50px;
      left: 79px;
      background: #CCCCCC;
      border-radius: 15px;
      font-size: 12px;
      color: rgba(255,255,255,0.87);
      letter-spacing: 0;
      width: 217px;
      height: 30px;
      line-height: 30px;
    }
    .submit-active{
      background: #0091FF;
    }
  }
  .errModel{
    width: 239px;
    height: 299px;
    text-align: center;
    h3{
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      margin-top: 15px;
    }
    p{
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      margin-top: 16px;
      width: 192px;
      margin-left: 23px;
    }
    .img{
      width: 190px;
      height: 114px;
      margin-top: 10px;
      display: inline-block;
      background: url("../assets/img/err-message.png") no-repeat 0/100% 100%;
      /*img{*/
      /*  width: 100%;*/
      /*  height: 100%;*/
      /*}*/
    }
    .enter{
      background: #0091FF;
      border-radius: 15px;
      width: 160px;
      height: 30px;
      line-height: 30px;
      margin-top: 28px;
      font-size: 12px;
      color: #FFFFFF;
    }
  }
</style>
