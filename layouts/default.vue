<template>
  <v-app dark>
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v16.0" nonce="f9f8cj6I"></script>
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
        &copy; {{ new Date().getFullYear() }} How Does It Work
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
          title: 'Imprint',
          to: '/imprint'
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
