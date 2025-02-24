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
                            <router-link to="/web/school/web/time" class="tet"> &nbsp; &lt; &nbsp;返回</router-link>
                        </div>
                        <div class="upload_video_content_box">
                            <div class="upload_video_content_text">
                                申请成为教师/培训机构
                            </div>
                            <div class="speak_text_box">请选择要申请转换的角色</div>
                            <form id="upload_form" @submit.prevent="queryRoleInfo()" enctype="multipart/form-data">
                                <div class="title_and_input_box">
                                    <div class="input_box">
                                        <select class="choose_select">
                                            <option value="教师">教师</option>
                                            <option value="机构">机构</option>
                                        </select>
                                        <div class="down_box"></div>
                                    </div>
                                </div>
                                <div class="change_teacher_box">
                                    <div class="speak_text_box">请上传身份证</div>
                                    <div class="body_id_card_box">
                                        <label for="file_input01" class="body_id_card_front_box">
                                            <div class="body_id_card_front_image"></div>
                                            <div class="id_card_speak">身份证正面</div>
                                            <img v-if="idCardFrontPreview" :src="idCardFrontPreview" class="id_card_preview" alt="预览图">
                                        </label>
                                        <input type="file" id="file_input01" name="file" class="file_input_box" @change="onFileChange($event, 'idCardFrontPreview')">
                                        <label for="file_input02" class="body_id_card_back_box">
                                            <div class="body_id_card_back_image"></div>
                                            <div class="id_card_speak">身份证反面</div>
                                            <img v-if="idCardBackPreview" :src="idCardBackPreview" class="id_card_preview" alt="预览图">
                                        </label>
                                        <input type="file" id="file_input02" name="file" class="file_input_box" @change="onFileChange($event, 'idCardBackPreview')">
                                    </div>
                                </div>
                                <div class="prove_box">
                                    <div class="speak_text_box">请点击上传教师证或者机构营业执照</div>
                                    <label for="file_input03" class="prove_image_box">
                                        <div class="increase_image_box"></div>
                                        <img v-if="provePreview" :src="provePreview" class="prove_preview" alt="预览图">
                                    </label>
                                    <input type="file" id="file_input03" name="file" class="file_input_box" @change="onFileChange($event, 'provePreview')">
                                </div>
                                <div class="input_button">
                                    <button type="submit" class="submit_button">
                                        提交审核
                                    </button>
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

export default {
    created() {
        const userInfo = UtilHelper.getObjectFromCookie(CookieUtil.userObject);
        this.userHeadshot = userInfo.headshot;
        this.username = userInfo.userName;
        this.token = userInfo.token;
        this.account = userInfo.account;
        WebSocketUtil.createWebSocket(userInfo.account,userInfo.token,this)
    },
    // mounted() {
    //     if (location.href.indexOf("#reloaded") === -1) {
    //         location.href = location.href + "#reloaded";
    //         location.reload();
    //     }
    // },
    data() {
        return {
            token: "",
            userHeadshot: "",
            username: "",
            account: "",
            idCardFrontPreview: null,
            idCardBackPreview: null,
            provePreview: null
        };
    },
    methods: {
        onFileChange(event, previewType) {
            const input = event.target;
            const reader = new FileReader();

            reader.onload = () => {
                const dataURL = reader.result;
                this[previewType] = dataURL;
            };

            reader.readAsDataURL(input.files[0]);
        },
        queryRoleInfo() {
            const role = document.querySelector(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .choose_select").value;
            const idCardInputs = document.querySelectorAll(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .file_input_box");
            const teacherOrLicenseCard = document.querySelector(".parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .prove_box .file_input_box").files[0];
            const formData = new FormData();
            formData.append("account", this.account);
            formData.append("teacherIdCardImage", idCardInputs[0].files[0]);
            formData.append("teacherIdCardBackImage", idCardInputs[1].files[0]);

            if (role === "教师") {
                formData.append("teacherCardImage", teacherOrLicenseCard);
                this.changeRole(formData);
            } else if (role === "机构") {
                formData.append("licenseImage", teacherOrLicenseCard);
                this.changeRole(formData);
            } else {
                alert("请选择要转换的角色");
            }
        },
        goUser() {
            this.$router.push('/web/school/webview');
        },
        goHome() {
            this.$router.push('/web/school/web/main');
        },
        changeRole(formData) {
            const that = this;
            axios.post(`${CONNECT.generalhostpost()}/chang/role`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": this.token
                }
            }).then(response => {
                if (response.data.code === 1) {
                    alert("提交成功, 请等待审核员审核");
                    that.$router.push('/web/school/web/time');
                } else if (response.data.code === 0) {
                    alert(response.data.msg);
                }
            });
        }
    }
};
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
    position: absolute;
    left: -46%;
    height: 50px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-size: 20px;
    line-height: 50px;
    font-weight: 400;
    font-style: normal;
    text-transform: none;
    
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_head_box .tet{
    text-decoration: none;
    color: #000000;
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
    width: 300px;
    height: 48px;
    font-family: Noto Sans SC, Noto Sans SC;
    font-weight: 400;
    font-size: 28px;
    line-height: 48px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box{
    margin-top: 5px;
    width: 100%;
    height: 50px;
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
    background-image: url("@/assets/img/chevron.png");
    background-repeat:no-repeat ;
    background-position-x: 96%;
    background-position-y: 40%;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .title_and_input_box .down_box{
    width: 16px;
    height: 9px;
    background-color: transparent;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box{
    width: 100%;
    height: 130px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box{
    margin-top: 12px;
    width: 100%;
    height: 85px; 
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_front_box,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_back_box{
    width: 145px;
    height: 85px;
    border: 1px solid #F6453D;
    display: inline-block;
    border-radius: 12px;
    position: relative;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .file_input_box
{
    display: none;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_back_box{
    margin-left: 10px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_front_box .body_id_card_front_image,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_back_box .body_id_card_back_image{
    width: 91px;
    height: 68px;
    position: absolute;
    margin-top: 10px;
    margin-left: 10px;
    background-repeat:no-repeat ;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_front_box .body_id_card_front_image{
    background-image: url("@/assets/img/Frameone.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_back_box .body_id_card_back_image{
    background-image: url("@/assets/img/Frametwo.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_front_box .id_card_speak,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_back_box .id_card_speak{
    width: 40px;
    height: 10px;
    margin-top: 35px;
    margin-left: 101px;
    position: absolute;
    font-size: 7px;
    color: #7D858E;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .prove_box{
    width: 100%;
    height: 180px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .prove_box .prove_image_box{
    margin-top: 10px;
    width: 100%;
    height: 182px;
    background: #FFFFFF;
    border-radius: 12px ;
    border: 1px solid #F6453D;
    display: block;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .prove_box .prove_image_box img{
    position: relative;
    top: -139px;
    width: 200px;
    height: 100px;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .prove_box .prove_image_box .increase_image_box{
    width: 64px;
    height: 64px;
    margin: 59px auto;
    background-image: url("@/assets/img/Group 37.png");
    background-repeat: no-repeat;
    background-size: cover;
}
/* 新增样式 */
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_front_box .id_card_preview,
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .change_teacher_box .body_id_card_box .body_id_card_back_box .id_card_preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90%;
    object-fit: cover; /* 保持图片比例并填充整个区域 */
    z-index: 1; /* 确保预览图片覆盖在其他内容之上 */
}


.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box .prove_box .file_input_box{
    display: none;
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
input,button,img:hover{
    cursor:pointer
}

 
/* 屏幕宽度在小于768px之间的样式 */
@media (max-width: 768px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
        zoom: 80%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
            zoom: 65%;
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
        zoom: 100%;
  } 
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box {
            zoom: 80%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
            zoom: 80%;
  }
}
/* 屏幕宽度大于1200px之间的样式 */
@media (max-width:1400px) and (min-width: 1200px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box {
            zoom: 80%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
            zoom: zoom;

  }
}
/* 屏幕宽度大于1200px之间的样式 */
@media  (min-width: 1400px) {
    .parent-web .head_box{
        display: flex;
        height: 12%;
}
.parent-web .body_box .body_right_box .body_right_content_box .upload_video_box {
            zoom: 80%;
  }
  .parent-web .body_box .body_right_box .body_right_content_box .upload_video_box .upload_video_content_box{
            zoom: zoom;

  }
}


</style>