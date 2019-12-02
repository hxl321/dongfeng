<template>

<div>
 

 <van-nav-bar
  title="自助注册"
  @click-left="onClickLeft"  
  :border='false'
>
<div slot="left" style="width:0.3rem;height:0.44rem;">
<van-image :src='backimage'   style="margin-top: 0.1rem; width:0.24rem; height:0.24rem ;" />
</div>
</van-nav-bar>

 
<div  style="margin-top:0.2rem ;margin-left:0.24rem ;margin-right:0.24rem" >
   <van-field
    v-model="identity_card"
    :left-icon="image"
    label-width="10"
    label=" "
    label-align='left'
    clearable
    placeholder="请输入身份证号"
   
 />

   <van-field
    v-model="user_name"
    :left-icon="image4"
    label-width="10"
    label=" "
    label-align='left'
    clearable
    placeholder="请输入用户名"
   
 />


   <van-field
    v-model="user_phone"
    :left-icon="image3"
    label-width="10"
    label=" "
    label-align='left'
    clearable
    placeholder="请输入手机号"
   
 />
   <!--
  <van-field
    v-model="userRole"
    
    :left-icon="image"
    label-align='left'
    disabled
    placeholder="请选择注册角色"
     right-icon="arrow-down"
    @click-right-icon="show=true"
    @click="show=true"
  />
<van-action-sheet v-model="show" :actions="actions" @select="onSelect" /> -->


  <van-field
    v-model="email"
    label-width="10"
    label=" "
    :left-icon="image2"
    label-align='left'
    clearable
    placeholder="请输入电子邮箱"
    
  />
 
  <van-field
    v-model="check_code"
    label-width="10"
    label=" "
    :left-icon="image5"
    placeholder="请输入验证码"
  >
    <van-button slot="button" size="small" type="danger" color="#24BB9B" plain @click="sendCode">获取邮箱验证码</van-button>
  </van-field>

<van-field
    v-model="one_pwd"
    label-align='left'
     label-width="10"
    label=" "
    :left-icon="image1"
    clearable
    placeholder="8-30位，包含字母和数字"
    
  />

  <van-field
    v-model="two_pwd"
    :left-icon="image1"
     label-width="10"
    label=" "
    label-align='left'
    clearable
    placeholder="8-30位，包含字母和数字"
    
  />
   <div class="van-multi-ellipsis--l3" style="font-size:12px;margin:0.1rem ;text-align:left;color:#808080 ;line-height:18px">为保证您的账户和资金安全，请不要设置与其他软件（如社交软件）、网
站（如社交平台、论坛）相同或相似的用户名和密码组合。

</div>
</div>

<div style="font-size:12px;margin:0.25rem ;text-align:left;color:#24BB9B ; display: flex;" @click="show=true"><div>* 点击“确认注册”视为同意</div><div style="color:#24BB9B">《用户协议条款》</div></div>
<div  style="width:3.15rem ;margin-left:0.3rem;height:0.4rem;margin-top:0.3rem">
<van-button type="danger"   color="#24BB9B" size="large" @click="nextStep">确认注册</van-button>
 </div>

 


</div>
   
 
</template>

<script>
export default {
  name: 'Res',
  
  data () {
    return {
      msg:666,
      email:'',
      one_pwd:'',
      two_pwd:'',
      check_code:'',
      identity_card:'',
      user_phone:'',
      user_name:'',
       show: false,
      actions: [
        { name: '个人' },
        { name: '公司' },
        
      ] ,
       backimage:require('../../assets/ic_back_black.png'),
     image:require('../../assets/login_sf.png') ,
     image3:require('../../assets/ic_login_phone.png') ,
     image1:require('../../assets/login_word.png') ,
      image2:require('../../assets/login_email.png'),
      image5:require('../../assets/yzm_login.png') ,
       image4:require('../../assets/login_user.png'),
      
    }
  },
  mounted: function () {
        this.msg = this.$route.query.id
        console.log( this.msg)
    },
  methods:{
    //发送验证码
    sendCode(){

      if(!this.checkEmail(this.email)){
        this.$toast('请输入正确的邮箱号码');
        return ;
      }


   var parmas = {  
      "emailAddress":this.email,
    }
     this.$post("sendEmail", parmas).then(res => {
           console.log(res)
           this.$toast(res.error);
          });
      
       
    },
      onClickLeft(){
           this.$router.go(-1);//返回上一层
      },
   nextStep(){

     if(this.identity_card.length < 16){
       this.$toast('请输入正确的身份证号码');
        return ;
     }
     if(this.user_name.length <1){
         this.$toast('用户名不能为空');
        return ;
     }
     if(this.user_phone.length != 11){
          this.$toast('清输入正确的手机号');
        return ;
     }
      if(!this.checkEmail(this.email)){
        this.$toast('请输入正确的邮箱号码');
        return ;
      }
      if(this.check_code.length <1){
           this.$toast('验证码不能为空');
        return ;
      }
      if(this.one_pwd.length < 8){
           this.$toast('请输入8-30位，包含字母和数字的密码');
        return ;
      }
      if(this.one_pwd != this.two_pwd){
           this.$toast('2次密码不同，请检查');
        return ;
      }
     var parmas = {  
       password:this.one_pwd ,
       emailCode:this.check_code ,
       identityCard:this.identity_card ,
       userName:this.user_name ,
       phoneNumber:this.user_phone ,
      "email":this.email,
    }

     this.$post("register", parmas).then(res => {
           console.log(res)
           this.$toast(res.error);
           if(res.code == 0){
               this.$router.replace({
                path:'/Tabbar'    
          })
           }
          });
      
       
      },
      onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      
      this.show = false;
       this.userRole = item.name
    } ,


checkEmail(email) {

// 对电子邮件的验证

var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

          if (!myreg.test(email)) {

          return false;

          } else {

          return true;

          }

}
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
.van-button--large {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
}
</style>
