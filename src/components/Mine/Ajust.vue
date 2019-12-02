<template>
  <div>
    <van-nav-bar title="投诉与建议" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <div style="height:0.44rem;margin-top:0.2rem">
      <van-field
        v-model="title"
        rows="1"
        label="标题："
        type="textarea"
        maxlength="10"
        placeholder="请输入标题 (最多10个字) "
      />
    </div>
    <van-field
      v-model="message"
      rows="5"
      type="textarea"
      maxlength="500"
      placeholder="请输入投诉或建议内容"
      show-word-limit
      style="border:0.01rem solid rgba(229,229,229,1) ;width:3.2rem;margin-left:0.18rem;margin-top:0.2rem; border-radius:2px;"
    />

    <van-button type="danger" color="#24BB9B" size="large" @click="submitBtnClick">提交</van-button>
  </div>
</template>

<script>
export default {
  name: "Ajust",

  data() {
    return {
      title: "",
      message: "",
      image: require("../../assets/ic_back_white.png")
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    submitBtnClick() {
      if (!this.title.length) {
        this.$toast("标题不能为空");
        return;
      }
      if (!this.message.length) {
        this.$toast("内容不能为空");
        return;
      }
      var parmas = {
        title: this.title,
        inputUser: sessionStorage.getItem("userName"),
        content: this.message
      };

      this.$post("addComplaintsSuggestion", parmas).then(res => {
        console.log(res);
        this.$toast(res.error);
        if (res.code == 200) {
          this.$router.go(-1); //返回上一层
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
}

.van-button--large {
  margin-left: 0.15rem;
  margin-top: 0.3rem;
  width: 3.45rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #24bb9b;
}
</style>
