<template>
  <v-container>
    <div
      v-for="(category, index) in categories"
    >
      <span v-if="articles.filter(article => article.category === category.id).length">
        <h2
          v-if="categories.length > 1"
          @click="$emit('openCategory', category.slug)"
          :class="index !== 0 ? 'mt-4' : 'mt-8'"
          class="is-cursor-pointer"
        >
          {{ title.length ? title : category.title }}:
        </h2>
        <h1 v-else :class="index !== 0 ? 'mt-4' : 'mt-8'">
          {{ title.length ? title : category.title }}:
        </h1>
        <p
          @click="$emit('openCategory', category.slug)"
          class="mb-negative-2"
          :class="categories.length > 1 ? 'is-cursor-pointer' : ''"
        >
          {{ category.description }}
        </p>
        <v-row
          v-if="articles && articles.length"
          class="mb-6"
          no-gutters
        >
          <v-col
            v-for="(article, index) in filteredArticles(category)"
            :key="index"
          >
            <card
              :title="`${article.title}?`"
              :description="article.description"
              :topics="article.topics"
              :img="article.image"
              :id="JSON.stringify(article.id)"
              :link="`/article/${article.slug}`"
              cta="Read now"
              @addFilter="addFilter"
              @open="open(article.slug)"
            >
            </card>
          </v-col>
        </v-row>
        <v-btn
          v-if="articles.filter(article => article.category === category.id).length >= maxAmount && maxAmount !== 0"
          :to="`/categories/category/${category.id}`"
          class="is-button mt-negative-6 mb-5 fw-600"
          aria-label="show more"
          text
          nuxt
        >
          Show more
        </v-btn>
        <span v-else class="mb-negative-5" />
        <v-col
          class="mt-negative-3"
          cols="12"
        >
          <v-divider />
            <AdBanner class="mt-9" />
        </v-col>
      </span>
    </div>
  </v-container>
</template>

<script>
import AdBanner from "~/components/ads/AdBanner";
export default {
  name: "Articles",
  components: {AdBanner},

  props: {
    categories: {
      type: Array,
      required: true
    },
    articles: {
      type: Array,
      required: true
    },
    maxAmount: {
      type: Number,
      required: false,
      default: 0
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    filteredArticles (category) {
      if (this.maxAmount === 0) return this.articles.filter(a => a.category === category.id)
      return this.articles.filter(a => a.category === category.id).slice(0, this.maxAmount)
    },
    addFilter(filter) {
      this.$emit('addFilter', filter)
    },
    open (slug) {
      this.$router.push({path: `/article/${slug}`});
    }
  }
}
</script>
