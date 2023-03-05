import axios from 'axios'

export default {
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3/search/multi',
    searchData: null
  },
  mutations: {
    getSearchData(state,payload) {
      state.searchData = payload
    },
    resetSearch(state) {
      state.searchData = null
    }
  },
  actions: {
    async getSearchData({commit, state, rootState}, {page:page = 1, search:search}) {
      if(search){
        try {
          const res = await axios.get(`${state.path}?api_key=${rootState.apiKey}&language=ru-RU&page=${page}&query=${search}&include_adult=false`)
          const data = res.data.results
          const arrayWinthPhoto = data.filter(movie=>movie.backdrop_path !=null)
          commit('getSearchData', arrayWinthPhoto)
      } catch (error) {
        console.log('Ошибка произошла при  получении фильма по id', error);
      }
      }
    }
  },
  getters: {}
}

