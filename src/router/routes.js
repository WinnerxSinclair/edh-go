const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
    children: [
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
