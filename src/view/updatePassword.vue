<template>
  <div class="updatePassword">
    <van-nav-bar
      title="修改密码"
      border
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-cell-group>
      <van-field
        type="password"
        v-model="oldPassword"
        label="旧密码"
        required
        placeholder="请输入旧密码"
      ></van-field>
      <van-field
        type="password"
        v-model="newPassword"
        label="新密码"
        required
        placeholder="请输入新密码"
      ></van-field>
      <van-field
        type="password"
        v-model="newPassword2"
        label="重复新密码"
        required
        placeholder="请确认输入新密码"
        :error-message="newPassword == newPassword2 ? '':'新密码与确认密码不一致!' "
      ></van-field>
    </van-cell-group>
    <Debounce :time='500' isDebounce>
      <van-button type="primary" @click="update" size="large">确认修改</van-button>
    </Debounce>
  </div>
</template>

<script>
    export default {
      name: "updatePassword",
      data(){
        return {
          oldPassword:'',
          newPassword:'',
          newPassword2:'',
        }
      },
      methods:{
        update(){
          if(this.oldPassword == '' || this.newPassword == '' ||this.newPassword2 == '' ){
            this.$toast('旧密码或新密码,确认密码为空,请输入!')
          }else if(this.newPassword !== this.newPassword2){
            this.$toast('新密码与确认密码不一致,请输入!')
          }else {

          }
        },
        onClickLeft(){
          this.$router.goBack()
        },
      }
    }
</script>

<style scoped lang="scss">
  .updatePassword{
    .van-nav-bar .van-icon{
      color: #000;
      font-size: 16px;
      font-weight: bold;
    }
    .van-cell{
      text-align: left;
    }
    .van-button--large{
      width: 80%;
      height: 40px;
      line-height: 40px;
      background: #0091ff;
      border-radius: 8px;
      margin-top: 10px;
      border: 1px solid #0091ff;
    }
  }


</style>
