<template>
  <v-app dark>
    <span v-if="error.statusCode === 404">
      <h1>
        {{pageNotFound}}
      </h1>
      <p>
        We could not find your requested page
      </p>
    </span>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <span class="mt-6">
      <v-btn @click="home">
        Home page
      </v-btn>
    </span>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    home () {
      this.$router.push({path: '/'});
    }
  }
}
</script>

