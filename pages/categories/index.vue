<template>
  <v-container>
      <h1>
        Categories
      </h1>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <span v-if="categories.length">
        <v-row
          v-if="categories && categories.length"
          class="mb-6"
        >
          <v-col
            v-for="(category, id) in categories"
            :key="id"
          >
            <card
              :title="category.title"
              :description="category.description"
              :topics="[]"
              :img="category.image"
              :id="JSON.stringify(category.id)"
              cta="Open"
              @open="open(category.id)"
            >
            </card>
          </v-col>
        </v-row>
      </span>
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
          hid: 'description_category',
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
  methods: {
    removeFilter (id) {
      this.filter = this.filter.filter((filter) => filter !== id)
    },
    open (id) {
      this.$router.push({path: `/categories/category/${id}`});
    }
  }
}
</script>
