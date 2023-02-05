<template>
    <v-container justify fill-height fluid class="mb-max">
      <v-row class="mt-1">
        <v-col cols="12" sm="6">
          <h1>
            {{ article.title }}?
          </h1>
          <p>
            <b>
              {{ article.description }}
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
        </v-col>
        <v-col>
          <v-img
            class="is-rounded-2"
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
      <div id="lateral">
        <v-fab-transition>
          <v-btn
            color="blue lighten-2"
            fab
            large
            dark
            bottom
            left
            class="v-btn--example"
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
export default {
  name: "_slug",
  async asyncData ({ route, $directus }) {
    const article = await $directus.items(`articles/${route.params.slug}`).readByQuery({
      fields: ["*", "topics.topics_id.*"],
      sort: "-date_created"
    })
    return { article: article.data }
  },
  data () {
    return {
      rating: 0
    }
  },
/*  watch: {
    async rating (val) {
      const res = await axios.post(`${process.env}/ratings`, {
        data: {
          value: val
        }
      })
      console.log(res)
    }
  },*/
  created () {
    console.log(this.$route.params)
  }
}
</script>
