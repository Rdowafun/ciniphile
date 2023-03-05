<template>
  <div class="wrapper-actors" v-if="loading">
    <div class="main__info-content-actors" v-if="actors">
      <div
        class="main-info-content-actor"
        v-for="actor in actors"
        :key="actor.id"
      >
        <img
          :src="imageUrl + actor.profile_path"
          alt=""
          class="main-info-content-img"
        />
        <span class="main-info-content-name">{{ actor.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      actors: null,
      loading: true,
    };
  },
  props: ["type", "id", "count"],
  methods: {
    ...mapActions("actors", ["getActors"]),
    async getActorsContent() {
      await this.getActors({ id: this.id, type: this.type });
      this.actors = this.getCountActors;
    },
  },

  computed: {
    ...mapState(["imageUrl"]),
    getCountActors() {
      const type = this.type == "/movie/" ? "getMovieActors" : "getTvActors";
      return this.$store.getters[`actors/${type}`](this.count);
    },
  },
  mounted() {
    this.getActorsContent();
  },
  unmounted() {
    const reset = this.type == "/movie/" ? "clearActorsMovie" : "clearActorsTv";
    this.$store.commit(`actors/${reset}`);
    const resets = this.type == "movie" ? "clearActorsMovie" : "clearActorsTv";
    this.$store.commit(`actors/${resets}`);
  },
  watch: {
    $route() {
      this.getActorsContent();
    },
  },
};
</script>

<style lang="scss">
.main__info-content-actors {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}
.main-info-content-actor {
  border: 1px solid #ffffff;
  border-radius: 25px;
  padding-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  & img {
    width: 45px;
    height: 50px;
    border-radius: 50%;
  }
  & span {
    font-size: 16px;
    line-height: 30px;
    color: white;
  }
}
</style>