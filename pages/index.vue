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
        class="d-flex mb-negative-5-5"
        cols="5"
      >
        <FilterElement
          :key="rand"
          :filter-prop="filter"
          :topics-prop="topics"
          @filter="filterArticles"
        />
      </v-col>
    </v-row>
    <Articles
      :categories="categories"
      :articles="articles"
      @openCategory="openCategory"
      @open="open"
      @addFilter="addFilter"
    />
  </v-container>
</template>

<script>
import Card from "~/components/Card"
import Articles from "~/components/articles/Articles";
import FilterElement from "~/components/base/FilterElement";
export default {
  name: 'IndexPage',
  transition: 'route',
  head () {
    return {
      title: 'How does it work - Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find out how the world around you and the technology you use works.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'how does it work, technology, tech, science, information, articles, learning, medicine'
        }
      ]
    }
  },
  components: {FilterElement, Articles, Card },
  data () {
    return {
      articles: [],
      categories: [],
      topics: [],
      filter: [],
      rand: 0
    }
  },
  async fetch () {
    try {
      const articles = await this.$axios.get('https://fio40ecz.directus.app/items/articles?fields=*,topics.topics_id.*')
      this.articles = this.shuffleArray(articles.data.data)
    } catch (err) {
      console.log(err)
    }
    try {
      const categories = await this.$axios.get('https://fio40ecz.directus.app/items/categories')
      this.categories = this.shuffleArray(categories.data.data)
    } catch (err) {
      console.log(err)
    }
    try {
      const topics = await this.$axios.get('https://fio40ecz.directus.app/items/topics')
      this.topics = topics.data.data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async filterArticles (filter) {
      let articles
      if (!filter.length) {
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
                '_in': filter
              }
            }
          }
        })
      }
      this.articles = articles.data
    },
    open (id) {
      this.$router.push({path: `/article/${id}`});
    },
    openCategory (id) {
      this.$router.push({path: `/categories/category/${id}`});
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
    },
    addFilter (filter) {
      const exits = this.filter.filter((exitstingFilter) => exitstingFilter === filter.topics_id.id).length
      if (!exits) {
        this.filter.push(filter.topics_id.id)
      } else {
        this.filter = this.filter.filter((exitstingFilter) => exitstingFilter !== filter.topics_id.id)
      }
      this.rand = Math.random()
      window.scrollTo(0, 0)
    }
  }
}
</script>
