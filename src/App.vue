<template>
  <div id="app">
      <transition :name="transition">
          <router-view class="view" ref="bottom"></router-view>
      </transition>
  </div>
</template>

<script>
  // import * as types from 'store/types'
export default {
  name: 'App',
  data(){
    return {
      transition:'slide-left'
    }
  },
  watch: {
    $route (to, from ) {
      console.log(to)
      console.log(from)
      if(to.name == 'homeChild'){
        this.$store.commit('updateMenu',0)
      }else if(to.name == 'toudi'){
        this.$store.commit('updateMenu',1)
      }else if(to.name == 'lanshou'){
        this.$store.commit('updateMenu',2)
      }else if(to.name == 'admin'){
        this.$store.commit('updateMenu',3)
      }

      var isBack = this.$router.isBack;
      console.log(isBack)
      if (isBack) { //点击了返回
        this.transition = 'slide-right'
      }else{
        this.transition = 'slide-left'
      }
      this.$router.isBack = false;
    }
  },
  mounted() {

  }

}
</script>
<style>
  @import "style/common.scss";
</style>
<style>
  html,body{
    padding: 0;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  #app {
    font-family: "Microsoft YaHei" ,'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }
  .view{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  *{
    box-sizing: border-box;
  }
</style>
