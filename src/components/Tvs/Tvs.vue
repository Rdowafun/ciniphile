<template>
  <section class="main__media" v-if="popularTvs">
    <router-link to="/tv" class="main__media-title">
      <span>Сериалы</span>
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
        v-for="(tv, idx) in popularTvs"
        :key="tv.id"
        @click="getTv(tv, idx)"
      >
        <img
          v-lazy="getImageFull + tv.backdrop_path"
          alt=""
          class="main__media-item-img"
        />
        <router-link class="main__media-item-link" :to="'/tv/' + tv.id" />
        <h2 class="main__media-item-title">{{ tv.name }}</h2>
      </Swiper-slide>
      <Swiper-slide>
        <router-link to="/tv" class="main__media-item">Все сериалы</router-link>
      </Swiper-slide>
    </Swiper>
    <div class="infoblock-wrapper" ref="inf">
      <InfoBlock
        :selectedId="selectedId"
        :selectedMovie="selectedMovie"
        :index="index"
        @close="selectedMovie = selectedId = null"
        page="/tv/"
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
    ...mapActions("popularTvs", ["getPopular"]),
    ...mapActions("tv", ["getTvById"]),
    async getTv(tv, idx) {
      this.selectedId = tv.id;
      this.selectedMovie = null;
      this.index = idx;
      await this.getTvById(this.selectedId);
      this.selectedMovie = this.tv;
      const coord =
        this.$refs["inf"].getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: coord - navHeight.offsetHeight,
        behavior: "smooth",
      });
    },
  },
  computed: {
    ...mapState("popularTvs", ["popularTvs"]),
    ...mapState("tv", ["tv"]),
    ...mapGetters(["getImageFull"]),
  },
  mounted() {
    this.getPopular();
  },
};
</script>

<style>
</style>