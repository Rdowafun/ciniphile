<template>
    <router-link class="more" :to="page + id">
      <fa icon="bars" class="more__icon"/>
      <span class="more__text" >Подробнее</span>
    </router-link>
</template>

<script>
export default {
  props: {
    id: Number,
    page: {
      type: String,
      default: '/movie/'
    }
  }
}
</script>

<style lang="scss">

.more {
  padding: 10px 15px;
  background: #149A03;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: max-content;
  gap: 15px;
  &__icon {
    font-size: 20px;
    color: white;
  }
  &__text {
    font-size: 20px;
    line-height: 1.5;
    color: white;
  }

}

</style>