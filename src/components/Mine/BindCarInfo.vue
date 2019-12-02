// #mark 吴超
<template>
  <div>
    <van-nav-bar title="车辆信息绑定" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div
      style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;"
    >
      <div class="inputView">
        <input v-model="message" class="input" placeholder="请输入或扫描电池包码" />
      </div>
      <img :src="scanImg" style="width: 0.23rem;margin-left:-0.4rem;z-index: 9999;" @click="scan" />
      <div class="cancleBtn" @click="searchBtnClick">搜索</div>
    </div>

    <div
      style="background:white;padding-left:0.19rem;height:0.5rem;line-height:0.5rem;font-family: PingFangSC-Medium;font-size: 0.14rem;color: #333333;"
    >车辆详情</div>

    <van-cell-group>
      <van-field
        v-model="userInfo.trademark"
        label="商标"
        readonly
        label-align="left"
        input-align="right"
      />
      <van-field
        v-model="userInfo.vin"
        label="车辆识别号"
        readonly
        label-align="left"
        input-align="right"
      />
      <van-field
        v-model="userInfo.manufacturingDate"
        label="制造日期"
        readonly
        label-align="left"
        input-align="right"
      />
      <van-field
        v-model="userInfo.salesDate"
        label="销售日期"
        readonly
        label-align="left"
        input-align="right"
      />

      <van-field 
        v-model="userInfo.buyer" 
        label="购买人" 
        label-align="left" 
        input-align="right" 
      />

      <van-field 
        v-model="userInfo.identityCard" 
        label="购买人身份证" 
        label-align="left" 
        input-align="right" 
      />

      <van-field 
        v-model="userInfo.phone" 
        label="购买人手机" 
        label-align="left" 
        input-align="right" 
        type="tel"
      />
    </van-cell-group>

    <!-- 按钮 -->
    <div style="margin-top:0.45rem" class="btns">
      <van-button
        type="primary"
        size="large"
        class="button_1"
        style="width:1.5rem;vertical-align: middle; height:0.44rem;margin-right:5%;background:#24BB9B;border:none"
        @click="bindCar"
      >绑定</van-button>
      <van-button
        type="primary"
        size="large"
        class="button_2"
        style="width:1.5rem;vertical-align: middle;height:0.44rem;background:#CCCCCC;"
        @click="cancelBind"
      >取消</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BindCarInfo",

  data() {
    return {
      message: "",
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      historyData: "",
      // userInfo: {
      //   trademark: "东风牌",
      //   vin: "LFV219DK32939234",
      //   manufacturingDate: "2019-10-12",
      //   salesDate: "2019-10-12",
      //   buyer: "张三",
      //   identityCard: "420111199011113322",
      //   phone: "13333333333"
      // }
      userInfo:{
        "vin": "WOPI1221432412312",
        "buyer": "刘丹2",
        "identityCard": "421122143241231312",
        "phone": "13241231312",
        "trademark": "东风汽2车",
        "bindingName": "陈列2",
        "manufacturingDate": "2018-10-09",
        "salesDate": "2019-10-09"
      }
    };

    params:{id:id}
  },
  mounted() {
    var data = localStorage.getItem("batteryCode");
    var dataObj = JSON.parse(data);
    if (dataObj) this.historyData = dataObj.reverse();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    // 扫码
    scan() {
      console.log(111);
      triggerNative("saoyisao", "",()=>{
        this.$toast('123')
      });
    },
    // 搜索
    searchBtnClick() {
      if (!this.message) {
        this.$toast.fail("请输入电池包码");
        return;
      }
      var data = localStorage.getItem("batteryCode");
      var dataObj = JSON.parse(data);
      if (dataObj) {
        if (dataObj.length > 7) {
          var item = dataObj.splice(1, 8);
          item.push(this.message);
          localStorage.setItem("batteryCode", JSON.stringify(item));
        } else {
          dataObj.push(this.message);
          localStorage.setItem("batteryCode", JSON.stringify(dataObj));
        }
      } else {
        dataObj = [];
        dataObj.push(this.message);
        localStorage.setItem("batteryCode", JSON.stringify(dataObj));
      }

      // this.$router.push({
      //   path: "/CarDetail",
      //   query: { id: this.message }
      // });
    },

    // 绑定车辆信息
    bindCar() {
      if (!this.userInfo.trademark) return this.$toast("请绑定车辆信息");
      if(!this.userInfo.buyer) return this.$toast("请绑定购买人姓名")
      if(!this.userInfo.identityCard) return this.$toast("请绑定购买人身份证号")
      if(!this.userInfo.phone) return this.$toast("请绑定购买人手机号")

      let reg = /^1[3456789][0-9]{9}$/  // 校验手机号
      if(!reg.test(this.userInfo.phone)) return this.$toast("手机号错误,请重新输入")

      let params = this.userInfo
      this.$post('carBind',params).then(res => {
        console.log(res)
      })
     
      // this.$toast({
      //   message: "绑定成功",
      //   duration: "1000"
      // });

      // setTimeout(() => {
      //   this.$router.push("/Tabbar");
      // }, 1000);
    },

    // 取消绑定
    cancelBind() {

    }
  }
  // beforeRouteLeave(to, from, next) {
  //      // 设置下一个路由的 meta
  //      console.log('123455x')
  //     // to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
  //     // next();
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"  scoped >
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
}

.van-cell__value {
  color: #333333;
}

.inputView {
  background: #27c6a5;
  border-radius: 0.36rem;
  width: 2.94rem;
  height: 0.36rem;
  margin-left: 0.19rem;
}
.input {
  margin-left: 0.2rem;
  width: 1.5rem;
  height: 0.15rem;
  margin-top: 0.1rem;
  background: #27c6a5;
  border: none;
}

::-webkit-input-placeholder {
  color: white;
}
.cancleBtn {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #ffffff;
  line-height: 0.3rem;
  width: 0.8rem;
  height: 0.3rem;
  /* margin-left: 0.5rem; */
  position: absolute;
  right: 0.1rem;
  text-align: right;
}

/* --------------------------------------- */
.van-nav-bar__title {
  font-size: 0.19rem;
}
.van-cell-group .van-cell {
  height: 0.5rem;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 0.19rem;
  line-height: 0.5rem;
  font-family: PingFangSC-Regular;
  /* color: #333; */
  font-size: 0.14rem;
  /deep/.van-cell__value{
    /deep/input{
      color: #333;
    }
  }
  /deep/.van-cell__title{
    /deep/span{
      color: #666;
    }
  }
}

.cancleBtn {
  right: 0.19rem;
  font-size: 0.14rem;
}
.inputView {
  line-height: 0.36rem;
}
.inputView input {
  height: 80%;
  width: 60%;
  margin-top: 0;
}
.input::placeholder {
  font-size: 0.14rem;
  color: #d5fff6;
}
.van-cell:not(:last-child)::after {
  border: 0;
}
.van-nav-bar__left{
  left: 0.14rem;
}
.btns {
  position: relative;
}
.button_1 {
  position: absolute;
  left: 0.19rem;
  line-height: 0.44rem;
}
.button_2 {
  position: absolute;
  right: 0.19rem;
  border: 1px solid #ccc;
  line-height: 0.44rem;
}
</stylelang="less">

