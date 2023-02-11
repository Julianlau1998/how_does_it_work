<template>
  <v-container>
    <Articles
      :categories="[category]"
      :articles="this.articles"
    />
  </v-container>
</template>

<script>
import Articles from "~/components/articles/Articles"

export default {
  name: "category",
  components: {Articles},
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
