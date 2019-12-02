<template>
  <div>
    <van-nav-bar title="回收评测管理" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <span class="subtitle">指定搜索范围</span>
    <van-cell-group :border="false">
      <div class="btnFilterGroup">
        <van-button
          round
          type="default"
          :class="recyclingState==1?'btnFilterActive':'btnFilterdefault'"
          @click="listfilter(1)"
        >未评测</van-button>
        <van-button
          round
          type="default"
          :class="recyclingState==2?'btnFilterActive':'btnFilterdefault'"
          @click="listfilter(2)"
        >已评测</van-button>
      </div>
    </van-cell-group>

    <van-divider class="divider_10"></van-divider>

    <van-row
      :class="item.recyclingState==1?'van-row_default':'van-row_active'"
      v-for="(item, index) in recyclingList"
      :key="index"
      @click="itemClick(item)"
    >
      <van-col span="18">{{item.batteryPackcode}}</van-col>
      <van-col span="6">
        <span
          :class="item.recyclingState==1?'span_not':'span_ok'"
        >{{getItemStatusString(item.recyclingState)}}</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
///回收评测列表页面
export default {
  name: "RecoveryEvaluationManage",
  data() {
    return {
      recyclingState: 1,
      recyclingList: [],
      message: "",
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png")
    };
  },
  mounted() {
    console.log(this.recyclingState);
    this.listfilter(this.recyclingState);
    // this.vinCode = this.$route.query.id;
    // console.log(this.vinCode);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },

    //过滤
    listfilter(recyclingState) {
      this.recyclingState = recyclingState;

      console.log(recyclingState);
      var parmas = {
        batteryPackcode: recyclingState
      };

        // let   res=this.$getMockData("recoveryevaluation_list");
        // console.log(JSON.stringify(res));
        // if (res.code == 200) {
        //   this.recyclingList = res.body.list;
        //   // this.$toast(res.message);
        //   //密码设置成功
        //   // this.info = res.data[0];
        // }
        
      this.$post("recoveryevaluation_list", parmas).then(res => {
        console.log(res);
         
        console.log(JSON.stringify(res));
        if (res.code == 200) {
          this.recyclingList = res.body.list;
          // this.$toast(res.message);
          //密码设置成功
          // this.info = res.data[0];
        } else {
        }
      });
    },
    //获取状态显示自符串
    getItemStatusString(recyclingState) {
      return recyclingState == 1 ? "未评测" : "已评测";
    },

    //打开评测详情  已评测--》打开评测页面，查看   未评测--》打开评测新增页面
    itemClick(item) {
      if (item.recyclingState == 1) {
        //未评测  可以修改
        this.$router.push({
          path: "/RecoveryEvaluation",
          query: { id: item.id,recyclingState:item.recyclingState }
        });
      }
      if (item.recyclingState == 2) {
        //已评测  只查看，不能修改
        this.$router.push({
          path: "/RecoveryEvaluationDetail",
          query: { id: item.id }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar .van-icon {
  color: white;
}
.van-nav-bar__title {
  color: white;
}

.van-row_default {
  height: 0.55rem;
  padding-left: 0.1rem;
  line-height: 0.55rem;
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  color: #4a4a4a;

  .span_not {
    padding: 0.1rem;
    background: #f0f0f0;
    border-radius: 0.02rem;
  }
}

.van-row_active {
  background: #f9f9f9;
  height: 0.55rem;
  padding-left: 0.1rem;
  line-height: 0.55rem;
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  color: #4a4a4a;

  .span_ok {
    padding: 0.1rem;
    background: #e3f2ef;
    border-radius: 0.02rem;

    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #24bb9b;
    text-align: center;
    line-height: 0.26rem;
  }
}
</style>