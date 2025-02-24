import qs from 'qs'; // 导入 qs 库
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { CONNECT, CookieUtil, QueryPageUtil } from '@/assets/js/contants.js'
const UtilHelper = {
    /**
     * 使用 CryptoJS 进行 MD5 加密
     * @param {string} text - 需要加密的文本
     * @returns {string} - 加密后的 MD5 字符串
     */
    encryptWithMD5(text) {
        return CryptoJS.MD5(text).toString();
    },
    /**
     * 使用 js-cookie 进行 Cookie 存储
     * @param {string} key - 需要存储的key
     * @param {object} value - 需要存储的value
     * @param {number} expires - 需要过期时间
     */
    setCookie(key, value, hours) {
        const now = new Date()
        const expires = new Date(now.getTime() + hours * 60 * 60 * 1000)
        Cookies.set(key, value, { expires: expires })
    },
    /**
     * 使用 js-cookie 进行 Cookie 获取
     * @param {string} key - 需要获取value的key值
     * @returns {string} - value值
     */
    getCookie(key) {
        return Cookies.get(key).toString();
    },
    /**
     * 使用 js-cookie 进行 Cookie 存储
     * @param {string} key - 需要存储的key
     * @param {object} obj - 需要存储的对象
     * @param {number} hour - 需要过期时间
     */
    setObjectInCookie(key, obj, hours) {
        const now = new Date()
        const expires = new Date(now.getTime() + hours * 60 * 60 * 1000)
        const jsonString = JSON.stringify(obj);
        Cookies.set(key, jsonString, { expires: expires });
    },
    /**
     * 使用 js-cookie 进行 Cookie 获取
     * @param {string} key - 需要获取value对象的key值
     * @returns {string} - value对象值
     */
    // 使用 js-cookie 库从 Cookie 中获取一个 JSON 字符串，并解析为对象。
    getObjectFromCookie(key) {
        const jsonString = Cookies.get(key);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null;
    },
    getObjectFromCookieToken(key) {
        const jsonString = Cookies.get(key);
        if (jsonString) {
            return JSON.parse(jsonString).token;
        }
        return null;
    },
    /**
     * 删除制定key的cookie
     * @param {string} key 
     */
    removeFromCookie(key) {
        Cookies.remove(`${key}`)
    },
    /**
     * 根据传递过来的cookieName判断是否过期
     * @param {string} cookieName 
     * @returns 
     */
    isCookieExpired(cookieName) {
        const cookieValue = Cookies.get(cookieName);
        if (!cookieValue) {
            return true; // 如果找不到 Cookie，则认为它已经过期
        }

        const cookie = Cookies.get(cookieName, { parse: true });
        if (cookie.expires) {
            const expiration = new Date(cookie.expires);
            const now = new Date();
            return now > expiration;
        }
        return false; // 如果没有设置过期时间，默认不过期
    },
    /**
     * 根据传递过来的手机号,向后端发送发送验证码请求
     * @param {string} userPhone 
     */
    sendCodeHelper(userPhone) {
        const requestBody = {
            phone: userPhone
        };
        const requestParams = qs.stringify(requestBody);
        axios.post(`${CONNECT.generalhostpost()}/sendCode`, requestParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.code === 1) {
                alert("发送成功")
            } else if (response.data.code === 0) {
                alert("发送失败")
            }
        })

    },
    /**
     * 设置用户头像，并展示在网页上
     * @returns {string} userData.headshot 
     */
    getUserHeadshotUrl() {
        const userData = UtilHelper.getObjectFromCookie('userData')
        return userData.headshot
    },
    /**
     * 该方法是实现搜索框里面的数据查询
     * @param {string} text              -这是搜索框里面的数据
     * @param {number} pageNumber        -这是页数
     * @param {number} pageSize          -这是一页之中有多少视频
     * @param {string} token             -用户的jwt令牌
     * @returns                          -返回Promise对象里的数组
     */
    queryVideo(text, pageNumber, pageSize, token) {
        return new Promise((resolve, reject) => {
            axios.get(`${CONNECT.generalhostpost()}/video/query`, {
                params: {
                    data: text,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                },
                headers: {
                    "token": token
                }
            }).then(response => {
                const array = response.data.data;
                resolve(array)
            }).catch(error => {
                reject(error)
            })
        })

    },
    /**
     * 向服务器申请label列表
     * @param {string} token 
     * @returns 
     */
    queryLabelList(token) {
        return new Promise((resolve, reject) => {
            axios.get(`${CONNECT.generalhostpost()}/label/list`, {
                headers: {
                    "token": token
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * 使用 js-cookie 进行 Cookie 获取 token
     * @param {string} key - 需要获取value的key值
     * @returns {string} - value值
     */
    getToken(key) {
        return JSON.parse(Cookies.get(key)).token;
    },
    /**
     * 根据updateName修改value值
     * @param {string} key 
     * @param {Object} obj 
     * @param {number} hours 
     * @param {string} updateName 
     * @param {string} updateText 
     */
    updateObjectInCookie(key, updateName, updateText) {
        const now = new Date()
        const expires = new Date(now.getTime + CookieUtil.userDefaultTime * 60 * 60 * 1000)
        let myCookie = this.getObjectFromCookie(key)

        if (updateName === "headshot") {
            myCookie.headshot = updateText
        }
        const jsonString = JSON.stringify(myCookie);
        Cookies.set(key, jsonString, { expires: expires });
    },
    async queryVideoList(inputValue) {
        let pageNumber = QueryPageUtil.defaultPageNumber
        let pageSize = QueryPageUtil.pageSize
        let videoList = []
        const token = this.getObjectFromCookieToken(CookieUtil.userObject)
        await this.queryVideo(inputValue, pageNumber, pageSize, token).then(array => {
            videoList = array
        }).catch(error => {
            console.error(error);
        })
        //通过搜索获取功能的视频列表已经实现，等待新的页面进行填装
        console.log(videoList);
        return videoList
    },
    getNowDateTime() {
        const now = new Date()
        const month = now.getMonth()
        const date = now.getDate()
        const hour = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        return `${now.getFullYear()}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}T${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    },
    myPages(that) {
        let userTypeId = UtilHelper.getObjectFromCookie(CookieUtil.userObject).userTypeId
        if (userTypeId == 1) {
            that.$router.push("/web/school/web/time")
        }
        if (userTypeId == 2 || userTypeId == 3) {
            that.$router.push("/web/school/web/application")
        }
    },
    chooseMyOnOrOffVideo(that, pageState) {
        UtilHelper.setCookie(CookieUtil.myVideoPageState, pageState, CookieUtil.userDefaultTime)
        this.activeTab = pageState; // 更新 activeTab 状态
        that.$router.push("/web/school/webview")
    }
};
export { UtilHelper };
