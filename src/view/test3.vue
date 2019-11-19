<template>
  <div>
    <img :src="img" alt="" width="50px" height="50px">
    <button @click="getposition()">获取位置</button>
    <span>{{msg}}</span><br/>

    <button @click="getimage()">显示本地图片</button>
    <button @click="getcode()">获取二维码</button><br/>
    <span>{{codeinfo}}</span>

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'test3',
    data:()=>{
      return {
        msg:'cordova not init',
        codeinfo:'',
        img:''
      }
    },
    methods:{
      getcode() {
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
      getimage() {
        this.plugins.getImage((url)=>{
          this.img = url
          console.log(url)
        },(err)=>{
          this.$toast(err)
        })
      },
      getposition:function(val) {
        this.plugins.getPosition((position)=>{
          console.log('经度:'+ position.coords.longitude)
          console.log('纬度:'+ position.coords.latitude)
          console.log('精度:'+ position.coords.accuracy)
          console.log('海拔精度:'+ position.coords.altitudeAccuracy)
          console.log('方向:'+ position.coords.heading)
          console.log('速度:'+ position.coords.speed)
          console.log('时间戳:'+ position.coords.timestamp)
        },(err)=>{
          console.log(err)
          this.$toast(err.message)
        })
      }
    },
    mounted(){

    }
  }
</script>

<style>

</style>
