<template>
 <Transition name="introblock-item" mode="out-in">
    <div class="main__media" v-if="infoId">
      <img
        :src="imageFullUrL + infoId.poster_path"
        alt=""
        class="main__media-poster"
      />
      <div class="main__media-block">
        <div class="main__media-left">
          <h1 class="main__media-left-title">
            {{ infoId.title || infoId.name }}
          </h1>
          <p class="main__media-left-text">{{ infoId.overview }}</p>
          <p class="main__media-left-janr">
            <span class="main__media-date"
              >{{
                new Date(infoId.release_date).getFullYear() ||
                new Date(infoId.first_air_date).getFullYear()
              }},</span
            >
            <span v-for="(genres, idx) in infoId.genres" :key="genres.id">
              {{ genres.name }}
              <span v-if="idx < infoId.genres.length - 1">,</span>
            </span>
          </p>
          <Trailer />
        </div>
        <div class="main__media-right">
          <img :src="imageFullUrL + infoId.backdrop_path" alt="" />
        </div>
        <div class="main__media-actors">
          <h2 class="main__media-title">В главных ролях</h2>
          <div class="main__media-casts">
            <Actors :type="`/${type}/`" :id="infoId.id" :count="6" />
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-else>
      <div class="loading__spiner"></div>
    </div>
  </Transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["infoId", "type"],
  computed: {
    ...mapState(["imageFullUrL"]),
  },
};
</script>

<style lang="scss" scoped>

</style>