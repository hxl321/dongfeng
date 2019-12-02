<template>
  <div>
    <van-nav-bar title="回收详情" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <h3 class="h3divider">电池详情</h3>
    <van-field v-model="BatteryInfo.code" label="包码" label-align="left" input-align="right" />

    <van-field
      v-model="BatteryInfo.product_time"
      label="生产日期"
      label-align="left"
      input-align="right"
    />

    <van-field v-model="BatteryInfo.maker" label="生产厂商" label-align="left" input-align="right" />

    <van-field
      v-model="BatteryInfo.product_type"
      label="产品类型"
      label-align="left"
      input-align="right"
    />

    <van-field
      v-model="BatteryInfo.battery_type"
      label="电池类型"
      label-align="left"
      input-align="right"
    />

    <van-field
      v-model="BatteryInfo.battery_model"
      label="电池规格"
      label-align="left"
      input-align="right"
    />

    <h3 class="h3divider">回收描述</h3>
    <span class="subtitle">内容描述：</span>
    <van-field
      v-model="BatteryInfo.recycle_remark"
      rows="5"
      type="textarea"
      maxlength="500"
      placeholder="请输入投诉或建议内容"
      show-word-limit
      class="miltextarea"
    />

    <h3 class="h3divider two">
      图片详情
      <span>(支持jpg,gif,png,请勿上传超过2MB的图片)</span>
    </h3>
    <div class="uploadcontainer">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="4"
        :before-read="beforeRead"
        :after-read="onRead"
        :before-delete="delImg"
        :disabled=true
        :accept="'image/*'"
        :deletable=false
      />
    </div>

    <!-- <div style="text-align:center;margin:0.3rem">
      <van-button
        type="primary"
        size="large"
        style="width:35%;margin-right:5%;background:#24BB9B;border:none"
        @click="onClickLeft"
      >取消</van-button>
      <van-button
        type="primary"
        size="large"
        @click="SubmitRecyclingLaunchRecord"
        style="width:35%;background:#CCCCCC;border:none"
      >上报</van-button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "RecycleDetail",
  data() {
    return {
      fileList: [],
      fileList_sucess: [],
      radio: 1,
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      BatteryInfo: {
        code: "88.1000.11/1023234565656",
        product_time: "2019-10-10",
        maker: "东风时间",
        product_type: "新能源电池",
        battery_type: "锂电池",
        battery_model: "12-98V",
        recycle_remark: "",
         
      }
    };
  },
  mounted() {
      // debugger;
    this.id = this.$route.query.id;
    console.log(this.id);
    var parmas = {
      id: this.id
    };
    this.$post("recyclingInfo", parmas).then(res => {
      console.log(res);
      // res = this.$getMockData("recyclingInfo")
      let info = res.body[0];
      this.BatteryInfo.code=info.batteryPackcode;
      this.BatteryInfo.recycle_remark=info.evaluationDes;
      if (info.url && info.url != null) {
        info.url.split("#").forEach(element => {
          let imageItem = { url: element };
          this.fileList.push(imageItem);
        });
      }
    });
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    //禁用删除
    delImg(file)
    {
        return false;
    },
    //禁用上传
    beforeRead(file)
    {
        return false;
    },

     
  }
};
</script>

<style>
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
}

.h3divider {
  font-family: PingFangSC-Medium;
  font-size: 0.14rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.14rem;
  background: #f9f9f9;
  border-radius: 2px;
  height: 0.49rem;
  line-height: 0.49rem;
  padding-left: 0.15rem;
  margin: 0;
}

.subtitle {
  display: block;
  height: 0.49rem;
  line-height: 0.49rem;
  padding-left: 0.15rem;
  font-size: 0.14rem;
}

.miltextarea {
  border: 0.01rem solid rgba(229, 229, 229, 1);
  width: 3.2rem;
  margin-left: 0.18rem;
  border-radius: 2px;
}

.van-radio-group {
  height: 0.49rem;
  line-height: 0.49rem;
  padding-top: 0.15rem;
}
.van-radio {
  display: inline-flex;
  text-align: center;
  margin-left: 0.15rem;
}

.van-nav-bar .van-icon,
.van-nav-bar__title {
  color: #ffffff;
}
.van-hairline--top-bottom::after {
  border: none;
}

.van-hairline--bottom::after {
  border-bottom-width: 0;
}

.inputView {
  background: #27c6a5;
  border-radius: 0.36rem;
  width: 2.94rem;
  height: 0.36rem;
  border: 1px solid white;
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
</style>