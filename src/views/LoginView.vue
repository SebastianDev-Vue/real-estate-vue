<script setup>
import { useForm, useField } from 'vee-validate'
import { useAuthStore } from '../stores/auth'
import { loginSchema as validationSchema } from '../validations/loginSchema'

const { handleSubmit } = useForm({ validationSchema })
const authStore = useAuthStore()

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(({ email, password }) => {
  authStore.login(email, password)
})
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h4">Iniciar Sesion</v-card-title>
    <v-card-subtitle class="text-h5">Inicia Sesion con tu cuenta</v-card-subtitle>

    <v-alert
      v-if="authStore.hasError"
      type="error"
      :title="authStore.errorMessage"
      class="my-5"
    ></v-alert>

    <v-form class="mt-5">
      <v-text-field
        class="mb-3"
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        class="mb-3"
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />
      <v-btn @click="submit" block color="pink-darken-1">Iniciar Sesion</v-btn>
    </v-form>
  </v-card>
</template>

<style scoped></style>
