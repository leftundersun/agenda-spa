import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/pessoas',
        name: 'Pessoas',
        component: () => import(/* webpackChunkName: "pessoasList" */ '../views/pessoas/ListPessoas.vue')
      },
      {
        path: '/pessoa/create',
        name: 'Create',
        component: () => import(/* webpackChunkName: "pessoaCreate" */ '../views/pessoas/CreatePessoa.vue')
      },
      {
        path: '/pessoa/edit/:id',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "pessoaEdit" */ '../views/pessoas/EditPessoa.vue')
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
