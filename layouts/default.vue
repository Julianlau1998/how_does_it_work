<template>
  <v-app dark>
    <Navigation :items="items" />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Drawer from "~/layouts/navigation/Navigation"
import Footer from "~/layouts/navigation/Footer"
import Navigation from "~/layouts/navigation/Navigation";

export default {
  name: 'DefaultLayout',
  components: {Navigation, Footer, Drawer},
  data () {
    return {
      title: 'How Does It Work?',
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Categories',
          to: '/categories'
        },
        {
          icon: 'mdi-information',
          title: 'Privacy',
          to: '/privacy'
        },
        {
          icon: 'mdi-scale-balance',
          title: 'Terms And Conditions',
          to: '/termsConditions'
        }
      ]
    }
  }
}
</script>
