<template>
  <header class="header">
    <nav class="header__nav" :class="{ color: scrolled > 0 }" id="navHeight">
        <div class="container">
          <div class="header__nav-container">
            <router-link class="logo" to="/">
              <img src="@/assets/images/Logo.svg" alt="">
            </router-link>
            <button class="header__nav-btn" @click="burger = true" >
              <fa icon="bars"/>
            </button>
            <ul class="header__nav-list" :class="{ active: burger }">
              <li class="header__nav-close" @click="burger = false">
                <fa icon="xmark"/>
              </li>
                <li v-for="link in links" :key="link.url" @click="burger = false">
                  <router-link class="header__nav-link" :to="link.url">{{ link.title }}</router-link>
                </li>
                <li @click="burger = false">
                  <router-link class="header__nav-link" to="/search">
                    <img src="@/assets/images/search.svg" alt="">
                  </router-link>
                </li>
            </ul>
          </div>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {title: 'Главная', url: '/'},
        {title: 'Фильмы', url: '/movie'},
        {title: 'Сериалы', url: '/tv'},
      ],
      burger: false,
      scrolled: 0
    }
  },
  methods: {
    updateScroll() {
      this.scrolled = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  }
}
</script>

<style>

</style>