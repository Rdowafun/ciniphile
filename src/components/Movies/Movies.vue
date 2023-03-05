<template>
  <section class="main__media" v-if="popularMovies">
    <router-link to="/movie" class="main__media-title">
      <span>Фильмы</span>
      <img src="@/assets/images/arrow.svg" alt="" />
    </router-link>
    <Swiper
      :modules="modules"
      :space-between="25"
      :navigation="true"
      :breakpoints="swiperOptions.breakpoints"
    >
      <Swiper-slide
        class="main__media-item"
        v-for="(movie, idx) in popularMovies"
        :key="movie.id"
        @click="getMovie(movie, idx)"
      >
        <img
          v-lazy="getImageFull + movie.backdrop_path"
          alt=""
          class="main__media-item-img"
        />
        <router-link class="main__media-item-link" :to="'/movie/' + movie.id" />
        <h2 class="main__media-item-title">{{ movie.title }}</h2>
      </Swiper-slide>
      <Swiper-slide>
        <router-link to="/movie" class="main__media-item"
          >Все фильмы</router-link
        >
      </Swiper-slide>
    </Swiper>
    <div class="infoblock-wrapper" ref="inf">
      <InfoBlock
        :selectedId="selectedId"
        :selectedMovie="selectedMovie"
        :index="index"
        @close="selectedMovie = selectedId = null"
        page="/movie/"
      />
    </div>
  </section>
  <div class="loading" v-else>
    <div class="loading__spiner"></div>
  </div>
</template>

<script>
import InfoBlock from "@/components/InfoBlock/InfoBlock.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
    InfoBlock,
  },
  data() {
    return {
      selectedId: null,
      selectedMovie: null,
      index: null,
      modules: [Navigation],
      swiperOptions: {
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
          1450: {
            slidesPerView: 5,
          },
        },
      },
    };
  },
  methods: {
    ...mapActions("popularMovies", ["getPopular"]),
    ...mapActions("movie", ["getMovieById"]),
    async getMovie(movie, idx) {
      this.selectedId = movie.id;
      this.selectedMovie = null;
      this.index = idx;
      await this.getMovieById(this.selectedId);
      this.selectedMovie = this.movie;
      const coord =
        this.$refs["inf"].getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: coord - navHeight.offsetHeight,
        behavior: "smooth",
      });
    },
  },
  computed: {
    ...mapState("popularMovies", ["popularMovies"]),
    ...mapState("movie", ["movie"]),
    ...mapGetters(["getImageFull"]),
  },
  mounted() {
    this.getPopular();
  },
};
</script>

<style>
</style>