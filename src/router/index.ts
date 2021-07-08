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
        path: '/users',
        name: 'ListUsers',
        component: () => import(/* webpackChunkName: "usersList" */ '../views/users/ListUsers.vue')
      },
      {
        path: '/user/create',
        name: 'CreateUser',
        component: () => import(/* webpackChunkName: "userCreate" */ '../views/users/CreateUser.vue')
      },
      {
        path: '/user/edit/:id',
        name: 'EditUser',
        component: () => import(/* webpackChunkName: "userEdit" */ '../views/users/EditUser.vue')
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
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
