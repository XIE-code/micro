<template>
    <div class="parent-web">
        <div class="head_box">
            <div class="head_left_box">
                <span class="left_image"><img src="@/assets/img/label.png" alt=""></span>
                <span class="left_text">Micro School</span>
            </div>
            <div class="head_right_box">
                <div class="query_box">
                    <div class="query_image"><img src="@/assets/img/search.png" alt=""></div>
                    <input type="text" v-model="inputValue" @keyup.enter="inputEnterFunction()" placeholder="搜索">
                </div>
                <div class="user_box">
                    <span class="head_image"><img :src="userHeadshot" alt=""></span>
                    <div class="user_text">{{username}}</div>
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
                        <router-link to="/web/school/web/application" key="$route.fullPath" class="myself_first">我的</router-link>
                    </div>
                    <div class="body_right_head_text_box"><router-link to="/web/school/webview" class="myself" @click="myOnOrOffVideo(1)" v-if="this.userTypeId!=1">已发布视频</router-link></div>
                    
                    <!-- <div class="body_right_head_text_box">已下架视频</div> -->
                    <div class="body_right_head_text_box" @click="myOnOrOffVideo(0)" v-if="this.userTypeId!=1">已下架视频</div>
                    <!-- 待审核视频 -->
                    <div class="body_right_head_text_box" @click="myOnOrOffVideo(2)" v-if="this.userTypeId!=1">待审核视频</div>
                    <div class="body_right_head_text_box">
                        <router-link to="/web/school/only" @click="refreshPase" class="myself">个人信息</router-link>
                    </div>
                </div>
                <div class="body_right_content_box">
                    <div class="_header_two">
                        <div class="picture">
                            <img :src="userHeadshot">
                        </div>
                        <div class="text">
                            <div class="text_one">你好, {{ username }}</div>
                            <div class="text_two">{{ userTypeId==1?"学生":userTypeId==2?"老师":userTypeId==3?"机构":"未知用户" }}</div>
                        </div>
                    <div class="publish">
                            <div class="publish_photo"  @click="myOnOrOffVideo(1)"></div>
                            <div class="publish_text">
                                <router-link to="/web/school/webview" class="myself" @click="myOnOrOffVideo(1)" >已发布视频</router-link>
                                {{ onVideoListCount }}</div>
                    </div> 
                        <div class="publish_two">
                            <div class="publish_photo_two" @click="myOnOrOffVideo(0)"></div>
                            <div class="publish_text_two" @click="myOnOrOffVideo(0)" >已下架视频 {{ offVideoListCount }}</div>
                        </div>
                        <!--图标发布视频-->
                      <div class="text_finally">
                        <div class="ground">
                            <div class="ground_img">
                                <img src="@/assets/img/Group 37.png" alt=""  @click=" goPublish">
                            </div>
                            <span><router-link to="/web/school/web/upload" class="become">发布视频</router-link></span>
                        </div>
                      </div>
                        
                    </div>
                <div class="upload_video_box">
                   <div class="center_img">
                    <img src="@/assets/img/book.png" alt="">
                      <!-- <router-link to="/web/school/web/change" class="become">申请成为教师/培训机构</router-link> -->
                      <div class="become" @click="doNot">申请成为教师/培训机构</div>
                   </div> 
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { UtilHelper } from '@/assets/js/util_helper';
import { CONNECT,CookieUtil } from '@/assets/js/contants';
import axios from 'axios';
import { WebSocketUtil } from '@/assets/js/websocket';
// import { apply } from 'core-js/fn/reflect';
export default({
    created(){
        const userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=userInfo.headshot
        this.username=userInfo.userName
        this.token=userInfo.token
        this.userTypeId=userInfo.userTypeId
        this.account=userInfo.account
        this.getPersonInfo()
        WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
        
    },
    
    // mounted(){
    // },
     //解决vue渲染不到位的方法
     mounted:function() {
//                   if (location.href.indexOf("#reloaded") == -1) {
//                     location.href = location.href + "#reloaded";
//               location.reload();
//  }
 //刷新页面，达到清空缓存的效果。浏览器的返回按键
 if (window.name !== "noReload") {
      window.name =  window.name+"noReload";
      location.reload();
    } else {
      window.name = "";
    }
 },
    data(){
        return {
            token:"",
            userHeadshot:"",
            username:"",
            account:"",
            inputValue:"",
            onVideoListCount:0,
            offVideoListCount:0,
            userTypeId:null
        };
        
    },
    methods:{
        async inputEnterFunction(){ 
            let obj={
        enterValue:this.inputValue,
        dateTime:UtilHelper.getNowDateTime()
    }
    UtilHelper.setObjectInCookie(CookieUtil.queryObject,obj,CookieUtil.queryDefaultTime)
    //等待新的搜索界面
    this.$router.push("/web/school/web/search")
        },
        myOnOrOffVideo(pageState){
                UtilHelper.chooseMyOnOrOffVideo(this,pageState)
                this.state = pageState; // 更新 state 值
            },
          // 新增方法，用于跳转到用户界面
  goUser() {
    this.$router.push('/web/school/web/application');
  },
  // 新增方法，用于跳转到首页
  goHome() {
    this.$router.push('/web/school/web/main');
  },
  doNot(){
    alert('你已经是教师/机构')
    return;
  },
   // 新增方法，用于跳转到发布视频页面
   goPublish() {
       this.$router.push('/web/school/web/upload/');
     },
          
        async getPersonInfo(){
            const that=this
            axios.get(`${CONNECT.generalhostpost()}/personal/view`,{ params:{
                account:that.account
            },headers:{
                'token' : that.token
            }}).then(response=>{
                if (response.data.code===1) {
                    that.onVideoListCount=response.data.data.onVideoListCount
                    that.offVideoListCount=response.data.data.offVideoListCount
                    that.userTypeId=response.data.data.user_type_id
                }else if(response.data.code===0){
                    alert(response.data.msg)
                }
            });
        }
    }
})

</script >
<style scoped>
@import '@/assets/css/web_default.css';
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(2){
    color: #8F9BB3;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(1){
    color: #000000;
}

.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box .myself{
    text-decoration: none;
    color: #8F9BB3;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box .myself_first{
    text-decoration: none;
    color: #000000;
}
.body_right_content_box ._header_two .publish .publish_text .myself{
    color: #F6453D;
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

.parent-web .body_box .body_right_content_box ._header_two{
    width: 90%;
    height: 20%;
    background-color:#F6453D;
    position: absolute;
    left: 5%;
    top: 12px
}

.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
    width: 90%;
    height: 50%;
    background-color: #ffffff;
    position: absolute;
    top: 20%; /* 放在红色盒子下面 */
    left: 0; /* 与红色盒子相同的左边距 */
    margin: 2.5%;
    margin-left: 5%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 25px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .center_img{
    width: 150px;
    height: 150px;
    position: relative;
    margin: 50px auto;
    text-align: center;
    white-space: nowrap;
    
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .center_img img{
    width: 55%;
    height: 55%;
    margin-top:29px;
    margin-left:1px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .center_img .become {
  
font-family: Noto Sans SC, Noto Sans SC;
font-weight: 400;
font-size: 15px;
color: #222B45;
line-height: 20px;
text-align: center;
font-style: normal;
text-transform: none;
position:relative;
top:20px;
left:0px;
}
.body_right_content_box ._header_two .picture{
    width: 90px;
    height: 90px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    background-color: pink;
    margin-top: 0%;
    margin-left: 35px;
    background-repeat: no-repeat;
    background-size: cover;
    top: 10%;
    border-radius: 45px;
}
.body_right_content_box ._header_two .picture img{
    width: 90px;
    height: 90px;
    border-radius: 45px;
}
.body_right_content_box ._header_two .picture_two{
    width: 90px;
    height: 90px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    background-color: pink;
    margin-top: 20px;
    margin-left: 35px;
    background-image: url(@/assets/img/photo.png);
    background-repeat: no-repeat;
    background-size: cover
}
.body_right_content_box ._header_two .text{
    width: 127px;
    height: 51px;
    position: relative;
    margin-top: -74px;
    text-align: left;
    margin-left: 130px;
    font-weight: 400;
font-size: 15px;
color: #FFFFFF;
line-height: 25px;
}
.body_right_content_box ._header_two .publish{
    width: 170px;
    height: 55px;
    background: pink;
    margin-top: -46px;
    margin-left: 254px;
    background: #FFFFFF;
    box-shadow: 0px 4px 24px 0px rgba(31, 47, 70, 0.02);
    border-radius: 16px 16px 16px 16px;
}
.body_right_content_box ._header_two .publish_two{
    width: 170px;
    height: 55px;
    background: pink;
    margin-top: -55px;
    margin-left: 500px;
    background: #FFFFFF;
    box-shadow: 0px 4px 24px 0px rgba(31, 47, 70, 0.02);
    border-radius: 16px 16px 16px 16px;
}

 .body_right_content_box ._header_two .publish_photo{
    width: 40px;
    height: 40px;
    text-align: left;
    margin-top:7px ;
    position:absolute;
    margin-left: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(@/assets/img/doload.png);
} 
.become {
  text-decoration: none; /* 取消下划线 */
  color:#FFFFFF/* 设置颜色为红色 */
}
.body_right_content_box ._header_two .publish_photo_two{

    width: 40px;
    height: 40px;
    text-align: left;
    margin-top:7px ;
    position:absolute;
    margin-left: 5px;
    background-image: url(@/assets/img/Group82.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.body_right_content_box ._header_two .publish .publish_text{
    width: 100px;
    height: 30px;
    position:absolute;
    text-align: left;
    margin-top: 19px;
    margin-left: 52px;
    white-space:nowrap;
    font-size: 14px;
    color: #F6453D;
    line-height: 20px; 
}
.parent-web .body_right_content_box .publish_text_two {
    width: 100px;
    height: 30px;
    position:absolute;
    text-align: left;
    margin-top: 19px;
    margin-left: 52px;
    white-space:nowrap;
    font-size: 14px;
    color: #F6453D;
    line-height: 20px; 
}

.body_right_content_box ._header_two .text_finally{
    width: 145px;
    height: 50px;
    position: relative;
    margin-top: -52px;
    text-align: left;
    margin-left: 849px;
    font-weight: 400;
    font-size: 15px;
    color: #FFFFFF;
    line-height: 25px;
    
}
.body_right_content_box ._header_two .text_finally .ground{
    width: 130px;
    height: 55px;
    background: #FFFFFF;
    position: absolute;
    background: rgba(255,255,255,0.29);
    border-radius: 12px 12px 12px 12px;
    margin-top: -2px;
    display: flex;
}
.body_right_content_box ._header_two .text_finally .ground .ground_img{
width: 50%;
height: 100%;
position: relative; /* 设置相对定位 */
overflow: hidden; /* 隐藏超出盒子的部分 */
}
.body_right_content_box ._header_two .text_finally .ground.become{
    text-decoration: none;
    color: #F6453D;
}
.body_right_content_box ._header_two .text_finally .ground .ground_img img{
    width: 100%; /* 图片宽度设置为100%，使其填满盒子 */
  height: 100%; /* 图片高度设置为100%，使其填满盒子 */
  object-fit: cover; /* 保持图片的宽高比，覆盖整个盒子 */
}
.body_right_content_box ._header_two .text_finally .ground span{
    position: relative;
    top: 15px;
    right: 10px;
}
.body_right_content_box ._header_two .text_finally .ground_two{
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.29);
border-radius: 12px 12px 12px 12px;
    background: #FFFFFF;
    position: absolute;
    margin-top: 5px;
    margin-left: 50px;
    background-image: url(@/assets/img/cointd.png);
    background-size:cover;
    background-repeat: no-repeat;
}
.body_right_content_box ._header_two .text_finally .ground_three{
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    position: absolute;
    background: rgba(255,255,255,0.29);
border-radius: 12px 12px 12px 12px;
    margin-top: 5px;
    margin-left: 100px;
    background-image: url(@/assets/img/noti.png);
    background-size:cover;
    background-repeat: no-repeat;
}
input,button,img:hover{
    cursor:pointer
}

@media   (min-width: 1200px) {
    .parent-web .body_box .body_left_box{
             zoom: 110%;
        }
        .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box{
          font-size: 18px;
        }

    .parent-web .body_box .body_right_box .body_right_head_box {
             zoom: 75%;
        }
        .parent-web .head_box .head_left_box{
             zoom: 100%;
        }
    }
    
    @media (max-width: 1400px) {
        .parent-web {
             zoom: 90%;
  }
}
/* 针对大屏幕的样式 */
@media (min-width: 1600px) {
    .parent-web {
        zoom: 95%;
    }
}

/* 针对小屏幕的样式 */
@media (min-width: 1200px) and (max-width: 1399px) {
    .parent-web {
        zoom: 85%;
    }
}

/* 针对更小屏幕的样式 */
@media (max-width: 1199px) {
    .parent-web {
        zoom: 80%;
    }
}

/* 针对超小屏幕的样式 */
@media (max-width: 992px) {
    .parent-web {
        zoom: 75%;
    }
    .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box {
        font-size: 16px;
    }
}

/* 针对手机屏幕的样式 */
@media (max-width: 768px) {
    .parent-web {
        zoom: 100%;
    }
    .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box {
        font-size: 14px;
    }
    .parent-web .body_box .body_right_box .body_right_content_box {
        padding: 0 10px; /* 为手机屏幕添加内边距 */
    }
}

/* 针对超宽屏幕的样式 */
@media (min-width: 1920px) {
    .parent-web {
        zoom: 100%;
    }
}
/* 屏幕宽度在小于768px之间的样式 */
@media (max-width: 768px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 80%;
  } 
}
/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
  } 
    .parent-web {
        zoom: 80%;
    }
    .parent-web .body_box .body_right_content_box ._header_two{
        height: 15%;
        zoom: 70%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
        height: 50%;
    }
}

/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
  } 
  .parent-web .body_box .body_right_content_box ._header_two{
        height: 15%;
        zoom: 90%;
    }

}
/* 屏幕宽度在1200px到1300px之间的样式 */
@media  (min-width: 1600px) {
    .parent-web .head_box{
        zoom: 130%;
    }
    .parent-web .body_box .body_right_content_box ._header_two{
        zoom: 120%;
        height: 15%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
        height: 45%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
        height: 35%;
        top: 15%;
    }
}
/* 屏幕宽度1280之间的样式 */
@media (max-width: 1300px) and (min-width: 1200px) and (max-height: 1300px) and (min-height: 800px) {
    .parent-web .body_box .body_right_content_box ._header_two{
        height: 15%;
        zoom: 110%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
        height: 40%;
        top: 15%;
    }

    }

</style>