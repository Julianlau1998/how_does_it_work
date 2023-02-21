<template>
  <span>
    <v-row
      v-if="categories && categories.length"
      class="mb-6"
    >
      <v-col
        v-for="(category, id) in filteredCategories"
        :key="id"
      >
        <card
          :title="category.title"
          :description="category.description"
          :topics="[]"
          :img="category.image"
          :id="JSON.stringify(category.id)"
          :link="`/categories/category/${category.slug}`"
          cta="Open"
          @open="$emit('open', category.slug)"
        >
        </card>
      </v-col>
    </v-row>
  </span>
</template>

<script>
export default {
  name: "Categories",
  props: {
    categories: {
      type: Array,
      required: true
    },
    maxAmount: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    filteredCategories () {
      if (this.maxAmount === 0) return this.categories
      return this.categories.slice(0, this.maxAmount)
    },
  }
}
</script>
