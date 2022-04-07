import {createStore} from 'vuex';

const store = createStore({
  state: {
    brightness: 0.5,
    contrast: 0.5,
  },
  getters: {
  },
  mutations: {
    setBrightness(state, value) {
      state.brightness = value > 1 ? 1 : value < 0 ? 0 : value
    },
    setContrast(state, value) {
      state.contrast = value > 1 ? 1 : value < 0 ? 0 : value
    },
  },
})

export default store
