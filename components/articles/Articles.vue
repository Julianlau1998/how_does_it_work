<template>
  <v-container>
    <div
      v-for="(category, index) in categories"
    >
      <span v-if="articles.filter(article => article.category === category.id).length">
        <h2
          v-if="categories.length > 1"
          @click="$emit('openCategory', category.id)"
          :class="index !== 0 ? 'mt-4' : 'mt-8'"
          class="is-cursor-pointer"
        >
          {{ category.title }}:
        </h2>
        <h1 v-else :class="index !== 0 ? 'mt-4' : 'mt-8'">
          {{ category.title }}
        </h1>
        <v-row
          v-if="articles && articles.length"
          class="mb-6"
          no-gutters
        >
          <v-col
            v-for="(article, id) in filteredArticles(category)"
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
              @addFilter="addFilter"
            >
            </card>
          </v-col>
        </v-row>
        <v-btn
          v-if="articles.filter(article => article.category === category.id).length >= maxAmount && maxAmount !== 0"
          @click="$emit('openCategory', category.id)"
          class="mt-negative-6 mb-5"
        >
          Show more
        </v-btn>
        <span v-else class="mb-negative-5" />
        <v-col
          class="mt-negative-3"
          cols="12"
        >
        <v-divider />
      </v-col>
      </span>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Articles",
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
    open (id) {
      this.$router.push({path: `/article/${id}`});
    }
  }
}
</script>
