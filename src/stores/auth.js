import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const errorMessage = ref('')
  const authUser = ref(null)

  const auth = useFirebaseAuth()
  const router = useRouter()

  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'El password es incorrecto'
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
      }
    })
  })

  const login = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      authUser.value = userCredentials.user
      router.push({ name: 'admin-properties' })
    } catch (error) {
      errorMessage.value = errorCodes[error.code]
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      authUser.value = null
      router.push({ name: 'login' })
    } catch (error) {
      console.log(error)
    }
  }

  const hasError = computed(() => {
    return errorMessage.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    // Variables
    errorMessage,
    hasError,
    isAuth,

    // Methods
    login,
    logout
  }
})
