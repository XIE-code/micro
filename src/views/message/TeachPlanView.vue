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
                    <input type="text" @keyup.enter="inputEnterFunction()" v-model="inputValue" placeholder="搜索">
                </div>
                <div class="user_box">
                    <span class="head_image"><img :src='userHeadshot' alt=""></span>
                    <div class="user_text">{{ username }}</div>
                </div>
                
            </div>
        </div>
        <div class="body_box">
            <div class="body_left_box">
                <div class="choose_box">
                    <div class="choose_image_box">
                        <img src="@/assets/img/home.png" alt="" @click="goHome">
                        <div class="choose_text">首页</div>
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
                    <div class="body_right_head_text_box">已发布视频</div>
                    <div class="body_right_head_text_box">已下架视频</div>
                    <div class="body_right_head_text_box">个人信息</div>
                </div>
                <div class="body_right_content_box">
                    <div class="upload_video_box">
                        <div class="upload_video_head_box">
                            <router-link to="/web/school/web/time" class="upload_video_head_box"> &nbsp; &lt; &nbsp;返回</router-link>
                        </div>
                        <div class="upload_video_content_box">
                            <div class="upload_video_content_text">
                                添加自定义课程
                            </div>
                            <form id="upload_form" @submit.prevent="submitTeachPlan()">
                                <div class="label_box">
                                    <div class="label_left_box">
                                        <div class="choose_input_box">
                                            <div class="title_box">课程开始日期</div>
                                            <div class="input_box">
                                                <div class="img_box"></div>
                                                <!-- input到时候要通过js实现value的实际更新 -->
                                                <input type="date" class="input_datetime" size="1" :value="`2023-10-01`">
                                            </div>
                                            <div class="title_box">课程结束日期</div>
                                            <div class="input_box">
                                                <div class="img_box"></div>
                                                <!-- input到时候要通过js实现value的实际更新 -->
                                                <input type="date" class="input_datetime" size="1" :value="`2023-10-02`">
                                            </div>
                                            <div class="title_box">课程开始时间</div>
                                            <div class="input_box">
                                                <div class="img_box"></div>
                                                <!-- input到时候要通过js实现value的实际更新 -->
                                                <input type="time" class="input_datetime" size="1" :value="`12:00`">
                                            </div>
                                            <div class="title_box">课程结束时间</div>
                                            <div class="input_box">
                                                <div class="img_box"></div>
                                                <!-- input到时候要通过js实现value的实际更新 -->
                                                <input type="time" class="input_datetime" size="1" :value="`13:00`">
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="label_right_box">
                                        <div class="choose_input_box">
                                            <div class="title_box">类别</div>
                                            <div class="input_box">
                                                <select class="input_text" @change="onLearnPhaseSelectChange">
                                                    <option v-for="option in learnPhaseList" :key="option.learnPhase" :value="option.learnPhase" v-html="getLearnLabelOption(option)"></option>
                                                </select>
                                                <div class="check_text">一级分类</div>
                                            </div>
                                        </div>
                                        <div class="choose_input_box">
                                            <div class="title_box"></div>
                                            <div class="input_box">
                                                <select class="input_text" @change="onSecondLabelSelectChange">
                                                  <option v-for="option in secondLabelList" :key="option.firstLevelId" :value="option.firstLevel" v-html="getSecondLabelOption(option)"></option>
                                                </select>
                                                <div class="check_text">二级分类</div>
                                            </div>
                                        </div>
                                        <div class="choose_input_box">
                                            
                                            <div class="title_box"></div>
                                            <div class="input_box">
                                                <select class="input_text" @change="onThirdLabelSelectChange">
                                                    <option v-for="option in thirdLabelList" :key="option.secondLevelId" :value="option.secondLevel" v-html="getThirdLabelOption(option)"></option>
                                                </select>
                                                <div class="check_text">三级分类</div>
                                            </div>
                                        </div>
                                        <div class="choose_input_box">
                                            <div class="title_box">&nbsp;</div>
                                            <div class="input_box">
                                                <select class="input_text" @change="onFourLabelSelectChange">
                                                    <option v-for="option in fourLabelList" :key="option.fourLevelId" :value="option.fourLevel" v-html="getFourLabelOption(option)"></option>
                                                  </select>
                                                <div class="check_text">四级分类</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input_button">
                                        <button type="submit" class="submit_button" >提交审核</button>
                                    </div>
                                </div>
                            </form>
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
        this.queryLabelList(this.token)
        WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
        
    },
//     mounted(){
//         this.initDateAndTime()
//         if (location.href.indexOf("#reloaded") == -1) {
//                     location.href = location.href + "#reloaded";
//               location.reload();
//     }
// },
        // 新增方法，用于跳转到用户界面
            goUser() {
              this.$router.push('/web/school/webview');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
     //解决vue渲染不到位的方法
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
            inputValue:""
        };
        
    },
    methods:{
        async queryLabelList(token){
            await UtilHelper.queryLabelList(token).then(response=>{
                this.list=response.data
            })
            await this.firstLabel()
        },
        // 新增方法，用于跳转到用户界面
        goUser() {
               this.$router.push('/web/school/webview');
             },
        // 新增方法，用于跳转到首页
             goHome() {
               this.$router.push('/web/school/web/main');
             },
        firstLabel(){
            this.learnPhaseList=this.list
            this.secondLabel(this.learnPhaseList[0])
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
            }
        },
        onFourLabelSelectChange(event){
            const selectedFourLabel = event.target.value;
            if (this.FourLabelList) {
                // 因为刚开始设计数据库时是将学习阶段和年龄阶段是分开的，所以现在的thirdLevel是fourLabel
                this.selectFourLabelOption = this.FourLabelList.find(option => option.thirdLevel == selectedFourLabel);
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
        initDateAndTime(){
            const dateTimeArray= document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_left_box .choose_input_box .input_box .input_datetime")
            const now=new Date()
            try {
                let year=now.getFullYear()
                let month=now.getMonth()+1
                let day=now.getDate()
                dateTimeArray[0].value=`${year}-${month}-${day<10?"0"+day:day}`
                dateTimeArray[1].value=`${year}-${month}-${(day+1)<10?"0"+(day+1):(day+1)}`
                let hours=now.getHours()
                let minutes=now.getMinutes()
                dateTimeArray[2].value=`${hours}:${minutes<10?'0'+minutes:minutes}`
                dateTimeArray[3].value=`${(hours+1)>=24?1:(hours+1)}:${minutes<10?'0'+minutes:minutes}`
            } catch (error) {
                console.log(error);
            }
        },
        queryTeachPlan(){
            const dateTimeArray= document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_left_box .choose_input_box .input_box .input_datetime")
            if (dateTimeArray[0].value==null||dateTimeArray[0].value==''||dateTimeArray[1].value==null||dateTimeArray[1].value=='') {
                alert("数据错误,请填写日期")
                return
            }
            const inputArray=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_right_box .choose_input_box .input_box .input_text")
            for (let i = 0; i < inputArray.length; i++) {
                const element = inputArray[i];
                console.log(element.value);
            }
            let obj={
                account:this.account,
                startDate:dateTimeArray[0].value,
                endDate:dateTimeArray[1].value,
                startTeachTime:dateTimeArray[2].value+":00",
                endTeachTime:dateTimeArray[3].value+":00",
                learnPhase:inputArray[0].value,
                labelName:`${inputArray[1].value}-${inputArray[2].value}`,
            }
            if(inputArray[3].value!=''){
                obj.labelName+=`-${inputArray[3].value}`
            }
            return obj;
        },
        submitTeachPlan(){
            const obj=this.queryTeachPlan()
            console.log(obj);
            axios.post(`${CONNECT.generalhostpost()}/teach/plan/submit`,obj,{
                headers:{
                    "token":this.token
                }
            }).then(response=>{
                if (response.data.code===1) {
                    alert(response.data.data)
                }else if (response.data.code===0) {
                    alert(response.data.msg)
                }
            }).catch(error=>{
                console.error(error);
            })
            
        }

    }
})
</script>
<style scoped>
@import '@/assets/css/web_default.css';
*{
    box-sizing: border-box;
}
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
    text-align: left;
    font-size: 20px;
    line-height: 50px;
    font-weight: 400;
    font-style: normal;
    text-transform: none;
    text-decoration: none;
    color: #000000;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
    width: 64%;
    height: 98%;
    background-color: #FFFFFF ;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .speak_text_box{
    
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .speak_text_box:nth-child(0){
    margin-top: 20px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .upload_video_content_text{
    width: 86%;
    height:7%;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 28px;
    line-height: 48px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box{
    width: 100%;
    height: 500px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .label_left_box,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .label_right_box{
    margin-top: 50px;
    width: 50%;
    height: 300px;
    position: relative;
    display: inline-block;
    white-space: nowrap;
}

.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .label_left_box .choose_input_box .title_box,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .label_right_box .choose_input_box .title_box{
    width: 100%;
    height: 20px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    color: #192038;
    line-height: 20px;
    position: relative;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .label_left_box .choose_input_box,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .label_right_box .choose_input_box:nth-child(1){
    width: 100%;
    height: 80px;
    
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .label_right_box .choose_input_box{
    border-top: 8px;
    height: 80px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_left_box .choose_input_box .input_box,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_right_box .choose_input_box .input_box{
    margin-top: 8px;
    width: 260px;
    height: 52px;
    border-radius: 12px;
    border: 1px solid #EDF1F7;
    line-height: 52px;
    position: relative;
    display: flex;
    align-items: center;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_left_box .choose_input_box .input_box .img_box{
    width: 21px;
    height: 23px;
    left: 10px;
    background-image: url(@/assets/img/history.png);

    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_left_box .choose_input_box .input_box .input_datetime,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_right_box .choose_input_box .input_box .input_text{
    width: 75%;
    height: 30px;
    right: 20px;
    font-size: 16px;
    outline:none;
    border:0;
    background-color: inherit;
    position: absolute;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_right_box .choose_input_box .input_box .input_text{
    font-size: 14px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_right_box .choose_input_box .input_box .input_text{
    width: 70%;
    right: none;
    left: 10px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box form .label_box .label_right_box .choose_input_box .input_box .check_text{
    right: 10px;
    font-size: 14px;
    color: #8F9BB3;
    position:absolute;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .input_button{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .input_button .submit_button{
    margin-top: 100px;
    width: 300px;
    height: 50px;
    border-radius: 12px;
    background-color: #f6453d;
    border:none;
}

.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box .input_button .submit_button:active{
    background-color: #d6281f;
}

/* 屏幕宽度小于768px的样式 */
@media  (max-width: 768px) {
  .parent-web .head_box{
   display: flex;
   height: 12%;
   zoom: 60%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box{
    zoom: 70%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .label_box{
    width: 128%;
  }
}
/* 屏幕宽度在768px到992px之间的样式 */
@media (min-width: 768px) and (max-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 80%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box {
            zoom: 70%;
  }
}

/* 屏幕宽度在992px到1200px之间的样式 */
@media (max-width: 1200px) and (min-width: 992px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 80%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box {
            zoom: 80%;
  }
}
/* 屏幕宽度大于1200px之间的样式 */
@media  (min-width: 1200px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box {
            zoom: 80%;
  }
}


</style>