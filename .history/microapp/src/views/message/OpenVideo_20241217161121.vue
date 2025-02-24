<template>
    <div class="parent-web">
        <div class="head_box">
            <div class="head_left_box">
                <span class="left_image"><img src="@/assets/img/label.png" alt=""></span>
                <span class="left_text">Micro School</span>
            </div>
            <div class="head_right_box">
                <div class="user_box">
                    <span class="head_image"><img :src="userHeadshot" alt=""></span>
                    <div class="user_text">{{ username }}</div>
                </div>
                
            </div>
        </div>
        <div class="body_box">
            <div class="body_left_box">
                <div class="choose_box">
                    <div class="choose_image_box">
                        <img src="@/assets/img/home_full.png" alt="" @click="goHome">
                        <!-- <div class="choose_text">首页</div> -->
                        <router-link to="/web/school/web/main" class="choose_text">首页</router-link>
                    </div>
                    <div class="choose_image_box">
                        <img src="@/assets/img/user_close.png" alt="" @click="switchs">
                        <div class="choose_text" @click="switchs">用户</div>
                    </div>
                </div>
            </div>
            <div class="body_right_box">
                <div class="body_right_content_box">
                        <div class="video-container">
                            <div class="video_title">
                                {{ title }}
                            </div>
                          <video controls="controls" autoplay="autoplay"  width="100%" height="100%" @ended="onVideoEnded">
                             <source :src="videoIndex" type="video/mp4">
                         </video>
        
                         <div class="video_bottom">
                            <div class="video_bottom_item_text">
                                <img src="@/assets/img/thumbs-up.png" alt="点赞" @click="thumbsUp" v-if="isThumbsUp==false">
                                <img src="@/assets/img/true-thumbs-up.png" alt="点赞" class="text" @click="thumbsUp" v-if="isThumbsUp==true">
                                {{ thumbsUpCount }} 点赞
                            </div>
                            <!-- 下架视频按钮 -->
                        <button class="down_video" @click="toggleConfirmUnshelfModal('unshelf')" v-if="canUnshelf && this.state === 1">下架视频</button>
                        <!-- 重新上架视频按钮 -->
                        <button class="down_video" @click="toggleConfirmUnshelfModal('reshelf')" v-if="canUnshelf && this.state === 0">重新上架视频</button>
                            <!-- <div class="video_bottom_item_text">
                                <img src="@/assets/img/ic_star.png" alt="收藏">
                                26 收藏
                            </div>
                            <div class="video_bottom_item_text">
                                <img src="@/assets/img/thumbs-up.png" alt="评论">
                                26 转发
                            </div> -->
                        </div>
                    </div>
                    <div class="confirm-unshelf-modal" v-if="confirmUnshelfModalVisible" @click.self="cancelUnshelf">
    <div class="confirm-unshelf-content" @click.stop>
        <!-- 根据action显示不同的确认信息 -->
        <p v-if="action === 'unshelf'">确定要下架视频吗？</p>
        <p v-if="action === 'reshelf'">确定要重新上架视频吗？</p>
        <button @click="confirmUnshelf">确认</button>
        <button @click="cancelUnshelf">取消</button>
    </div>
</div>
                    <div class="video_owner_box">
                        <div class="video_owner_content_box">
                            <div class="video_owner_info_box">
                                <div class="video_owner_headshot_box">
                                    <div class="video_owner_headshot">
                                        <img :src="headshotByVideoOwner" alt="" @click="goPerson">
                                    </div>
                                    <div class="video_owner_right_box">
                                        <div class="video_owner_level_box" >
                                            用户: {{ userNameByVideoOwner }}
                                        </div>
                                        <div class="video_owner_level_box">
                                            账号: {{ accountByVideoOwner }}
                                        </div>
                                    </div>
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
import {CONNECT, CookieUtil} from '@/assets/js/contants.js'
import { UtilHelper } from '@/assets/js/util_helper.js'
import { WebSocketUtil } from '@/assets/js/websocket';
import axios from 'axios';
import qs from 'qs'; // 导入 qs 库
export default({
    created(){
        //该方法是在获取头像连接，并显示在对应页面上
        const userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=userInfo.headshot
        this.username=userInfo.userName
        this.token=userInfo.token
        this.account=userInfo.account
        this.initVideoPage()
        this.checkUnshelfPermission();
        WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
    },
  //刷新页面，达到清空缓存的效果。浏览器的返回按键
mounted() {
    if (window.name !== "noReload") {
      window.name = window.name+"noReload";
      location.reload();
    } else {
      window.name = "";
    }
  },

    data(){
        return {
            account:"",
            username:'',
            userHeadshot:'',
            token:'',
            videoIndex:'',
            title:'',
            videoNumber:"",
            thumbsUpCount:0,
            isThumbsUp:false,
            headshotByVideoOwner:"",
            userNameByVideoOwner:"",
            accountByVideoOwner:"",
            userTypeIdByVideoOwnerShot:"",
            confirmUnshelfModalVisible: false, // 控制确认下架弹窗显示的标志位
            canUnshelf: false, // 控制下架视频按钮显示
            state:1
        };
    },
    methods:{
        async initVideoPage(){
            let videoObj=UtilHelper.getObjectFromCookie(CookieUtil.videoObject)
            this.videoIndex=videoObj.videoIndex
            this.title=videoObj.title
            this.thumbsUpCount=videoObj.thumbsUpCount
            this.videoNumber=videoObj.videoNumber
            this.headshotByVideoOwner=videoObj.headshot
            this.userNameByVideoOwner=videoObj.userName
            this.accountByVideoOwner=videoObj.account
            this.userTypeIdByVideoOwnerShot=videoObj.userTypeId
            this.state=videoObj.state===undefined?this.state:videoObj.state
            
            this.checkUnshelfPermission();
            const that=this
            //是否点赞的接口
            await axios.get(`${CONNECT.generalhostpost()}/user/is/like/history`,{
                params:{
                    account:that.account,
                    videoNumber:that.videoNumber
                },
                headers:{
                    token:this.token
                }
            }).then(response=>{
                
                if (response.data.code==1) {
                    that.isThumbsUp=response.data.data.key
                }
            })
        },
      
 toggleConfirmUnshelfModal(action) {
        this.action = action; // 设置当前操作
        this.confirmUnshelfModalVisible = !this.confirmUnshelfModalVisible; // 切换弹窗的显示状态
    },
  //判断是否显示下架视频按钮
  checkUnshelfPermission() {
    // 假设账号信息已经在created钩子中设置
    
    // 判断当前登录账号是否与视频发布者账号相同，则显示下架视频按钮
    if ( this.account === this.accountByVideoOwner) {
      this.canUnshelf = true;
    } else {
      this.canUnshelf = false;
    }
  },
  //确认下架
  confirmUnshelf() {
    // 调用下架视频的逻辑
    if (this.action === 'unshelf') {
            this.unshelfVideo(0);
        } else if (this.action === 'reshelf') {
            this.unshelfVideo(2);
        }
        this.toggleConfirmUnshelfModal(); // 关闭弹窗
    },
  // 取消下架
  cancelUnshelf() {
    this.toggleConfirmUnshelfModal(); // 关闭弹窗
  },
  async unshelfVideo(status) {
    const that = this;
    try {
        const response = await axios.put(`${CONNECT.generalhostpost()}/update/video/status`, null, {
            params: {
                videoNumber: that.videoNumber,
                status: status // 传入的状态，0为下架，2为上架
            },
            headers: {
                token: this.token
            }
        });
        if (response.data.code === 1) {
            alert(`视频${status === 0 ? '下架' : '上架'}成功`);
            this.state = status; // 更新状态
            this.checkUnshelfPermission(); // 重新检查下架权限
        } else {
            alert("操作失败");
        }
    } catch (error) {
        console.error('更新视频状态出错:', error);
        alert("操作失败");
    }
},
        // 新增方法，用于跳转到用户界面
             goUser() {
               this.$router.push('/web/school/web/time');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
            //去个人页面的方法
             goPerson() {
                UtilHelper.setObjectInCookie(CookieUtil.videoOwnerPersonal,{account:`${this.accountByVideoOwner}`},CookieUtil.userDefaultTime)
                
                this.$router.push('/web/school/web/personal');
             },
             switchs(){
                 UtilHelper.myPages(this)
            },
        thumbsUp(){
            const requestBody = {
                videoNumber:this.videoNumber,
                account: this.account
            };
            const requestParams = qs.stringify(requestBody);
            const that=this
            //点赞的接口
            axios.post(`${CONNECT.generalhostpost()}/user/click/like/history`,requestParams,{headers:{
                token:that.token
            }}).then(response=>{
                if (response.data.code==1) {
                    that.thumbsUpCount=response.data.data.value
                    that.isThumbsUp=response.data.data.key
                }
            })
            
        },
        onVideoEnded(){
            const storedArrayString = localStorage.getItem(CookieUtil.videoList);
            if (storedArrayString==null) {
                return
            }
            let array=JSON.parse(storedArrayString)
            if (array.length===0) {
                return
            }
            let obj=array.shift()
            localStorage.setItem(CookieUtil.videoList,JSON.stringify(array))
            UtilHelper.setObjectInCookie(CookieUtil.videoObject,obj,CookieUtil.userDefaultTime)
            location.reload();
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

video {
    background-color: black;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
    width: 300px;
    height: 600px;
    background-color: #FFFFFF ;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .upload_video_content_text{
    width: 300px;
    height: 48px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 28px;
    line-height: 48px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .file_input_box {
    margin-top: 25px;
    width: 100%;
    height: 180px;
    border: 1px solid #F6453D;
    border-radius: 10px;
    cursor: pointer;
    display: block;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .file_input_input {
    display: none; /* 隐藏原生文件输入框 */
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .file_input_image01_box{
    width: 91px;
    height: 67px;
    margin: 0 auto;
    margin-top: 30px;
    background-image: url("");
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .file_input_image02_box{
    width: 64px;
    height: 64px;
    margin: 0 auto;
    background-image: url("");
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box{
    margin-top: 5px;
    width: 100%;
    height: 80px;
}

.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .title_box{
    width: 100%;
    height: 20px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 14px;
    color: #192038;
    line-height: 20px;
    position: relative;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .title_box .title_right_text{
    top: 0;
    right: 15px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 14px;
    color: #F6453D;
    line-height: 20px;
    position: absolute;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .input_box{
    margin-top: 8px;
    width: 100%;
    height: 40px;
    border-radius: 12px;
    border: 1px #EDF1F7 solid;
    position: relative;
  
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .input_box input{
    top: 0;
    left: 15px;
    width: 95%;
    height: 40px;
    border: 0;
    outline:none;
    background-color: transparent;
    font-size: 16px;
    font-family: Noto Sans SC, Noto Sans SC;
    color: black;
    position: absolute;
    
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .choose_select{
    top: 0;
    left: 15px;
    padding-left: 10px;
    width: 95%;
    height: 40px;
    position: absolute;
    -webkit-appearance: none; /* 移除 WebKit 浏览器的默认样式 */
    -moz-appearance: none;    /* 移除 Firefox 浏览器的默认样式 */
    appearance: none;         /* 移除其他浏览器的默认样式 */
    background-color: transparent;
    outline:none;
    border: none;
    background-image: url("");
    background-repeat:no-repeat ;
    background-position-x: 253px;
    background-position-y: 15px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .down_box{
    width: 16px;
    height: 9px;
    background-color: transparent;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .submit_button{
    margin-top: 100px;
    width: 300px;
    height: 50px;
    border-radius: 12px;
    background-color: #f6453d;
    border:none;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .submit_button:active{
    background-color: #d6281f;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .choose_select,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .submit_button,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .title_box .title_right_text{
    cursor: pointer;
}

.parent-web .body_box .body_right_box .body_right_content_box .video-container video{
            width: 700px;
            height: 388px;
            /*被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。*/
            object-fit: fill;
            margin: 10% auto;
            overflow: auto;
            overflow: hidden;
            object-fit: contain; 

}

.parent-web .body_box .body_right_box .body_right_content_box .video-container{
    width: 55%;
    height: 80%;
    position: relative;
    margin: auto;
    overflow: hidden; /* 防止内容溢出 */
}
.parent-web .body_box .body_right_box .body_right_content_box .video-container .video_title{
width: 100%;
height: 6%;
position:absolute;
top: 6%;
left: 0%;
text-align: left;
color: #000000;
font-weight: bold;
font-size: 24px;
}
.parent-web .body_box .body_right_box .body_right_content_box .video-container .video_bottom{
display: flex;
width: 100%;
height: 10%;
background: #FFFFFF;
box-shadow: 0px 0px 34px 0px rgba(26,2,48,0.25);
top: 84%;
left: 0%;
position: absolute;

}
.parent-web .body_box .body_right_box .body_right_content_box .video-container .video_bottom .video_bottom_item_text{
    width: 30%;
    height: 20%;
    position: relative;
    top: 11px;;
}
.parent-web .body_box .body_right_box .body_right_content_box .video-container .video_bottom .down_video{
    position: relative;
    left: 55%;
    background-color: #f6453d;
    border-radius: 10px;
    height: 40px;
    top: 20%
}
 
.parent-web .body_box .body_right_box .body_right_content_box .video-container .video_bottom .video_bottom_item_text img{
    width: 12%;
    height: 240%;
    position: relative;
    top: 7px;

}
/* .parent-web .body_box .body_right_box .body_right_content_box .video-container .video_owner_box{
    width: 300px;
    height: 100%;
    background-color: pink;
    position: absolute;
} */

.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box{
    width: 300px;
    height: 100%;
    right: 0;
    
    position: absolute;
}
.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box .video_owner_content_box{
    width: 100%;
    height: 100%;
    position: relative;
}
.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box .video_owner_content_box .video_owner_info_box{
    top: 20px;
    width: 95%;
    height: 100px;
    box-shadow: 0px 0px 8px 0px rgba(30, 2, 48, 0.25);
    background-color: white;
    position: relative;
}
.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box .video_owner_content_box .video_owner_info_box .video_owner_headshot_box{
    width: 100px;
    height: 100%;
    
}
.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box .video_owner_content_box .video_owner_info_box .video_owner_headshot_box .video_owner_headshot{
    
    width: 60px;
    height: 60px;
    top: 18px;
    left: 20px;
    border-radius: 40px;
    position: absolute;
}
.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box .video_owner_content_box .video_owner_info_box .video_owner_headshot_box .video_owner_headshot img{
    width: 60px;
    height: 60px;
    border-radius: 40px;
}
.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box .video_owner_content_box .video_owner_info_box .video_owner_headshot_box .video_owner_right_box{
    right: 0;
    width: 200px;
    height: 100%;
    position: absolute;
}
.parent-web .body_box .body_right_box .body_right_content_box .video_owner_box .video_owner_content_box .video_owner_info_box .video_owner_headshot_box .video_owner_right_box .video_owner_level_box{
    width: 100%;
    height: 40%;
    text-align: left;
    font-size: 16px;
    line-height: 50px;
}
@media (max-width: 1442px) and (min-width: 888px) {
        .parent-web .body_box .body_right_box {
             zoom: 75%;
        }
    }
    
    @media(min-width: 1442px){
        .parent-web .body_box .body_right_box .body_right_content_box .video-container{
            zoom: 90%;
        }
    }



/* 屏幕宽度在小于768px之间的样式 */
@media (max-width: 768px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 70%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .video-container{
    zoom: 70%;
    width: 90%;
    height: auto
  }
}
.confirm-unshelf-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保弹窗在最上层 */
}

.confirm-unshelf-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  height: 120px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}
/* 模态框内部文本样式 */
.confirm-unshelf-content p {
  margin-bottom: 20px; /* 与按钮的距离 */
  color: #333; /* 文本颜色 */
}

/* 模态框按钮样式 */
.confirm-unshelf-content button {
  padding: 10px 20px; /* 按钮内边距 */
  margin: 0 10px; /* 按钮之间的距离 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标手型 */
  outline: none; /* 无轮廓线 */
}

/* 确认按钮样式 */
.confirm-unshelf-content :nth-child(2){
  background-color: #4CAF50; /* 绿色背景 */
  color: white; /* 白色文本 */
}

/* 取消按钮样式 */
.confirm-unshelf-content :nth-child(3) {
  background-color: #f44336; /* 红色背景 */
  color: white; /* 白色文本 */
}

/* 按钮悬停效果 */
.confirm-unshelf-content button:hover {
  opacity: 0.9;
}
/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .video-container video{
    zoom: 90%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .video-container{
    width: 89%;
    height: auto;
  }
}
/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .video-container video{
    height: 406px
  }
  .parent-web .body_box .body_right_box .body_right_content_box .video-container{
    height: auto;
  }
}
/* 屏幕宽度在大于1200px的样式 */
@media  (min-width: 1400px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 75%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .video-container{
    height: auto;
  }
}
    /* 屏幕宽度1280之间的样式 */
    @media (max-width: 1300px) and (min-width: 1200px) and (max-height: 1300px) and (min-height: 800px) {
        .parent-web .body_box .body_right_box .body_right_content_box .video-container{
                height: auto;
         }
         .parent-web .body_box .body_right_box .body_right_content_box .video-container video{
            zoom: 120%;
         }
    }
</style>