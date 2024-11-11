<template>
  <main>
    <header v-if="hasNavBar">
      <nav-bar/>
    </header>
    <Pet />

    <RouterView />
  </main>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router'
  import Pet from './views/Pet/index.vue'

  export default {
    computed: {
      hasNavBar(): boolean {
        return this.$route.meta.hasNavBar as boolean;
      }
    }
  }
</script>