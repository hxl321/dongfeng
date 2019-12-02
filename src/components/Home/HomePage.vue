<template>

  <div style="height:100vh">
      <!-- 搜索 -->
    <div class="homeTop">
      <div class="inputView">
        <i class="searchIcon van-icon van-icon-search"></i>
        <input class="input" placeholder="请输入查找内容" />
      </div>
      <div class="message"  @click="toMessages">
        <i class="van-icon van-icon-chat-o" ></i>
      </div>
    </div>
 
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in thumbs" :key="thumb.announcementName">
        <img
          @click="bannerClick(thumb)"
          :src="!thumb.announcementUrl ? thumb.announcementUrl :'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575024186612&di=8da376239d2fa6d33065d3cfde28f8a2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F09%2F20180709235634_HEh8H.thumb.700_0.jpeg'"
          class="image"
          width="3.75rem"
        />
      </van-swipe-item>
    </van-swipe>

    <div
      style="background:#F8F8F9;margin-top:0.2rem;border-radius:4px;width:3.42rem;height:0.3rem;margin-left:0.16rem ;display:flex;flex-direction:row;align-items:center"
    >
      <img :src="image" style="width:0.62rem;height:0.18rem;" />
      <van-notice-bar :text="this.newsArr[0].announcementName" />
      <div
        style="font-family: PingFangSC-Light;font-size:12px;color: #666666;line-height: 12px;width: 0.5rem;"
        @click="moreBtnClick"
      >| 更多</div>
    </div>

    <van-grid :column-num="4" :border="false" :clickable="true">
      <van-grid-item
        v-for="(item ,index ) in dataList"
        :key="index"
        :text="item.text"
        @click="clickItem"
      >
        <van-image slot="icon" width="0.32rem" height="0.32rem" :src="item.img" />
      </van-grid-item>
    </van-grid>

    <h3 style="margin-left:0.12rem;font-size:18px">活动</h3>

    <van-swipe :loop="false" :show-indicators="false" width="3.75rem" style="margin-top:0.2rem">
      <van-swipe-item v-for="thumb in thumbs1" :key="thumb">
        <img
          :src="thumb"
          style="width:3.5rem;height:1.5rem;margin-left:0.165rem"
          @click="actImgClick"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  data() {
    return {
      scanImg: require("../../assets/mine_scan.png"),
      message: "",
      dataList: [
        { img: require("../../assets/homepage_item1.png"), text: "VIN码查询" },
        {
          img: require("../../assets/homepage_item2.png"),
          text: "电池包码查询"
        },
        {
          img: require("../../assets/homepage_item3.png"),
          text: "故障上报管理"
        },
        { img: require("../../assets/homepage_item4.png"), text: "故障上报" },
        { img: require("../../assets/homepage_item5.png"), text: "维修委派" },
        { img: require("../../assets/homepage_item6.png"), text: "回收发起" },
        { img: require("../../assets/homepage_item7.png"), text: "回收评测" },
        { img: require("../../assets/homepage_item8.png"), text: "回收查询" },
        { img: require("../../assets/homepage_item10.png"), text: "消息通知" }
      ],
      image: require("../../assets/home_df_news.png"),
      thumbs: [],
      newsArr: [],
      thumbs1: [require("../../assets/home_act1.png")]
    };
  },
  activated() {
    console.log("activated");
  },
  mounted() {
    let parmas;
    this.$post("getAnnouncement", parmas).then(res => {
      this.thumbs = res.body.filter(item => item.announcementType == 2);
      this.newsArr = res.body.filter(item => item.announcementType == 1);
    });
  },
  methods: {
    clickItem() {
      console.log(this.$name);
      this.$router.push({
        path: "/MessageList"
      });
    },
    bannerClick(item) {
      console.log(item.announcementContent);
      this.$router.push({
        path: "/newsDetail",
        query: { id: item.announcementContent }
      });
    },
    moreBtnClick() {
      this.$router.push({
        path: "/newsDetail",
        query: { id: "1234" }
      });
    },
    actImgClick() {
      this.$toast("活动正在组建，敬请期待！");
    },
    toMessages(){
      this.$router.push({
          path: "/MessageList",
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeTop {
    width: 100%;
    height: 0.61rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    position: absolute;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 11;
}
.inputView {
  background: #fff;
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
  background: #fff;
  border: none;
  text-indent: 0.1rem;
}
.searchIcon{
    position: absolute;
    color: #C6C6C6;
    top: 0.2rem;
    left: 0.27rem;
    font-size: 0.22rem;
}
::-webkit-input-placeholder {
 color: #C6C6C6;
}
.message {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    line-height: 0.3rem;
    width: 0.8rem;
    height: 0.3rem;
    /* margin-left: 0.5rem; */
    position: absolute;
    right: 0.07rem;
    top: 0.18rem;
    text-align: center;
    z-index: 111;
}
.message i{
    /* color: #000; */
    font-size: 0.22rem;
}
.van-notice-bar {
  width: 2.85rem;
  height: 0.18rem;
  background: none;
  color: rgba(80, 80, 80, 1);
  margin-left: -0.1rem;
}

.image {
  width: 100%;
  display: block;
  height: 1.8rem;
}
</style>
