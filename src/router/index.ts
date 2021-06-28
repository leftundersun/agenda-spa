import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/pessoas',
        name: 'Pessoas',
        component: () => import(/* webpackChunkName: "about" */ '../views/pessoas/List.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
