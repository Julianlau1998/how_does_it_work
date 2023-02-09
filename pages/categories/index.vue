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
              :description="''"
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
      filter: []
    }
  },
  async asyncData ({ $directus }) {
    const articles = await $directus.items("articles").readByQuery({
      fields: ["*", "topics.topics_id.*"],
      sort: "date_created"
    })
    const categories = await $directus.items("categories").readByQuery({
      fields: ["*"],
      sort: "date_created"
    })
    const topics = await $directus.items("topics").readByQuery({
      fields: ["*"],
      sort: "date_created"
    })
    return { articles: articles.data, categories: categories.data, topics: topics.data }
  },
  watch: {
    async filter (val) {
      let articles
      if (!val.length) {
        articles = await this.$directus.items("articles").readByQuery({
          fields: ["*", "topics.topics_id.*"],
          sort: "date_created"
        })
      } else {
        articles = await this.$directus.items("articles").readByQuery({
          fields: ["*", "topics.topics_id.*"],
          filter: {
            'topics': {
              'topics_id': {
                '_in': val
              }
            }
          },
          sort: "date_created"
        })
      }
      this.articles = articles.data
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
