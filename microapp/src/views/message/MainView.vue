<template>
  <div class="parent-web">
   <!-- 只有下拉箭头有点击事件，用于控制下拉菜单的显示 -->
           <div class="return" >
              <img :src="arrowSrc" alt="Down Arrow" class="dropdown-arrow" :class="{ flipped: isFlipped }" @click.stop="toggleDropdown($event)">
              <!-- 下拉菜单内容，只有当isMenuOpen为true时才显示 -->
                  <transition name="fade">
                    <div class="dropdown-content" v-if="isMenuOpen" @click.self="closeMenu">
                          <img src="@/assets/img/return.png" class="return_use" alt="" />
                            <div class="out" @click.prevent="logout">退出登录</div>
                              <!-- <img src="@/assets/img/out.png" class="logout" alt="" />
                            <div class="logout_out" @click.prevent="cancel">注销</div> -->
                    </div>
                  </transition>
      </div>
      <div class="head_box">
          <div class="head_left_box">
              <span class="left_image"><img src="@/assets/img/label.png" alt=""></span>
              <span class="left_text">Micro School</span>
          </div>
          <div class="head_right_box">
              <div class="query_box">
                <!--搜索框-->
                  <div class="query_image">
                      <img src="@/assets/img/search.png" alt="">
                      <!-- <img src="@/assets/img/search.png" alt=""> -->
                  </div>
                  <input type="text" v-model="inputValue" @keyup.enter="inputEnterFunction()" placeholder="搜索">
              </div>
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
                      <!-- <img src="@/assets/img/home_full.png" alt=""> -->
                      <img src="@/assets/img/home_full.png" alt="" >
                      <!-- <div class="choose_text">首页</div> -->
                      <keep-alive>
                      <router-link to="/web/school/web/main" class="choose_text">首页</router-link>
                      </keep-alive>
                  </div>
                  <div class="choose_image_box">
                      <img src="@/assets/img/user_close.png" alt="" @click="switchs">
                      <!-- <img src="@/assets/img/user_close.png" alt=""> -->
                      <!-- <div class="choose_text" @click="switchs">用户</div> -->
                      <keep-alive>
                      <router-link to="/web/school/web/application" class="choose_text" key='$route.fullPath' @click="switchs">用户</router-link>
                     </keep-alive>
                  </div>
              </div>
          </div>
        <div class="body_right_box">
              <div class="body_right_head_box">
                <div class="body_right_head_text_box" v-for="(learnObj,index) in learnPhaseList" :key="index" @click="chooseLearnPhase(index)">{{ learnObj.learnPhase }}</div>
              </div>
          <div class="body_right_content_box">
                  <div class="cent">
                      <div class="cent_text" v-for="(secondObj,index) in secondLabelList" :key="index" @click="chooseSecondLabel(index)">{{ secondObj.firstLevel }}</div>
                  </div>
                <div class="choose_box">
                    <div class="choose_box_choose_one">
                        <div class="choose_box_choose_one_box" v-for="(thirdObj,index) in thirdLabelList" :key="index" @click="chooseThirdLabel(index)">
                            <div class="choose_box_choose_one_box_img"><img :src="thirdObj.imageIndex" alt=""></div>
                            <div class="choose_box_choose_one_box_text">{{ thirdObj.secondLevel }}</div>
                        </div>
                    </div>
                </div>
                   <!-- 备案信息 -->
              <div class="footer">  
                  <div class="footer-logo">
                      <p2>|| Micro School</p2>
                      <label><a href="http://www.great-micro.net/liuyan/" >💼公司业务官网</a></label>
                  </div>
                  <div class="footer-body">
                      <div class="footer-body-text">
                          <img src="@/assets/img/footer_1.png" alt="手机">
                          <span>手机:13302905510</span>
                       </div>    
                       <div class="footer-body-text">
                          <img src="@/assets/img/footer_2.png" alt="手机">
                          <span>邮箱:minqiong.tan@moitta.com</span>
                       </div> 
                       <div class="footer-body-text">
                          <img src="@/assets/img/footer_1.png" alt="手机">
                          <span>手机:13302905510</span>
                       </div> 
                       <div class="footer-body-text">
                          <img src="@/assets/img/footer_3.png" alt="手机">
                          <span>地址:深圳市龙岗区龙城街道回龙埔社区花样年乐年广场13号楼A单元203-116室</span>
                       </div> 
                  </div>
                  <div class="footer-icp">
                      <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备2024341066号</a> | 
                      <a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备2024341066号</a>
                  </div>
             </div>
           </div>
         </div>
      </div>    
  </div>
</template>
<script>
import { WebSocketUtil } from '@/assets/js/websocket';
import { CookieUtil } from '@/assets/js/contants';
import { UtilHelper } from '@/assets/js/util_helper';
export default {
created(){
  const userInfo=UtilHelper.getObjectFromCookie(CookieUtil.userObject)
  this.userHeadshot=userInfo.headshot
  this.username=userInfo.userName
  this.token=userInfo.token
  this.account=userInfo.account
  this.queryLabelList(userInfo.token)
  WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
},

data() {
  return {
    isMenuOpen: false,
    arrowSrc: require('@/assets/img/majesticons.png'), // 假设图片路径正确
    token:"",
    userHeadshot:"",
    username:"",
    account:"",
    inputValue:"",
    list:[],
    learnPhaseList:[],  
    learnPhaseOption:{},
    secondLabelList:[],
    secondLabelOption:{},
    thirdLabelList:[],
    thirdLabelOption:{},
    fourLabelList:[],
    fourLabelOption:{},
    outColor:"transparent",
    isFlipped: false, // 控制图标是否翻转
  };
},

//刷新页面，达到清空缓存的效果。浏览器的返回按键
mounted() {
    if (window.name !== "noReload") {
      window.name =  window.name + "noReload";
      location.reload();
    } else {
      window.name = "";
    }
  },
methods: {
  async inputEnterFunction(){ 
    let obj={
        enterValue:this.inputValue,
        dateTime:UtilHelper.getNowDateTime()
    }
    UtilHelper.setObjectInCookie(CookieUtil.queryObject,obj,CookieUtil.queryDefaultTime)
    //等待新的搜索界面
    this.$router.push("/web/school/web/search")
  },
  async queryLabelList(token){
      await UtilHelper.queryLabelList(token).then(response=>{
          this.list=response.data
      })
      this.learnPhaseList=this.list
      this.learnPhaseOption=this.learnPhaseList[0]
      this.initLearnLabel()
  },
  async initLearnLabel(){
      this.secondLabelList=await this.learnPhaseList[0].dataList
      this.secondLabelOption=this.secondLabelList[0]
      this.initSecondLabel()
  },
  async initSecondLabel(){
       this.thirdLabelList=await this.secondLabelList[0].dataList
      this.thirdLabelOption=this.thirdLabelList[0]
   },
  chooseLearnPhase(index){
    const array= document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box")
    for (let i = 0; i < array.length; i++) {
      array[i].style.color="#8F9BB3"
    }
    array[index].style.color="#000000"
    this.learnPhaseOption=this.learnPhaseList[index]
    this.secondLabelList=this.learnPhaseOption.dataList
  },
  chooseSecondLabel(index){
    this.secondLabelOption=this.secondLabelList[index]
    this.thirdLabelList=this.secondLabelOption.dataList
    const array=document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .cent .cent_text")
    for (let i = 0; i < array.length; i++) {
      array[i].style.color="#8F9BB3"
      array[i].style.background="#ecf0f7"
    }
    array[index].style.color="#000000"
    array[index].style.background="#ffffff"
  },
  chooseThirdLabel(index){
    //此处实现cookie保存，并跳转到视频列表界面
    this.thirdLabelOption=this.thirdLabelList[index]
    let obj={
      learnPhase:`${this.learnPhaseOption.learnPhase}`,
      labelName:`${this.secondLabelOption.firstLevel}-${this.thirdLabelOption.secondLevel}`,
      fourLabelName:this.thirdLabelOption.dataList
    }
    UtilHelper.setObjectInCookie(CookieUtil.labelObject,obj,CookieUtil.userDefaultTime)
    //经下来进行跳转视频列表界面
    this.$router.push("/web/school/web/videoPlay")
  },
  toggleDropdown(event) {
     // 阻止事件冒泡到外层 .return div，以避免不必要的点击触发
     event.stopPropagation();
     this.isMenuOpen = !this.isMenuOpen;
     this.isFlipped = !this.isFlipped; // 切换图标翻转状态
     let option=document.querySelector(".parent-web .return")
     // 切换背景颜色
     if (this.outColor==="transparent") {
        this.outColor='#fff'
         option.style.backgroundColor=this.outColor
         option.style.zIndex = 200; // 当下拉框显示时，设置 z-index 为 200
     }else if(this.outColor==="#fff"){
         this.outColor='transparent'
        option.style.backgroundColor=this.outColor
        option.style.zIndex = 90; // 当下拉框隐藏时，设置 z-index 为 90
     }
    }
    ,
  closeMenu() {
    // 点击下拉菜单本身时关闭菜单
    this.isMenuOpen = false;

  },
  // 新增方法，用于跳转到用户界面
  goUser() {
    this.$router.push('/web/school/web/application');
  },
  // 新增方法，用于跳转到首页
  goHome() {
    this.$router.push('/web/school/webview');
  },
  logout() {
    alert('您已退出登录');
    // 在这里添加实际的退出登录逻辑
    UtilHelper.removeFromCookie(CookieUtil.userObject)
    this.$router.push('/web/school')
  },
  switchs(){
    UtilHelper.myPages(this)
   },
  cancel() {
    alert('您已注销');
    // 在这里添加实际的注销逻辑
  }
}};
</script>

<style scoped>
  @import '@/assets/css/web_default.css';
  .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box:nth-child(1){
      color: #000000;
  }
.parent-web .return {
width: 200px;
height: 50px;
position: fixed;
top: 11%;
left: 83%;
z-index: 100;
border-radius: 16px;
display: flex; /* 使用 flex 布局 */
align-items: center; /* 垂直居中 */
justify-content: center; /* 水平居中 */
cursor: pointer; /* 鼠标手型 */
background-color: transparent;
}


  .parent-web .return .dropdown-arrow{
     width: 2%;
     height: 3%;
     position: fixed;
     top: 5%;
     left: 94%;
    }

  .parent-web .return .return_use{
      position: absolute;
      width: 24%;
      height: 78%;
      border-radius: 0px 0px 0px 0px;
      border: 1px solid #EDF1F7; 
      top: 9%;
      left: 6%;
      /* background-image: url(@/assets/img/return.png);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center; 图片居中显示 */
  }
  .parent-web .return .logout{
      position: absolute;
      width: 24%;
      height: 34%;
      border-radius: 0px 0px 0px 0px;
      border: 1px solid #EDF1F7; 
      top: 51%;
      left: 6%;
      /* background-image: url(@/assets/img/out.png); */
      background-repeat: no-repeat;
      background-size: cover;
      /* background-size: 80% auto; 图片宽度设置为盒子宽度的50%，高度自动调整 */
      /* background-position: center; 图片居中显示 */
  }
  .parent-web .return .out{
       width: 109%;
       height: 43%;
       position: absolute;
       top: 18%;
       left: 38%;
       font-family: Noto Sans SC, Noto Sans SC;
       font-weight: 400;
       font-size: 14px;
       color: #DE350B;
       line-height: 20px;
       text-align: left;
       font-style: normal;
       text-transform: none;
   }
   .parent-web .return .logout_out{
       width: 109%;
       height: 43%;
       position: absolute;
       top: 58%;
       left: 38%;
       font-family: Noto Sans SC, Noto Sans SC;
       font-weight: 400;
       font-size: 14px;
       color: #222B45;
       line-height: 20px;
       text-align: left;
       font-style: normal;
       text-transform: none;
   }
   
   

  .parent-web .body_box .body_right_box .body_right_content_box{      
               width: 100%;
               height: 100%;
               position: relative;
               margin: 0 auto;
               overflow: auto;
               display: flex;
  }
  .parent-web .body_box .body_right_box .choose_box{
    flex: 1; /* 使 .choose_box 填充剩余空间 */
    border-radius:25px;
  }
  
  .parent-web .body_box .body_right_box .choose_box_choose_one{
      width: 46%;
      height: 75%;
      display: flex;
      flex-wrap: wrap; /* 允许子盒子换行 */
      justify-content: flex-start; /* 子盒子从左到右排列 */
      align-items: flex-start; /* 子盒子从上到下排列 */
      background: #FFFFFF;
      box-shadow: 0px 8px 32px 0px rgba(31,47,70,0.08);
      border-radius: 16px 16px 16px 16px;
      padding: 23px;
      position: relative;
      margin: 2.5%;
      margin-left: 5%;
      border-radius: 25px;
      box-sizing: border-box;
      left: 15%;
      top: 3%

  }
  .parent-web .body_box .body_right_box .choose_box_choose_one .choose_box_choose_one_box{
    width: 100px;
    height: 100px;
    border-radius: 16px 16px 16px 16px;
    display: flex;
    flex-direction: column; /* 子盒子将垂直排列 */
    margin-left: 14px;

  }
  .parent-web .body_box .body_right_box .choose_box_choose_one .choose_box_choose_one_box .choose_box_choose_one_box_img {
          width: 49%;
          position: relative;
          height: 48%;
          top: 0%;
          left: 24%;
          /* background-image: url(@/assets/img/Groupone.png); */
          background-repeat: no-repeat;
          background-size: cover;
  }
  .parent-web .body_box .body_right_box .choose_box_choose_one .choose_box_choose_one_box .choose_box_choose_one_box_img img{
          width: 100%;
          position: relative;
          height: 100%;
  }
  .parent-web .body_box .body_right_box .choose_box_choose_one .choose_box_choose_one_box .choose_box_choose_one_box_text {
    width: 100%;
    height: 20%;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 14px;
    color: #222B45;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }


  .parent-web .body_box .body_right_box .body_right_content_box .cent{
      height: 8%;
      width: 100%;
      background: #ECF0F7;
      border-radius: 12px 12px 12px 12px; 
      position: relative;  
      display: flex;
      justify-content: flex-start; 
         
  }
  .parent-web .body_box .body_right_box .body_right_content_box .cent .cent_text{
      width: 16%;
  height: 73%;
  text-align: center;
  border-radius: 8px 8px 8px 8px;
  font-size: 16px;
  color: #8F9BB3;
  top: 14%;
  left: 0.5%;
  line-height: 37px;
  position: relative;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .cent .cent_text:nth-child(1){
      color: #192038;
      background: #FFFFFF;
  }
img  , button:hover{
  cursor: pointer;
}
.parent-web .body_box .body_right_box .body_right_content_box .cent:hover,
.parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box{
  cursor: pointer;
  z-index: 102;
}
.footer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 110px;
  position: relative;
  background: SlateGray;
  color: aliceblue;
  font-size: 12px;
}

.footer .footer-logo {
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: left;
  padding-left: 50px;
  gap: 50px;
  align-items: center;
  position: absolute;
  top: 0;

}
.footer .footer-logo a{
  text-decoration:none;
}
.footer .footer-body {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 70%;
  padding-left: 20px;
  gap: 30px;
}
.footer .footer-body .footer-body-text:nth-child(4){
  font-size: 14px;
  flex-grow: 1;
}
.footer .footer-body img{
  height: 20px;
  width: 20px;
}
.footer .footer-icp {
  font-size: 12px;
  color: red;
  text-align: center;
  width: 100%;
  height: 15%;
  bottom: 0;
  position: absolute;
}
.footer-icp a {
  text-decoration: none;
  margin: 0 5px;
  color: #000;
}
/* 图标初始状态 */
.dropdown-arrow {
    transition: transform 0.3s ease; /* 平滑过渡效果 */
}

/* 图标翻转180度状态 */
.dropdown-arrow.flipped {
    transform: rotate(180deg); /* 翻转180度 */
}


/* 屏幕宽度在小于600px之间的样式 */
@media(max-width: 600px) {
  .parent-web .body_box .body_right_box .choose_box_choose_one{
    zoom: 60%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .cent{
    zoom: 50%;
  }
  .parent-web .body_box .body_right_box .body_right_head_box .body_right_head_text_box{
    zoom: 40%;
    font-size: 15px;
  }
  .parent-web .body_box .body_right_box .body_right_head_box{
    font-size: 30px;
  }
  .parent-web .body_box .body_left_box{
    zoom: 70%;
  }
   .parent-web .head_box{
   display: flex;
   height: 10%;
   zoom: 60%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .cent{
    height: 5%;
  }
  .parent-web .return .dropdown-arrow{
    top:3%
  }
  .parent-web .return{
    width: 22%;
    left: 80%
  }
}

/* 屏幕宽度在600px到768px之间的样式 */
@media  (max-width: 768px) {
  .parent-web .head_box{
   display: flex;
   height: 12%;
   zoom: 70%;
  } 
  .parent-web .body_box .body_right_box .choose_box{
    zoom: 60%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .cent{
    zoom: 60%;
    font-size: 8px;
  }
  .parent-web .body_box .body_right_box .body_right_head_box{
    zoom: 50%;
    font-size: 8px;
  }
}

 /* 屏幕宽度在768px到992px之间的样式 */
 @media (min-width: 768px) and (max-width: 992px) {
  .parent-web .head_box{
   display: flex;
   height: 12%;
   zoom: 80%;
  } 
  .parent-web .body_box .body_right_box .body_right_head_box,
  .parent-web .body_box .body_right_box .body_right_content_box .cent{
   zoom: 60%;
  }
  .parent-web .body_box .body_right_box .choose_box_choose_one{
    zoom: 70%;
  }
  .parent-web .return .dropdown-arrow{
    top:4%
  }
  .parent-web .body_box .body_right_box .body_right_content_box .cent{
    height: 5%;
  }
}

 /* 屏幕宽度在992px到1200px之间的样式 */
 @media (max-width: 1200px) and (min-width: 992px) {
  .parent-web .head_box{
   display: flex;
   height: 10%;
   zoom: 100%;
  } 
  .parent-web .body_box .body_right_box .body_right_head_box,
  .parent-web .body_box .body_right_box .body_right_content_box .cent{
   zoom: 70%;
   font-size: 20px;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .cent{
    height: 5%;
    font-size: 18px;
  }
  .parent-web .return .dropdown-arrow{
    top:3.5%;
   
  }
 }

/* 屏幕宽度在1200px到1300px之间的样式 */
@media (max-width: 1300px) and (min-width: 1200px) and (max-height: 700px) and (min-height: 400px) {
      .parent-web{
             zoom: 85%;
        }
        .parent-web .return .dropdown-arrow{
          top:6%
        }
    }
    /* 屏幕宽度1280之间的样式 */
    @media (max-width: 1300px) and (min-width: 1200px) and (max-height: 1300px) and (min-height: 800px) {
      .parent-web{
             zoom: 100%;
           font-size: 20px;
        }
        .parent-web .return .dropdown-arrow{
          top:3%
        }
        .parent-web .body_box .body_right_box .body_right_head_box {
            zoom: 90%;
            font-size: 20px;
        }
        .parent-web .body_box .body_right_box .choose_box_choose_one{
            zoom: 102%;
        }
    }
/* 屏幕宽度在大于1300px到1500px之间的样式 */
@media (max-width:1500px) and (min-width: 1300px) {
.parent-web .head_box{
   display: flex;
   height: 14%;
   zoom: 90%;
  } 
  .parent-web .body_box .body_right_box .choose_box_choose_one{
    zoom: 90%;
  }
  .parent-web .return .dropdown-arrow{
    top:3%
  }
}
  /* 屏幕宽度在大于1500px之间的样式 */
@media (min-width: 1800px) {
.parent-web{
           zoom: 110%;
        }
 .parent-web .head_box{
    zoom: 130%;
        }
    .parent-web .body_box .body_right_box .choose_box_choose_one{
            zoom: 120%;
        }
}

       
  
 </style>