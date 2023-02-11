<template>
  <v-footer
    :absolute="true"
    class="is-nav-color"
    app
  >
      <span>
        &copy; {{ new Date().getFullYear() }} Julian Lau
      </span>
    <v-spacer></v-spacer>
    <span class="mr-6 mr-2-xs">
        <NuxtLink class="is-link mr-4" to="/privacy">
          Privacy
        </NuxtLink>
        |
        <NuxtLink class="is-link ml-4" to="/termsConditions">
          Terms
        </NuxtLink>
      </span>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>
