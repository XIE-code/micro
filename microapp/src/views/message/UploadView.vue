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
                    <div class="user_text">{{ username }}</div>
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
                        <div class="choose_text" >用户</div>
                    </div>
                </div>
            </div>
            <div class="body_right_box">
                <div class="body_right_head_box">
                    <div class="body_right_head_text_box">我的</div>
                    <div class="body_right_head_text_box"  @click="myOnOrOffVideo(1)" v-if="this.userTypeId!=1">已发布视频</div>
                    <div class="body_right_head_text_box" @click="myOnOrOffVideo(0)" v-if="this.userTypeId!=0">已下架视频</div>
                    <!-- <div class="body_right_head_text_box">个人信息</div> -->
                    <router-link to="/web/school/only" @click="refreshPase" class="myself">个人信息</router-link>
                </div>
                <div class="body_right_content_box">
                    <div class="upload_video_box">
                        <div class="upload_video_head_box"  @click="switchs" >
                            &nbsp; &lt; &nbsp;返回
                        </div>
                        <div class="upload_video_content_box">
                              <div class="upload_video_content_text">
                                  发布视频
                              </div>
                              <div v-if="uploading" class="progress-container">
                                         <p>上传进度: {{ uploadProgress }}%</p>
                                        <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
                                    </div>
                              <div v-if="uploadMessage" class="upload-message">{{ uploadMessage }}
                                  </div>
                              <form id="upload_form" action="/upload" method="post"  @submit.prevent="uploadFile" enctype="multipart/form-data">
                              <label for="file_input" class="upload-box">
                                <div class="left" v-if="!videoName"></div> <!-- 只有在没有视频名字时才显示图标 -->
                                <div class="right" v-if="!videoName"></div> <!-- 只有在没有视频名字时才显示图标 -->
                              </label>
                                    <input type="file" id="file_input" name="file" accept="video/*" class="file_input_input"  required @change="handleFileChange" multiple>
                                       <!-- 显示视频名字{{ videoName }} --> 
                                        <div v-if="videoName" class="video-name"></div> 
                                   <!--显示的照片-->
                                    <!-- <img id="imagePreview" class="imagePreview" src="#" alt="Image preview" style="max-width: 300px; display:none;">   -->
                                   
                                </form>
                        </div>    
                        <div class="title_and_input_box">
                                    <div class="title_box">视频标题</div>
                                       <div class="input_box">
                                          <input type="text" placeholder="请输入">
                                       </div>
                                    </div>
                                    <div class="choose_input_box">
                                          <div class="title_box">类别</div>
                                              <div class="input_box">
                                                <!-- @change="onLearnLabelSelectChange()" -->
                                                 
                                                  <select class="input_text" @change="onLearnPhaseSelectChange">
                                                    <option value=""></option>
                                                    <option v-for="option in learnPhaseList" :key="option.learnPhase" :value="option.learnPhase" v-html="getLearnLabelOption(option)"></option>
                                                  </select>
                                                  <div class="check_text" @click="toggleSelect">一级分类</div>
                                              </div>
                                              <div class="input_box">
                                                <select class="input_text" @change="onSecondLabelSelectChange">
                                                  <option value=""></option>
                                                  <option v-for="option in secondLabelList" :key="option.firstLevelId" :value="option.firstLevel" v-html="getSecondLabelOption(option)"></option>
                                                </select>
                                                <div class="check_text_two">二级分类</div>
                                              </div> 
                                              <div class="input_box">
                                                <select class="input_text" @change="onThirdLabelSelectChange">
                                                    <option value=""></option>
                                                    <option v-for="option in thirdLabelList" :key="option.secondLevelId" :value="option.secondLevel" v-html="getThirdLabelOption(option)"></option>
                                                </select>
                                                <div class="check_text_three">三级分类</div>
                                              </div>
  
                                              <div class="input_box">
                                                  <select class="input_text" @change="onFourLabelSelectChange">
                                                    <option value=""></option>
                                                    <option v-for="option in fourLabelList" :key="option.fourLevelId" :value="option.fourLevel" v-html="getFourLabelOption(option)"></option>
                                                  </select>
                                                  <div class="check_text_four">四级分类</div>
                                              </div>
                                              <div class="input_button">
                                                  <button type="button" class="submit_button" value="submit" @click="checkSubmitVideoInfo">提交审核</button>
                                              </div>
         
                                  </div>
                          </div>
                    </div>
                </div>
                
            </div>
        </div>
  </template>
  
<script>
import { CONNECT, CookieUtil } from '@/assets/js/contants';
import { UtilHelper } from '@/assets/js/util_helper';
import axios from 'axios';
import { WebSocketUtil } from '@/assets/js/websocket';

export default({
    created(){
        const userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
        this.userHeadshot=userInfo.headshot
        this.username=userInfo.userName
        this.token=userInfo.token
        this.account=userInfo.account
        this.queryLabelList(this.token)
        WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
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
            list:[],
            learnPhaseList:[],  
            selectLearnPhaseOption:{},
            secondLabelList:[],
            selectSecondLabelOption:{},
            thirdLabelList:[],
            selectThirdLabelOption:{},
            fourLabelList:[],
            selectFourLabelOption:{},
            token:"",
            userHeadshot:"",
            username:"",
            account:"",
            videoName: '', // 新增数据属性来存储视频名字
            uploading: false, // 是否正在上传
            uploadProgress: 0, // 上传进度
            uploadMessage: '', // 用来存储上传提示消息
            isLearnPhaseVisible: false, // 控制一级分类<select>的显示状态

        };
        
    },
    methods:{
        async queryLabelList(token){
            await UtilHelper.queryLabelList(token).then(response=>{
                this.list=response.data
            })
            await this.firstLabel()
        },
        firstLabel(){
            this.learnPhaseList=this.list
            this.secondLabel(this.learnPhaseList[0])
        },
        toggleSelect(event) {
             // 阻止事件冒泡，确保点击 check_text 时不会触发其他事件
             event.stopPropagation();
             const selectElement = this.$el.querySelector('.input_text');
             selectElement.focus(); // 使 select 元素获得焦点
             selectElement.click(); // 触发 select 的点击事件
  } ,
        handleFileChange(event) {
            const fileInput = event.target.files;
            if (fileInput) {
        // 将文件名存储到videoName变量中，用于后续操作
        this.videoName = Array.from(fileInput).map(file => file.name.split('.').slice(0, -1).join('.')).join(', '); // 将所有文件名用逗号分隔

        // 将文件名填充到指定的输入框中
        const titleInput = document.querySelector(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box .input_box input");
        titleInput.value = this.videoName;

        // 更新上传提示消息
        this.uploadMessage = `文件 ${this.videoName} 已选择`;
    } else {
        this.videoName = ''; // 如果没有文件，清空视频名字
    }
},
        secondLabel(firstLabel){
            this.secondLabelList=firstLabel.dataList
            this.thirdLabel(this.secondLabelList[0])
        },
        
        thirdLabel(secondLabel){
            this.thirdLabelList=secondLabel.dataList
            this.fourLabel(this.thirdLabelList[0])
        },
        fourLabel(thirdLabel){
            this.fourLabelList=thirdLabel.dataList
        },
        getLearnLabelOption(option){
            return `<div class="learnPhaseOption">${option.learnPhase}</div>`
        },
          // 新增方法，用于跳转到发布视频页面
         goMy() {
         this.$router.push('/web/school/web/application');
        },  // 新增方法，用于跳转到用户界面
        goUser() {
               this.$router.push('/web/school/webview');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
             myOnOrOffVideo(pageState){
                UtilHelper.chooseMyOnOrOffVideo(this,pageState)
            },
            switchs(){
              UtilHelper.myPages(this)
             },
        getSecondLabelOption(option){
            // 因为刚开始设计数据库时是将学习阶段和年龄阶段是分开的，所以现在的secondLevel是firstLevel
            return `<div class="secondLabelOption">${option.firstLevel}</div>`
        },
        getThirdLabelOption(option){
            // 因为刚开始设计数据库时是将学习阶段和年龄阶段是分开的，所以现在的secondLevel是thirdLevel
            return `<div class="thirdLabelOption">${option.secondLevel}</div>`
        },
        getFourLabelOption(option){
            // 因为刚开始设计数据库时是将学习阶段和年龄阶段是分开的，所以现在的thirdLevel是fourLabel
            return `<div class="fourLabelOption">${option.thirdLevel}</div>`
        },
        onLearnPhaseSelectChange(event){
            const selectedLearnPhase = event.target.value;
            if (this.learnPhaseList) {
                this.selectLearnPhaseOption = this.learnPhaseList.find(option => option.learnPhase === selectedLearnPhase);
                this.secondLabelList=this.selectLearnPhaseOption.dataList
            }
        },
        onSecondLabelSelectChange(event){
            const selectedSecondLabel = event.target.value;
            if (this.secondLabelList) {
                // 因为刚开始设计数据库时是将学习阶段和年龄阶段是分开的，所以现在的secondLevel是firstLevel
                this.selectSecondLabelOption = this.secondLabelList.find(option => option.firstLevel == selectedSecondLabel);
                this.thirdLabelList=this.selectSecondLabelOption.dataList
            }
        },
        onThirdLabelSelectChange(event){
            const selectedThirdLabel = event.target.value;
            if (this.thirdLabelList) {
                // 因为刚开始设计数据库时是将学习阶段和年龄阶段是分开的，所以现在的secondLevel是thirdLevel
                this.selectThirdLabelOption = this.thirdLabelList.find(option => option.secondLevel == selectedThirdLabel);
                this.fourLabelList=this.selectThirdLabelOption.dataList
                console.log(this.fourLabelList);
            }
        },
        onFourLabelSelectChange(event){
            const selectedFourLabel = event.target.value;
            if (this.FourLabelList) {
                // 因为刚开始设计数据库时是将学习阶段和年龄阶段是分开的，所以现在的thirdLevel是fourLabel
                this.selectFourLabelOption = this.FourLabelList.find(option => option.thirdLevel == selectedFourLabel);
            }
        },
        checkSubmitVideoInfo(){
            const fileInput = document.querySelector(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .file_input_input").files;
            
            if (!fileInput || fileInput.length === 0) {
                alert("检测到视频文件未提交,请重新提交视频文件");
                return;
            }
            const title = document.querySelector(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box .input_box input").value;
            if (fileInput.length<=1&&title==='') {
                alert("检测到标题未填写,请重新填写标题")
                return
            }
            const array = document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box .input_text");
            const formData = new FormData();
            formData.append("account", this.account);
            if (title!=='') {
                formData.append("title", title);
            }
            formData.append("learnPhase", array[0].value);
            
            if (fileInput.length>1) {
                for (let i = 0; i < fileInput.length; i++) {
                    formData.append(`videoList`, fileInput[i])
                }
            }else{
                formData.append(`videoFile`,fileInput[0])
            }

            
            
            if (array[3].value === "" || array[3].value === null) {
                formData.append("labelName", array[1].value + "-" + array[2].value);
            } else {
                formData.append("labelName", array[1].value + "-" + array[2].value + "-" + array[3].value);
            } 
            let len=0
            for (let [key,value] of formData) {
                console.log(key+":"+value);
                if (key===`videoList`) {
                    len=len+1
                }
            }
            console.log(len);
                       
            console.log(formData.has(`title`));
            
            this.submitVideo(formData,len);
        },

            //暂时性注解
            // const array= document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box .input_text")
            // formData.append("account",this.account)
            // formData.append("videoFile",videoFile)
            // formData.append("title",title)
            // formData.append("learnPhase",array[0].value)
            // if (array[3].value===""||array[3].value==null) {
            //     formData.append("labelName",array[1].value+"-"+array[2].value)
            // }else{
            //     formData.append("labelName",array[1].value+"-"+array[2].value+"-"+array[3].value)
            // }
            
            // this.submitVideo(formData)
      
            submitVideo(formData, len) {
             this.uploading = true; // 开始上传
             this.uploadProgress = 0; // 重置进度
             let url = len > 1 ? `${CONNECT.generalhostpost()}/bulk/uploads/video` : `${CONNECT.generalhostpost()}/upload/video`;
             axios.post(url, formData, {
                 timeout: 3600000,
                 headers: {
                     'Content-Type': 'multipart/form-data',
                     "token": this.token
                 },
        onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable && progressEvent.total !== 0) {
                // 计算上传进度百分比，但不超过99%
                this.uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)) < 99 ? parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)) : 99;
            }
        }
    }).then(response => {
        if (response.data.code === 1) {
            alert("提交成功, 请等待审核员审核");
            console.log(response.data.data);
            
            // 上传完成后，将进度条设置为100%
            this.uploadProgress = 100;
            
            // 重置视频名称和上传消息
            this.videoName = '';
            this.uploadMessage = '';
            this.uploading = false; // 停止上传状态
            
            // 清空视频文件输入
            const fileInput = document.getElementById('file_input');
            fileInput.value = '';
            
            // 隐藏进度条
            const progressContainer = document.querySelector('.progress-container');
            progressContainer.style.display = 'none'; // 隐藏进度条
            
            // 清空标题
            const titleInput = document.querySelector(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box .input_box input");
            titleInput.value = '';
            
            location.reload();
        } else if (response.data.code === 0) {
            alert(response.data.msg);
            this.uploading = false; // 停止上传状态
        }
    }).catch(error => {
        this.uploading = false; // 上传失败
        console.error("上传出错:", error);
        
        // 即使上传失败，也应该隐藏进度条
        const progressContainer = document.querySelector('.progress-container');
        progressContainer.style.display = 'none'; // 隐藏进度条
    });
}

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
  .video-name {
  margin-top: 70px; /* 或者其他你希望的样式 */
  font-size: 14px;
  color: #333;
  position: relative;
}
/* 进度条容器样式 */
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .progress-container {
    width: 100%; /* 宽度设置为100% */
    position: relative; /* 相对于其父元素定位 */
    top: 0; /* 重置top值 */
    left: 0; /* 重置left值 */
    transform: none; /* 重置transform值 */
    z-index: 1; /* 根据需要调整z-index */
    margin-top: 10px; /* 根据需要调整与发布视频文本的距离 */
}

/* 进度条样式 */
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .progress-bar {
    height: 5px; /* 设置进度条高度 */
    background-color: #F6453D; /* 设置进度条颜色 */
    border-radius: 2.5px; /* 设置进度条圆角 */
    width: 0; /* 初始宽度为0 */
    transition: width 0.3s ease; /* 平滑过渡效果 */
}
.upload-message {
  color: #4CAF50; /* 绿色，表示成功 */
  font-size: 14px;
  position: relative;
  z-index: 1000;
  top: 15px;
  right: 10px;
}

  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_head_box{
    padding-left: 15px;
    width: 100%;
    height: 50px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-size: 15px;
    line-height: 50px;
    font-weight: 400;
    font-style: normal;
    text-transform: none;
    position: absolute;
    left: -47%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
      width: 10%;
      height: 5%;
      background: #FFFFFF;
      border-radius: 12px 12px 12px 12px;
      position: absolute;
      top: 9%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box img {
    position: absolute;
    top: 35px;
    left: -9px;
    width: 108px;
    height: 105px;
    -o-object-fit: cover;
    object-fit: cover;
    z-index: 16;
}

  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .upload-box{
    width: 220%;
      height: 530%;
      position: absolute;
  background: #FFFFFF;
  border-radius: 12px 12px 12px 12px;
  border: 1px solid #F6453D;
      top: 137%;
      left: -50%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .upload-box .left{
      width: 40%;
      height: 56%;
      position: absolute;
      top: 15%;
      left: 30%;
      background-image: url('@/assets/img/image 3.png');
      background-repeat: no-repeat;
      background-size: cover;
  }

  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .upload-box .right{
      width: 18%;
      height: 32%;
      position: absolute;
      top: 68%;
      left: 36%;
      background-image: url('@/assets/img/Group 37.png');
      background-repeat: no-repeat;
      background-size: cover;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box {
    width: 30%;
    height: 30%;
    position: absolute;
    top: 45%;
    left: 8%;
    
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .file_input_input {
      display: none; /* 隐藏原生文件输入框 */
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box .title_box{
      top: -23%;
      left: 1%;
      position: absolute;
  }
  
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box .check_text{
    width: 50%;
    height: 20%;
    position: absolute;
    top: 3%;
    left: 61%;
    pointer-events: none; /* 防止div阻挡select的点击事件 */
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box .check_text_two{
    width: 50%;
    height: 20%;
    position: absolute;
    top: 28%;
    left: 61%;
    pointer-events: none; /* 防止div阻挡select的点击事件 */
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box .check_text_three{
    width: 50%;
    height: 20%;
    position: absolute;
    top: 52%;
    left: 61%;
    pointer-events: none; /* 防止div阻挡select的点击事件 */
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box .check_text_four{
    width: 50%;
    height: 20%;
    position: absolute;
    top: 76%;
    left: 61%;
    pointer-events: none; /* 防止div阻挡select的点击事件 */
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box .input_box input {
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 12px 12px 12px 12px;
      border: 1px solid #EDF1F7;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box .input_box {
      width: 100%;
      height: 25%;
      background: #FFFFFF;
      border-radius: 12px 12px 12px 12px;
      border: 1px solid #EDF1F7;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box {
  width: 40%;
  height: 38%;
  position: absolute;
  top: 50%;
  left: 46%;
  
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_button {
      width: 62%;
      height: 24%;
      background: #F6453D;
      position: absolute;
      top: 101%;
      left: -21%;
      border-radius: 12px 12px 12px 12px;
  }
  
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_button .submit_button{
      width: 48%;
      height: 100%;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 24px;
      text-align: center;
      text-transform: none;
      border: none;
      background-color:transparent
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box{
      width: 100%;
      height: 24%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .title_box{
      width: 20%;
      height: 20%;
      position: absolute;
      top: -16%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .choose_input_box .input_box .input_text{
      width: 97%;
      height: 86%;
      background: #FFFFFF;
      border-radius: 12px 12px 12px 12px;
      border: 1px solid #EDF1F7;
      position: relative;
  }
  .myself{
    text-decoration: none;
    color: #8F9BB3;
  }
  img,button,:hover{
      cursor: pointer;
  }
/* 聚焦效果样式 */
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box .input_box input:focus {
    outline: none; /* 移除默认的焦点轮廓 */
    border: 1px solid gray; /* 设置输入框边框颜色 */
    box-shadow: 0 0 5px black; /* 设置输入框阴影，增强聚焦效果 */
}

   /* 屏幕宽度在小于600px之间的样式 */    
/* 屏幕宽度在600px到768px之间的样式 */
/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
    width: 19%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box{
    top: 50%;
  }
}
/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
    width: 13%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .title_and_input_box{
    top: 50%;
  }
}


</style>