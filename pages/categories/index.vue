<template>
  <v-container>
      <h1 class="mt-4">
        Categories
      </h1>
      <v-col cols="12">
        <v-divider />
      </v-col>
    <categories
      v-if="categories.length"
      :categories="categories"
      @open="open"
    />
  </v-container>
</template>

<script>
import Card from "~/components/Card";
export default {
  name: 'IndexPage',
  components: { Card },
  head () {
    return {
      title: 'Categories - How Does It Work',
      meta: [
        {
          hid: 'description_categories',
          name: 'description',
          content: 'Discover different categories of articles about how the world works.'
        }
      ]
    }
  },
  data () {
    return {
      articles: [],
      filter: [],
      categories: []
    }
  },
  async fetch () {
    try {
      const categories = await this.$axios.get(
        `https://fio40ecz.directus.app/items/categories?fields=*`
      )
      this.categories = categories.data.data
    } catch (err) {
      console.log(err)
    }
  },
  beforeMount() {
    this.categories = this.shuffleArray(this.categories)
  },
  methods: {
    removeFilter (id) {
      this.filter = this.filter.filter((filter) => filter !== id)
    },
    open (slug) {
      this.$router.push({path: `/categories/category/${slug}`});
    },
    shuffleArray (array) {
      let j, x, i
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = array[i]
        array[i] = array[j]
        array[j] = x
      }
      return array
    }
  }
}
</script>
