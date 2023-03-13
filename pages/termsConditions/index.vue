<template>
  <div v-html="text" />
</template>

<script>
export default {
  name: "TermsConditions",
  transition: 'route',
  head () {
    return {
      title: 'Terms And Condition - How Does It Work',
      meta: [
        {
          hid: 'description_terms',
          name: 'description_terms',
          content: "Privacy information for 'How Does It Work' by Julian Lau"
        }
      ]
    }
  },
  async fetch () {
    const response = await this.$directus.items("terms").readByQuery({
      fields: ["*"]
    })
    this.text = response.data.text
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>
