export const CONNECT = {
    host: 'https://192.168.1.84:8800/admin',
    port: '',
    general: '/general',
    private: "/private",
    generalhostpost: () => {
        return `${CONNECT.host}${CONNECT.port}${CONNECT.general}`
    },
    privateHostPost: () => {
        return `${CONNECT.host}${CONNECT.port}${CONNECT.private}`
    }
};
export const CookieUtil = {
    /**
     * userObject是代表cookie的key值,主要用于获取cookie的value值方法
     */
    userObject: 'userData',
    /**
     * userDefaultTime是cookie的默认时间，一般以小时计时
     */
    userDefaultTime: 24,
    /**
     * 是userData的头像key值,主要用于获取cookie的value值方法
     */
    headshot: "headshot",
    /**
     * 是labelData的key值,主要用于获取cookie的value值方法
     */
    labelObject: "labelData",
    /**
     * 是videoInfo的key值,主要用于获取cookie的value值方法
     */
    videoObject: "videoInfo",
    /**
     *  是queryData的key值,主要用于获取cookie的value值方法
     */
    queryObject: "queryData",
    /**
     * queryDefaultTime是cookie的默认时间，一般以小时计时
     */
    queryDefaultTime: 1,
    /**
     * 是myVideoState的key值,主要用于获取cookie的value值方法
     */
    myVideoPageState: "myVideoState",
    /**
     * 是videoOwnerPersonal的key值,主要用于获取cookie的value值方法
     */
    videoOwnerPersonal: "videoOwnerPersonal"
};
export const QueryPageUtil = {
    /**
     * 分页，默认第一页
     */
    defaultPageNumber: 1,
    /**
     * 表示每一页中有多少个数据
     */
    pageSize: 6
}
export const LabelVideoPageUtil = {
    /**
     * 分页，默认第一页
     */
    defaultPageNumber: 1,
    /**
     * 表示每一页中有多少个数据
     */
    pageSize: 6,
    /**
     * defaultTime是cookie的默认时间，一般以小时计时
     */
    defaultTime: 1
}
export const LoginUtil = {
    /**
     * 默认的登录成功的跳转地址
     */
    defaultUrl: '/web/school/web/main'
}