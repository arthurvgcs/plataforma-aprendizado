
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('pages/Cadastro.vue')
  },
  {
    path: '/principal',
    name: 'principal',
    component: () => import('pages/PaginaPrincipal.vue')
  },

  {
    path: '/duvida/:duvidaId',
    name: 'duvida',
    component: ( ) => import('pages/Duvida.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: ( ) => import('pages/Admin.vue')
  },
  {
    path: '/chamada',
    name: 'chamada',
    component: ( ) => import('pages/EmChamada.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
