<template>
  <v-card
    class="mx-auto my-12 v-card mx-3"
    max-width="352"
    min-width="280"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
     <v-img
       v-if="title !== 'How does it work?'"
       @click="$emit('open')"
       class="is-cursor-pointer"
       height="250"
       :src="`https://cms.how-works.com/assets/${img}`"
     ></v-img>
    <div v-else class="is-card-loader">
      <v-progress-circular
        :size="30"
        :width="3"
        color="primary"
        indeterminate
        class="is-center mt-6"
      ></v-progress-circular>
    </div>

    <v-card-title class="is-cursor-pointer" @click="$emit('open')">
      {{ title }}
    </v-card-title>
    <v-card-text class="is-cursor-pointer" @click="$emit('open')">
      <p>
        {{ description }}
      </p>
    </v-card-text>

    <v-divider class="mx-4" :class="!topics.length ? 'mt-negative-2' : ''"></v-divider>
    <v-card-text v-show="topics.length">
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip
          v-for="(topic, index) in topics"
          :key="`card-chip-${index}`"
          active-class="no-active white--text"
          class="is-hoverable"
          @click="$emit('addFilter', topic)"
        >
          <span>
            {{ topic.topics_id.title }}
          </span>
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <NuxtLink
        :to="link"
        color="blue lighten-2"
        text
        class="is-link-button mb-1"
        :class="!topics.length ? 'mb-negative-6' : ''"
        aria-label="read"
      >
        {{ cta }}
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Card.vue",
  props: {
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    topics: {
      required: true,
      type: Array
    },
    img: {
      required: true,
      type: String
    },
    id: {
      required: true,
      type: String
    },
    cta: {
      required: true,
      type: String
    },
    link: {
      required: true,
      type: String
    }
  }
}
</script>
