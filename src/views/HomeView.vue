<script setup>
import useProperties from '../composables/useProperties'
import PropertyComponent from '../components/PropertyComponent.vue'
import { propertyPrice } from '../helpers'

const { pool, filteredProperties } = useProperties()
</script>

<template>
  <main>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

    <v-card flat class="py-10">
      <v-card-title class="text-h5">
        Busqueda
        <v-checkbox label="Piscina" v-model="pool" />
      </v-card-title>

      <v-row>
        <PropertyComponent
          v-for="property in filteredProperties"
          :key="property.id"
          :property="property"
          :formatPrice="propertyPrice"
        />
      </v-row>
    </v-card>
  </main>
</template>
