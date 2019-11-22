<template>
    <div class="toudiCount">
      <van-nav-bar
        title="投递量统计"
        border
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="频次报" clickable @click="radio = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="日报" clickable @click="radio = '2'">
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="开始时间" :value="startValue" @click="startShow = true" clickable></van-cell>
          <van-cell title="结束时间" :value="endValue"  @click="endShow = true" clickable></van-cell>
        </van-cell-group>
      </van-radio-group>
      <Debounce :time='500' isDebounce>
        <van-button type="primary" @click="getData" size="large">查询</van-button>
      </Debounce>
      <van-row>
        <van-col span="6"><span class="table-title">日期</span></van-col>
        <van-col span="6"><span class="table-title">退回</span></van-col>
        <van-col span="6"><span class="table-title">再投</span></van-col>
        <van-col span="6"><span class="table-title">转投</span></van-col>
      </van-row>
      <div class="tableWrap">
        <van-row>
          <van-col span="6"><span class="table-title-first">合计</span></van-col>
          <van-col span="6"><span class="table-title-first">{{total.tuihui}}</span></van-col>
          <van-col span="6"><span class="table-title-first">{{total.zaitou}}</span></van-col>
          <van-col span="6"><span class="table-title-first">{{total.zhuantou}}</span></van-col>
        </van-row>
        <van-row v-for="item in data">
          <van-col span="6"><span class="table-title-content">{{item.d_date}}</span></van-col>
          <van-col span="6"><span class="table-title-content">{{item.tuihui}}</span></van-col>
          <van-col span="6"><span class="table-title-content">{{item.zaitou}}</span></van-col>
          <van-col span="6"><span class="table-title-content">{{item.zhuantou}}</span></van-col>
        </van-row>
      </div>
      <van-popup
        v-model="startShow"
        position="bottom">
        <van-datetime-picker
          @cancel="startShow = false"
          @confirm="startDateEnter"
          v-model="startDate"
          type="date"
        ></van-datetime-picker>
      </van-popup>
      <van-popup
        v-model="endShow"
        position="bottom">
        <van-datetime-picker
          @cancel="endShow = false"
          @confirm="endDateEnter"
          v-model="endDate"
          type="date"
        ></van-datetime-picker>
      </van-popup>
    </div>
</template>
<script>
    export default {
      name: "toudiCount",
      data(){
        return {
          startShow:false,
          endShow:false,
          radio:'1',
          startDate:new Date(),
          endDate:new Date(),
          startValue:'请选择时间',
          endValue:'请选择时间',
          data:[],
          total:{
            tuihui:0,
            zaitou:0,
            zhuantou:0,
          },
        }
      },
      methods:{
        getData(){
          if(this.startValue == '请选择时间' && this.endValue == '请选择时间'){
            this.$toast('未选择开始时间或结束时间!')
            return false
          }
          this.$get('management/delivery_statistics',{
            postman_id:this.$store.state.user.id,
            start_date:this.startValue,
            end_date:this.endValue,
            type:this.radio,
          }).then((res)=>{
            console.log(res)
            if(res.status == 1){
              this.data = res.data
              this.total = res.total
            }
            this.$toast(res.message)

          })
        },
        onClickLeft(){
          this.$router.goBack()
        },
        endDateEnter(val){
          console.log(val)
          this.endValue = this.timeFormat(val)
          this.endShow = false
        },
        startDateEnter(val){
          console.log(val)
          this.startValue = this.timeFormat(val)
          this.startShow = false
        },
        timeFormat(time) { // 时间格式化 2019-09-08
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          if(month<10){
            month = '0'+month
          }
          if(day<10){
            day = '0'+day
          }
          return year + '-' + month + '-' + day
        }
      }
    }
</script>

<style scoped lang="scss">
.toudiCount{
  background: #f8f8f8;
  .van-nav-bar .van-icon{
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
  .van-row{
    margin-top: 15px;
  }
  .tableWrap{
    height: 340px;
    overflow-y: auto;
  }
  .van-cell__title{
    text-align: left;
  }
  .van-button--large{
    width: 80%;
    height: 40px;
    line-height: 40px;
    background: #0091ff;
    border-radius: 8px;
    margin-top: 4px;
    border: 1px solid #0091ff;
  }
  .table-title{
    font-size: 13px;
    color: #000;
  }
  .table-title-first{
    font-size: 12px;
    color: #0091ff;
  }
  .table-title-content{
    font-size: 12px;
    color: #a8a8a8;
  }
}
</style>
