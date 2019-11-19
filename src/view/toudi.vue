<template>
  <div class="toudi">
    <van-nav-bar
      title="妥投"
      border
    ></van-nav-bar>
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
    <div class="mini-title">待投递 4件</div>
    <div class="content">
      <div class="list">

        <div v-for="item in 10">
          <div class="row">
            <div class="left wrap" @click="openDetails">
              <div class="top-text">北京市海淀区建材城西路65号</div>
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
    <div class="buttons">
      <van-button @click="openScan(1)" class="button left-button" type="default">妥投扫描</van-button>
      <van-button @click="openScan(2)" class="button right-button" type="default">未妥投扫描</van-button>
    </div>
    <van-action-sheet v-model="isShow" title="详细信息">
      <div v-for="item in 10">
        <div class="row">
          <div class="left wrap">
            <div class="top-text">北京市海淀区建材城西路65号11111111111111111111111111</div>
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
          isShow:false,
          showSelect:false,
          actions: [
            { name: '退回' },
            { name: '再投' },
            { name: '转投' }
          ]
        }
      },
      methods:{
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
                this.$toast(text);
                this.$router.goBack()
              }
            })
          }else {
            this.showSelect = true
          }
        },
        onSelect(val){
          console.log(val)
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
              this.$toast(text);
              this.$router.goBack()
            }
          })
        },
        onCancel(){
          this.showSelect = false
        },
        openDetails(){
          this.isShow = true
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
    box-shadow: 0 2px 4px 0;
    border-radius: 6px;
    margin-top: 8px;
    text-align: center;
    .list{
      height: 360px;
      overflow-y: auto;
    }
    .row{
      height: 60px;
      text-align: left;
      font-size: 0;
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
        margin-top: 22px;
      }
      .left{
        height: 60px;
        width: 246px;
        padding-left: 11px;
        .top-text{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          height: 50%;
          font-size: 13px;
          color: #000;
          margin-top: 12px;
        }
        .bottom-text{
          font-size: 11px;
          color: #A7A7A7;
          width: 100%;
          height: 50%;
        }
      }
      .right{
        width: 94px;
        height: 60px;
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
  .van-action-sheet{
    overflow-y: auto;
    .row{
      padding-left: 15px;
      height: 60px;
      text-align: left;
      font-size: 0;
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
        margin-top: 22px;
      }
      .left{
        height: 60px;
        width: 246px;
        padding-left: 11px;
        .top-text{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          height: 50%;
          font-size: 13px;
          color: #000;
          margin-top: 12px;
        }
        .bottom-text{
          font-size: 11px;
          color: #A7A7A7;
          width: 100%;
          height: 50%;
        }
      }
      .right{
        width: 94px;
        height: 60px;
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
