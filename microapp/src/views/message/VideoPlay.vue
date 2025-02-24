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
                  <span class="head_image"><img :src="userHeadshot"></span>
                  <div class="user_text"> {{ username }}</div>
              </div>
              
        </div>
      </div>
      <div class="body_box">
          <div class="body_left_box">
              <div class="choose_box">
                  <div class="choose_image_box">
                      <img src="@/assets/img/home_full.png" alt=""  @click="goHome">
                      <!-- <div class="choose_text">首页</div> -->
                      <router-link to="/web/school/web/main" class="choose_text">首页</router-link>
                  </div>
                  <div class="choose_image_box">
                      <img src="@/assets/img/user_close.png" alt=""  @click="switchs" >
                      <div class="choose_text"  @click="switchs">用户</div>
                  </div>
              </div>
          </div>

              <div class="body_right_box">
                <div class="body_right_box_header">
                    <div class="header_box" @click="chooseFourLabel('全部')">
                       <div class="header_text_one">全部</div>
                    </div>
                    <div class="header_box" v-for="(fourLabelObj,index) in fourLabelList" :key="index" @click="chooseFourLabel(index)">
                       <div class="header_text">{{ fourLabelObj.thirdLevel }}</div>
                    </div>
                </div>
                 
          
                 <div class="body_right_center">
                      <div class="list_box" v-for="(videoObj,index) in videoList" :key="index">
                          <div class="list_box_video">
                              <img :src="videoObj.videoImageIndex" alt="" @click="openVideo(index)">
                              <div class="list_box_img" @click="openVideo(index)"></div>
                          </div>
                          <div class="list_box_text">{{ videoObj.title }}</div>
                              <div class="area_box">
                                <div class="video_bottom_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">
                                  {{ videoObj.thumbsUpCount }} 点赞</div>
                                <!-- <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 评论
                                </div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 收藏
                                </div> -->
                              </div>  
                      </div>
                      <!-- <div class="list_box">
                          <div class="list_box_video">
                              <div class="list_box_img"></div>
                          </div>
                          <div class="list_box_text">Search Engine Optimization Basic for Beginnerfor Beginnerfor Beginner</div>
                              <div class="area_box">
                                <div class="video_bottom_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">
                                  26 点赞</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 评论</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 收藏</div>
                                </div>  
                      </div> <div class="list_box">
                          <div class="list_box_video">
                              <div class="list_box_img"></div>
                          </div>
                          <div class="list_box_text">Search Engine Optimization Basic for Beginnerfor Beginnerfor Beginner</div>
                              <div class="area_box">
                                <div class="video_bottom_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">
                                  26 点赞</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 评论</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 收藏</div>
                                </div>  
                      </div> <div class="list_box">
                          <div class="list_box_video">
                              <div class="list_box_img"></div>
                          </div>
                          <div class="list_box_text">Search Engine Optimization Basic for Beginnerfor Beginnerfor Beginner</div>
                              <div class="area_box">
                                <div class="video_bottom_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">
                                  26 点赞</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 评论</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 收藏</div>
                                </div>  
                      </div> <div class="list_box">
                          <div class="list_box_video">
                              <div class="list_box_img"></div>
                          </div>
                          <div class="list_box_text">Search Engine Optimization Basic for Beginnerfor Beginnerfor Beginner</div>
                              <div class="area_box">
                                <div class="video_bottom_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">
                                  26 点赞</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 评论</div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 收藏</div>
                                </div>  
                      </div> <div class="list_box">
                          <div class="list_box_video">
                              <div class="list_box_img"></div>
                          </div>
                          <div class="list_box_text">Search Engine Optimization Basic for Beginnerfor Beginnerfor Beginner</div>
                              <div class="area_box">
                                <div class="video_bottom_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">
                                  26 点赞
                                </div>
                                <div class="body_right_video_bottom_item_text">
                                  <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 评论</div>
                                <div class="body_right_video_bottom_item_text">
                                    <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">26 收藏</div>
                                 </div>  
                          </div> -->
                 </div>
                 <div class="body_right_content_bottom_box">
                    <button class="button_style" @click="upPage()">上一页</button>
                    <div class="button_text">第 {{ pageNumber }} 页</div>
                    <button class="button_style" @click="downPage()">下一页</button>
                    <div class="button_text">共 {{ pagesCount }} 页, 跳至</div>
                    <div class="input_page_box"><input type="text" @keyup.enter="inputPage()"></div>
                    <div class="button_text">页</div>
                </div>
              </div>
          </div>
      </div>
</template>

<script>
import { CONNECT, CookieUtil, LabelVideoPageUtil } from '@/assets/js/contants';
import { UtilHelper } from '@/assets/js/util_helper';
import axios from 'axios';
import { WebSocketUtil } from '@/assets/js/websocket';
export default {
 created(){
  const userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
  this.userHeadshot=userInfo.headshot
  this.username=userInfo.userName
  this.token=userInfo.token
  this.account=userInfo.account
  const labelObj=UtilHelper.getObjectFromCookie(CookieUtil.labelObject)
  this.learnPhase=labelObj.learnPhase
  this.labelName=labelObj.labelName
  this.fourLabelList=labelObj.fourLabelName
  this.originallyLabelName=this.labelName
  WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
  try {
    this.chooseFourLabel('全部')
  } catch (error) {
    console.log(error);
    
  }
  
},
 //解决vue渲染不到位的方法
 //页面加载时都会重写浏览器的历史记录
//  mounted:function() {
//     if (location.href.indexOf("#reloaded") == -1) {
//         location.href = location.href + "#reloaded";
//         location.reload();
//     }
//  },
data() {
  return {
    token:"",
    userHeadshot:"",
    username:"",
    account:"",
    learnPhase:"",
    labelName:"",
    originallyLabelName:"",
    fourLabelList:[],
    fourLabelOption:{},
    pageNumber:1,
    pagesCount:1,
    videoList:[]
  };
},
methods: {
  chooseFourLabel(index){
    let array= document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_box_header .header_box .header_text")
    let head=document.querySelector(".parent-web .body_box .body_right_box .body_right_box_header .header_box .header_text_one")
    if (array) {
      for (let i = 0; i < array.length; i++) {
        array[i].style.color="gray"
      }
      
    }
    if (index==='全部') {
      if (head) {
        head.style.color="black"
      }
      this.labelName=this.originallyLabelName
      this.videoFromLabel(this.labelName)
    }else{
      head.style.color='gray'
      array[index].style.color="black"
      this.fourLabelOption=this.fourLabelList[index]
      this.labelName=this.originallyLabelName+'-'+this.fourLabelOption.thirdLevel
      this.videoFromLabel(this.labelName)
    }
  },
  videoFromLabel(labelName){
    const that=this
    axios.get(`${CONNECT.generalhostpost()}/web/label/video/query`,{params:{
      learnPhase:that.learnPhase,
      labelName:labelName,
      pageNumber:this.pageNumber,
      pageSize:LabelVideoPageUtil.pageSize
    },headers:{
      'token':that.token
    }}).then(response=>{
      that.videoList=response.data.data.list
      that.pagesCount= response.data.data.pages<1?1:response.data.data.pages
    })
  },
  openVideo(index){
    UtilHelper.setObjectInCookie(CookieUtil.videoObject,this.videoList[index],LabelVideoPageUtil.defaultTime)
    this.$router.push('/web/school/web/video')
  },
  // 新增方法，用于跳转到用户界面
  goUser() {
               this.$router.push('/web/school/web/application');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
  upPage(){
    this.pageNumber=this.pageNumber>1?this.pageNumber-1:1
    this.videoFromLabel(this.labelName)
  },
  downPage(){
    this.pageNumber=this.pageNumber<this.pagesCount?this.pageNumber+1:this.pagesCount
    this.videoFromLabel(this.labelName)
  },
  
  inputPage(){
    let inputPage=document.querySelector(".parent-web .body_box .body_right_box .body_right_content_bottom_box .input_page_box input").value;
    inputPage=parseInt(inputPage)
    inputPage=inputPage<1?1:inputPage
    inputPage=inputPage>this.pagesCount?this.pagesCount:inputPage
    this.pageNumber = inputPage
    this.videoFromLabel(this.labelName) 
  },
    switchs(){
    UtilHelper.myPages(this)
   },
}};
</script>

<style scoped>
@import '@/assets/css/web_default.css';
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(2){
  color: #8F9BB3;
}
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(1){
  color: #000000;
}


.parent-web .body_box .body_right_box{
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  margin: 0 auto;
  overflow: auto;
  box-shadow: 0px 8px 32px 0px rgba(31,47,70,0.08);
}
.parent-web .body_box .body_right_box .body_right_box_header{
  width: 100%;
  height: 10%;
  background: #ECF0F7;
  text-align: left;
  position: relative;
  display: flex;
  gap: 2%;
  
}
.parent-web .body_box .body_right_box .body_right_box_header .header_box  {
     width: 106px;
     height: 42px;
     background: #FFFFFF;
     border-radius: 8px 8px 8px 8px;
     top: 15%;
     position: relative;
     text-align: center;
     font-size: 18px;
     color: #192038;
     line-height: 42px;
     text-align: center;

}
.parent-web .body_box .body_right_box .body_right_box_header .header_box.active {
  color: #000000;
}

.parent-web .body_box .body_right_box .body_right_box_header .header_box .header_text{
  text-align: center;
  color: gray;
}
.parent-web .body_box .body_right_box .body_right_box_header .header_box .header_text_one{
  text-align: center;
  color: #000000;
}
.parent-web .body_box .body_right_box .body_right_center{
  width: 98%;
  height: 500px;
  position: relative;
  margin:  auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4%;
  margin-top: 20px;
  margin-left: 20px
}

.parent-web .body_box .body_right_box .body_right_center .list_box{
  width: 30%;
  height: 35%;
  background: #FFFFFF;
  box-shadow: 0px 8px 32px 0px rgba(31,47,70,0.08);  border-radius: 16px 16px 16px 16px;

}

.parent-web .body_box .body_right_box .body_right_center .list_box .list_box_video{
  width: 100%;
height: 55%;
background: #C4C4C4;
border-radius: 16px 16px 16px 16px;
  position: relative;
}
.parent-web .body_box .body_right_box .body_right_center .list_box .list_box_video img{
  width: 100%;
  height: 100%;
  border-radius: 25px;
}
.parent-web .body_box .body_right_box .body_right_center .list_box .list_box_video .list_box_img{
  width: 41px;
  height: 41px;
  float: right;
  position: absolute;
  right: 10px;
  top: 75%;
  background-image: url('@/assets/img/btnStart.png');
  background-repeat: no-repeat;
  background-size: cover;

}
.parent-web .body_box .body_right_box .body_right_center .list_box .list_box_text{
  height: 28%;
  font-size: 15px;
color: #000000;
line-height: 20px;
text-align: center;
font-style: normal;
position: relative;
text-transform: none;
top: 10px
}

.parent-web .body_box .body_right_box .body_right_center .list_box .area_box{
  display: flex;
  margin-left: 10px;
  gap: 14%;
width: 100%;
height: 15%;

}
.parent-web .body_box .body_right_box .body_right_content_bottom_box {
    width: 500px;
    height: 80px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
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
      width: 69px;
    height: 32px;
    text-align: center;
    }
    video,img,button,.parent-web .body_box .body_right_box .body_right_box_header .header_box:hover{
        cursor: pointer;
    }
     
/* 屏幕宽度在小于768px之间的样式 */
@media (max-width: 768px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 60%;
  } 
  .parent-web .body_box .body_right_box .body_right_center{
    zoom: 90%;
  }
}
/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
  .parent-web .head_box{
        display: flex;
        height: 12%;
  } 
  .parent-web .body_box .body_right_box {
             zoom: 80%;
        }
  .parent-web .body_box .body_right_box .body_right_center{
    height: 400px;
  }
  .parent-web .body_box .body_right_box .body_right_center .list_box{
    width: 43%;
  }
}
/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
  .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 100%;
  } 
  .parent-web .body_box .body_right_box {
             zoom: 75%;
        }
}
/* 屏幕宽度大于1200px之间的样式 */
@media (min-width: 1200px) {
  .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 100%;
  } 
  .parent-web .body_box .body_right_box {
             zoom: 80%;
        }
        .parent-web .body_box .body_right_box .body_right_center .list_box{
          width: 25%;
        }
        .parent-web .body_box .body_right_box .body_right_center{
          gap: 6%;
        }
  }


</style>