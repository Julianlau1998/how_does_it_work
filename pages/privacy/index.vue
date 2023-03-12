<template>
  <div v-html="text" class="privacyWrapper is-text-align-center" />
</template>

<script>
export default {
  head () {
    return {
      title: 'Privacy - How Does It Work',
      meta: [
        {
          hid: 'description_privacy',
          name: 'description_privacy',
          content: "Privacy information for 'How Does It Work' by Julian Lau"
        }
      ]
    }
  },
  name: "index.vue",
  transition: 'route',
  async fetch () {
    const response = await this.$directus.items("privacy").readByQuery({
      fields: ["*"]
    })
    console.log(response)
    this.text = response.data.text
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>
