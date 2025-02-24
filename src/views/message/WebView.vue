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
                    <div class="user_text">{{ this.username }}</div>
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
                     <div class="myself" @click="navigateBasedOnUserType()">我的</div>
                    </div>

                    <div class="body_right_head_text_box" @click="upVideo()">已发布视频</div>
                    <div class="body_right_head_text_box" @click="downVideo()">已下架视频</div>
                    <div class="body_right_head_text_box" @click="pendingVideo()">待审核视频</div>
                    <div class="body_right_head_text_box">
                        <router-link to="/web/school/only" @click="refreshPase" class="myself">个人信息</router-link>
                    </div>
                </div>
                <div class="body_right_content_box" v-if="videoSize >= 1" >
                    <div class="body_right_video_box" v-for="(video, index) in videoInfo" :key="index">
                     <div class="video_image_box">
                         <img :src="video.videoImageIndex" alt="" @click="jump(index)">
                     </div>
                     <div class="is_pay">免费</div>
                     <div class="title_text">{{ video.title }}</div>
                     <div class="title_reason" v-if="state === 0">{{ video.rejectReason ? `（下架原因：${video.rejectReason}）` : '' }}</div>
                        <div class="body_right_video_bottom_box">

                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(0)"></div>
                    </div>

                    
                </div>
                <div class="body_right_content_bottom_box">
                    <button class="button_style" @click="upPage()">上一页</button>
                    <div class="button_text">第 {{ pageNumber }} 页</div>
                    <button class="button_style" @click="downPage()">下一页</button>
                    <div class="button_text">共 {{pagesCount}} 页, 跳至</div>
                    <div class="input_page_box"><input type="text" @keyup.enter="inputPage()"></div>
                    <div class="button_text">页</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {CONNECT,CookieUtil} from '@/assets/js/contants.js'
import { UtilHelper } from '@/assets/js/util_helper.js'
import axios from 'axios'
import { WebSocketUtil } from '@/assets/js/websocket';
export default({
    created(){
        //该方法是在获取头像连接，并显示在对应页面上
        this.userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=this.userInfo.headshot
        this.username=this.userInfo.userName
        this.token=this.userInfo.token
       
        try{
            this.state=UtilHelper.getCookie(CookieUtil.myVideoPageState)
            const stateFromCookie = UtilHelper.getCookie(CookieUtil.myVideoPageState);
        if (stateFromCookie) {
            this.state = parseInt(stateFromCookie);
        }
        }catch(error){
            console.log(error);
            this.state=1
 }
        // 以下代码时获取已经上线的视频
        this.video_default_set()
        WebSocketUtil.createWebSocket(this.userInfo.account,this.userInfo.token,this)
    },


     //解决vue渲染不到位的方法
     mounted:function() {
//                   if (location.href.indexOf("#reloaded") == -1) {
//                     location.href = location.href + "#reloaded";
//               location.reload();
//  }
 //刷新页面，达到清空缓存的效果。浏览器的返回按键          
 if (window.name !== "noReload") {
                 window.name = window.name + "noReload";
                 location.reload();
               } else {
                 window.name = "";
               }
                this.changeColor()
 },
 
    data(){
        return {
            username:'',
            userHeadshot:'',
            pageNumber:1,                       //这里通常表示第几页
            pageSize:9,                         //这里面表示一张页面里面会有多少条视频
            state:1,
            pagesCount:1,
            videoSize:0,
            videoInfo:[],
            userInfo:{},
            inputValue:"",
            token:"",
        };
    },
    methods:{
        async ownVideoNumber(){
            const that=this
            await axios.get(`${CONNECT.generalhostpost()}/query/own/video`,{
                params:{
                    account:that.userInfo.account,
                    pageNumber:that.pageNumber,                 
                    pageSize:that.pageSize,
                    state:that.state
                },
                headers:{
                    "token": that.userInfo.token
                }
            }).then(response=>{
                that.pagesCount= response.data.data.pages<1?1:response.data.data.pages
                that.videoSize=response.data.data.size
                that.videoInfo=response.data.data.list
            })
        },

        async video_default_set(){
            await this.ownVideoNumber()
            let array = document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .video_image_box img");
            let title_array = document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .title_text");
            let likes_array = document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box .body_right_video_bottom_item_text .likes");
             let reason_array = document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .title_reason");
            try{
                for (let i = 0; i < this.videoSize; i++) {
                    array[i].src=this.videoInfo[i].videoImageIndex;
                    title_array[i].innerHTML=this.videoInfo[i].title;
                    likes_array[i].innerHTML=this.videoInfo[i].thumbsUpCount;
                    reason_array[i].innerHTML = this.videoInfo[i].rejectReason ? `（下架原因：${this.videoInfo[i].rejectReason}）` : '';
                }
            }catch(error){
                console.log(error.message);
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
        async queryVideo(pageNumber,pageSize){
            return UtilHelper.queryVideo(this.inputValue,pageNumber,pageSize,this.token);
        },
        upPage(){
            this.pageNumber=this.pageNumber>1?this.pageNumber-1:1
            this.video_default_set()
        },
        downPage(){
            this.pageNumber=this.pageNumber<this.pagesCount?this.pageNumber+1:this.pagesCount
            this.video_default_set()
        },
        inputPage(){
            let inputPage=document.querySelector(".body_box .body_right_box .body_right_content_bottom_box .input_page_box input").value;
            inputPage=inputPage<1?1:inputPage
            inputPage=inputPage>this.pagesCount?this.pagesCount:inputPage
            this.pageNumber=inputPage
            this.video_default_set()
            
        },
        switchs(){
             UtilHelper.myPages(this)
            },
            //选择自己上架或者下架的视频
            myOnOrOffVideo(pageState){
                UtilHelper.chooseMyOnOrOffVideo(this,pageState)
             },
             navigateBasedOnUserType() {
        UtilHelper.myPages(this);
    },

        jump(i){
            //通过保存cookie，跳转网页后，通过cookie获取视频数据
            console.log(this.videoInfo[i]);
            UtilHelper.setObjectInCookie(CookieUtil.videoObject,this.videoInfo[i],CookieUtil.userDefaultTime)
            this.$router.push('/web/school/web/video')
        },
        changeColor(){
         let array=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box")
         if(this.state==1){
                 array[1].style.color="black"
                 array[2].style.color="#8F9BB3"
                 array[3].style.color="#8F9BB3"
         }else if(this.state==0){
                array[1].style.color="#8F9BB3"
                array[2].style.color="black"
                 array[3].style.color="#8F9BB3"
         }if(this.state==2){
                array[1].style.color="#8F9BB3"
                array[2].style.color="#8F9BB3"
                array[3].style.color="black"
        }
         
        },
        // 新增方法，用于跳转到用户界面
             goUser() {
               this.$router.push('/web/school/web/application');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
             goStudentOrTeacher() {
        if (this.userTypeId === 1) { // 假设 userTypeId === 1 代表学生
            this.$router.push('/web/school/web/time');
        } else if (this.userTypeId === 2) { // 假设 userTypeId === 2 代表老师
            this.$router.push('/web/school/web/application');
        }
    },
    //发布视频
        upVideo(){
            if(this.state===1){
                return
            }
            this.pageNumber=1
            this.state=1
            this.changeColor()
            this.video_default_set()
        },
        // 下架视频
        downVideo(){
            if(this.state===0){
                return
            }
            this.state=0
            this.pageNumber=1
            this.changeColor()
            this.video_default_set()
        },
        // 新增方法，用于待审核视频
        pendingVideo(){
            if(this.state===2){
                return
            }
            this.state=2
            this.pageNumber=1
            this.changeColor()
            this.video_default_set()
        },
        refreshPage(){
             window.location.reload();
        }
    }
})

</script>

<style scoped>
.parent-web {
    width: 100vw; /* 占满整个视口宽度 */
  height: 100vh; /* 占满整个视口高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}
    @import '@/assets/css/web_default.css';
    .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(2){
        color: #000000;
    }
    .parent-web .body_box .body_right_box .body_right_content_box{
        display: flex;         /* 设置为 flex 容器 */
        flex-direction: row;   /* 默认为横向排列 */
        flex-wrap: wrap;        /* 允许子项换行 */
        justify-content: left;
        padding: 20px; 
        padding-bottom:0;

    }
    .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box .myself{
        width: 32px;
        height: 20px;
        font-family: Noto Sans SC, Noto Sans SC;
        font-weight: 400;
        font-size: 16px;
        color: #8F9BB3;
        text-align: center;
        font-style: normal;
        text-transform: none;
        text-decoration: none;

    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box {
        margin-left: 60px;
        width: 27%;
        height: 34%;
        background-color: #ffffff;
        border-radius:25px;
        position: relative;
        box-sizing: border-box;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .video_image_box{
        width: 100%;
        height: 100px;
        border-radius:25px;
        background-color: red;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .video_image_box img{
        width: 100%;
        height: 100%;
        border-radius:25px;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .video_start_box{
        width: 48px;
        height: 48px;
        background-image: url("@/assets/img/btnStart.png");
        background-repeat: no-repeat;
        background-size: cover;
        top: 80px;
        right: 20px;
        position: absolute;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .is_pay{
        margin-top: 8px;
        color: #f75c55;
        margin-left: 18px;
        margin-right: 18px;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .title_text{
        
        font-family: Poppins, Poppins;
        font-weight: 500;
        font-size: 16px;
        color: #000000;
        line-height: 26px;
        font-style: normal;
        text-transform: none;
        margin-left: 18px;
        margin-right: 18px;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box{
        display: flex;         /* 设置为 flex 容器 */
        flex-direction: row;   /* 默认为横向排列 */
        flex-wrap: nowrap;        /* 不允许子项换行 */
        justify-content: space-between;
        width: 100%;
        height: 8px;
        margin-right: 18px;
        bottom: 13px;
        position: absolute;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box{
        width: 33%;
        height: 100%;
        position: relative;
        margin-right: 18px;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box img{
        margin-left: -24%;
        line-height: 44px;
        margin-top: -1%;
        width: 17%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box .body_right_video_bottom_item_text{
        font-size: 13px;
        line-height: 20px;;
        position: absolute;
        top: 0;
        right: 13px;
    }
    .parent-web .body_box .body_right_box .body_right_content_bottom_box{
        width: 500px;
        height: 80px;
        margin: 0 auto;
        position: relative;
        display: flex; /* 使用 flexbox 布局 */
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */

    }

    .parent-web .body_box .body_right_box .body_right_content_bottom_box .button_style{
        background-color: #fc5531;
        border-radius: 20px;
        border:none;
    }
    .parent-web .body_box .body_right_box .body_right_content_bottom_box .button_style:active{
        background-color: #f6453d;
    }
    .parent-web .body_box .body_right_box .body_right_content_bottom_box .button_style,.parent-web .body_box .body_right_box .body_right_content_bottom_box .button_text{
        font-size: 16px;
        white-space: nowrap;
        margin-left: 5px;
        margin-right: 5px;
    }
    .parent-web .body_box .body_right_box .body_right_content_bottom_box .input_page_box{
        border-radius: 5px;
        border: 1px #EDF1F7 solid;
    }
    .parent-web .body_box .body_right_box .body_right_content_bottom_box .input_page_box input{
        outline:none;
        border: 0;
        border-radius: 5px;
    }
    .parent-web .body_box .body_right_box .body_right_content_bottom_box .input_page_box,.parent-web .body_box .body_right_box .body_right_content_bottom_box .input_page_box input
    ,.parent-web .body_box .body_right_box .body_right_content_bottom_box .button_style{
        width: 80px;
        height: 40px;
        text-align: center;
    }


    .query_box input[type="text"]:hover {
    border-color: #409eff; /* 悬停时的边框颜色 */
}
.body_right_video_box:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5); /* 悬停时添加阴影 */
    border: 1px solid #409eff; /* 悬停时的边框 */
    cursor: pointer; /* 鼠标指针变为手指形状 */
}
.body_right_video_box:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5); /* 悬停时添加阴影 */
    border: 1px solid #409eff; /* 悬停时的边框 */
    cursor: pointer; /* 鼠标指针变为手指形状 */
}
.input_page_box input:hover {
    border-color: #409eff; /* 悬停时的边框颜色 */
}
button:hover{
    cursor: pointer; /* 鼠标指针变为手指形状 */
}

.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box,:hover{
    cursor: pointer;
}

@media(max-width: 768px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box{
        zoom: 60%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
        height: 27%;
    }
}
/* 屏幕宽度在768px到992px之间的样式 */
 @media (min-width: 768px) and (max-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
        height: 25%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box{
        zoom: 60%;
    }
    .parent-web .body_box .body_left_box{
        width: 7%;
    }
}
/* 屏幕宽度在992px到1085px之间的样式 */
@media (max-width: 1085px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box{
        zoom: 80%;
  }

}
/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 60%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
        height: 35%;
  }
  .parent-web .body_box .body_left_box{
    width: 7%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box{
        zoom: 80%;
  }
}
/* 屏幕宽度在大于1200px的样式 */
@media (max-width:1300px) and (min-width: 1200px) {
    .parent-web .body_box .body_right_box{
        zoom: 70%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
        height: 32%;
    }
    .parent-web .head_box{
        zoom: 85%;
    }
}
    /* 屏幕宽度1280之间的样式 */
    @media (max-width: 1300px) and (min-width: 1200px) and (max-height: 1300px) and (min-height: 800px) {
        .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
            height: 20%;
        }
        .parent-web .body_box .body_right_box .body_right_content_box{
            zoom: 110%;
        }
    }

/* 屏幕宽度的样式 */
@media  (max-width:1600px) and  (min-width: 1300px) {
    .parent-web .body_box .body_right_box{
        zoom: 80%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
        height: 27%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box img{
        margin-top: -2%;
    }
}

/* 屏幕宽度大于1600px的样式 */
@media   (min-width: 1600px) {
    .parent-web .body_box .body_right_box .body_right_content_box{
        zoom: 120%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
        height: 30%;
    }
}
</style>