import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'

const useImage = () => {
  const storage = useFirebaseStorage()
  const storageRefPath = storageRef(storage, `/properties/${uid()}.jpg`)

  const { url, upload } = useStorageFile(storageRefPath)

  const uploadImage = (e) => {
    const data = e.target.files[0]

    if (data) {
      upload(data)
    }
  }

  const urlImage = computed(() => {
    return url.value ? url.value : null
  })

  return {
    url,
    urlImage,
    uploadImage
  }
}

export default useImage
