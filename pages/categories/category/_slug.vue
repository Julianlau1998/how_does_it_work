<template>
  <v-container>
    <Articles
      :categories="[category]"
      :articles="articles"
    />
    <h1 v-if="articles.length && category.title" class="mt-12">
      Discover Other Categories:
    </h1>
    <Categories
      v-if="articles.length"
      :categories="categories"
      :max-amount="3"
      @open="open"
    />
  </v-container>
</template>

<script>
import Articles from "~/components/articles/Articles"
import Categories from "~/components/categories/Categories";

export default {
  name: "category",
  components: {Categories, Articles},
  transition: 'route',
  head () {
    let category = this.category;

    return {
      title: `${category.title} - How Does It Work`,
      meta: [
        {
          hid: `description_category`,
          name: 'description_category',
          content: `Discover informational articles about the topic ${category.title}`
        }]
    }
  },
  data () {
    return {
      articles: [],
      category: {},
      categories: []
    }
  },
  async fetch () {
      await this.$axios.get(`https://cms-how-works.com/items/categories?fields=*`)
        .then(async (res) => {
          this.category = res.data.data.filter(category => category.slug === this.$route.params.slug)[0]
          this.categories = res.data.data.filter(category => category.id !== this.category.id)
          const articles = await this.$axios.get(
            `https://cms-how-works.com/items/articles?fields=*,topics.topics_id.*&filter[category][_in]=${this.category.id}`
          )
          this.articles = await articles.data.data
      })
  },
  beforeMount() {
    this.articles = this.shuffleArray(this.articles)
    this.categories = this.shuffleArray(this.categories)
  },
  methods: {
    open (id) {
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
    }
  }
}
</script>
