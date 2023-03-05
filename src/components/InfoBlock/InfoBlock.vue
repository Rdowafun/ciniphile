<template>
  <div class="main__info" :class="{ active: selectedId != null }" >
    <fa icon="xmark" class="main__info-close" @click="$emit('close')" />
    <Transition name="infoblock" mode="out-in">
      <div class="main__info-block" v-if="selectedMovie">
        <img
          :src="imageFullUrL + selectedMovie.backdrop_path"
          alt=""
          class="main__info-img"
        />
        <div class="main__info-content">
          <div class="main__info-content-block">
            <h2 class="main__info-content-title">
              {{ selectedMovie.title || selectedMovie.name }}
            </h2>
            <p class="main__info-content-text">{{ selectedMovie.overview }}</p>
            <p class="main__info-content-date">
              <span>
                {{
                  new Date(selectedMovie.release_date).getFullYear() ||
                  new Date(selectedMovie.first_air_date).getFullYear()
                }},
              </span>
              <span
                v-for="(genres, idx) in selectedMovie.genres"
                :key="genres.id"
              >
                {{ genres.name }}
                <span v-if="idx < selectedMovie.genres.length - 1">,</span>
              </span>
            </p>
            <Actors :type="page" :id="selectedMovie.id" :count="4" />
            <BtnMore :page="page" :id="selectedMovie.id" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["selectedId", "selectedMovie", "index", "page"],
  computed: {
    ...mapState(["imageFullUrL"]),
  },
};
</script>

<style >

</style>