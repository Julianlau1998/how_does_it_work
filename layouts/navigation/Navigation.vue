<template>
  <span>
    <v-app-bar
      :clipped-left="false"
      class="is-nav-color"
      fixed
      app
    >
      <v-app-bar-nav-icon @click="drawer=!drawer" aria-label="menu" />
      <v-toolbar-title @click="home" class="is-cursor-pointer">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      class="is-nav-color"
      :clipped="false"
      temporary
      app
    >
    <div color="primary" class="is-navigation-top-part">
      <div class="is-nav-title ml-4">
        <b>
          {{ title }}
        </b>
      </div>
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
  </span>
</template>

<script>
export default {
  name: "Navigation",
  data () {
    return {
      drawer: false
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    home () {
      this.$router.push({path: '/'});
    }
  }
}
</script>
