<template>
  <div>
    <van-nav-bar title="车辆绑定管理" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>
    <van-cell-group>
      <van-cell title="车辆识别号" value="绑定时间" />
    </van-cell-group>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
      <van-cell v-for="item in list" :key="item.id" @click="goCarDetail(item.id)">
        <!-- 单元格 -->
        <van-cell :title="item.vin" is-link :value="item.bindingTime" />
      </van-cell>
    </van-list>
  </div>
</template>
<script>
export default {
  name: "CarBindingList",
  data() {
    return {
      image: require("../../assets/ic_back_white.png"),
      list: [],
      finished: false,
      loading: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    getCarBindList() {
      let parmas = {
        bindingName: "陈列"
      };
      this.loading = false;
      this.$post("carBindingList", parmas).then(res => {
        console.log(res);
        if(res.code == '200'){
            this.list=res.body;
        }
      });
    },
    goCarDetail(id){
         this.$router.push({
            path:'/CarDetail',
            query:{id:id}
          })
    },

    onLoad(){
        this.loading = false;
    }
  },
  created() {
    this.getCarBindList();
  }
};
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar__title {
  color: #ffffff;
  font-size: 0.19rem;
}
.van-cell__value {
  position: relative;
  overflow: hidden;
  color: #333333;
  text-align: center;
  vertical-align: middle;
}
.van-cell__right-icon {
  margin-left: 5px;
  color: #333333;
}
.van-list > .van-cell {
  padding: 0;
  height: 0.5rem;
  .van-cell {
    height: 100%;
    line-height: 0.5rem;
    line-height: 0.3rem;
    font-size: 0.14rem;
  }
}
.van-cell:nth-child(2n) {
  background: #f9f9f9;
  .van-cell {
    font-size: 0.14rem;
    background: #f9f9f9;
  }
}
.van-cell-group {
  background-color: #fff;
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  .van-cell {
    height: 100%;
    line-height: 0.5rem;
    font-size: 0.16rem;
    padding: 0 0.16rem;
  }

  border-bottom: 1px solid #e3e3e3;
}
</style>