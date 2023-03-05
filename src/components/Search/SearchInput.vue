<template>
  <div class="container">
    <div class="main__search">
      <input
        type="text"
        class="main__search-input"
        :placeholder="placeholder"
        v-model="value"
        autofocus
      />
      <div class="main__content-list" v-if="multiData">
        <SearchContent v-for="item in multiData" :key="item.id" :item="item" />
        <div class="loading" v-if="loading">
          <div class="loading__spiner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchContent from "@/components/Search/SearchContent.vue";
import { mapState } from "vuex";
export default {
  components: {
    SearchContent,
  },
  props: ["placeholder"],
  data() {
    return {
      value: "",
      loading: false,
      searchContents: [],
      payload: {
        page: 1,
        search: "",
      },
    };
  },
  computed: {
    ...mapState("searching", ["searchData"]),
    multiData() {
      if (this.value != "") {
        // this.searchContents.length = 0;
        // this.searchContents.push(...this.searchData);
        // return this.searchContents;
        return this.searchData;
      }
      // else {
      //   this.searchContents.length = 0;
      //   this.payload.page = 1;
      // }
    },
  },
  watch: {
    async value(newVal) {
      this.payload.search = this.value;
      await this.$store.dispatch("searching/getSearchData", this.payload);
    },
  },
  // methods: {
    // async scrollSearch() {
    //   if (!this.loading) {
    //     this.loading = true;
    //     this.payload.page++;
    //     this.searchContents.push(...this.searchData);
    //     await this.$store.dispatch("searching/getSearchData", this.payload);
    //     this.loading = false;
    //   }
    // },
  // },
  // mounted() {
    // window.addEventListener("scroll", () => {
    //   if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    //     this.scrollSearch();
    //   }
    // });
  // },
  unmounted() {
    this.$store.commit("searching/resetSearch");
  },
};
</script>

<style>
</style>