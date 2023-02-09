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
  async asyncData ({ route, $directus }) {
    const category = await $directus.items(`categories/${route.params.slug}`).readByQuery({
      fields: ["*"],
      sort: "-date_created"
    })
    const articles = await $directus.items("articles").readByQuery({
      fields: ["*", "topics.topics_id.*"],
      filter: {
        'category': {
          '_in': route.params.slug
        }
      },
      sort: "date_created"
    })
    return { category: category.data, articles: articles.data }
  },
  methods: {
    open (id) {
      this.$router.push({path: `/article/${id}`});
    }
  }
}
</script>
