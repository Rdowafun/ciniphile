<template>
  <div class="wrapper">
    <Navbar />
    <router-view v-if="routing" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";

import { nextTick } from 'vue'

export default {
  data() {
    return {
      routing: true,
    };
  },
  methods: {
    isRouting(){
      this.routing = false
     nextTick(() =>  this.routing  = true)
    }
  },
  components: {
    Navbar,
  },
  watch:{
    $route(){
      this.isRouting()
    }
  }
};
</script>

<style>
</style>
