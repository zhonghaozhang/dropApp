<template>
  <div class="lanshouDetails">
    <van-nav-bar
      title="1号待揽收详情"
      border
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div id="map"></div>
    <div class="content">
      <van-row class="row-one">
        <van-col class="Text" span="24">
          <label class="Text" for="">详细地址: </label>
          <span class="darkText">北京市海淀区建材城西路65号</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">寄件人: </label>
          <span class="darkText">张三</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">派单人员: </label>
          <span class="darkText">某某</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">联系电话: </label>
          <span class="darkText">13200000000</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">派单时间: </label>
          <span class="darkText">14:02:59</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">是否逾期: </label>
          <span class="darkText">否</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">派单类型: </label>
          <span class="darkText">系统</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">接单时间: </label>
          <span class="darkText">14:20:09</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">派单次数: </label>
          <span class="darkText">1</span>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col  span="13">
          <label class="Text" for="">预约揽收时间: </label>
          <span class="darkText">15:30-16:50</span>
        </van-col>
        <van-col  span="11">
          <label class="Text" for="">催单次数: </label>
          <span class="darkText">0</span>
        </van-col>
      </van-row>
      <div class="buttons">
        <van-button @click="returns" class="button left-button" type="default">退单</van-button>
        <van-button @click="" class="button right-button" type="default">完成揽收</van-button>
      </div>
    </div>
    <van-popup
      class="popup"
      v-model="isShow"
      closeable
      position="bottom">
      <div class="title">退单原因</div>
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
        name: "lanshouDetails",
        data() {
            return {
              isShow:false,
              returnReason:'',
              map:{}
            }
        },
        mounted() {
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
          },
          returns(){
            this.returnReason = ''
            this.isShow = true
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
.lanshouDetails{
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
</style>
