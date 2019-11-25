<template>
  <div class="scanPage" style="background: transparent">
    <van-nav-bar
      title="二维码/条码"
      :border="false"
      left-arrow
      @click-left="onClickLeft"
      ></van-nav-bar>
    <div class="qrscanner">
      <div class="qrscanner-area">
      </div>
      <div class="through-line"></div>
      <div class="button-bottom">
        <van-button style="background: rgba(0,0,0,0);border: none"  @click="light" type="default">
          <i class="iconfont icon-shoudiantong" style="color: #fff;font-size: 20px"></i>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "scanPage",
      data(){
        return {
          isLight:true
        }
      },
      methods:{
        onClickLeft(){
          this.$router.goBack()
        },
        light(){
          if (this.isLight) {
            this.plugins.openLight()
          } else {
            this.plugins.closeLight()
          }
          this.isLight = !this.isLight;
        }
      }
    }
</script>

<style lang="scss">
  /*很做作的做了一个上下移动的横线，也不知道是受了谁家二维码扫描的影响*/
  .qrscanner {
    width: 100%;
    height: 100%;
  }

  .qrscanner-area {
    width: 60%;
    height: 85%;
    background: url(../assets/img/scan.svg) no-repeat center center;
    background-size: contain;
    margin-left: 20%;
  }

  .through-line {
    left: 21%;
    width: 58%;
    height: 2px;
    background: red;
    position: absolute;
    animation: myfirst 5s linear infinite alternate;
  }

  @keyframes myfirst {
    0% {
      background: red;
      top: 220px;
    }

    25% {
      background: yellow;
      top: 270px;
    }

    50% {
      background: blue;
      top: 330px;
    }

    75% {
      background: green;
      top: 380px;
    }

    100% {
      background: red;
      top: 430px;
    }
  }

  .button-bottom {
    width: 128px;
    position: absolute;
    left: 50%;
    bottom: 80px;
    margin-left: -64px;
  }
  .icon-camera {
    float: left;
  }
  .scanPage{
    .van-nav-bar{
      background: rgba(0,0,0,0);
      .van-icon{
        color: #fff;
      }
    }
    .van-nav-bar__title{
      color: #fff;
    }
  }
</style>
