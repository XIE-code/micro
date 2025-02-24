<template>
  <div class="parent-web-header">
    <!--导航区头像-->
      <div class="parent-web-header-box">
            <div class="parent-web-header-box-img">
                <img src="@/assets/img/label.png" alt="">
            </div>
            <!--导航区文字-->
            <label>Micro school</label>
      </div>
      <div class="parent-web-header-box-push">
        <div class="parent-web-header-box-push-img">
          <img src="@/assets/img/gohome.png" alt="" @click="goHome">
        </div>
        <label @click="goHome">首页</label>
      </div>
      <div class="parent-web-header-box-push">
        <div class="parent-web-header-box-push-img">
          <img src="@/assets/img/gouser.png" alt="" @click="switchs">
        </div>
        <label @click="switchs" icon="el-icon-user-solid">用户</label>
      </div>
      <div class="parent-web-header-search-box">
          <div class="search-box-img">
            <img src="@/assets/img/search.png" alt="">
          </div>  
            <input type="text" placeholder="搜索" @keyup.enter="inputEnterFunction()"> 
      </div>
  </div>
  <div class="parent-web">
       <div class="wrapper_head">
            <div class="wrapper_left_box">
                  <div class="wrapper_left_bottom_box">
                       <div class="wrapper_left_bottom_left_box">
                           <div class="image_box">
                               <img :src="this.videoOwnerObj.headshot" alt="">
                           </div>
                       </div>
                       <div class="wrapper_left_bottom_right_box">
                           <div class="username_box">
                               <div class="username">用户名: {{ this.videoOwnerObj.userName }} <label>{{ this.videoOwnerObj.userTypeId===1?"学生":this.videoOwnerObj.userTypeId===2?"老师":this.videoOwnerObj.userTypeId===3?"机构":"" }}</label></div>
                              
                               <div class="username">账号: {{ this.videoOwnerObj.account }}</div>
                            </div>
                       </div>
                  </div>

             </div>
          <div class="wrapper_right_bottom">
              <div class="wrapper_right_bottom_img">
                  <img src="@/assets/img/thumbs-up.png" alt="">
              </div>
              <label>总点赞数：</label>
              <div class="wrapper_right_bottom_text">
                  {{this.videoOwnerObj.thumbsUpSum}}点赞
              </div>
          </div>
         </div>
         <div class="wrapper_body">
              <div class="wrapper_body_head">
                {{ this.videoOwnerObj.userName }}的视频
              </div>
              <div class="wrapper_body_body">
                      <div class="list_box" v-for="(obj,index) in videoList" :key="index">
                          <div class="list_box_video">
                              <div class="list_box_img">
                                <img :src="obj.videoImageIndex" alt="" @click="openVideo(index)">
                              </div>
                          </div>
                          <div class="list_box_text">
                            {{ obj.title }}
                          </div>
                          <div class="video_bottom_text">
                               <img src="@/assets/img/thumbs-up.png" alt="" width="12" height="13">
                                     {{ obj.thumbsUpCount }} 点赞
                          </div>
                      </div>
                  
              </div>
                     
          <!--底部上一页下一页页面-->
               <div class="wrapper_body-bottom">
                    <button class="button_style" @click="upPage()">上一页</button>
                    <div class="button_text">第 {{ this.pageNumber }} 页</div>
                    <button class="button_style" @click="downPage()">下一页</button>
                    <div class="button_text">共 {{ this.videoOwnerObj.totalPage }} 页, 跳至</div>
                    <div class="input_page_box"><input type="text" @keyup.enter="inputPage()"></div>
                    <div class="button_text">页</div>
               </div>
         </div>
  </div>
</template>

<script>
import { CONNECT, CookieUtil } from '@/assets/js/contants';
import { UtilHelper } from '@/assets/js/util_helper';
import axios from 'axios';


export default({
    created(){
      const videoOwnerObj=UtilHelper.getObjectFromCookie(CookieUtil.videoOwnerPersonal);
      this.accountByVideoOwner=videoOwnerObj.account
      const userObj=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
      this.token=userObj.token
      
      this.initPage()
    },
    mounted() {
        if (window.name !== "noReload") {
            window.name = window.name + "noReload";
            location.reload();
        } else {
            window.name = "";
        }
    },
    data(){
        return {
          accountByVideoOwner:"",
          pageNumber:1,
          pageSize:18,
          token:"",
          videoOwnerObj:{},
          videoList:{},
          totalPage:0
        }
    },
    methods:{
        async initPage(){
          const that=this
          await axios.get(`${CONNECT.generalhostpost()}/query/other/people/videos`,{params:{
            account:that.accountByVideoOwner,
            pageNumber:that.pageNumber,
            pageSize:that.pageSize
          },headers:{
              token:that.token
          }}).then(response=>{
            if (response.data.code===1) {
              that.videoOwnerObj=response.data.data
              that.videoList=response.data.data.videoList
              that.totalPage=that.videoOwnerObj.totalPage
            }
          })
          console.log(that.videoOwnerObj);
        },
        goHome() {
               this.$router.push('/web/school/web/main');
             },
             switchs(){
                UtilHelper.myPages(this)
            },
        upPage(){
            this.pageNumber=this.pageNumber>1?this.pageNumber-1:1
            this.initPage()
        },
        downPage(){
            this.pageNumber=this.pageNumber<this.totalPage?this.pageNumber+1:this.totalPage
            this.initPage()
        },
        inputPage(){
          let inputPage=0
            try{
              inputPage=Number(document.querySelector(".parent-web .wrapper_body .wrapper_body-bottom .input_page_box input").value);
            }catch(error){
              alert("请输入数字")
              console.log(error);
              return
            }
            inputPage=inputPage<1?1:inputPage
            inputPage=inputPage>this.totalPage?this.totalPage:inputPage
            this.pageNumber=inputPage
            this.initPage()
        },
        async inputEnterFunction(){
            let enter=document.querySelector(".parent-web-header .parent-web-header-search-box input").value

            let obj={
                enterValue:enter,
                account:this.videoOwnerObj.account
            }
            UtilHelper.setObjectInCookie(CookieUtil.queryObject,obj,CookieUtil.queryDefaultTime)
            //等待新的搜索界面
            this.$router.push("/web/school/web/search") 
        },
        openVideo(index){
            this.videoList[index].account=this.videoOwnerObj.account
            this.videoList[index].headshot=this.videoOwnerObj.headshot
            UtilHelper.setObjectInCookie(CookieUtil.videoObject,this.videoList[index],CookieUtil.userDefaultTime)
            this.$router.push('/web/school/web/video')
            
        }
    },
    
})
</script>

<style scoped>
  /*全局去除默认样式*/ 
*{
	padding:0;
	margin:0;
	box-sizing: border-box;
	font-size: 16px;
}
/* 设置默认的光标样式 */
body {
  cursor: default; /* 默认光标样式 */
}
/* 头像和图标的悬停效果 */
.parent-web-header-box-img img:hover,
.parent-web-header-box-push-img img:hover,
.image_box img:hover {
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
  opacity: 0.8; /* 轻微的透明度变化，增加视觉反馈 */
  transform: scale(1.25); /* 轻微放大效果 */
  transition: transform 0.3s, opacity 0.3s; /* 平滑的变换效果 */
}
.parent-web .wrapper_body .wrapper_body_body .list_box:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5); /* 悬停时添加阴影 */
    border: 1px solid #409eff; /* 悬停时的边框 */
    cursor: pointer; /* 鼠标指针变为手指形状 */
}
.parent-web .wrapper_body .wrapper_body_body .list_box .list_box_video .list_box_img img:hover{
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
  opacity: 0.8; /* 轻微的透明度变化，增加视觉反馈 */
  transform: scale(1.08); /* 轻微放大效果 */
}

.parent-web-header{
  width: 100%;
  height: 10%;
  background: #FFFFFF;
  box-shadow: 0px 8px 34px 0px rgba(26,2,48,0.25);
  position: fixed; /* 添加这一行 */
  top: 0; /* 添加这一行 */
  left: 0; /* 添加这一行 */
  z-index: 1000; /* 确保它在页面的最上层 */
  display: flex;
  flex-direction: row;
  gap: 2%;
}
.parent-web-header-box{
  width: 16%;
  height: 100%;
  position: relative;
  left: 3%;
  display: flex;
  align-items: center;
  object-fit: cover;

}
.parent-web-header-box label{
  position: relative;
  font-size: 24px;
  color: #000;
  white-space: nowrap;
}
 .parent-web-header-box-img {
  position: relative;
  width: 100px;
  height: 100%;
  object-fit: cover;  
}
.parent-web-header .parent-web-header-box-push{
  width: 5%;
  height: 50%;
  top: 26%;
  bottom: 0;
  position: relative;
  left: 5%;
  display: flex;
  align-items: center;
  color: #000;
}
.parent-web-header .parent-web-header-box-push .parent-web-header-box-push-img{
  position: relative;
  width: 45%;
  height: 100%;
  
}
.parent-web-header .parent-web-header-box-push .parent-web-header-box-push-img img{
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover; /* 保持图片宽高比 */
}

.parent-web-header-box .parent-web-header-box-img img{
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  width: 60px;
  height: 100%;
}
.parent-web-header .parent-web-header-search-box{
  width: 25%;
  height: 60%;
  background-color: transparent;
  top: 25%;
  left: 40%;
  border-radius: 20px;
  position:relative;
  border: 1px solid black;
  display: flex;
}
.parent-web-header .parent-web-header-search-box .search-box-img{
  width: 15%;
  height: 100%;
}
.parent-web-header .parent-web-header-search-box .search-box-img img{
  width: 60%;
  height: 70%;
  position: relative;
  top: 10%;
  background-repeat: no-repeat;
  background-size: cover;
  
}
.parent-web-header .parent-web-header-search-box input{
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
}
.parent-web{
	width: 80%;
	height: 1600px;
  margin: 0 auto;
  position: relative;
}
.parent-web .wrapper_head{
  width: 100%;
  height: 300px;
  background-image: url('@/assets/img/flame_img.png');
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: row;
}
.parent-web .wrapper_head .wrapper_left_box{
  width: 20%;
  height: 100%;
  position: relative;
}
.parent-web .wrapper_head .wrapper_left_box .wrapper_left_bottom_box{
  width: 100%;
  height: 100px;
  bottom: 0px;
  display: flex;
  position: absolute;
}
.parent-web .wrapper_head .wrapper_left_box .wrapper_left_bottom_box .wrapper_left_bottom_left_box{
  width: 40%;
  height: 100%;
  position: relative;
}
.parent-web .wrapper_head .wrapper_left_box .wrapper_left_bottom_box .wrapper_left_bottom_left_box .image_box{

  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: red;
  top: 20px;
  left: 15px;
  position: absolute;
}
.parent-web .wrapper_head .wrapper_left_box .wrapper_left_bottom_box .wrapper_left_bottom_left_box .image_box img{
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: relative;
}
.parent-web .wrapper_head .wrapper_left_box .wrapper_left_bottom_box .wrapper_left_bottom_right_box{
  width: 60%;
  height: 100%;
  position: relative;
}
.parent-web .wrapper_head .wrapper_left_box .wrapper_left_bottom_box .wrapper_left_bottom_right_box .username_box{
  width: 100%;
  height: 50px;
  top: 20px;
  position: absolute;
  white-space: nowrap;
}
.parent-web .wrapper_head .wrapper_left_box .wrapper_left_bottom_box .wrapper_left_bottom_right_box .username_box .username{
  text-align: left;
  width: 100%;
  height: 50%;
  font-size: 16px;
}
.parent-web .wrapper_head .wrapper_right_bottom{
  width: 25%;
  width: 25%;
  height: 20%;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.parent-web .wrapper_head .wrapper_right_bottom .wrapper_right_bottom_img{
  width: 30%;
  height: 80%;
  position: relative;
}

.parent-web .wrapper_body{
  width: 100%;
  height: 1600px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.parent-web .wrapper_body .wrapper_body_head{
  width: 20%;
  height: 3%;
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
  font-size: 30px;
  text-align: left;
}
.parent-web .wrapper_body .wrapper_body_body{
  width: 100%;
  height: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap; /* 允许子元素换行 */;
  align-content: flex-start;
  position: relative;
  overflow: hidden;

}
.parent-web .wrapper_body .wrapper_body_body .list_box{
  width: calc(33.33% - 4%); /* 每个子元素宽度减去间隔 */
  height: 15%;
  background: #FFFFFF;
  box-shadow: 0px 8px 32px 0px rgba(31,47,70,0.08);
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%; /* 为子元素添加底部间隔 */
}
.parent-web .wrapper_body .wrapper_body_body .list_box .list_box_video{
  width: 100%;
  height: 55%;
  background: #C4C4C4;
  border-radius: 16px 16px 16px 16px;
  position: relative;
}
.parent-web .wrapper_body .wrapper_body_body .list_box .list_box_video .list_box_img{
  width: 100%;
  height: 100%;
}
.parent-web .wrapper_body .wrapper_body_body .list_box .list_box_video .list_box_img img{
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 16px 16px;
}
.parent-web .wrapper_body .wrapper_body_body .list_box .list_box_text{
  height: 32%;
  font-size: 16px;
  color: #000000;
  text-align: center;
  font-style: normal;
  position: relative;
  text-transform: none;
  top: 2px;
}
.parent-web .wrapper_body  .wrapper_body_body  .list_box  .video_bottom_text{
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: left;
  padding-left: 10px;
}

.parent-web .wrapper_body .wrapper_body-bottom{
        width: 500px;
        height: 80px;
        margin: 0 auto;
        position: relative;
        display: flex; /* 使用 flexbox 布局 */
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */

}

.parent-web .wrapper_body .wrapper_body-bottom .button_style{
        width: 100px;
        height: 40px;
        background-color: #fc5531;
        border-radius: 20px;
        border:none;
}
.parent-web .wrapper_body .wrapper_body-bottom .button_text{
        font-size: 16px;
        white-space: nowrap;
        margin-left: 5px;
        margin-right: 5px;
}
.parent-web .wrapper_body .wrapper_body-bottom .input_page_box{
  border-radius: 5px;
  border: 1px #EDF1F7 solid;

}
.parent-web .wrapper_body .wrapper_body-bottom .input_page_box input{
        outline:none;
        border: 0;
        border-radius: 5px;
        width: 50px;
        height: 20px;
        text-align: center;
}
.parent-web .wrapper_body .wrapper_body-bottom .button_style:active{
  background-color: #f6453d;
}


/* 屏幕宽度在小于600px之间的样式 */
@media(max-width: 600px) {
  .parent-web,.parent-web-header {
    zoom: 50%;
  }
}

/* 屏幕宽度在600px到768px之间的样式 */
@media  (max-width: 768px) {
  .parent-web,.parent-web-header {
    zoom: 60%;
  }
}

 /* 屏幕宽度在768px到992px之间的样式 */
 @media (min-width: 768px) and (max-width: 992px) {
  .parent-web,.parent-web-header {
    zoom: 100%;
  }
}
 /* 屏幕宽度在992x到1200px之间的样式 */
 @media (min-width: 992px) and (max-width: 1200px) {
  .parent-web,.parent-web-header {
    zoom: 90%;
  }
}
 /* 屏幕宽度在1200x到1300px之间的样式 */
 @media (min-width: 1200px) and (max-width: 1300px) {
  .parent-web,.parent-web-header {
    zoom: 100%;
  }

}
 /* 屏幕宽度在1200x到1300px之间的样式 */
 @media (min-width: 1300px) and (max-width: 1500px) {
  .parent-web,.parent-web-header {
    zoom: 110%;
  }
}
  /* 屏幕宽度在大于1500px之间的样式 */
@media (min-width: 1500px) {
  .parent-web,.parent-web-header {
    zoom: 125%;
  }
}
</style>