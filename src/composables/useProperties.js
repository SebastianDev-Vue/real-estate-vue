import { ref, computed } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function useProperties() {
  const pool = ref(false)

  const storage = useFirebaseStorage()
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, 'properties'))

  const filteredProperties = computed(() => {
    return pool.value
      ? propertiesCollection.value.filter((property) => property.pool)
      : propertiesCollection.value
  })

  async function deleteItem(id, urlImage) {
    if (confirm('Deseas eliminar esta propiedad?')) {
      const docRef = doc(db, 'properties', id)
      const imageRef = storageRef(storage, urlImage)

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  return {
    propertiesCollection,
    filteredProperties,
    pool,
    deleteItem
  }
}
