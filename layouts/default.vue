<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      class="is-nav-color"
      :mini-variant="miniVariant"
      :clipped="false"
      temporary
      app
    >
      <div color="primary" class="is-navigation-top-part mb-4">
        <h3 class="mt-4 ml-4">
          How Does It Work?
        </h3>
      </div>
      <v-divider class="mb-6" />
      <v-list rounded>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      class="is-nav-color"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title @click="home" class="is-cursor-pointer">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="true"
      class="is-nav-color"
      app
    >
      <span>
        &copy; {{ new Date().getFullYear() }} Julian Lau
      </span>
      <v-spacer></v-spacer>
      <span class="mr-6 mr-2-xs">
        <NuxtLink class="is-link mr-4" to="/privacy">
          Privacy Policy
        </NuxtLink>
        |
        <NuxtLink class="is-link ml-4" to="/termsConditions">
          Terms And Conditions
        </NuxtLink>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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
        // {
        //   icon: 'mdi-cog',
        //   title: 'Settings',
        //   to: '/settings'
        // },
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
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'How Does It Work?'
    }
  },
  methods: {
    home () {
      this.$router.push({path: '/'});
    }
  }
}
</script>
