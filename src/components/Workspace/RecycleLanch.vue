<template>
  <div>
    <van-nav-bar title="回收发起" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div
      style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;"
    >
      <div class="inputView">
        <input class="input" placeholder="请输入或扫描电池包码" />
      </div>
      <img :src="scanImg" style="width: 0.23rem;margin-left: -30px" @click="onClickLeft" />
      <div class="cancleBtn">取消</div>
    </div>

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
        :accept="'image/*'"
      />
    </div>
 
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
  name: "RecycleLanch",
  data() {
    return {
      id:0,
      fileList: [], 
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
    this.$post("recyclingInfo", parmas).then(res => {
      console.log(res);
      // this.$toast(res.message);
      //密码设置成功
      this.info = res.data[0];
    });
  },
  methods: {
    //图片上传相关
 

    beforeRead(file) {
      
      if (
        this.fileList.findIndex(it => it.localName == file.name) > -1
      ) {
        this.$toast("图片[" + file.name + "]已经上传过，不用重复上传");
        return false;
      }

      return true;
    },

    onRead(file) {
      // console.log(file)
      // console.log(file.content.length)
      let formData = new FormData();
      formData.append("file", file.file);
      // file.remote_url="http://www.baidu.com";
      // file.localName=file.file.name;
      
     
     this.$ImgUpoad(formData).then(res => {
         console.log(res)
        if (res.data.code === "200") {
          file.remote_url = res.data.body.filePath;
        } else {
          this.$toast(res.error);
        }
      });
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    // 提交回收发起记录
    SubmitRecyclingLaunchRecord() {
      if (!this.BatteryInfo.code) {
        this.$toast("电池编码不能为空");
        return;
      }

      if (this.fileList.length == 0) {
        this.$toast("请上传电池包图片");
        return;
      }

      if (!this.BatteryInfo.recycle_remark) {
        this.$toast("请填写描述信息");
        return;
      }

      let para_fileName = "";
      let para_url = "";
      this.fileList.forEach(element => {
        para_url+=(element.remote_url + "#");
        para_fileName+=(element.localName + "#");
      });

      para_url = para_url.substring(0, para_url.length - 1);
      para_fileName = para_fileName.substring(0, para_fileName.length - 1);

      var parmas = {
        batteryPackcode: this.BatteryInfo.code,
        recyclingDes: this.BatteryInfo.recycle_remark,
        fileName: para_fileName,
        url: para_url
      };

      this.$post("recyclingLaunch", parmas).then(res => {
        if (res.code == 200) {
          this.$toast("回收上报成功");
          this.$router.push({
            path: "/Recyclelist"
          });
        }
      });
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