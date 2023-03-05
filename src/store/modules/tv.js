import axios from 'axios'

export default {
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3/tv/',
    tv: null
  },
  mutations: {
    getTvById(state,payload) {
      state.tv = payload
    }
  },
  actions: {
    async getTvById({commit, state, rootState}, tvId) {
      try {
          const res = await axios.get(`${state.path}${tvId}?api_key=${rootState.apiKey}&language=ru-RU`)
          const data = res.data
 
          commit('getTvById', data)
      } catch (error) {
        console.log('Ошибка произошла при  получении tv по id', error);
      }
    }
  },
  getters: {}
}

