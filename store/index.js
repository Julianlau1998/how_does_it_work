import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const host = 'https://cms-how-works.com'

export default () => new Vuex.Store({
  namespaced: true,
  state: () => ({
    articles: {
      loading: false,
      data: []
    },
    article: {
      loading: false,
      data: {}
    },
    categories: {
      loading: false,
      data: []
    },
    topics: {
      loading: false,
      data: []
    }
  }),
  mutations: {
    GET_ARTICLES (state) {
      state.articles.data = []
      state.articles.loading = true
    },
    async RECEIVE_ARTICLES (state, articles) {
      articles = await shuffleArray(articles)
      state.articles.data = await articles
      state.articles.loading = false
    },
    GET_ARTICLE (state) {
      state.article.data = {}
      state.article.loading = true
    },
    RECEIVE_ARTICLE (state, article) {
      state.article.data = article
      state.article.loading = false
    },
    GET_CATEGORIES (state) {
      state.categories.data = []
      state.categories.loading = true
    },
    async RECEIVE_CATEGORIES (state, categories) {
      categories = await shuffleArray(categories)
      state.categories.data = categories
      state.categories.loading = false
    },
    GET_TOPICS (state) {
      state.topics.loading = true
    },
    async RECEIVE_TOPICS (state, topics) {
      state.topics.data = topics
      state.topics.loading = false
    }
  },
  actions: {
    async getArticles({commit}) {
        commit('GET_ARTICLES')
        const response = await axios.get(`${host}/items/articles?fields=id,slug,title,description,image,category,topics.topics_id.*`)
        commit('RECEIVE_ARTICLES', response.data.data)
    },
    async getArticle({commit}, slug) {
      commit('GET_ARTICLE')
      const response = await this.$directus.items("articles").readByQuery({
        fields: ["*", "topics.topics_id.*"],
        filter: {
          'slug': {
            '_eq': slug
          }
        }
      })
      commit('RECEIVE_ARTICLE', response.data)
    },
    async getFilteredArticles ({commit}, filter) {
      commit('GET_ARTICLES')
      let response = {}
      if (!filter.length) {
        response = await this.$directus.items("articles").readByQuery({
          fields: ["*", "topics.topics_id.*"],
          sort: "date_created"
        })
      } else {
        response = await this.$directus.items("articles").readByQuery({
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
      commit('RECEIVE_ARTICLES', response.data)
    },
    async getCategories({commit}) {
        commit('GET_CATEGORIES')
        const response = await axios.get(`${host}/items/categories?fields=*`)
        commit('RECEIVE_CATEGORIES', response.data.data)
    },
    async getTopics({commit}) {
      commit('GET_TOPICS')
      const response = await axios.get(`${host}/items/topics`)
      commit('RECEIVE_TOPICS', response.data.data)
    }
  },
  modules: {
  }
})

function shuffleArray (array) {
  console.log('shuffle array')
  let j, x, i
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
  return array
}
