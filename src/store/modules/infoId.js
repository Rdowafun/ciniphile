import axios from 'axios'

export default {
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3',
    movie: null,
    tv: null
  },
  mutations: {
    getMovie(state,payload) {
     state.movie = payload
    },
    getTv(state,payload) {
     state.tv = payload
    },
    cleargetMovie(state) {
      state.movie = null
    },
    cleargetTv(state) {
      state.tv = null
    },
  },
  actions: {
    async getInfoId({commit, state, rootState}, info) {
      let { id, type } = info
      try {
        const res = await axios.get(`${state.path}/${type}/${id}?api_key=${rootState.apiKey}&language=ru-RU`)
        const data = res.data;
          if(type == 'movie')  commit('getMovie', data)
          else commit('getTv', data)

      } catch (error) {
        console.log('Ошибка произошла при  получении информации', error);
      }
    }
  },
  getters: {
    getMovie: (state) => {
        return state.movie
      },
      getTv: (state)  => {
        return state.tv
      },
  }
}

