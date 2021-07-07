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
        name: 'ListPessoas',
        component: () => import(/* webpackChunkName: "pessoasList" */ '../views/pessoas/ListPessoas.vue')
      },
      {
        path: '/pessoa/create',
        name: 'CreatePessoa',
        component: () => import(/* webpackChunkName: "pessoaCreate" */ '../views/pessoas/CreatePessoa.vue')
      },
      {
        path: '/pessoa/edit/:id',
        name: 'EditPessoa',
        component: () => import(/* webpackChunkName: "pessoaEdit" */ '../views/pessoas/EditPessoa.vue')
      },
      {
        path: '/contatos',
        name: 'ListContatos',
        component: () => import(/* webpackChunkName: "contatosList" */ '../views/contatos/ListContatos.vue')
      },
      {
        path: '/contato/create',
        name: 'CreateContato',
        component: () => import(/* webpackChunkName: "contatoCreate" */ '../views/contatos/CreateContato.vue')
      },
      {
        path: '/contato/edit/:id',
        name: 'EditContato',
        component: () => import(/* webpackChunkName: "contatoEdit" */ '../views/contatos/EditContato.vue')
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
