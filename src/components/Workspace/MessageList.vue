<template>
  <div>
    <van-nav-bar title="消息通知" @click-left="onClickLeft" :border="false">
      <div slot="left" style="width:0.3rem;height:0.44rem;">
        <van-image :src="image" style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
      </div>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :offset="offset"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.id">
          <van-cell-group>
            <van-cell
              :title="item.title"
              :value="item.createTime.substr(0,10)"
              :label="item.messageContent"
            />
          </van-cell-group>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: "MessageList",
  data() {
    return {
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      pageNum: 0,
      offset: 300,
      hasGet: false,
      image: require("../../assets/ic_back_white.png")
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    getMessList(pageNum) {
      if (!this.hasGet) {
        this.hasGet = true;
        this.pageNum = pageNum;

        console.log("加载数据..." + this.pageNum);

        var parmas = {
          recipient: "sunwang",
          pageSize: 10,
          pageNum: this.pageNum
        };
       
        this.$post("messageList", parmas).then(res => {
          console.log(res);
          if (res.code == "200") {
            // 判断是否还有数据
            if (res.body.list.length < 10) {
              this.finished = true;
            }
            if (pageNum == 1) {
              this.finished = false;
              this.list = [];
            }
            this.hasGet = false;
            for (var i = 0; i < 10; i++) {
              this.list = this.list.concat(res.body.list);
            }
          } else {
            // 请求失败
            console.log(res);
          }
        });
      } else {
        return;
      }
    },

    onRefresh() {
      console.log("下拉刷新...");
      this.isLoading = false;
      this.getMessList(1);
    },
    onLoad() {
      console.log("上拉刷新...");
      this.loading = false;
      this.getMessList(this.pageNum + 1);
    }
  },
  created() {
    // this.getMessList(1);
  }
};
</script>

<style scoped>
.van-nav-bar {
  background: #24bb9b;
}
.van-nav-bar__title {
  color: #ffffff;
  font-size: 0.19rem;
}

.van-nav-bar .van-icon {
  color: #323233;
  vertical-align: middle;
}

.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.05rem 0.16rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.14rem;
  line-height: 0.24rem;
  background-color: #fff;
}
.van-cell__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
