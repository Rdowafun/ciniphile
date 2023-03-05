<template>
  <div class="main__recommend">
    <div class="container">
      <h2 class="main__recommend-title">
        {{ recommend.length > 0 ? "Рекомендации" : "Рекомендаций нет" }}
      </h2>
      <div class="main__content-list" v-if="recommend.length > 0">
        <router-link
          v-for="rec in recommend"
          :key="rec.id"
          :to="`/${type}/${rec.id}`"
          class="main__content-item"
        >
          <img
            :src="imageFullUrL + rec.backdrop_path"
            alt=""
            loading="lazy"
            class="main__content-img"
          />
          <h2 class="main__content-title">{{ rec.title || rec.name }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["recommend", "type"],
  computed: {
    ...mapState(["imageFullUrL"]),
  },
};

</script>

<style>
</style>