<template>
  <div class="daka">
    <van-nav-bar
      title="打卡"
      border
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="button">
      <div class="title text">出班打卡</div>
      <div class="title text2">2020.5.9 8:00</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "daka",
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
          onClickLeft(){
            this.$router.goBack()
          },
        }
    }
</script>

<style lang="scss" scoped>
  .daka{
    text-align: center;
    .button{
      display: inline-block;
      background: #0091FF;
      box-shadow: inset 0 1px 15px 2px rgba(255,255,255,0.50);
      width: 170px;
      height: 170px;
      margin-top: 114px;
      border-radius: 50%;
      .title{
        font-size: 14px;
        color: rgba(255,255,255,0.87);
      }
      .text{
        margin-top: 48px;
      }
      .text2{
        margin-top: 27px;
      }
    }
  }
</style>
