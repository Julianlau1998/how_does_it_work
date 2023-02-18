<template>
<!--  <div class="adCard v-card mt-12">
    <div class="ad" v-html="adLink" />
  </div>-->
  <div class="ad" v-html="adLink" />
</template>

<script>
export default {
  name: "AdCard",
  computed: {
    adLink () {
      return '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=3&p=288&l=ur1&category=prime_video&banner=1WX8KD0X5SW5JVYH79G2&f=ifr&linkID={{link_id}}&t=jlapps-21&tracking_id=jlapps-21" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>'
    }
  },
}
</script>
