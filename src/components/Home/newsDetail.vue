<template>
  <div>
    <van-nav-bar title="详情" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

     <div v-html="message">{{message}}</div>
     
  </div>
</template>

<script>
export default {
  name: "newsDetail",

  data() {
    return {
      title: "",
      message: "",
      image: require("../../assets/ic_back_white.png")
    };
  },
 mounted: function() {
    this.message = this.$route.query.id;
    // console.log(this.msg);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    }}
    
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
