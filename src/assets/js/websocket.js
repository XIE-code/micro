import ReconnectingWebSocket from 'reconnecting-websocket';
import { CONNECT, CookieUtil } from '@/assets/js/contants.js'
import axios from 'axios';
import { UtilHelper } from './util_helper';
const WebSocketUtil = {
  webSocketService: null,
  token: null,
  account: null,
  webThat: null,
  host: "mt.micro-school.cn",
  //host: "127.0.0.1",
  post: "",
  methodUrl: "/websocket/micro/school",
  pageNumber: 1,
  pageSize: 10,
  createWebSocket(account, token, webThat) {
    if ('WebSocket' in window) {
      this.account = account
      this.token = token
      this.webThat = webThat
      const url = `wss://${this.host}${this.post}${this.methodUrl}/${this.account}?token=${encodeURIComponent(this.token)}`;
      this.webSocketService = new ReconnectingWebSocket(url);
    } else {
      alert("当前浏览器不支持 WebSocket");
    }
    WebSocketUtil.initWebSocket()
  },
  initWebSocket() {
    this.webSocketService.onopen = (event) => {
      console.log("WebSocket 连接已建立", event);
    };

    this.webSocketService.onclose = (event) => {
      console.log("WebSocket 连接已关闭", event);
    };

    this.webSocketService.onmessage = (event) => {
      console.log("收到消息: " + event.data);
      if ('Welcome to the WebSocket server!' === event.data) {
        return
      }

      let obj = JSON.parse(event.data)
      this.videoFromLabel(obj.learnPhase, obj.labelName, this)
      //经下来进行跳转视频列表界面
      this.webThat.$router.push("/web/school/web/video")
    };

    this.webSocketService.onerror = (event) => {
      console.error("WebSocket 通信发生错误", event);
    };
  },
  sendMessage(messages) {
    if (this.webSocketService && this.webSocketService.readyState === WebSocket.OPEN) {
      this.webSocketService.send(messages);
      console.log(`已发送信息: ${messages}`);
    } else {
      console.error("WebSocket 连接未建立或已关闭");
    }
  },
  closeWebSocket() {
    if (this.webSocketService) {
      this.webSocketService.close();
    }
  },
  videoFromLabel(learnPhase, labelName) {
    const that = this
    axios.get(`${CONNECT.generalhostpost()}/web/label/video/query`, {
      params: {
        learnPhase: learnPhase,
        labelName: labelName,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }, headers: {
        'token': that.token
      }
    }).then(response => {
      that.videoList = response.data.data.list
      let obj = that.videoList.shift()
      UtilHelper.setObjectInCookie(CookieUtil.videoObject, obj, CookieUtil.userDefaultTime)
      localStorage.setItem(CookieUtil.videoList, JSON.stringify(that.videoList))
      this.webThat.$router.push("/web/school/web/video")
    })
  }
}
export { WebSocketUtil };