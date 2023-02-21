<template>
    <v-container justify fill-height fluid class="mb-max">
      <v-row class="mt-1">
        <v-col cols="12" sm="6">
          <h1>
            {{ article.title ? article.title : 'Loading' }}?
          </h1>
          <p class="mt-2">
            <b>
              {{ article.description ? article.description : 'Loading' }}
            </b>
          </p>
          <v-chip-group
            active-class="blue lighten-2 white--text"
            column
          >
            <v-chip v-for="(topic, id) in article.topics" :key="id">
              {{ topic.topics_id.title }}
            </v-chip>
          </v-chip-group>
<!--          <v-rating
            v-model="rating"
            class="mt-2"
            background-color="orange lighten-3"
            color="orange"
            large
          ></v-rating>-->
        <SocialShare
          :facebook-url="facebookURL"
          :twitter-url="twitterURL"
          :mail-url="mailURL"
        />
        </v-col>
        <v-col>
          <v-img
            class="is-rounded-2 ml-md-8 ml-lg-8 ml-xl-8"
            width="380"
            align="center"
            justify="center"
            :src="`https://fio40ecz.directus.app/assets/${article.image}`"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mt-5">
          <div v-html="article.article" />
        </v-col>
      </v-row>
      <AdBanner class="mt-9" />
      <Articles
        class="mt-8"
        :categories="category"
        :articles="categoryArticles"
        :max-amount="3"
        :title="'Similar Articles'"
        @openCategory="openCategory(article.category)"
      />
      <h1 class="mt-8 mb-negative-5">
        More Articles
      </h1>
      <Articles
        class="mt-8"
        :categories="categories"
        :articles="articles"
        :max-amount="3"
        @openCategory="openCategory"
      />
      <div id="lateral" v-if="shareAvailable">
        <v-fab-transition>
          <v-btn
            @click="share"
            color="blue lighten-2"
            fab
            large
            dark
            bottom
            left
            class="v-btn--example"
            aria-label="share"
          >
            <v-icon>
              mdi-share-variant
            </v-icon>
          </v-btn>
        </v-fab-transition>
      </div>
    </v-container>
</template>

<script>
import SocialShare from "~/components/base/SocialShare"
import AdBanner from "~/components/ads/AdBanner"

export default {
  name: "article",
  components: {SocialShare, AdBanner},
  transition: 'route',
  head () {
    let article = this.article;

    return {
      title: `${article.title} - How Does It Work`,
      meta: [
        {
          hid: `description_article`,
          name: 'description',
          content: `${article.description}`
        },
        {
          property: "og:image",
          content: this.article.image
        },
        { hid: 'og:title_og_article', property: 'og:title', content: this.article.title },
        { hid: 'og:url_og_article', property: 'og:url', content: `https://how-does-it-work.netlify.app${this.$nuxt.$route.path}` },
        { hid: 'og:description_og_article', property: 'og:description', content: this.article.description },
        { hid: 'og:image_og_article', property: 'og:image', content: this.article.image},

        // twitter card
        { hid: "twitter:title_og_article", name: "twitter:title", content: this.article.title },
        { hid: "twitter:url_og_article", name: "twitter:url", content: `https://how-does-it-work.netlify.app${this.$nuxt.$route.path}` },
        { hid: 'twitter:description_og_article', name: 'twitter:description', content: this.article.description },
        { hid: "twitter:image_og_article", name: "twitter:image", content: this.article.image},
      ]
    }
  },
  async fetch () {
    try {
      const articles = await this.$axios.get(
        `https://fio40ecz.directus.app/items/articles?fields=*,topics.topics_id.*`
      )
      this.article = articles.data.data.filter((article) => article.slug === this.$route.params.slug)[0]
      this.articles = this.shuffleArray(articles.data.data.filter((article) => article.id !== this.article.id && article.category !== this.article.category))
      this.categoryArticles = this.shuffleArray(articles.data.data.filter((article) => article.category === this.article.category && article.id !== this.article.id))
    } catch (err) {
      console.log(err)
    }
    try {
      const categories = await this.$axios.get(
        `https://fio40ecz.directus.app/items/categories?fields=*`
      )
      this.categories = this.shuffleArray(categories.data.data)
      this.category = this.categories.filter((category) => category.id === this.article.category)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      rating: 0,
      shareAvailable: false,
      article: {},
      categoryArticles: [],
      articles: [],
      category: {},
      categories: []
    }
  },
  mounted () {
    this.shareAvailable = navigator.share !== undefined
  },
  computed: {
    twitterURL () {
      if (this.article?.topics === undefined) return ''
      return `https://twitter.com/intent/tweet?text=${this.article.title}&url=https://how-does-it-work.netlify.app${this.$nuxt.$route.path}&hashtags=#${this.article.topics[0].topics_id.title}#${this.article.topics[1].topics_id.title}#`
    },
    facebookURL () {
      if (this.article?.topics === undefined) return ''
      return `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhow-does-it-work.netlify.app%2Farticle%${this.article.slug}F2&amp;src=sdkpreparse`
    },
    mailURL () {
      if (this.article?.topics === undefined) return ''
      return `mailto:?to=&body=https://how-does-it-work.netlify.app/article/${this.article.slug}%0D%0A%0D%0A${this.article.article.replace(/<[^>]*>/g, '')}&subject=Look what I've found: ${this.article.title}`
    }
  },
  methods: {
    openCategory (id) {
      this.$router.push({path: `/categories/category/${id}`})
    },
    async share () {
      if (navigator?.share === undefined) return
      const response = await fetch(this.article.image)
      console.log(response)
      const blob = await response.blob()
      const filesArray = [
        new File(
          [blob],
          `${this.article.title.replaceAll(' ', '_')}.jpg`,
          {
            type: blob.type,
            lastModified: new Date().getTime()
          }
        )
      ]
      await navigator.share({
        text: this.article.title,
        files: filesArray,
        url: `https://how-does-it-work.netlify.app${this.$nuxt.$route.path}`
      })
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
