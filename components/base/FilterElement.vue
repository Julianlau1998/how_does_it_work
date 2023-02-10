<template>
  <span>
    <v-col cols="8">
      <v-select
        v-model="filter"
        class="mb-4"
        :items="topics"
        label="Filter"
        item-text="title"
        item-value="id"
        dense
        multiple
        outlined
      >
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0">
            {{ item.title }}
          </span>
          <span
            v-if="index === 1"
            class="grey--text text-caption"
          >
            &nbsp;(+{{ filter.length - 1 }})
          </span>
        </template>
      </v-select>
    </v-col>
    <v-col class="mt-negative-5-5 mb-6" cols="12">
        <v-chip
          v-for="item in filter"
          class="ma-2"
          close
          @click:close="removeFilter(item)"
        >
          {{ topics.filter((topic) => topic.id === item)[0].title }}
        </v-chip>
    </v-col>
  </span>
</template>

<script>
export default {
  name: "FilterElement",
  props: {
    filterProp: {
      type: Array,
      require: true
    },
    topicsProp: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      topics: [],
      filter: []
    }
  },
  created () {
    this.topics = this.topicsProp
    this.filter = this.filterProp
  },
  watch: {
    filter (val) {
      this.$emit('filter', val)
    }
  },
  methods: {
    removeFilter (id) {
      this.filter = this.filter.filter((filter) => filter !== id)
    }
  }
}
</script>
