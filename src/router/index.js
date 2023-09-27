import { createRouter, createWebHistory } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/new',
          name: 'new-property',
          component: () => import('../views/admin/NewPropertyView.vue')
        },
        {
          path: '/admin/edit/:id',
          name: 'edit-property',
          component: () => import('../views/admin/EditPropertyView.vue')
        }
      ]
    }
  ]
})

const authenticateUser = async () => {
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

// Guard de navegacion
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)

  if (requiresAuth) {
    // Comprobar que el usuario esta autenticado
    try {
      await authenticateUser()
      next()
    } catch (err) {
      console.log(err)
      next({ name: 'login' })
    }
  } else {
    // El endpoint no esta protegido, por lo tanto mostramos la vista
    next()
  }
})

export default router
