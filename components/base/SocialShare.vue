<template>
  <div class="mb-5">
    <a
      target="_blank"
      class="share-button"
      :href="twitterUrl"
      data-size="large"
    >
      <v-icon size="34">
        mdi-twitter
      </v-icon>
    </a>
    <a
      target="_blank"
      class="share-button ml-4"
      :href="mailUrl"
      data-size="large"
    >
      <v-icon size="34">
        mdi-email-outline
      </v-icon>
    </a>
    <a
      target="_blank"
      :href="facebookUrl"
      class="share-button ml-4 fb-xfbml-parse-ignore">
      <v-icon size="34">
        mdi-facebook
      </v-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: "SocialShare",
  props: {
    facebookUrl: {
      type: String,
      required: true
    },
    twitterUrl: {
      type: String,
      required: true
    },
    mailUrl: {
      type: String,
      required: true
    }
  }
}
</script>
