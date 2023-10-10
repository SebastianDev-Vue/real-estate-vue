import { ref } from 'vue'

const useLocationMap = () => {
  const zoom = ref(15)
  const center = ref([4.668408, -74.135418])

  function handlerPin(e) {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,

    handlerPin
  }
}

export default useLocationMap
