<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'

import { validationSchema, imageSchema } from '../../validations/propertySchema'
import useImage from '../../composables/useImage'

import 'leaflet/dist/leaflet.css'

const items = [1, 2, 3, 4, 5]

const zoom = ref(15)

const router = useRouter()
const db = useFirestore()

const { uploadImage, urlImage, url } = useImage()

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const rooms = useField('rooms')
const wc = useField('wc')
const parking = useField('parking')
const description = useField('description')
const pool = useField('pool', null, {
  initialValue: false
})

const submit = handleSubmit(async (values) => {
  // eslint-disable-next-line
  const { image, ...property } = values

  const docRef = await addDoc(collection(db, 'properties'), {
    ...property,
    image: url.value
  })

  if (docRef.id) {
    router.push({ name: 'admin-properties' })
  }
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h4">Nueva Propiedad</v-card-title>
    <v-card-subtitle class="text-h5 py-5"
      >Crea una nueva propiedad llenando el siguiente formulario</v-card-subtitle
    >

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Titulo Propiedad"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />
      <v-file-input
        accept="image/jpeg"
        label="Fotografia"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        @change="uploadImage"
      />

      <div v-if="urlImage" class="my-5">
        <p class="font-weight-bold">Imagen Propiedad:</p>
        <img :src="urlImage" class="w-50" />
      </div>

      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="Habitaciones"
            :items="items"
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="Baños "
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="Estacionamientos"
            :items="items"
            v-model="parking.value.value"
            :error-messages="parking.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-5"
        label="Descripcion"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      ></v-textarea>

      <v-checkbox label="Piscina" v-model="pool.value.value" />

      <div style="height: 600px; width: 800px">
        <l-map
          ref="map"
          v-model:zoom="zoom"
          :center="[47.41322, -1.219482]"
          :use-global-leaflet="false"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
        </l-map>
      </div>

      <v-btn @click="submit" color="pink-accent-3" block> Agregar Propiedad </v-btn>
    </v-form>
  </v-card>
</template>
