<template>
    <div class="parent-web">
        <div class="head_box">
            <div class="head_left_box">
                <span class="left_image"><img src="@/assets/img/label.png" alt=""></span>
                <span class="left_text">Micro School</span>
            </div>
            <div class="head_right_box">
                <!-- <div class="query_box">
                    <div class="query_image"><img src="" alt=""></div>
                    <input type="text" placeholder="搜索">
                </div> -->
                <div class="user_box">
                    <span class="head_image"><img :src="userHeadshot" alt=""></span>
                    <div class="user_text"> {{username}} </div>
                </div>
                
            </div>
        </div>
        <div class="body_box">
            <div class="body_left_box">
                <div class="choose_box">
                    <div class="choose_image_box">
                        <img src="@/assets/img/home.png" alt="" @click="goHome">
                        <!-- <div class="choose_text">首页</div> -->
                        <router-link to="/web/school/web/main" class="choose_text">首页</router-link>
                    </div>
                    <div class="choose_image_box">
                        <img src="@/assets/img/user.png" alt="">
                        <div class="choose_text">用户</div>
                    </div>
                </div>
            </div>
            <div class="body_right_box">
                <div class="body_right_head_box">
                    <div class="body_right_head_text_box">
                        <div class="myself" @click="switchs()">我的</div>
                    </div>
                    <div class="body_right_head_text_box" @click="myOnOrOffVideo(1)" >
                                已发布视频</div>
                    <div class="body_right_head_text_box" @click="myOnOrOffVideo(0)" >已下架视频</div>
                    <!-- 待审核视频 -->
                    <div class="body_right_head_text_box" @click="myOnOrOffVideo(2)" v-if="this.userTypeId!=1">待审核视频</div>
                    <div class="body_right_head_text_box">
                        <div class="myself_on">个人信息</div>
                    </div>
                </div>
                <div class="body_right_content_box">
                    <div class="upload_video_box">
                      <div class="upload_video_box_body_head">
                        <label for="file_input" class="upload-box">
                             <div class="profile-header">
                                 <!-- 头像预览将显示在这里 -->
                                <!-- <img :src="userHeadshot" alt="用户头像" > -->
                                <img :src="userHeadshotPreview || userHeadshot" alt="用户头像" id="imagePreview">
                                <input type="file" id="file_input" ref="avatarInput"  @change="onAvatarChange" accept="image/*">
                             </div>
                        </label>   
                             <div class="body_right_box_center_box_picture_box_replace">
                                <!-- 更换头像的按钮，点击时触发文件输入 -->
                                   <button class="change-avatar-btn" id="fileInput" @click="triggerFileInput">更换头像</button>
                             </div>
                             <!-- <div class="body_right_box_center_box_picture_box_replace_delete">
                                   <button class="delete-img-btn"></button>
                             </div> -->
                      </div>
                      <div class="upload_video_box_body_model">
                           <div class="body_text">
                                <div class="one">
                                        <span class="left-centerBox">姓名</span><br>
                                            <input type="text"><br>
                                </div>   
                                <div class="two">
                                        <span class="left-centerBox">手机号</span><br>
                                            <input type="text" ><br>
                                </div>
                                <div class="three">
                                        <span class="left-centerBox">性别</span><br>
                                        <select id="gender" name="gender" v-model="gender">
                                            <option value="1">男</option>
                                            <option value="0">女</option>
                                        </select>
                                            
                                </div> 

                                        
                           </div>

                           <div class="body_right_text">
                                      <div class="four">
                                        <span class="right-centerBox">邮箱</span><br>
                                            <input type="text" ><br>
                                      </div>
                                      <div class="five">
                                         <span class="right-centerBox">生日</span><br>
                                               <input type="date" ><br>
                                      </div>
                          </div>
                          <div class="body_box_bottom">
                            <div class="body_box_bottom_right_box">
                                   <button @click="updateOwnInfo()">保存</button>
                            </div>
                          </div>


                      </div>
                      
                    </div>
                </div>

             </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { UtilHelper } from '@/assets/js/util_helper';
import { CONNECT,CookieUtil } from '@/assets/js/contants';
import { WebSocketUtil } from '@/assets/js/websocket';

export default{
    created(){
        const userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=userInfo.headshot
        this.username=userInfo.userName
        this.token=userInfo.token
        this.account=userInfo.account
        this.userTypeId=userInfo.userTypeId
        this.queryOwnInfo()
        WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
    },

     //解决vue渲染不到位的方法
//      mounted:function() {
//                   if (location.href.indexOf("#reloaded") == -1) {
//                     location.href = location.href + "#reloaded";
//                         location.reload();
//         }
//  },
    data(){
        return {
            token:"",
            userHeadshot:"",
            userHeadshotPreview:"", // 用于存储头像预览的URL
            username:"",
            account:"",
            avatarFile:null,//用于存储用户选择的文件
            gender:1
        };
    },
    methods: {
        async triggerFileInput() {
        let head=await document.querySelector(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_box_body_head .upload-box .profile-header input")
        try{
            if (head==null) {
                alert("请选择头像上传")
                return
            }
            if (head.files[0].name==this.userHeadshot) {
                alert("检测到原图片与上传头像的相同,请选择你要上传的头像")
                return
            }
        }catch(error){
            console.error(error);
            alert("请选择头像上传")
            return
        }
        let formData=new FormData();
        formData.append('account', this.account);
        formData.append('file', head.files[0]);
        const that=this
        axios.post(`${CONNECT.generalhostpost()}/user/own/headshot/put`,formData,{headers:{
            'Content-Type': 'multipart/form-data',
            "token":this.token
        }}).then(response=>{
            if (response.data.code==1) {
                let userInfo= UtilHelper.getObjectFromCookie(CookieUtil.userObject)
                that.userHeadshot=response.data.data
                userInfo.headshot=that.userHeadshot
                UtilHelper.setObjectInCookie(CookieUtil.userObject,userInfo,CookieUtil.userDefaultTime)
                alert("更换成功")
            }
        })
    },
    async queryOwnInfo(){
        const that=this
        let ownInfo={}
        await axios.get(`${CONNECT.generalhostpost()}/user/own/info`,{
            params:{
                account:that.account
        },
            headers:{
            "token":that.token
        }}).then(response=>{
            ownInfo=response.data.data
        })
        let leftInfo=document.querySelectorAll(".parent-web .body_right_content_box .upload_video_box_body_model .body_text input")
        leftInfo[0].value=ownInfo.userName
        leftInfo[1].value=ownInfo.userPhone
        let rightInfo=document.querySelectorAll(".parent-web .body_right_content_box .upload_video_box_body_model .body_right_text input")
        rightInfo[0].value=ownInfo.email
        rightInfo[1].value=ownInfo.birthday
        that.gender=ownInfo.gender
    },
    onAvatarChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.userHeadshotPreview = e.target.result; // 更新预览图片的URL
                };
                reader.readAsDataURL(file); // 读取文件为DataURL
            }
        },
     
    // 新增方法，用于跳转到用户界面
    goUser() {
               this.$router.push('/web/school/webview');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
             switchs(){
             UtilHelper.myPages(this)
            },
            myOnOrOffVideo(pageState){
                UtilHelper.chooseMyOnOrOffVideo(this,pageState)
            },
            updateOwnInfo(){
            let leftInfo=document.querySelectorAll(".parent-web .body_right_content_box .upload_video_box_body_model .body_text input")
            let rightInfo=document.querySelectorAll(".parent-web .body_right_content_box .upload_video_box_body_model .body_right_text input")
            let obj={
                account:this.account,
                userName:leftInfo[0].value,
                userPhone:leftInfo[1].value,
                email:rightInfo[0].value,
                birthday:rightInfo[1].value,
                gender:this.gender
            }
            const that=this
            let userInfo= UtilHelper.getObjectFromCookie(CookieUtil.userObject)
            axios.put(`${CONNECT.generalhostpost()}/user/own/info/put`,obj,{
                headers:{
                    "token":that.token
                }
            }).then(response=>{
                if (response.data.code===1) {
                    alert(response.data.data)
                    userInfo.userName=obj.userName
                    UtilHelper.setObjectInCookie(CookieUtil.userObject,userInfo,CookieUtil.userDefaultTime)
                    that.username=obj.userName
                }else if (response.data.code===0) {
                    alert(response.data.msg)
                }
            })
            },
            onGenderChange(event) {
                this.gender = event.target.value;
            }
    }
}

</script>
<style scoped>
@import '@/assets/css/web_default.css';
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(3){
    color: #8F9BB3;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(5){
    color: #000000;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box .myself{
    text-decoration: none;
    color: #8F9BB3;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box .myself-on{
    color: #000000;
    text-decoration: none;
}
.parent-web .body_box .body_right_box .body_right_content_box{
    width: 100%;
    height: 100%;
    background-color: #f3f6f9;
    position: relative;
    margin: 0 auto;
    overflow: auto;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
    width: 90%;
    height: 90%;
    background-color: #ffffff;
    position: absolute;
    margin: 2.5%;
    margin-left: 5%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 25px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_head_box{
    padding-left: 15px;
    width: 100%;
    height: 50px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-size: 20px;
    line-height: 50px;
    font-weight: 400;
    font-style: normal;
    text-transform: none;
}
.parent-web .body_right_content_box .upload_video_box_body_head{
    width: 100%;
    height: 25%;
    position: relative; /* 修改为相对定位 */
    display: flex;
    align-items: center; /* 垂直居中 */
    padding: 10px; /* 增加一些内边距 */
    padding-top: 1%;
    padding-left: 253px;
    
}
.parent-web .body_right_content_box .upload_video_box_body_head input{
display: none;    
}
    

.profile-header img {
    width: 58px; /* 设置图像的宽度 */
    height: 57px; /* 设置图像的高度 */
    border-radius: 50%; /* 圆形图像 */
    object-fit: cover; /* 确保图像不失真 */
   
}

.change-avatar-btn{
    width: 160px;
height: 44px;
border-radius: 12px 12px 12px 12px;
border: 1px solid #F6453D;
}
.delete-img-btn {
  width: 44px;
   height: 44px;
   border-radius: 12px 12px 12px 12px;
border: 1px solid #DE350B;
    padding: 5px 10px; /* 按钮的内边距 */
    border-radius: 5px; /* 按钮的圆角 */
    color: white; /* 按钮的文字颜色 */
    cursor: pointer; /* 鼠标悬停时显示指针 */
    font-size: 14px; /* 按钮的文字大小 */
    margin-left: 10px;
     /* 删除按钮的背景颜色 */ 
     background-image: url('@/assets/img/rubbish.png');
}
.parent-web .body_right_content_box .upload_video_box_body_model{
    width: 100%;
    height: 75%;
    position: relative; /* 修改为相对定位 */
    display: flex;
    align-items: center; /* 垂直居中 */
    padding: 10px; /* 增加一些内边距 */
    padding-top: 95px;
}
.parent-web .body_right_content_box .upload_video_box_body_model .body_text{
    width: 300px;
    height: 370px;
    position: relative; /* 修改为绝对定位 */
    align-items: center; /* 垂直居中 */
    padding: 10px; /* 增加一些内边距 */ 
    margin-top: -100px;
    margin-left: 245px;
    box-sizing: border-box;

}
.parent-web .body_right_content_box .upload_video_box_body_model .body_text .one span{
margin-top: 10px;
}


.parent-web .body_right_content_box .upload_video_box_body_model .body_text .left-centerBox{
width: 327px;
    height: 20px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 14px;
    color: #192038;
    line-height: 20px; /* 行高设置 */
    text-align: right; /* 文本右对齐 */
    margin-right: 226px; /* 标签与输入框之间的间距 */
    margin-top: 20px; /* 增加上边距以向下移动标签 */ 
}
.parent-web .body_right_content_box .upload_video_box_body_model .body_text input,.parent-web .body_right_content_box .upload_video_box_body_model .body_right_text input{
    width: 256px;
height: 43px;
background: #FFFFFF;
border-radius: 12px 12px 12px 12px;
border: 1px solid #EDF1F7;
margin-top: 10px;
}

.parent-web .body_right_content_box .upload_video_box_body_model .body_right_text{
    width: 300px;
    height: 370px;
    position: relative; /* 修改为绝对定位 */
    padding: 10px; /* 增加一些内边距 */ 
    margin-top: -100px;
    margin-left: 8px;
    line-height: 8px;
    box-sizing: border-box;
}


.parent-web .body_right_content_box .upload_video_box_body_model .body_text .left-centerBox,
.parent-web .body_right_content_box .upload_video_box_body_model .body_right_text span {
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 14px;
    color: #192038;
    line-height: 20px; /* 行高设置 */
    text-align: right; /* 文本右对齐 */
    margin-right: 226px; /* 标签与输入框之间的间距 */
    margin-top: 5px; /* 减少上边距以向下移动标签 */ 
  
}
.parent-web .body_box .body_right_box .body_box_bottom .body_box_bottom{
    width: 100%;
    height: 200px;
    background: pink;
    position: relative; /* 修改为绝对定位 */
    padding: 10px; /* 增加一些内边距 */
    margin-top: -100px;
    margin-left: 8px;
    line-height: 8px;
    box-sizing: border-box;
  
    }

.parent-web .body_box .body_right_box .body_box_bottom .body_box_bottom_right_box button {
    width: 327px;
    height: 54px;
    background: #F6453D;
    border-radius: 12px;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    position:absolute;
    top: 74%;
    left: 288px;
}

.parent-web .body_right_content_box .upload_video_box_body_model .body_text select,
.parent-web .body_right_content_box .upload_video_box_body_model .body_right_text select {
    width: 256px; /* 宽度 */
    height: 43px; /* 高度 */
    background: #EDF1F7 ; /* 背景色 */
    border-radius: 12px; /* 边框圆角 */
    border: 1px solid #EDF1F7; /* 边框 */
    margin-top: 10px; /* 上边距 */
    padding: 5px; /* 内边距 */
    font-size: 14px; /* 字体大小 */
    color: #192038 ; /* 字体颜色 */
    line-height: 20px; /* 行高 */
    text-align: left; /* 文本居中 */
    cursor: pointer; /* 鼠标指针样式 */
    -webkit-appearance: none; /* 移除 Webkit 浏览器默认样式 */
    -moz-appearance: none; /* 移除 Firefox 浏览器默认样式 */
    appearance: none; /* 移除其他浏览器默认样式 */
    background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); /* 自定义下拉箭头 */
    background-repeat: no-repeat;
    background-position: right 10px center; /* 下拉箭头位置 */
    background-size: 12px; /* 下拉箭头大小 */
}
img,button,:hover{
    cursor:pointer
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box :hover{
    cursor: pointer;
}


/* 屏幕宽度在小于768px之间的样式 */
@media (max-width: 768px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 70%;
  } 
  .parent-web .body_right_content_box .upload_video_box_body_model{
    right: 30%;
  }
  .parent-web .body_right_content_box .upload_video_box_body_head{
    padding-left: 102px;
    padding-top: 20%;
  }
  .parent-web .body_right_content_box .upload_video_box_body_model .body_text .left-centerBox{
    white-space: nowrap;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box {
          zoom: 75%;
        }
}
/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
    zoom: 90%;
  }
  .parent-web .body_right_content_box .upload_video_box_body_model{
    right: 21%;
  }
  .parent-web .body_right_content_box .upload_video_box_body_head{
    padding-left: 102px;
    padding-top: 10%;
  }
  .parent-web .body_right_content_box .upload_video_box_body_model .body_text .left-centerBox{
    white-space: nowrap;
  }
  .parent-web .body_box .body_right_box .body_right_head_box{
    zoom: 100%;
  }
  .parent-web .body_box .body_left_box{
    width: 7%;
  }
}
/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
  } 
  .parent-web .body_right_content_box .upload_video_box_body_model .body_text .left-centerBox{
    white-space: nowrap;
  }
  .parent-web .body_right_content_box .upload_video_box_body_model{
    right: 8%;
  }
  .parent-web .body_right_content_box .upload_video_box_body_head{
    padding-left: 202px;
  }
}
/* 屏幕宽度在1200px到1300px之间的样式 */
@media (max-width: 1300px) and (min-width: 1200px) {
    .parent-web .body_box .body_right_box .body_right_head_box {
             zoom: 70%;
        }
    }
    /* 屏幕宽度大于1300px的样式 */
    @media  (min-width: 1300px) {
        .parent-web .body_box .body_right_box .body_right_head_box{
            zoom: 80%;
        }
    }
</style>