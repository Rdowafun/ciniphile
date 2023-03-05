import {
  createStore
} from "vuex";

import upcoming from '@/store/modules/upcoming'
import popularMovies from '@/store/modules/popularMovies'
import popularTvs from '@/store/modules/popularTvs'
import topRate from '@/store/modules/topRate'
import movie from '@/store/modules/movie'
import tv from '@/store/modules/tv'
import actors from '@/store/modules/actors'
import searching from '@/store/modules/searching'
import infoId from '@/store/modules/infoId'
import recommend from '@/store/modules/recommend'

const store = createStore({
  state: {
    apiKey: '331b5f28a1f05a94ae9aeb66d2d19d50',
    imageFullUrL: 'https://image.tmdb.org/t/p/original/',
    imageUrl: 'https://image.tmdb.org/t/p/w500/'
  },
  getters: {
    getImageFull: (state) => state.imageFullUrL,
    getImage: (state) => state.imageUrl
  },
  modules: {
    upcoming,
    popularMovies,
    popularTvs,
    topRate,
    movie,
    tv,
    actors,
    searching,
    infoId,
    recommend
  }
})

export default store