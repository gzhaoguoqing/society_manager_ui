import Vue from 'vue'
import Router from 'vue-router'
import FrontHome from './views/front/FrontHome'
import FrontNotice from './views/front/notice/Notice'
import FrontNoticeDetail from './views/front/notice/NoticeDetail'
import FrontNews from './views/front/news/News'
import FrontNewsDetail from './views/front/news/NewsDetail'
import FrontActivity from './views/front/activity/Activity'
import FrontActivityDetail from './views/front/activity/ActivityDetail'
import FrontTopic from './views/front/topic/Topic'
import FrontPost from './views/front/topic/Post'
import FrontInfo from './views/front/info/Info'
import BackHome from './views/back/BackHome'
import BackUser from './views/back/user/User'
import BackInfo from './views/back/info/Info'
import BackNotice from './views/back/notice/Notice'
import BackNews from './views/back/news/News'
import BackActivity from './views/back/activity/Activity'
import BackTopic from './views/back/topic/Topic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/front/news'
    },
    {
      path: '/front',
      redirect: '/front/news'
    },
    {
      path: '/front',
      component: FrontHome,
      children: [
        { path: 'news', component: FrontNews },
        { path: 'news/detail/:id', component: FrontNewsDetail },
        { path: 'notice', component: FrontNotice },
        { path: 'notice/detail/:id', component: FrontNoticeDetail },
        { path: 'activity', component: FrontActivity },
        { path: 'activity/detail/:id', component: FrontActivityDetail },
        { path: 'topic', component: FrontTopic },
        { path: 'topic/post/:id', component: FrontPost },
        { path: 'info', component: FrontInfo }
      ]
    },
    {
      path: '/back',
      redirect: '/back/staff'
    },
    {
      path: '/back',
      component: BackHome,
      children: [
        { path: 'staff', component: BackUser },
        { path: 'info', component: BackInfo },
        { path: 'news', component: BackNews },
        { path: 'notice', component: BackNotice },
        { path: 'activity', component: BackActivity },
        { path: 'topic', component: BackTopic }
      ]
    }
  ]
})
