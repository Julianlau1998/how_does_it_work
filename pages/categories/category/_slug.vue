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
    this.$axios.get(`https://cms-how-works.com/items/categories?fields=*`)
      .then((res) => {
        this.category = res.data.data.filter(category => category.slug === this.$route.params.slug)[0]
        this.categories = this.shuffleArray(res.data.data.filter(category => category.id !== this.category.id))

        this.$axios.get(
          `https://cms-how-works.com/items/articles?fields=id,slug,title,description,image,category,topics.topics_id.*&filter[category][_in]=${this.category.id}`
        ).then((articles) => {
          this.articles = this.shuffleArray(articles.data.data)
        })
      })
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
