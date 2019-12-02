<template>
  <div id='container'>

 <van-nav-bar
  title="电池运行状态监控"
  @click-left="onClickLeft"  
  :border='false'
>
<div slot="left" style="width:0.3rem;height:0.44rem;">
<van-image :src='backImg'   style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
</div>
</van-nav-bar>

    <!-- 中间的背景色 -->
    <div style="background:#24BB9B;height:2.5rem;text-align:center;">
      <van-image width="100" height="100" :src="image" style="margin-top:0.3rem;" />
      <span class="time">{{parseInt(time/60)}}小时{{time%60}}分</span>
      <span class="time describ">预估可用时间</span>
    </div>
    <div
      style="width: 100%; height: 0.2rem; background: white;border-top-left-radius: 0.2rem;border-top-right-radius: 0.2rem;z-index:999;top:-0.2rem;position: relative;"
    ></div>
    <div>
      <div
        style="font-family: PingFangSC-Medium;font-size:0.15rem;color: #333333;heigh:0.3rem; margin:0.1rem 0.1rem; "
      >电池状态</div>
      <van-cell-group :border="false">
        <van-grid :gutter="10" >
          <van-grid-item
            v-for="(item,index) in list_BatteryStauts_values"
            :key="index"
            :text="item.value"
          >
            <van-image slot="icon" :src="list_BatteryStauts_img[index]" />
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <div
        style="font-family: PingFangSC-Medium;font-size:0.15rem;color: #333333;heigh:0.3rem; margin:0.1rem 0.1rem; "
      >电池参数状态</div>
      <van-cell-group :border="false">
        <van-grid :gutter="10"  >
          <van-grid-item
            v-for="(item,index) in list_BatteryParameterStauts"
            :key="index"
            :text="item.value"
          >
            <van-image slot="icon" :src="list_BatteryParameterStauts_img[index]" />
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatteryOperationStatus",
  data() {
    return {
        backImg:require('../../assets/ic_back_white.png'),
      image: require("../../assets/workspace/BatteryOperationStatus/电池图标@2x.png"),
      list_BatteryStauts_img: [
        require("../../assets/workspace/BatteryOperationStatus/充电状态@2x.png"),
        require("../../assets/workspace/BatteryOperationStatus/运行状态@2x.png"),
        require("../../assets/workspace/BatteryOperationStatus/预警可用时间@2x.png"),
        require("../../assets/workspace/BatteryOperationStatus/电池可用@2x.png")
      ],
      list_BatteryParameterStauts_img: [
        require("../../assets/workspace/BatteryOperationStatus/温度@2x.png"),
        require("../../assets/workspace/BatteryOperationStatus/电压@2x.png"),
        require("../../assets/workspace/BatteryOperationStatus/电流@2x.png"),
        require("../../assets/workspace/BatteryOperationStatus/温度@2x.png")
      ],
      list_BatteryStauts_values: [
        {
          value: "充满"
        },
        {
          value: "良好"
        },
        {
          value: "5小时"
        },
        {
          value: "100%"
        }
      ],
      time:'',
      list_BatteryParameterStauts: [
        { img: "../../assets/", item: "温度", value: "22.3C" },
        { img: "", item: "电压", value: "220V" },
        { img: "", item: "电流", value: "5A" },
        { img: "", item: "温度", value: "98R" }
      ]
    };
  },
  methods: {
       onClickLeft(){
         
           this.$router.go(-1);//返回上一层
      },
  },
  mounted() {
    // this.vinCode = this.$route.query.id;
    // console.log(this.vinCode);
    var parmas = {
       vin :'LDPZYB3D8JF151462'
    };
    this.$post1("batteryStatus", parmas).then(res => {
      console.log(res);
      // this.$toast(res.message);
      //密码设置成功
      this.time =  res.data.available_time
      this.list_BatteryStauts_values = [
        {
          value: res.data.charging_state
        },
        {
          value: res.data.operating_status
        },
        {
          value: res.data.estimated_available_time + '小时'
        },
        {
          value: res.data.battery_available + '%'
        }
      ]

      this.list_BatteryParameterStauts = [
        { img: "../../assets/", item: "温度", value: res.data.cell_voltage },
        { img: "", item: "电压", value: "220V" },
        { img: "", item: "电流", value: "5A" },
        { img: "", item: "温度", value:  res.data.cell_temperature2 }
      ]


    });
  },
};
</script>

<style lang="less" scoped>
#container{
  .van-nav-bar{
  background:#24BB9B ; 
}
.van-nav-bar .van-icon {
    color: white;
    
}
.van-nav-bar__title {
   
    color: white;
   
}


.van-image {
  margin-top: 0.67rem;
}
 
.time {
  display: block;
  text-align: center;
  font-family: PingFangSC-Semibold;
  font-size: 0.24rem;
  color: #ffffff;
  letter-spacing: 0.005rem;
  line-height: 0.28rem;
  margin: 0.2rem 0rem;
}

.describ {
  font-size: 0.14rem;
  line-height: 0.14rem;
}

.van-field__control:disabled,
.field__control {
  font-family: PingFangSC-Medium;
  font-size: 0.15rem;
  color: #333333;
}

.van-image {
  margin-top: 0;
}
}

 
 
</style>