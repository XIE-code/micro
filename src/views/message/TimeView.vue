<template>
    <div class="parent-web">
        <div class="head_box">
            <div class="head_left_box">
                <span class="left_image"><img src="@/assets/img/label.png" alt=""></span>
                <span class="left_text">Micro School</span>
            </div>
            <div class="head_right_box">
                <div class="query_box">
                    <div class="query_image">
                        <img src="@/assets/img/search.png" alt="">
                    </div>
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
                    <div class="body_right_head_text_box">我的</div>
                    <div class="body_right_head_text_box" >
                        <router-link to="/web/school/web/time" class="myself" @click="myOnOrOffVideo(1)" >已发布视频</router-link>
                    </div>
                    <div class="body_right_head_text_box" @click="myOnOrOffVideo(0)" >已下架视频</div>
                    <div class="body_right_head_text_box">
                        <router-link to="/web/school/only" class="myself">个人信息</router-link>
                    </div>
                </div>
                <div class="body_right_content_box">
                    <div class="_header_two">
                        <div class="picture"> <img :src="userHeadshot" alt=""></div>
                        <div class="text">
                            <div class="text_one">你好, {{ username }}</div>
                            <div class="text_two">{{ userTypeId==1?"学生":userTypeId==2?"老师":userTypeId==3?"机构":"未知用户" }}</div>
                        </div>
                    <div class="publish">
                            <div class="publish_photo"></div>
                            <!-- <div class="publish_text">添加自定义课程</div> -->
                            <router-link to="/web/school/web/add" class="publish_text">添加自定义课程</router-link>
                    </div> 
                    <div class="publish_two">
                            <div class="publish_photo_two"></div>
                            <router-link to="/web/school/web/change" class="publish_text_two">申请成为教师/培训机构</router-link>
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
                    <div class="container" v-for="(obj,index) in teachPlanList" :key="index">
                          <div class="left-box">{{ obj.startAndEndTeachTime }}</div>
                          <div class="right-box">{{ obj.subjects+'课' }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { UtilHelper } from '@/assets/js/util_helper';
import { CONNECT, CookieUtil } from '@/assets/js/contants';
import axios from 'axios';
import { WebSocketUtil } from '@/assets/js/websocket';
export default({
    created(){
        const userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=userInfo.headshot
        this.username=userInfo.userName
        this.token=userInfo.token
        this.account=userInfo.account
        this.getTeachPlanInfo()
        WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
        this.userTypeId=userInfo.userTypeId
    },
    
    // mounted(){  
    // },
     //解决vue渲染不到位的方法
//      mounted:function() {
//                   if (location.href.indexOf("#reloaded") == -1) {
//                     location.href = location.href + "#reloaded";
//               location.reload();
//  }
//  },
 
    data(){
        return {
            token:"",
            userHeadshot:"",
            username:"",
            account:"",
            inputValue:"",
            teachPlanList:[],
            teachPlanListSize:0
        };
        
    },
    methods:{
        async getTeachPlanInfo(){
            const that=this
            
            await axios.get(`${CONNECT.generalhostpost()}/personal/view`,{ params:{
                    account:that.account
                },headers:{
                    "token":that.token
            }}).then(response=>{
                console.log(response.data);
                
                that.teachPlanList=response.data.data.list
                that.teachPlanListSize=that.teachPlanList.length
            }).catch(error=>{
                console.log(error);
                
            })
            
        }, 
            
        switchs(){
             UtilHelper.myPages(this)
            },
        // 新增方法，用于跳转到用户界面
        goUser() {
               this.$router.push('/web/school/webview');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
              // 新增方法，用于跳转到发布视频页面
//    goPublish() {
//        this.$router.push('/web/school/web/upload/');
//      },
        myTeachPlanList(){
            const leftInfo=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .container .left-box")
            const rightInfo=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .container .right-box")
            
            
            for (let i = 0; i < this.teachPlanListSize&&i<10; i++) {
                leftInfo[i].innerHTML=this.teachPlanList[i].startAndEndTeachTime
                let strArray=this.teachPlanList[i].labelName.split('-')
                rightInfo[i].innerHTML=strArray[strArray.length-1]+"课"

            }
        },
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
            },
    }
})

</script>
<style scoped>
@import '@/assets/css/web_default.css';
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(2){
    color: #8F9BB3;
    
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(1){
    color: #000000;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box .myself{
    color: #8F9BB3;
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
    width: 95%;
    height: 20%;
    background-color:#F6453D;
    position: absolute;
    left: 2%;
    top: 2%;
    
}

.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
    width: 90%;
    height: auto;
    background-color: #ffffff;
    position: absolute;
    top: 20%; /* 放在红色盒子下面 */
    left: 0; /* 与红色盒子相同的左边距 */
    margin: 2.5%;
    margin-left: 5%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* 控制对齐方式，从起始位置开始 */

}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .time_txt{
    width: 401px;
height: 50px;
border-radius: 12px 12px 12px 12px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .time_txt .inside_text{
    position: absolute;
    width: 20%;
    height: 100%;
    text-align: right;
    background: pink;

}





.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .time_txt input{
    width: 370px;
height: 35px;
background: #F3F5F7;
border: 0;
border-radius: 12px 12px 12px 12px;
margin: 12px;
}


.body_right_content_box ._header_two .picture{
    width: 90px;
    height: 90px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    background-color: pink;
    margin-top: 2%;
    top:-10%;
    margin-left: 35px;
    border-radius: 45px;
    background-repeat: no-repeat;
    background-size: cover
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
    width: 200px;
    height: 55px;
    background: pink;
    margin-top: -55px;
    margin-left: 500px;
    background: #FFFFFF;
    box-shadow: 0px 4px 24px 0px rgba(31, 47, 70, 0.02);
    border-radius: 16px 16px 16px 16px;
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
.become {
  text-decoration: none; /* 取消下划线 */
  color:#FFFFFF/* 设置颜色为红色 */
}
.body_right_content_box ._header_two .publish_photo{
    width: 40px;
    height: 40px;
    text-align: left;
    margin-top:7px ;
    position:absolute;
    margin-left: 5px;
    background-image: url(@/assets/img/doload.png);
    background-repeat: no-repeat;
    background-size: cover;
}


.body_right_content_box ._header_two .publish_photo_two{

    width: 40px;
    height: 40px;
    text-align: left;
    margin-top:7px ;
    position:absolute;
    margin-left: 5px;
    background-image: url(@/assets/img/book.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.body_right_content_box ._header_two .publish .publish_text{
    width: 100px;
    height: 30px;
    position:absolute;
    text-align: left;
    margin-top: 19px;
    margin-left: -2%;
    white-space:nowrap;
    font-size: 14px;
    color: #F6453D;
    border: none;
    text-decoration: none;
    line-height: 20px; 
}
.body_right_content_box ._header_two .publish .publish_text_two{
    width: 100px;
    height: 30px;
    position:absolute;
    text-align: left;
    margin-top: 19px;
    margin-left: -3%;
    white-space:nowrap;
    font-size: 14px;
    color: #F6453D;
    border: none;
    text-decoration: none;
    line-height: 20px; 
}
.parent-web .body_right_content_box .publish_text_two {
    width: 100px;
    height: 30px;
    position:absolute;
    text-align: left;
    margin-top: 19px;
    margin-left: -49px;
    white-space:nowrap;
    font-size: 14px;
    color: #F6453D;
    line-height: 20px; 
    text-decoration: none;
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
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .container {
    display: flex;
    align-items: center;
    height: 70px;
    border: 1px solid #ccc;
    background: #F3F5F7;
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    width: calc(50% - 20px); /* 宽度设置为父元素的一半减去margin */
    box-sizing: border-box; /* 包括padding和border在内的宽度计算 */
  }
  .left-box, .right-box {
    width: 45%;
    padding: 5px;
    box-sizing: border-box;
}

.left-box {
    border-right: 1px solid #ccc;
}

.right-box {
    text-align: right;
}
button,img,:hover{
    cursor: pointer;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box :hover{
    cursor: pointer;
}
@media (max-width: 1300px) and (min-width: 1200px) {
    .parent-web {
        zoom: 90%;
    }
    }   
    @media  (min-width: 1400px) {
        .parent-web .head_box .head_right_box .query_box input{
        zoom: 90%;
    }
    }   
    
/* 屏幕宽度在小于768px之间的样式 */
@media (max-width: 768px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 60%;
  } 
  .parent-web .body_box .body_right_content_box ._header_two{
    height: 15%;
    zoom: 70%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
    zoom: 80%;
  }
}
/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_left_box{
    width: 7%;
  }
  .parent-web .body_box .body_right_content_box ._header_two{
    zoom: 80%;
    height:18% ;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .container{
    height: 48px;
  }
}

/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_right_content_box ._header_two{
    height:22% ;
  }
  
}
/* 屏幕宽度在1200px到1300px之间的样式 */
@media  (min-width: 1200px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_left_box {
    zoom: 110%;
  }
  .parent-web .body_box .body_right_box .body_right_head_box{
    zoom: 80%;
  }
  .parent-web .body_box .body_right_content_box ._header_two{
    height:22% ;
  }
  .parent-web .head_box{
    zoom: 95%;
  }
}

</style>