<template>
    <div class="body">
      <div class="box">
         <div class="box_left">
            <div class="out-left">
                 <div class="title">创建账号</div>
                 <span class="msg"></span>
                   <div class="input-group">
                    <label for="phone">账号名</label><br>
                    <input type="text"  id="accountName" v-model="username" placeholder="账号名称">
                   </div>
                   <div class="input-group">
                    <label for="phone">账号</label><br>
                    <input type="text"  id="account" v-model="account" placeholder="账号">
                   </div>
            <div class="input-group">
                <label for="phone">绑定手机号</label><br>
                <input type="text" id="phone" v-model="userPhone"  placeholder="手机号码">
            </div>

            <div class="input-group">
                <label for="phone">验证码</label>
                <!--发送验证码-->
                <span class="send" @click="sendCode()"> {{ sendButtonText }}</span> 
                <input type="text" v-model="code" placeholder="手机验证码">
                <br>
            </div>

            <div class="input-group">
                 <label for="phone">密码</label><br>
                 <input type="password" v-model="password01"  id="password" placeholder="请输入密码">
            </div>

            <div class="input-group">
                <label for="phone">确认密码</label><br>
                <input type="password" v-model="password02" id="confirm-password" placeholder="请确认密码">
            </div>

            <div class="input-group">
                <button type="submit" @click="register()">注册</button>
                    <p>已有账号？</p>
                    <!-- <a href="#" class="use">登录</a>     -->
                    <div class="create"> 
                    <router-link to="/web/school/" class="login-link">登录</router-link>
                    </div>
            </div>
       </div>
 </div>
                        <div class="box_right">
                            <div class="box_right_center">
                                <h3>Micro School</h3>
                                 <img src="@/assets/img/label.png" alt="">
                            </div>
                        </div>
      </div>
    </div>
</template>   

<script>
import axios from 'axios';
import { UtilHelper } from '@/assets/js/util_helper.js'
import { CONNECT } from '@/assets/js/contants';
export default({
    created(){
        
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
            account:"",
            username:"",
            userPhone:"",
            code:"",
            password01:"",
            password02:"",
            isSending: false, // 是否正在发送验证码
            sendButtonText: '发送验证码', // 发送按钮的文本
        };
        
    },
    methods:{
        isValidPhone (phoneNumber){
        // 简单地检查号码长度为11位数字
        return /^1[0-9]{10}$/.test(phoneNumber);
        },
        sendCode(){
            const that=this
            // 如果正在发送验证码，直接返回
             if (this.isSending) return;
            //获取验证码发送的元素
            let send=document.querySelector('.send');
            let phone=document.getElementById('phone');
            //检查输入框是否为空
            if(phone.value.trim() === ''){
                alert('请输入手机号码')
                return; // 如果为空，则提示用户并停止函数执行
            } 
            //检查手机号码格式是否正确（这里使用中国大陆的手机号码格式作为示例）
            let phoneRegex= /^1[3-9]\d{9}$/;
            if(!phoneRegex.test(phone.value)){
                alert('请输入正确的手机号码')
                return; // 如果格式不正确，则提示用户并停止函数执行
            }
             // 如果手机号码验证通过，发送验证码
            UtilHelper.sendCodeHelper(that.userPhone);
             //禁用按钮
             this.isSending = true; // 标记为正在发送验证码
             // 定义一个变量来存储倒计时的时间
            let time = 60;
            //设置按钮文本
            send.textContent=`${time}后重新发送`
            
           
            //设置定时器
            let interval =setInterval(function(){
                time--;
                if(time >= 0){
                  send.textContent=`${time}后重新发送`
                }
                if(time === 0){
                    clearInterval(interval)
                    this.isSending = false; // 重新启用发送按钮
                    send.textContent=`发送验证码`
                }
            },1000)
        },
        checkPassword(){
            return this.password01===this.password02
        },
        checkInfo(){
            return this.account!="" && this.username!=""&&this.userPhone!=""&&this.code!=""&&this.password01!=""&&this.password02!=""
        },
        checkAccount(account){
            return /^[a-zA-Z0-9]{1,16}$/.test(account)
        },
        register(){
            // 判断用户是否提供了全部参数
            if (!this.checkInfo()) {
                alert("请输入全部参数")
                return
            }
            // 判断密码与确认密码是否相同
            if(!this.checkPassword()){
                alert("请重新确认密码")
                return
            }
            if (!this.checkAccount(this.account)) {
                alert("账号为16位以内长度字母或数字的字符串")
                return
            }
            const that=this
            // formData在此处使用formData是为了预防以后为了扩展上传头像功能而做的准备
            const formData = new FormData();
            let password=UtilHelper.encryptWithMD5(this.password01)
            formData.append("account",`${this.account}`)
            formData.append("username",`${this.username}`)
            formData.append("password",`${password}`)
            formData.append("userPhone",`${this.userPhone}`)
            formData.append("code",`${this.code}`)

            axios.post(`${CONNECT.privateHostPost()}/register`,formData,{
                    headers: {
                    'Content-Type': 'multipart/form-data'
                } 
            }).then(response=>{
                if (response.data.code===1) {
                    alert("注册成功")
                    that.$router.push('/web/school')
                }else if(response.data.code===0){
                    alert(response.data.msg)
                }
            })
        }
    }
})
</script>

<style scoped>

.body{
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
}

     .body .box { 
    width: 88%;
    height: 88%;
    position: relative;
    margin: 40px auto;

      }       
      .body .box .box_left{
        width: 30%;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 0px 34px 0px rgba(30,2,48,0.25);
        position: absolute;
        left: 0;
        top: 0;
      }
      .body .box .box_right{
     width: calc(100% - 30%); /* 计算蓝色盒子的宽度，填充剩余空间 */
    height: 100%;
    box-shadow: 0px 0px 34px 0px rgba(30,2,48,0.25);
    position: absolute;
    right: 0;
    top: 0;
    background-image: url(@/assets/img/Frame.png);
    background-size: cover;
    }
    .title {
    width: 327px;
height: 70px;
font-family: Noto Sans SC, Noto Sans SC;
font-weight: 400;
font-size: 22px;
color: #000000;
line-height: 35px;
text-align: left;
font-style: normal;
text-transform: none;  
margin-top: 43px;
margin-left: 64px;    
display: flex;
}

.input-group {
    top: -38px;
font-family: Noto Sans SC, Noto Sans SC;
font-weight: 400;
font-size: 13px;
color: #192038;
margin-top: 5px;
margin-left: 66px;
text-align: left;
position: relative;
}

.input-group p{
    position: relative;
    top: 10px;
    margin-left: 73px;
}

.input-group label {
    font-size: 11px;
    color: #666;
    line-height: 21px;
}

.input-group input {
    width: 200px;
    height: 28px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 10px;
    color: #8F9BB3;
}

.input-group button {
    width: 203px;
    height: 35px;
    background: #F6453D;
    border-radius: 12px 12px 12px 12px;
    top: 4px;
    left: 0px;
    position: relative;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 24px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    border: none;
}
.input-group span{
    width: 279px;
height: 20px;
font-family: Noto Sans SC, Noto Sans SC;
font-weight: 400;
font-size: 12px;
color: #F6453D;
line-height: 20px;
text-align: left;
font-style: normal;
text-transform: none;
margin-left: 116px;
}

.login-link {
    font-weight: 400;
    font-size: 16px;
    color: #F6453D; /* 这里设置您想要的颜色 */
    line-height: 50px;
    text-align: center;
    text-decoration: none; /* 去除下划线 */
    margin-left: 80px;
}
.body .box .box_right .box_right_center{
    width: 200px;
    height: 200px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.body .box .box_right .box_right_center h3{
    font-family: Noto Sans SC, Noto Sans SC;
font-weight: 400;
font-size: 28px;
color: #FFFFFF;
line-height: 48px;
text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
text-align: left;
font-style: normal;
text-transform: none;
}
.body .box .box_right .box_right_center img{
    margin-top: -30px;
    background-size: contain;
    width: 95px;
    height: 108px;
    border-radius: 0px 0px 0px 0px;
}
.msg{
    color: red;
}
/* 取消底部上下的的滚动条 */
body {
    overflow-x: hidden;
    overflow-y: hidden;
}


/* 屏幕宽度在小于768px之间的样式 */
@media (max-width: 768px) {
    .input-group,
    .title{
    margin-left: 20px;
    }
    .body .box .box_left{
        zoom: 80%;
    }
}

/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
    .input-group,
    .title{
    margin-left: 20px;
    }
}

/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .input-group,
    .title{
    margin-left: 20px;
    }
}
/* 屏幕宽度大于1200px之间的样式 */
@media (max-width:1500px) and (min-width: 1200px) {
    .body .box .box_left{
        zoom: 80%;
    }
  }
  /* 屏幕宽度大于1600px之间的样式 */
@media  (min-width: 1600px) {
    body .box .box_left_center_box{
        zoom: 130%;
    }
}
</style>






