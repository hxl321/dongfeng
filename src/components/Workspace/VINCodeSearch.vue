<template>

<div>
   
 <van-nav-bar
  title="车辆VIN码查询"
  @click-left="onClickLeft"  
  :border='false'
>
<div slot="left" style="width:0.3rem;height:0.44rem;">
<van-image :src='image'   style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
</div>
</van-nav-bar>


 <div style="width:100%;height:0.61rem;background:#24BB9B;display:flex;flex-direction:row;align-items:center;">
   <div class='inputView'>
   <input  v-model="message"  class="input" placeholder='请输入或扫描VIN码'  />
    </div>
  <img :src="scanImg" style="width: 0.23rem;margin-left: -30px ;z-index: 9999;" @click="scan"/>
  <div class="cancleBtn" @click="searchBtnClick">搜索</div>

 </div>
  
 

 
 <div style="background:white;margin-left:0.05rem;padding:0.1rem;font-family: PingFangSC-Medium;font-size: 14px;color: #333333;" >搜索历史</div>

<!-- 居中 -->
<div style="  display: flex;flex-direction: row;  justify-content: flex-start;flex-wrap: wrap;" >  
  
  <van-col span="10" style=" margin-left: 0.2rem; margin-top: 0.2rem;" @click="itemClick(item)"  v-for="(item ) in historyData" :key = 'item'>{{item}}</van-col>
  <!-- <van-col span="10" @click="itemClick(item)"   v-if='index%2 == 1'>{{item}}</van-col> -->
</div>
</div>
   
 
</template>

<script>
export default {
  name: 'VINCodeSearch',
  
  data () {
    return {
      message:'' ,
     image:require('../../assets/ic_back_white.png'),
     scanImg:require('../../assets/mine_scan.png') ,
     historyData:''
    }
  },
  mounted(){
        var data = localStorage.getItem('VinKey');
         var dataObj=JSON.parse(data);
         if(dataObj)
         this.historyData = dataObj.reverse() ;
  },
  methods:{
       onClickLeft(){
           this.$router.go(-1);//返回上一层
      },
      scan(){
        console.log(111)
        triggerNative('saoyisao', '');
      } ,
      searchBtnClick(){
        if(!this.message){
          this.$toast.fail('请输入vin码');
          return ;
        }
        var data = localStorage.getItem('VinKey');
         var dataObj=JSON.parse(data);
         if(dataObj){
           if(dataObj.length >7){
               var item =dataObj.splice(1, 8);
              item.push(this.message)
             localStorage.setItem('VinKey',JSON.stringify(item))
           }else{
              dataObj.push(this.message)
             localStorage.setItem('VinKey',JSON.stringify(dataObj))
         }
         
         }else{
              dataObj = []
              dataObj.push(this.message)
             localStorage.setItem('VinKey',JSON.stringify(dataObj))
         }
          
          this.$router.push({
            path:'/CarDetail',
            query:{id:this.message}
             
          })

      },
      itemClick(item){
        this.$router.push({
            path:'/CarDetail',
            query:{id:item}
             
          })
      }
       
  } ,
    // beforeRouteLeave(to, from, next) {
    //      // 设置下一个路由的 meta
    //      console.log('123455x')
    //     // to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
    //     // next();
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
.van-nav-bar{
  background:#24BB9B ; 
}
.van-nav-bar .van-icon {
    color: white;
    
}
.van-nav-bar__title {
   
    color: white;
   
}
 
 
.inputView{
  background: #27C6A5;
   border-radius: 0.36rem;
  width: 2.94rem ;
  height:0.36rem ;
  border: 1px solid white ;
  margin-left: 0.19rem ;
}
 .input{
   margin-left: 0.2rem ;
   width: 1.5rem ;
   height:0.15rem ;
   margin-top:0.1rem ;
  background: #27C6A5;
  border: none ;
 }

::-webkit-input-placeholder {
 
color: white;
}
.cancleBtn{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 0.3rem;
    width: 0.8rem;
    height: 0.3rem;
    /* margin-left: 0.5rem; */
    position: absolute;
    right: 0.10rem;
    text-align: right;
}
/* :-moz-placeholder {
 
color: red;
}
::-moz-placeholder {
 
color: red;
}
:-ms-input-placeholder {
 
color: red;
} */


.van-col {
    float: left;
    box-sizing: border-box;
    min-height: 1px;
    background:  #F5F8F8;
    text-align: center;
    height:0.3rem;
    line-height: 0.3rem ;
    }
</style>

