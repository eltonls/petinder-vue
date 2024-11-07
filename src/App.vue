<template>
  <main>
    <Toast/>
    <header v-if="hasNavBar">
      <nav-bar/>
    </header>
    <RouterView />
  </main>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router'
  export default {
    computed: {
      hasNavBar(): boolean {
        return this.$route.meta.hasNavBar as boolean;
      }
    }
  }
</script>