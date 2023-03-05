import axios from 'axios'

export default {
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3',
    recomMovie: null,
    recomTv: null
  },
  mutations: {
    getRecomMovie(state,payload) {
     state.recomMovie = payload
    },
    getRecomTv(state,payload) {
     state.recomTv = payload
    },
    cleargetRecomMovie(state) {
      state.recomMovie = null
    },
    cleargetRecomTv(state) {
      state.recomTv = null
    },
  },
  actions: {
    async getRecom({commit, state, rootState}, info) {
      let { id, type } = info
      try {
        const res = await axios.get(`${state.path}/${type}/${id}/recommendations?api_key=${rootState.apiKey}&language=ru-RU`)
        const data = res.data.results;
        const recom = []
        data.forEach(item => {
            if(recom.length <4) recom.push(item)
        });
        if(type == 'movie') {
            commit('getRecomMovie', recom)
        }else {
            commit('getRecomTv', recom)
        }
      } catch (error) {
        console.log('Ошибка c запросом', error);
      }
    }
  },
  getters: {
    getRecomMovie: (state) => {
        return state.recomMovie
      },
      getRecomTv: (state)  => {
        return state.recomTv
      },
  }
}

