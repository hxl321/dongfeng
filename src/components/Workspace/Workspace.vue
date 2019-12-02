<template>

<div style=" height: 100vh;">
   
  
 <van-nav-bar  
  title="工作台"
/>

<van-grid :column-num="3" :border = 'false' :clickable='true' >
  <van-grid-item
    v-for="(item ,index ) in dataList"
    :key="index"
    :text= item.text  
    @click='clickItem(index)'
  > 
  <van-image slot="icon" width='0.32rem' height="0.32rem" :src= item.img /> 
  </van-grid-item >
</van-grid>
   
 


</div>
   
 
</template>

<script>
export default {
  name: 'Workspace',
  
  data () {
    return {
      message:'' ,
      dataList:[
                {img:require('../../assets/homepage_item1.png'),text:'VIN码查询'},
                {img:require('../../assets/homepage_item2.png'),text:'电池包码查询'},
                {img:require('../../assets/homepage_item4.png'),text:'故障上报'},
                {img:require('../../assets/homepage_item3.png'),text:'故障上报管理'},
                {img:require('../../assets/homepage_item5.png'),text:'维修委派'},
                {img:require('../../assets/homepage_item6.png'),text:'回收发起'},
                {img:require('../../assets/homepage_item7.png'),text:'回收评测'},
                {img:require('../../assets/homepage_item8.png'),text:'回收查询'},
                // {img:require('../../assets/biaoma.png'),text:'标码注册'} 
               
              ]
    }
  },

  methods:{
       
      clickItem(index){
         console.log(index)
         switch (index ) {
          case 0:
              this.$router.push({
            path:'/VINCodeSearch'    
          })
             break;
          case 1:
             this.$router.push({
            path:'/BatteryCodeSearch'    
          })
          break;
          case 2:
           this.$router.push({
            path:'/FailureAssign'    
          }) 
          break;
          case 3:
           this.$router.push({
            path:'/FailureReportingManage'    
          })
           
          break;
          case 4:
             this.$router.push({
            path:'/RepairManager'    
          })
          break;
          case 5:
          this.$router.push({
            path:'/RecycleLanch'    
          })
          break;
          case 6:
             this.$router.push({
            path:'/RecoveryEvaluationManage'    
          })
          break;
          case 7:
             this.$router.push({
            path:'/RecycleList'    
          })
          break;
          case 8:
            this.$router.push({
            path:'/CodeRes'    
          })
          break;
          case 9:
             this.$router.push({
            path:'/RecoveryEvaluationManage'    
          })
          break;
          case 10:
            this.$router.push({
            path:'/RecoveryEvaluationManage'    
          })
          break;
          
           default:
             break;
         }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
    .image{
      width: 100%;
      display: block;
      height: 1.8rem;
    }
  
</style>

