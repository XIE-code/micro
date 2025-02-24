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
                        <img src="@/assets/img/user.png" alt="" @click="switchs">
                        <div class="choose_text" @click="switchs">用户</div>
                    </div>
                </div>
            </div>
            <div class="body_right_box">
                <div class="body_right_head_box">
                  <div class="body_right_head_box_text">全部视频</div>
                </div>
                <div class="body_right_content_box">
                    <div class="body_right_video_box" v-for="(object,index) in videoInfo" :key="index">
                      <div class="video_image_box" >
                              <img :src="object.videoImageIndex" alt="" @click="openVideo(index)">
                          </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">{{ object.title }}</div>
                        <div class="body_right_video_bottom_box">
                          <!-- 待日后实现其功能在使用一下代码 -->
                            <!-- <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="" >
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div> -->
                            <div class="body_right_video_bottom_item_box"></div>
                            <div class="body_right_video_bottom_item_box"></div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">{{object.thumbsUpCount}}</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="openVideo(index)"></div>
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
  
  import {CONNECT, CookieUtil} from '@/assets/js/contants.js'
  import { UtilHelper } from '@/assets/js/util_helper.js'
  import { WebSocketUtil } from '@/assets/js/websocket';
import axios from 'axios';
  export default({
    created(){
        //该方法是在获取头像连接，并显示在对应页面上
        this.userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=this.userInfo.headshot
        this.username=this.userInfo.userName
        this.token=this.userInfo.token
        this.video_default_set()
        WebSocketUtil.createWebSocket(this.userInfo.account,this.userInfo.token,this)
    },
  
  
     //解决vue渲染不到位的方法
    //   mounted:function() {
    //       if (location.href.indexOf("#reloaded") == -1) {
    //           location.href = location.href + "#reloaded";
    //           location.reload();
    //       }
    //   },
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
      async video_default_set(){
          let obj=UtilHelper.getObjectFromCookie(CookieUtil.queryObject)
          if (obj.account===undefined) {
            await this.queryVideo(obj.enterValue,this.pageNumber,this.pageSize).then(response=>{
              this.pagesCount= response.pages<1?1:response.pages
              this.videoInfo=response.list;
            })
          }else{
            this.videoOwnerSet(obj.account,obj.enterValue,this.pageNumber,this.pageSize)
            
          }
          
          

      },
      async videoOwnerSet(account,inputValue,pageNumber,pageSize){
        const that=this
        await axios.get(`${CONNECT.generalhostpost()}/video/owner/query`,{params:{
            account:account,
            data:inputValue,
            pageNumber:pageNumber,
            pageSize:pageSize
        },headers:{
            token:that.token
        }}).then(response=>{
            if (response.data.code===1) {
                that.pagesCount= response.data.data.pages<1?1:response.data.data.pages
                that.videoInfo=response.data.data.list;
            }
        })
      },
      openVideo(index){
          UtilHelper.setObjectInCookie(CookieUtil.videoObject,this.videoInfo[index],CookieUtil.userDefaultTime)
          this.$router.push('/web/school/web/video')
      },
      async inputEnterFunction(){ 
          this.queryVideo(this.inputValue,this.pageNumber,this.pageSize).then(response=>{
              console.log(response);
              const obj={
                  enterValue:this.inputValue,
                  dateTime:UtilHelper.getNowDateTime()
              }
              UtilHelper.setObjectInCookie(CookieUtil.queryObject,obj,CookieUtil.queryDefaultTime)
              this.pagesCount= response.pages
              this.videoInfo=response.list;
          })
      },
        async queryVideo(inputValue,pageNumber,pageSize){
            return UtilHelper.queryVideo(inputValue,pageNumber,pageSize,this.token);
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
              let inputPage=Number(document.querySelector(".body_box .body_right_box .body_right_content_bottom_box .input_page_box input").value);
              inputPage=inputPage<1?1:inputPage
              inputPage=inputPage>this.pagesCount?this.pagesCount:inputPage
              this.pageNumber=inputPage
              this.video_default_set()
  
          },  
          // 新增方法，用于跳转到用户界面
          goUser() {
              this.$router.push('/web/school/web/application');
          },
          // 新增方法，用于跳转到首页
          goHome() {
              this.$router.push('/web/school/web/main');
          },
          upVideo(){
              if(this.state===1){
                  return
              }
              this.state=1
          },
          downVideo(){
              if(this.state===0){
                  return
              }
              this.state=0
          },
          refreshPage(){
               window.location.reload();
          },
          switchs(){
              UtilHelper.myPages(this)
          },
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
        line-height: 20px;
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
        margin-left: 18px;
        margin-right: 18px;
        bottom: 20px;
        position: absolute;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box{
        width: 33%;
        height: 100%;
        position: relative;
        margin-left: 18px;
        margin-right: 18px;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box img{
        margin-left: -24%;
        line-height: 44px;
        margin-top: -1%;
        width: 17%;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box .body_right_video_bottom_item_text{
        font: 400;
        font-size: 13px;
        line-height: 20px;;
        position: absolute;
        top: 0;
        right: 1px;
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
    @media (max-width: 1442px) and (min-width: 888px) {
        .parent-web .body_box .body_right_box {
             zoom: 75%;
        }
    }
  
  </style>