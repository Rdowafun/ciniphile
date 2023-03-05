<template>
<Transition name="upcoming" mode="out-in">
    <div class="main__upcoming" v-if="upcoming">
      <UpcomingItem
        v-for="(movie, idx) in upcoming"
        :key="movie.id"
        :movie="movie"
        :idx="idx"
        :slideView="slideView"
        :next="upcoming[idx + 1 == upcoming.length ? 0 : idx + 1]"
        @slideNext="slideNext"
      />
    </div>
    <div class="loading" v-else>
      <div class="loading__spiner"></div>
    </div>
</Transition>

</template>

<script>

import UpcomingItem from '@/components/Upcoming/UpcomingItem.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    UpcomingItem
  },
  data() {
    return {
      upcoming: null,
      slideView: 0,
      timeout: null
    }
  },
  methods: {
    ...mapActions('upcoming', ['getUpcoming']),
    slide() {
      if(this.upcoming.length - 1 == this.slideView) {
        this.slideView = 0
      }else {
        this.slideView++
      }
      this.timeout = setTimeout(this.slide, 10000)
    },
    slideNext() {
      clearTimeout(this.timeout)
      this.slide()
    }
  },
  computed: {
    ...mapGetters('upcoming', ['getUpcomingArray'])
  },
  async mounted() {
    await this.getUpcoming()
    this.upcoming = this.getUpcomingArray
    this.timeout = setTimeout(this.slide, 10000)
  }
}
</script>

<style>

</style>