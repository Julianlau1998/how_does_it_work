<template>
  <v-container>
    <h1>
      Welcome!
    </h1>
    <p>
      You always wanted to understand how the world around you works?
      <br>
      You found the right place!
    </p>
    <v-divider></v-divider>
    <v-row v-if="topics && topics.length" align="center" class="mt-2">
      <v-col
        class="d-flex mb-negative-5"
        cols="5"
      >
        <v-select
          v-model="filter"
          class="mb-4"
          :items="topics"
          label="Filter"
          item-text="title"
          item-value="id"
          dense
          multiple
          outlined
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0">
              {{ item.title }}
            </span>
            <span
              v-if="index === 1"
              class="grey--text text-caption"
            >
              &nbsp;(+{{ filter.length - 1 }})
          </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-chip
          v-for="item in filter"
          class="ma-2"
          close
          @click:close="removeFilter(item)"
        >
          {{ topics.filter((topic) => topic.id === item)[0].title }}
        </v-chip>
      </v-col>
    </v-row>
    <div
      v-for="(category, index) in shuffleArray(categories)"
    >
      <v-col
        v-if="index !== 0"
        cols="12"
      >
        <v-divider />
      </v-col>
      <span v-if="articles.filter(article => article.category === category.id).length">
        <h2 :class="index !== 0 ? 'mt-4' : ''">
          {{ category.title }}:
        </h2>
        <v-row
          v-if="articles && articles.length"
          class="mb-6"
          no-gutters
        >
          <v-col
            v-for="(article, id) in shuffleArray(articles.filter(article => article.category === category.id))"
            :key="id"
          >
            <card
              :title="`${article.title}?`"
              :description="article.description"
              :topics="article.topics"
              :img="article.image"
              :id="JSON.stringify(article.id)"
              cta="Read now"
              @open="open(article.id)"
            >
            </card>
          </v-col>
          <v-btn
            v-if="articles.filter(article => article.category === category.id).length === 6"
            @click="openCategory(category.id)"
          >
            Show more
          </v-btn>
        </v-row>
      </span>
    </div>
  </v-container>
</template>

<script>
import Card from "~/components/Card";
export default {
  name: 'IndexPage',
  components: { Card },
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
          }
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
      this.$router.push({path: `/article/${id}`});
    },
    openCategory (id) {
      this.$router.push({path: `/categories/category/${id}`});
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }
  }
}
</script>
