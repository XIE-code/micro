<template>
    <div class="parent-web">
        <div class="head_box">
            <div class="head_left_box">
                <span class="left_image"><img src="@/assets/img/label.png" alt=""></span>
                <span class="left_text">Micro School</span>
            </div>
            <div class="head_right_box">
                <div class="query_box">
                    <div class="query_image"><img src="" alt=""></div>
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
                        <img src="@/assets/img/home.png" alt="">
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
                    <div class="body_right_head_text_box">诗歌</div>
                    <div class="body_right_head_text_box" >散文</div>
                    <div class="body_right_head_text_box" >小说</div>
                    <div class="body_right_head_text_box">戏剧</div>
                    <div class="body_right_head_text_box">剧本</div>
                    <div class="body_right_head_text_box">寓言</div>
                    <div class="body_right_head_text_box">童话 </div>
                </div>
                <div class="body_right_content_box">
                    <div class="body_right_video_box" v-if="this.videoSize>=1">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
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
                    <div class="body_right_video_box" v-if="this.videoSize>=2">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(1)"></div>
                    </div>
                    <div class="body_right_video_box" v-if="this.videoSize>=3">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(2)"></div>
                    </div>
                    <div class="body_right_video_box" v-if="this.videoSize>=4">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(3)"></div>
                    </div>
                    <div class="body_right_video_box" v-if="this.videoSize>=5">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(4)"></div>
                    </div>
                    <div class="body_right_video_box" v-if="this.videoSize>=6">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(5)"></div>
                    </div>
                    <div class="body_right_video_box" v-if="this.videoSize>=7">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(6)"></div>
                    </div>
                    <div class="body_right_video_box" v-if="this.videoSize>=8">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(7)"></div>
                    </div>
                    <div class="body_right_video_box" v-if="this.videoSize>=9">
                        <div class="video_image_box">
                            <img src="" alt="">
                        </div>
                        <div class="is_pay">免费</div>
                        <div class="title_text">Search Engine Optimization Basic for Beginner Test Test</div>
                        <div class="body_right_video_bottom_box">
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_courses.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 评论</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/ic_star.png" alt="">
                                <div class="body_right_video_bottom_item_text">26 收藏</div>
                            </div>
                            <div class="body_right_video_bottom_item_box">
                                <img src="@/assets/img/thumbs-up.png" alt="">
                                <div class="body_right_video_bottom_item_text">
                                    <span class="likes">26</span>
                                    点赞
                                </div>
                            </div>
                        </div>
                        <div class="video_start_box" @click="jump(8)"></div>
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
  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  export default({
    created(){
        //该方法是在获取头像连接，并显示在对应页面上
        this.userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=this.userInfo.headshot
        this.username=this.userInfo.userName
        this.token=this.userInfo.token
        // 以下代码时获取已经上线的视频
        this.video_default_set()
        WebSocketUtil.createWebSocket(this.userInfo.account,this.userInfo.token,this)
    },
     //解决vue渲染不到位的方法
//      mounted:function() {
//                   if (location.href.indexOf("#reloaded") == -1) {
//                     location.href = location.href + "#reloaded";
//               location.reload();
//  }
//  },
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
            // ${CONNECT.generalhostpost()} http://localhost:8080/general
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
                console.log(response.data);
                that.pagesCount= response.data.data.pages
                that.videoSize=response.data.data.size
                that.videoInfo=response.data.data.list
            })
        },
        async video_default_set(){
            await this.ownVideoNumber()
            let array=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .video_image_box img")
            let title_array=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .title_text")
            let likes_array=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box .body_right_video_bottom_box .body_right_video_bottom_item_box .body_right_video_bottom_item_text .likes")
            try{
                for (let i = 0; i < this.videoSize; i++) {
                    array[i].src=this.videoInfo[i].videoImageIndex;
                    title_array[i].innerHTML=this.videoInfo[i].title;
                    likes_array[i].innerHTML=this.videoInfo[i].thumbsUpCount;
                }
            }catch(error){
                console.log(error.message);
            }
        },
        async inputEnterFunction(){ 
            let pageNumber=1
            let pageSize=9
            let videoList=[]
            await UtilHelper.queryVideo(this.inputValue,pageNumber,pageSize,this.token).then(array => {
                videoList=array
            }).catch(error=>{
                console.error(error);
                }
            )
            //通过搜索获取功能的视频列表已经实现，等待新的页面进行填装
            console.log(videoList);
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
        jump(i){
            //通过保存cookie，跳转网页后，通过cookie获取视频数据
            console.log(this.videoInfo[i]);
            UtilHelper.setObjectInCookie("videoInfo",this.videoInfo[i],20)
            
        },
        upVideo(){
            if(this.state===1){
                return
            }
            this.state=1
            this.video_default_set()
        },
        downVideo(){
            
            if(this.state===0){
                return
            }
            this.state=0
            this.video_default_set()
        }
    }
  })
  </script>
  
  <style scoped>
    @import '@/assets/css/web_default.css';
    .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(2){
        color: #000000;
    }
    
    .parent-web .body_box .body_right_box .body_right_content_box{
        display: flex;         /* 设置为 flex 容器 */
        flex-direction: row;   /* 默认为横向排列 */
        flex-wrap: wrap;        /* 允许子项换行 */
        justify-content: space-between;
        padding: 20px; 
        padding-bottom:0;
    }
    .parent-web .body_box .body_right_box .body_right_head_box {
      width: 100%;
      height: 58px;
      padding-left: 40px;
      background: #F4F6F9;
      display: flex;
      align-items: center;
      border-bottom: 1px #eff2f8 solid;
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
    .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box{
      width: 5%;
      height: 69%;
      background: #FFFFFF;
      border-radius: 12px 12px 12px 12px;
      border: 1px solid #EDF1F7;
      text-align: center;
    }
    .parent-web .body_box .body_right_box .body_right_content_box .body_right_video_box{
        margin-left: 10px;
        width: 24%;
        height: 210px;
        background-color: #ffffff;
        border-radius:25px;
        position: relative;
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
        height: 20px;
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
        font-size: 12px;
        line-height: 20px;;
        position: absolute;
        top: 0;
        right: 10px;
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
    }
  
    @media (max-width: 1442px) and (min-width: 888px) {
    .parent-web {
    zoom: 67%;
  
    }
  
    }
  </style>
  
  