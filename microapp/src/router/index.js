import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/LoginView.vue')
  },
  {
    path: '/web/school',
    name: 'web-school',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/LoginView.vue')
  },
  {
    path: '/web/school/forget',
    name: 'web-school-forget',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/ForgetView.vue')
  },
  {
    path: '/web/school/create',
    name: 'web-school-create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/CreateView.vue')
  },
  {
  path: '/web/school/Only',
    name: 'web-school-Only',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/message/OnlyView.vue')
  },
  {
    path: '/web/school/webview',
      name: 'web-school-webview',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/message/WebView.vue')
    },
{
    path: '/web/school/web/video',
    name: 'web-school-video',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/message/OpenVideo.vue')
},
{
  path: '/web/school/web/application',
  name: 'web-school-application',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/AppLication.vue')
},
{
  path: '/web/school/web/time',
  name: 'web-school-time',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/TimeView.vue')
},
{
  path: '/web/school/web/main',
  name: 'web-school-main',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/MainView.vue')
},
{
  path: '/web/school/web/add',
  name: 'web-school-add',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/TeachPlanView.vue')
},
{
  path: '/web/school/web/change',
  name: 'web-school-change',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/ChangeRole.vue')
},
{
  path: '/web/school/web/upload',
  name: 'web-school-upload',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/UploadView.vue')
},
{
  path: '/web/school/web/four',
  name: 'web-school-upload-four',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/FourView.vue')
},
{
  path: '/web/school/web/videoPlay',
  name: 'web-school-upload-VIDEO',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/VideoPlay.vue')
},
{
  path: '/web/school/web/search',
  name: 'web-school-upload-search',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/SearchView.vue')
},
{
  path: '/web/school/web/user',
  name: 'web-school-upload-user',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/login/UserView.vue')
},
{
  path: '/web/school/web/privacy',
  name: 'web-school-upload-privacy',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/login/PrivacyView.vue')
},
{
  path: '/web/school/web/personal',
  name: 'web-school-upload-personal',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/message/PersonalView.vue')
}
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
