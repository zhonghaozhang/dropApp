<template>
    <div class="admin">
      <van-nav-bar
        title="管理"
        border
      ></van-nav-bar>
      <div class="userMessage">
        <van-image
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        ></van-image>
        <div class="username">{{name}}</div>
      </div>
      <div class="lists">
        <van-cell-group>
          <van-cell title="投递量统计" size="large" is-link>
            <van-icon slot="icon" class="iconfont" class-prefix="icon" name="guanli_toudiliangtongji"></van-icon>
          </van-cell>
          <van-cell title="揽收量统计" size="large" is-link>
            <van-icon slot="icon" class="iconfont" class-prefix="icon" name="guanli_lanshouliangtongji"></van-icon>
          </van-cell>
          <van-cell title="地址维护" size="large" is-link>
            <van-icon slot="icon" class="iconfont" class-prefix="icon" name="guanli_xiugaimima"></van-icon>
          </van-cell>
          <van-cell title="异常处理" size="large" is-link>
            <van-icon slot="icon" class="iconfont" class-prefix="icon" name="guanli_yichangchuli"></van-icon>
          </van-cell>
          <van-cell title="修改密码" size="large" is-link>
            <van-icon slot="icon" class="iconfont" class-prefix="icon" name="xiugaimima"></van-icon>
          </van-cell>
          <van-cell title="退出" size="large" @click="logout" is-link>
            <van-icon slot="icon" class="iconfont" class-prefix="icon" name="guanli_tuichu"></van-icon>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
</template>

<script>
  import * as types from '../store/types'
    export default {
        name: "admin",
        data(){
          return {

          }
        },
        computed:{
          name(){
            return this.$store.state.user.name
          }
        },
        methods:{
          logout(){
            this.$dialog.confirm({
              title: '退出登录',
              message: '是否确认退出登录?'
            }).then(() => {
              this.$router.replace('/')
              this.$store.commit(types.LOGOUT)
            }).catch(() => {

            });
          }
        }
    }
</script>

<style scoped lang="scss">
.admin{
  .userMessage{
    width: 343px;
    height: 79px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
    background: #fff;
    margin-top: 13px;
    margin-left: 16px;
    text-align: left;
    border-radius: 6px;
    .van-image{
      margin-left: 21px;
      margin-top: 16px;
      margin-right: 14px;
      width: 48px;
      height: 48px;
      vertical-align: middle;
    }
    .username{
      font-size: 16px;
      color: #000;
      display: inline-block;
      vertical-align: middle;
      margin-top: 16px;
    }
  }
  .lists{
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
    border-radius: 6px;
    width: 343px;
    margin-left: 16px;
    margin-top: 8px;
    .van-cell-group{
      border-radius: 6px;
    }
    .van-cell{
      border-radius: 6px;
    }
    .van-cell__title{
      text-align: left;
    }
    .iconfont{
      margin-right: 17px;
      color: #4E8CEE;
    }
  }
}
</style>
