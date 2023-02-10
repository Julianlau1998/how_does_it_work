<template>
  <v-card
    class="mx-auto my-12"
    max-width="357"
    min-width="357"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
     <v-img
       @click="$emit('open')"
       class="is-cursor-pointer"
       height="250"
       :src="`https://fio40ecz.directus.app/assets/${img}`"
     ></v-img>

    <v-card-title class="is-cursor-pointer" @click="$emit('open')">
      {{ title }}
    </v-card-title>

    <v-card-text class="is-cursor-pointer" @click="$emit('open')">
      <div>
        {{ description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip
          v-for="(topic, id) in topics"
          :key="id"
          active-class="blue lighten-2 white--text"
          @click="$emit('addFilter', topic)"
        >
          <span>
            {{ topic.topics_id.title }}
          </span>
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="blue lighten-2"
        text
        @click="$emit('open')"
      >
        {{ cta }}
      </v-btn>
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
    }
  }
}
</script>
