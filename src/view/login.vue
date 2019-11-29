<template>
    <div class="login">
      <div class="title">智能揽投</div>
      <div class="inputs">
        <van-cell-group>
          <van-field
            v-model="username"
            clearable
            label="用户名"
            placeholder="请输入用户名">
            <i slot="left-icon" class="icon iconfont icon-denglu_yonghu"></i>
          </van-field>
          <van-field
            clearable
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            >
            <i slot="left-icon" class="icon iconfont icon-denglu_mima"></i>
          </van-field>
        </van-cell-group>
      </div>
      <div class="bottom">
        <Debounce :time='500' isDebounce>
          <van-button @click="login" class="login-button" type="info" size="large">登录</van-button>
        </Debounce>
<!--        <van-button @click="goToPage" class="login-button" type="info" size="large">人脸识别</van-button>-->
      </div>
    </div>
</template>

<script>
  import * as types from '../store/types'
    export default {
      name: "login",
      data(){
        return {
          username:'',
          password:'',
        }
      },
      mounted(){

      },
      methods:{
        goToPage(){
          this.$router.push('testTracking')
        },
        login(){
          if(this.username == '' && this.password == ''){
            this.$toast('用户名或密码不能为空!')
          }else {
            this.$post('login',{account:this.username,password: this.password}).then((res)=>{
              if(res.status == 0){
                this.$store.commit(types.LOGIN,res.loginUser)
                this.$router.replace('home')
                this.$toast.success(res.message);
                this.username = ''
                this.password = ''
              }else{
                this.$toast.fail(res.message);
                this.username = ''
                this.password = ''
              }
            })
          }

        }
      }
    }
</script>

<style scoped lang="scss">
  .login{
    width: 100%;
    height: 100%;
    background: url("../assets/img/login-bg.png") no-repeat 0/100% 100%;
    .title{
      color: #fff;
      font-size: 36px;
      margin-top: 88px;
      text-align: center;
    }
    .inputs{
      margin-top: 205px;
      .icon{
        color: #0091FF;
        opacity: 0.5;
      }
    }
    .bottom{
      margin-top: 62.7px;
      .login-button{
        font-size: 18px;
        color: #fff;
        width: 301px;
        height: 36px;
        border-radius: 10px;
        line-height: 36px;
      }
    }
  }
</style>
