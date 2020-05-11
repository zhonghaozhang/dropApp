<template>
  <div class="toudi">
    <van-nav-bar
      title="投递"
      border
    ></van-nav-bar>
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
    <div class="mini-title">待投递 {{total}}件</div>
    <div class="content">
      <div class="list">
        <div v-for="item in nodeList">
          <div class="row">
            <div class="left wrap" @click="openDetails(item)">
              <div class="top-text">{{item.nodeAddress}}</div>
              <div class="bottom-text">共 {{item.mailSize}}件</div>
            </div>
            <div class="middle-line"></div>
            <div class="right wrap">
              <i class="iconfont icon-tuotou_dianhua left-icon" @click="openPhone(item.id)"></i>
              <i class="iconfont icon-tuotou_daohang right-icon" @click="openApp(item,0)"></i>
            </div>
          </div>
          <div class="bottom-line"></div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <van-button @click="openScan(1)" class="button left-button" type="default">妥投扫描</van-button>
      <van-button @click="openScan(2)" class="button right-button" type="default">未妥投扫描</van-button>
    </div>
    <van-action-sheet v-model="isShow" title="详细信息">
      <div v-for="item in mailList">
        <div class="row">
          <div class="left wrap">
            <div class="top-text">{{item.recAddress}}</div>
            <div class="bottom-text">{{item.receiver}} {{item.recPhone}}</div>
          </div>
          <div class="middle-line"></div>
          <div class="right wrap">
            <a :href="`tel:${item.recPhone}`">
              <i class="iconfont icon-tuotou_dianhua left-icon"></i>
            </a>
            <i class="iconfont icon-tuotou_daohang right-icon" @click="openApp(item,1)"></i>
          </div>
        </div>
        <div class="bottom-line"></div>
      </div>
    </van-action-sheet>
    <van-action-sheet
      @select="onSelect"
      v-model="showSelect"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
    ></van-action-sheet>
  </div>
</template>

<script>
   export default {
      name: "toudi",
      data(){
        return {
          total:0,
          nodeList:[],
          mailList:[],
          SumNum:0,
          YTNum:0,
          WTNum:0,
          isShow:false,
          showSelect:false,
          actions: [
            { name: '退回' },
            { name: '再投' },
            { name: '转投' }
          ]
        }
      },
     mounted(){
       this.getData()
     },
      methods:{
        getData(){
          this.$get('delivered/getDeliveredData',{
            id:this.$store.state.user.id,
            deptCode:this.$store.state.user.deptCode,
          }).then((res)=>{
            console.log(res)
            this.$toast(res.message)
            this.total = res.mailSum
            this.nodeList = res.nodeList
          })
          this.$get('/delivered/getEamilNum',{
            id:this.$store.state.user.id,
            deptCode:this.$store.state.user.deptCode,
          }).then((res)=>{
            console.log(res)
            this.SumNum = res.SumNum
            this.WTNum = res.WTNum
            this.YTNum = res.YTNum
          })
        },
        openPhone(id){
          this.$get('delivered/call',{
            nodeId:id
          }).then((res)=>{
            console.log(res)
            this.$toast(res.message)
          })
        },
        openApp(item,flag){
          this.plugins.getBaiduPosition().then((res)=>{
            if(res == undefined || res == null ){
              this.$toast('当前定位获取不到,无法导航,请手动打开app自行导航!')
              return
            }
            var data ={
              startlat:res.latitude,
              startlng:res.longitude,
              endlat:flag ==0 ? item.nodeLatitude : item.mailLatitude,
              endlng:flag ==0 ? item.nodeLongitude : item.mailLongitude,
              addr:flag ==0 ? item.nodeAddress : item.recAddress,
            }
            this.plugins.openBaiduMap(data)
          })
        },
        openScan(flag){
          if(flag == 1){
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
                // this.$toast(text);
                this.$get('delivered/thisVote',{
                  mailNumber:text,
                }).then((res)=>{
                  console.log(res)
                  this.$toast(res.message)
                  this.$router.goBack()
                })
              }
            })
          }else {
            this.showSelect = true
          }
        },
        onSelect(item,index){
          console.log(item)
          console.log(index)
          this.showSelect = false
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
              // this.$toast(text);
              let selectName = ''
              if(item.name == '退回'){
                selectName = 3
              }else if(item.name == '再投'){
                selectName = 2
              }else if(item.name == '转投'){
                selectName = 4
              }
              this.$get('delivered/noThisVote',{
                mailNumber:text,
                deliveryStatus:selectName,
              }).then((res)=>{
                console.log(res)
                this.$toast(res.message)
              })
              this.$router.goBack()
            }
          })
        },
        onCancel(){
          this.showSelect = false
        },
        openDetails(item){
          this.isShow = true
          this.mailList = item.mailList
        }
      }
   }
</script>

<style scoped lang="scss">
.toudi{
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
  .mini-title{
    margin-top: 69px;
    margin-left: 16px;
    text-align: left;
    font-size: 13px;
    color: #0091FF;
  }
  .content{
    width: 342px;
    height: 449px;
    margin-left: 17px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
    margin-top: 8px;
    text-align: center;
    .list{
      height: 360px;
      overflow-y: auto;
    }
    .row{
      min-height: 60px;
      text-align: left;
      font-size: 0;
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
        margin-top: 22px;
      }
      .left{
        height: 60px;
        width: 246px;
        padding-left: 11px;
        .top-text{
          width: 100%;
          font-size: 13px;
          color: #000;
          margin-top: 12px;
        }
        .bottom-text{
          font-size: 11px;
          color: #A7A7A7;
          width: 100%;
          margin-top: 2px;
        }
      }
      .right{
        width: 94px;
        height: 60px;
        vertical-align: top;
        .iconfont{
          width: 16px;
          height: 16px;
          margin-top: 22px;
          vertical-align: top;
          display: inline-block;
        }
        .left-icon{
          margin-left: 21px;
          margin-right: 20px;
          color: #0091FF;
        }
        .right-icon{
          color: #FA6400;
        }
      }
    }
    .bottom-line{
      width: 316px;
      display: inline-block;
      height: 2px;
      background: #F3F3F3;
      margin-top: 2px;
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
      border-radius: 15px;
      color: #fff;
      font-size: 13px;
      text-align: center;
    }
    .left-button{
      margin-left: 73px;
      margin-right: 47px;
    }
  }
  .van-action-sheet{
    overflow-y: auto;
    .row{
      padding-left: 15px;
      min-height: 60px;
      text-align: left;
      font-size: 0;
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
        margin-top: 22px;
      }
      .left{
        height: 60px;
        width: 246px;
        padding-left: 11px;
        .top-text{
          width: 100%;
          font-size: 13px;
          color: #000;
          margin-top: 12px;
        }
        .bottom-text{
          font-size: 11px;
          color: #A7A7A7;
          width: 100%;
          margin-top: 2px;
        }
      }
      .right{
        width: 94px;
        height: 60px;
        vertical-align: top;
        .iconfont{
          width: 16px;
          height: 16px;
          margin-top: 22px;
          vertical-align: top;
          display: inline-block;
        }
        .left-icon{
          margin-left: 21px;
          margin-right: 20px;
          color: #0091FF;
        }
        .right-icon{
          color: #FA6400;
        }
      }
    }
    .bottom-line{
      width: 316px;
      display: inline-block;
      height: 2px;
      background: #F3F3F3;
      margin-top: 2px;
    }
  }
}
</style>
