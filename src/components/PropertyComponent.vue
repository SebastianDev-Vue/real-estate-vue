<script setup>
defineProps({
  property: {
    type: Object
  },
  formatPrice: {
    type: Function
  }
})
</script>

<template>
  <v-col cols="12" md="4">
    <v-card class="">
      <v-img :src="property.image" height="250" covear />
      <v-card-title>
        {{ property.title }}
      </v-card-title>

      <v-card-text class="text-truncate">
        {{ property.description }}
      </v-card-text>

      <v-card-text class="text=h5 font-weight-bold">
        Price: {{ formatPrice(property.price) }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          block
          color="info"
          variant="flat"
          :to="{ name: 'property', params: { id: property.id } }"
          >Ver Informacion</v-btn
        >
      </template>
    </v-card>
  </v-col>
</template>
