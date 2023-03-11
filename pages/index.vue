<template>
  <v-container>
    <h1 class="mt-3">
      How Does It Work?
    </h1>
    <p>
      You always wanted to understand how the world around you works?
      <br>
      You found the right place!
    </p>
    <v-divider></v-divider>
      <v-row align="center" class="mt-2">
        <v-col
          class="d-flex mb-negative-5-5 min-height-filter"
          cols="12"
        >
          <client-only>
            <FilterElement
              :key="`${rand}-filter`"
              :filter-prop="filter"
              :topics-prop="topics.data"
              @filter="filterArticles"
            />
          </client-only>
        </v-col>
      </v-row>
    <Articles
      v-if="!articles.loading && !categories.loading"
      :categories="categories.data"
      :articles="articles.data"
      :max-amount="6"
      @openCategory="openCategory"
      @addFilter="addFilter"
    />
    <Articles
      v-else
      :categories="[{id: 1, title: 'Loading', description: 'Loading...'}]"
      :articles="loadingArticles"
      :max-amount="6"
    />
  </v-container>
</template>

<script>
import Card from "~/components/Card"
import Articles from "~/components/articles/Articles";
import FilterElement from "~/components/base/FilterElement";
import {mapState} from "vuex";
export default {
  name: 'IndexPage',
  transition: 'route',
  scrollToTop: true,
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
      filter: [],
      rand: 0,
      loadingArticles: [{id: 1, title: 'How does it work', description: '', category: 1, image: '', topics: [ {topics_id: {id: 1, title: 'loading...'}} ]}, {id: 2, title: 'How does it work', description: '', category: 1, image: '', topics: [ {topics_id: {id: 1, title: 'loading...'}}]}, {id: 3, title: 'How does it work', description: '', category: 1, image: '', topics: [ {topics_id: {id: 1, title: 'loading...'}}]}],
      hideFilter: false
    }
  },
  async fetch () {
      await this.$store.dispatch('getArticles')
      await this.$store.dispatch('getCategories')
      await this.$store.dispatch('getTopics')
  },
  computed: {
  ...mapState({
      articles: (state) => state.articles,
      categories: (state) => state.categories,
      topics: (state) => state.topics
    })
  },
  created() {
    this.filter = []
    this.rand = Math.random(10000)
  },
  methods: {
    async filterArticles (filter) {
      this.filter = filter
      if (!filter.length) {
        await this.$store.dispatch('getArticles')
        return
      }
      await this.$store.dispatch('getFilteredArticles', filter)
    },
    openCategory (slug) {
      this.$router.push({path: `/categories/category/${slug}`})
    },
    addFilter (filter) {
      const exits = this.filter.filter((exitstingFilter) => exitstingFilter === filter.topics_id.id).length
      if (!exits) {
        this.filter.push(filter.topics_id.id)
      } else {
        this.filter = this.filter.filter((exitstingFilter) => exitstingFilter !== filter.topics_id.id)
      }
      this.rand = Math.random(10000)
      window.scrollTo(0, 0)
    }
  }
}
</script>
