<template>
  <Transition name="introblock" mode="out-in">
    <div class="main__contentId" v-if="infoId">
      <Intro :infoId="infoId" :type="type" />
      <Budget :currentMovie="infoId" />
      <Recommend :type="type" v-if="recomId" :recommend="recomId" />
    </div>
    <div class="loading" v-else>
      <div class="loading__spiner"></div>
    </div>
  </Transition>
</template>

<script>
import Budget from "@/components/ContentId/Budget.vue";
import Intro from "@/components/ContentId/Intro.vue";
import Recommend from "@/components/ContentId/Recommend.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      infoId: null,
      recomId: null,
    };
  },
  props: ["type"],
  computed: {
    getInfoVideo() {
      const type = this.type == "movie" ? "getMovie" : "getTv";
      return this.$store.getters[`infoId/${type}`];
    },
    getInfoRecom() {
      const type = this.type == "movie" ? "getRecomMovie" : "getRecomTv";
      return this.$store.getters[`recommend/${type}`];
    },
  },

  components: {
    Recommend,
    Budget,
    Intro,
  },
  watch: {
    $route() {
      this.getContentInfo();
    },
  },
  methods: {
    ...mapActions("infoId", ["getInfoId"]),
    ...mapActions("recommend", ["getRecom"]),
    async getContentInfo() {
      await this.getInfoId({ id: this.$route.params.id, type: this.type });
      await this.getRecom({ id: this.$route.params.id, type: this.type });
      this.infoId = this.getInfoVideo;
      this.recomId = this.getInfoRecom;
    },
  },
  mounted() {
    this.getContentInfo();
  },
  unmounted() {
    const resetRecom =
      this.type == "movie" ? "cleargetRecomMovie" : "cleargetRecomTv";
    this.$store.commit(`recommend/${resetRecom}`);
    const resetinfoId = this.type == "movie" ? "cleargetMovie" : "cleargetTv";
    this.$store.commit(`infoId/${resetinfoId}`);
  },
};
</script>

<style>
</style>