import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app=createApp(App)

app.config.errorHandler = (err, vm, info) => {
   // 自定义错误处理逻辑
   console.error('Custom error handler:', err, info);
   // 可以在这里记录错误日志或显示自定义的错误提示
  };
  app.use(router).use(router).mount('#app')
  //原始数据，用户体验不好，退出登录的时候会有红色报错
  // import { createApp } from 'vue'
  // import App from './App.vue'
  // import router from './router'
  // createApp(App).use(router).use(router).mount('#app')