<template>
  <v-container>
    <h1>
      {{ category.title }}
    </h1>
    <v-col cols="12">
      <v-divider />
    </v-col>
    <span v-if="articles.length">
        <v-row
          v-if="articles && articles.length"
          class="mb-6"
        >
          <v-col
            v-for="(article, id) in articles"
            :key="id"
          >
            <card
              :title="article.title"
              :description="article.description"
              :topics="article.topics"
              :img="article.image"
              :id="JSON.stringify(article.id)"
              cta="Open"
              @open="open(article.id)"
            >
            </card>
          </v-col>
        </v-row>
      </span>
  </v-container>
</template>

<script>
export default {
  name: "category",
  transition: 'route',
  head () {
    let category = this.category;

    return {
      title: `${category.title} - How Does It Work`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `Discover informational articles about the topic ${category.title}`
        }]
    }
  },
  data () {
    return {
      articles: [],
      category: {}
    }
  },
  async fetch () {
    try {
      const articles = await this.$axios.get(
        `https://fio40ecz.directus.app/items/articles?fields=*,topics.topics_id.*&filter[category][_in]=${this.$route.params.slug}`
      )
      this.articles = articles.data.data
    } catch (err) {
      console.log(err)
    }

    try {
      const category = await this.$axios.get(
        `https://fio40ecz.directus.app/items/categories/${this.$route.params.slug}?fields=*`
      )
      this.category = category.data.data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    open (id) {
      this.$router.push({path: `/article/${id}`});
    }
  }
}
</script>
