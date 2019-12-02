<template>
  <div>
    <van-nav-bar title="评测详情" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <!-- <div
      style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;"
    >
      <div class="inputView">
        <input class="input" placeholder="请输入或扫描电池包码" />
      </div>
      <img :src="scanImg" style="width: 0.23rem;margin-left: -30px" @click="onClickLeft" />
      <div class="cancleBtn">取消</div>
    </div> -->

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
        :before-read="beforeRead"
        :before-delete="delImg"
        :disabled="true"
        :accept="'image/*'"
        :deletable="false"
      />
    </div>

    <h3 class="h3divider">评测详情</h3>
    <van-radio-group v-model="radio">
      <van-radio name="1" clickable @click="radio='1'">回收再利用</van-radio>
      <van-radio name="2" clickable @click="radion='2'">回收销毁</van-radio>
    </van-radio-group>
    <span class="subtitle">评测描述:</span>
    <van-field
      v-model="BatteryInfo.evaluation_remark"
      rows="5"
      type="textarea"
      maxlength="500"
      placeholder="请输入投诉或建议内容"
      show-word-limit
      class="miltextarea"
    />

    <div style="text-align:center;margin:0.3rem">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "RecoveryEvaluation",
  data() {
    return {
      id: 0,
      radio: 1,
      fileList: [], 
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
        evaluation_remark: ""
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    var parmas = {
      id: this.id
    };
    this.$post("evaluationInfo", parmas).then(res => {
      console.log(res);
      res = this.$getMockData("evaluationInfo");

      let info = res.body[0];
      console.log(info);
      this.BatteryInfo.code = info.batteryPackcode;
      this.BatteryInfo.recycle_remark = info.recyclingDes;
      this.radio = info.evaluationResult;
      this.BatteryInfo.evaluation_remark = info.evaluationDes;
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
    delImg(file) {
      return false;
    },
    //禁止新增图片
    beforeRead(file) {
      return false;
    },

    // 提交评测记录
    SubmitRecyclingLaunchRecord() {
      if (!this.BatteryInfo.code) {
        this.$toast("电池编码不能为空");
        return;
      }

      if (!this.BatteryInfo.evaluation_remark) {
        this.$toast("请填写评测描述信息");
        return;
      }

      var parmas = {
        id: "1",
        evaluationResult: this.radio,
        evaluationDes: this.BatteryInfo.evaluation_remark
      };

      this.$post("recyclingEvaluation", parmas).then(res => {
        if (res.code == 200) {
          this.$toast("评测信息上报成功");
          this.$router.push({
            path: "/RecoveryEvaluationManage"
          });
        }
        else
        {
           this.$toast("评测信息提交失败，请稍后重试");
           return 0;
        }
      });
    }
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