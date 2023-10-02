import { computed } from 'vue'
import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export default function useProperties() {
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, 'properties'))

  const propertyPrice = computed(() => {
    return (price) =>
      Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
  })

  return {
    propertiesCollection,
    propertyPrice
  }
}