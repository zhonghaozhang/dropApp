<template>
  <div>
    <router-view class="child-view"></router-view>
    <van-tabbar v-model="updateMenu" @change="menuChange">
      <van-tabbar-item>
        <i slot="icon" slot-scope="props" class="iconfont icon-shouye"></i>
        首页</van-tabbar-item>
      <van-tabbar-item >
        <i slot="icon" slot-scope="props" class="iconfont icon-toudi"></i>
        投递</van-tabbar-item>
      <van-tabbar-item >
        <i slot="icon" slot-scope="props" class="iconfont icon-lanshou"></i>
        揽收</van-tabbar-item>
      <van-tabbar-item>
        <i slot="icon" slot-scope="props" class="iconfont icon-guanli"></i>
        管理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  // import * as types from 'store/types'
    export default {
      name: "home",
      data(){
        return {
          // active: 0
        }
      },
      methods:{
        menuChange(val){
          console.log(val)
          if(val== 0){
            this.$router.push('homeChild')
          }else if(val== 1){
            this.$router.push('toudi')
          }else if(val== 2){
            this.$router.push('lanshou')
          }else if(val== 3){
            this.$router.push('admin')
          }

          // function getInfo(){
          //   var s = "";
          //   s += " 网页可见区域宽："+ document.body.clientWidth+"\n";
          //   s += " 网页可见区域高："+ document.body.clientHeight+"\n";
          //   s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"+"\n";
          //   s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"+"\n";
          //   s += " 网页正文全文宽："+ document.body.scrollWidth+"\n";
          //   s += " 网页正文全文高："+ document.body.scrollHeight+"\n";
          //   s += " 网页被卷去的高(ff)："+ document.body.scrollTop+"\n";
          //   s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop+"\n";
          //   s += " 网页被卷去的左："+ document.body.scrollLeft+"\n";
          //   s += " 网页正文部分上："+ window.screenTop+"\n";
          //   s += " 网页正文部分左："+ window.screenLeft+"\n";
          //   s += " 屏幕分辨率的高："+ window.screen.height+"\n";
          //   s += " 屏幕分辨率的宽："+ window.screen.width+"\n";
          //   s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";
          //   s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";
          //   s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";
          //   s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";
          //   alert (s);
          // }
          // getInfo();
        }
      },
      computed: {
        updateMenu(){
          return this.$store.state.menuIndex
        }
      },
      //监听执行
      // watch: {
      //   updateMenu(newval, oldval){
      //     alert(newval)
      //     // this.active = newval
      //   }
      // }
    }
</script>

<style scoped lang="scss">
  @import "style/home";
</style>
