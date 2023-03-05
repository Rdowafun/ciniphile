<template>
    <router-link :to="`${content}/${item.id}`" class="main__content-item">
        <img v-lazy="imageFullUrL + item.backdrop_path" alt="" class="main__content-img">
        <h2 class="main__content-name">{{ item.title || item.name }}</h2>
    </router-link>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: ['content', 'item'],
  computed: {
    ...mapState(['imageFullUrL']),
  }
}
</script>

<style>

</style>