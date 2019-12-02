// #mark 宋学平
<template>
  <div id="failureManage">
    <van-nav-bar title="维修委派" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>

    <van-cell-group>
      <span class="subtitle">指定搜索范围</span>
      <div class="btnFilterGroup">
        <van-button
          round
          type="default"
          :class="classFlag == index?'btnFilterActive':'btnFilterdefault'"
          v-for="(item,index) in subtitles"
          :key="index"
          @click="getCateList(index)"
        >{{ item }}</van-button>
      </div>
    </van-cell-group>

    <!-- <van-cell-group>
      <span class="subtitle">指定搜索范围</span>
      <div class="btnFilterGroup">
        <van-button round type="default" class="btnFilterActive">按发布时间排序</van-button>
      </div>
    </van-cell-group>-->
    <van-divider></van-divider>

    <van-row v-for="item in cateList" :key=" item.id " @click="goFailureInfo(item)">
      <van-col span="8">{{ item.reportDescribe }}</van-col>
      <van-col span="8">{{ item.reportTime }}</van-col>
      <van-col span="8">
        <span class="reported r-botton" v-if="item.reportState == 1">未委派</span>
        <span class="appointed r-botton" v-else>已委派</span>
      </van-col>
    </van-row>
    <!-- <van-row>
      <van-col span="8" style="padding-left:0.1rem">电池电极损坏</van-col>
      <van-col span="8">2019-09-07</van-col>
      <van-col span="8">
        <span class="appointed r-botton">已委派</span>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="8" style="padding-left:0.1rem">电池电极损坏</van-col>
      <van-col span="8">2019-09-07</van-col>
      <van-col span="8">
        <span class="unreport r-botton">未上报</span>
      </van-col>
    </van-row>-->
  </div>
</template>

<script>
export default {
  name: "FailureReportingManage",
  data() {
    return {
      message: "",
      image: require("../../assets/ic_back_white.png"),
      scanImg: require("../../assets/mine_scan.png"),
      failureInfo: [], //总数据
      cateList: [
        {
          id: 1,
          reportTime: "2019-11-27",
          reportType: 1,
          reportDescribe: "电池有问题",
          reportState: 1,
          filePath: null,
          fileName: null,
          appointName: null,
          repairName: null
        }
      ], //分类数据
      subtitles: ["最近发布", "未委派", "已委派"], //子标题
      classFlag: 0 //active的判断标志
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    getReportInfo() {
      //获取故障报销数据
      this.$post("reportFailure").then(res => {
        if (res.code == 200) {
          res.body.list.forEach(item => {
            if (item.reportState != 3) {
              //此时只failureInfo中只有状态为12的数据
              this.failureInfo.push(item);
            }
          });
          this.cateList = this.failureInfo;
        } else if (res.code == 500) {
          this.$toast("数据未获取成功");
        }
        console.log(this.failureInfo);
      });
    },
    getCateList(i) {
      //获取通过不同选项卡渲染列表的数组
      this.classFlag = i;
      console.log(this.cateList);

      if (i == 0) {
        this.cateList = this.failureInfo;
      } else {
        this.cateList = [];
        this.failureInfo.forEach(item => {
          if (item.reportState == i) {
            this.cateList.push(item);
          }
        });
      }
      if (this.cateList.length == 0) {
        this.$toast("没有更多数据了");
      }
    },
    goFailureInfo(item) {
      this.$router.push({ name: "FailureReporting", params: {data:item} });
    }
  },
  created() {
    this.getReportInfo();
  }
};
</script>

<style lang="less" scoped>
#failureManage {
  // new
  background-color: #eee;
  .van-button {
    margin: 0.05rem;
  }
  .van-cell-group {
    .subtitle {
      font-size: 0.13rem;
      color: #666;
      border-bottom: 1px solid #eee;
      margin: 0 auto;
      width: 3.35rem;
      height: 0.4rem;
    }
    .btnFilterGroup {
      display: flex;
      align-items: center;
      height: 0.6rem;
    }
  }
  .van-divider {
    height: 0.15rem;
    margin: 0;
  }
  .van-row {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    // 按钮
    .r-botton {
      display: inline-block;
      font-size: 0.13rem;
      height: 0.25rem;
      line-height: 0.25rem;
      padding: 0 0.05rem;
      text-align: center;
      border-radius: 0.02rem;
      &.reported {
        background-color: rgba(240, 117, 70, 0.15);
        color: #f07546;
      }
      &.appointed {
        background-color: rgba(36, 187, 255, 0.15);
        color: #24bb9b;
      }
      &.unreport {
        background-color: rgba(136, 136, 136, 0.15);
        color: #888;
      }
    }
  }

  // old
  .van-nav-bar {
    background: #24bb9b;
  }
  .van-nav-bar .van-icon {
    color: white;
  }
  .van-nav-bar__title {
    font-size: 0.19rem;
    color: white;
  }

  // .van-button {
  //   font-family: PingFangSC-Medium;
  //   border: 1px solid #dddcdc;
  //   border-radius: 28.5px;
  // }

  .active {
    font-family: PingFangSC-Medium;
    color: #24bb9b;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.28rem;
    background: #e8f6f3;
    border-radius: 0.285rem;
  }

  .van-row {
    align-items: center;
    background: #ffffff;
    box-shadow: inset 0 -0.01rem 0 0 #eaeaea;
    line-height: 0.55rem;

    .van-col {
      font-family: PingFangSC-Regular;
      // font-size: 0.28rem;
      color: #4a4a4a;
      // line-height: 0.28rem;
      text-align: center;
    }
  }
}
</style>

 