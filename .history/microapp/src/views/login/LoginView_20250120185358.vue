<template>
    <div class="body">
       <div class="box">
         <div class="box_left"> 
            <form id="loginForm" @submit.prevent="submit">
             <div class="box_left_center_box">
              <label class="Login_head">登录</label>
                 <div class="form-group">
                        <label for="username">账号</label><br>
                        <input type="text" id="username" name="username" placeholder="输入账号" v-model="account" required>
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label><br>
                        <input type="password" id="password" name="password" placeholder="输入密码" v-model="userPassword" required>
                    </div>
             <div class="form-group">
                <!-- <a href="#" class="forget">忘记密码</a><br> -->
                <router-link to="/web/school/forget" class="forget">忘记密码</router-link><br>
                <button type="submit">登录</button>
             </div>
             <div class="form-group">
                <p2>没有账号？</p2><br>                 
                <div class="enroll">
            <router-link to="/web/school/create" class="enroll_body">注册</router-link>
                </div>
             </div>
          <!-- 用户协议和隐私政策链接 -->
                <div class="agreements">
                    <input type="checkbox" class="agree"  id="agreeCheckbox" v-model="agreed">
                <label for="agreeCheckbox">已阅读并同意以下协议</label> <br>
                     <router-link to="/web/school/web/user" class="enroll_body" target="_blank">用户协议</router-link>&nbsp;
                    <!-- <a href="https://hellomillion.oss-cn-shenzhen.aliyuncs.com/agreement/YHXY.html" target="_blank" class="agreement-link">用户<br>协议</a>| -->
                    <!-- <a href="https://hellomillion.oss-cn-shenzhen.aliyuncs.com/agreement/YSXY.html" target="_blank" class="agreement-link">隐私政策</a> -->
                    <router-link to="/web/school/web/privacy" class="enroll_body" target="_blank">隐私政策</router-link>         
                </div>
            </div> 
         </form>
         </div>
         <div class="box_right">
           <div class="box_right_center">
                 <h3>Micro School</h3>
                 <img src="@/assets/img/label.png" alt="">
           </div>
         </div>
       </div>
                       <!-- 备案信息 -->
                       <div class="footer">  
                  <div class="footer-logo">
                      <p2>|| Micro School</p2>
                      <label><a href="http://www.great-micro.net/liuyan/" >💼公司业务官网</a></label>
                  </div>
                  <div class="footer-body">
                      <div class="footer-body-text">
                          <img src="@/assets/img/footer_1.png" alt="手机">
                          <span>手机:13302905510</span>
                       </div>    
                       <div class="footer-body-text">
                          <img src="@/assets/img/footer_2.png" alt="手机">
                          <span>邮箱:minqiong.tan@moitta.com</span>
                       </div> 
                       <div class="footer-body-text">
                          <img src="@/assets/img/footer_1.png" alt="手机">
                          <span>手机:13302905510</span>
                       </div> 
                       <div class="footer-body-text">
                          <img src="@/assets/img/footer_3.png" alt="手机">
                          <span>地址:深圳市龙岗区龙城街道回龙埔社区花样年乐年广场13号楼A单元203-116室</span>
                       </div> 
                  </div>
                  <div class="footer-icp">
                      <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备2024341066号</a> | 
                      <a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备2024341066号</a>
                  </div>
             </div>
  
    </div>

</template>
<script>
import axios from 'axios';
import {CONNECT, LoginUtil} from '@/assets/js/contants.js'
import { UtilHelper } from '@/assets/js/util_helper.js'
export default({
    created(){
        if(!UtilHelper.isCookieExpired("userData")){
            this.$router.push(LoginUtil.defaultUrl)
        }
    },
    //解决vue渲染不到位的方法
    mounted:function() {
                  if (location.href.indexOf("#reloaded") == -1) {
                    location.href = location.href + "#reloaded";
                    location.reload();
 }
 //刷新页面，达到清空缓存的效果。浏览器的返回按键          
 if (window.name !== "noReload") {
                 window.name = "noReload";
                 location.reload();
               } else {
                 window.name = "";
               }
    },
    data(){
        return {
            account: '',
            userPassword: '',
            agreed: false, // 添加复选框的绑定属性
        };
        
    },
    methods:{
        submit(){
            if (!this.agreed) {
             alert("请先勾选已阅读并同意以下协议");
             return;
  }
        let password=""
        // 请注意 此处代码只是为了方便开发者开发，等待开发完成后要解除下面的注释，并删除axios以上的所有代码（不包括解除注释部分）
        password=UtilHelper.encryptWithMD5(this.userPassword)
        this.login(this.account,password)
      },
      login(account,password){
        const that=this
        
        axios.post(`${CONNECT.generalhostpost()}/login`,{
            "account":`${account}`,
            "password":`${password}`
        }).then(response=>{
            if(response.data.code==0){
                alert(response.data.msg)
            }else if (response.data.code==1) {
                alert("登录成功")
                UtilHelper.setObjectInCookie("userData",response.data.data,20) //设置的过期时间为20小时
                that.$router.push(LoginUtil.defaultUrl)
            }
        }).catch(error=>{
            console.log(error);
        })
      }  
    }
})
</script >
      
 <style scoped>  
        .body{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        
        }
             .body .box { 
            width: 88%;
            height: 88%;
            position: relative;
            margin: 2.5rem auto;
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
              }       
            .body .box .box_left{
                width: 30%;
                height: 100%;
                background: #ffffff;
                box-shadow: 0rem 0rem 2.125rem 0rem rgba(30,2,48,0.25);
                position: absolute;
                left: 0;
                top: 0;
                overflow: hidden; /* 隐藏滚动条 */
              }
              .body .box .box_left_center_box{
                width: 100%;
                height: 60%;
                background: #ffffff;
                position: absolute;
                left: 14%;
                top: 5rem;
              }
          
              .body .box .box_left_center_box .Login_head{
                width: 70%;
                height: 14%;
                display: flex;
                margin-left: 2.375rem;
                text-align: left;
                font-weight: 400;
                font-size: 1.75rem;
                color: #000000;
                line-height: 2.1875rem;
                text-transform: none; 
              }
          
        .body .box .box_left_center_box .form-group label{
        width: 17.4375rem;
        height: 1.25rem;
        font-family: Noto Sans SC, Noto Sans SC;
        font-weight: 400;
        font-size: .875rem;
        color: #192038;
        line-height: 1.25rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
        position: relative;
        margin-left: -18.125rem;
        }
        .body .box .box_left_center_box .form-group input{
            width: 13.125rem;
            height: 2.5625rem;
            background: #FFFFFF;
            border-radius: .75rem .75rem .75rem .75rem;
            border: .125rem solid #EDF1F7;
            position: relative;
            margin-left: -6.75rem;
        }
        .body .box .box_left_center_box .form-group .forget{
            width: 17.4375rem;
        height: 1.625rem;
        margin-left: 1.875rem;
        font-weight: 400;
        font-size: 1rem;
        color: #F6453D;
        line-height: 1.625rem;
        text-align: right;
        font-style: normal;
        text-transform: none;
        margin-left: 1.125rem;
        text-decoration:none;
        
        }
        .body .box .box_left_center_box .form-group p2{
            font-family: Noto Sans SC, Noto Sans SC;
        font-weight: 400;
        font-size: 1rem;
        color: #8F9BB3;
        line-height: 1.625rem;
        text-align: center;
        font-style: normal;
        text-transform: none;
        margin-left: -5.75rem;
        }
        .body .box .box_left_center_box .form-group .enroll .enroll_body{
           color: #FF0000; /* 将颜色改为红色 */
           margin-left: -6.25rem;
           text-decoration: none;
        }

        .body .box .box_left_center_box .form-group button{
            background: #F6453D;
            border-radius: .75rem .75rem .75rem .75rem;
            width: 12.9375rem;
            height: 2.8125rem;
            font-family: Noto Sans SC, Noto Sans SC;
            font-weight: 400;
            font-size: 1rem;
            color: #FFFFFF;
            line-height: 1.5rem;
            text-align: center;
            font-style: normal;
            text-transform: none;
            position: relative;
            margin-left: -6.8125rem;
            margin-top: 2.3125rem;
            border: none; /* 或者 border: 0; */
        }

              .body .box .box_left_center_box h2{
                width: 20.4375rem;
                height: 3rem;
                font-family: Noto Sans SC, Noto Sans SC;
                font-weight: 400;
                font-size: 1.75rem;
                color: #000000;
                line-height: 3rem;
                text-align: left;
                font-style: normal;
                text-transform: none;
                position: relative;
              }
          
            .body .box .box_right{
             width: calc(100% - 30%); /* 计算蓝色盒子的宽度，填充剩余空间 */
            height: 100%;
            box-shadow: 0rem 0rem 2.125rem 0rem rgba(30,2,48,0.25);
            position: absolute;
            right: 0;
            top: 0;
            background-image: url(@/assets/img/Frame.png);
            background-size: cover;
            }

            .body .box .box_right .box_right_center{
            width: 12.5rem;
            height: 12.5rem;
            position: relative;
            top: 46%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }

         .body .box .box_right .box_right_center h3{
            font-family: Noto Sans SC, Noto Sans SC;
            font-weight: 400;
            font-size: 1.75rem;
            color: #FFFFFF;
            line-height: 0rem;
            text-shadow: 0rem .25rem .25rem rgba(0,0,0,0.25);
            text-align: center;
            font-style: normal;
            text-transform: none;
            }
        
        .body .box .box_right .box_right_center img{
            position: relative;
            top: 1.25rem;
            background-size: contain;
            width: 5.9375rem;
            height: 6.75rem;
            border-radius: 0rem 0rem 0rem 0rem;
            border-radius: 0;
            display: block; /* 使图片以块级元素显示，便于居中 */
            margin: 0 auto; /* 水平居中 */
        }
        .body .box .box_left_center_box .agreements {
            font-family: Noto Sans SC, Noto Sans SC;
            font-weight: 400;
            font-size: .9375rem;
            color: #192038;
            line-height: 1.625rem;
            text-align: left;
            margin-left: 2.5rem;
        }
        .body .box .box_left_center_box .agreements .enroll_body{
            font-size: .9375rem;
            color: #F6453D;
            line-height: 1.25rem;
            text-align: left;
            position: relative;
            left: 7%;
        }
        .body .box .box_left_center_box .form-group .agreement-link {
            color: #F6453D; /* 链接颜色 */
            margin-right: .5rem; /* 链接之间的间隔 */
            text-decoration:underline; /* 添加下划线以表示链接 */
        }
        .footer{
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 6.875rem;
          position: relative;
          background: SlateGray;
          color: aliceblue;
          font-size: .75rem;
        }

        .footer .footer-logo {
          width: 100%;
          height: 25%;
          display: flex;
          justify-content: left;
          padding-left: 3.125rem;
          gap: 3.125rem;
          align-items: center;
          position: absolute;
          top: 0;
        
        }
        .footer .footer-logo a{
          text-decoration:none;
        }
        .footer .footer-body {
          display: flex;
          justify-content: left;
          align-items: center;
          width: 100%;
          height: 70%;
          padding-left: 1.25rem;
          gap: 1.875rem;
        }
        .footer .footer-body .footer-body-text:nth-child(4){
          font-size: .875rem;
          flex-grow: 1;
        }
        .footer .footer-body img{
          height: 1.25rem;
          width: 1.25rem;
        }
        .footer .footer-icp {
          font-size: .75rem;
          color: red;
          text-align: center;
          width: 100%;
          height: 15%;
          bottom: 0;
          position: absolute;
        }
        .footer-icp a {
          text-decoration: none;
          margin: 0 .3125rem;
          color: #000;
        }
        /* 取消底部的滚动条 */
        body {
            overflow-x: hidden;
        }
    
 </style>