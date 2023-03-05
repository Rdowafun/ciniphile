<template>
  <section class="main__rate" v-if="topRate">
    <h2 class="main__rate-title">
      ТОП
      <span>10</span>
    </h2>
    <Swiper
      class="main__rate-block"
      :modules="modules"
      :space-between="23"
      :navigation="true"
      :breakpoints="swiperOptions.breakpoints"
    >
      <Swiper-slide
        class="main__rate-item"
        v-for="(item, idx) in topRate"
        :key="item.id"
      >
        <div class="main__rate-item-info">
          <p class="main__rate-item-number">{{ idx + 1 }}</p>
        </div>
        <img v-lazy="imageFullUrL  + item.backdrop_path" alt="" class="main__rate-item-img">
      </Swiper-slide>
    </Swiper>
  </section>
  <div class="loading" v-else>
    <div class="loading__spiner"></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation],
      swiperOptions: {
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 1,
          },
          900: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1450: {
            slidesPerView: 3,
          },
        },
      },
    };
  },
  methods: {
    ...mapActions('topRate', ['getTop'])
  },
  computed: {
    ...mapState('topRate', ['topRate']),
    ...mapState(['imageFullUrL'])
  },
  mounted() {
    this.getTop()
  },
};
</script>

<style>

</style>