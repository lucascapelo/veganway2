<template>
  <v-app>
    <!-- <Menu/> -->
    <Feed/>

    <!-- <v-main>
      <router-view/>
    </v-main> -->
  </v-app>
</template>

<script>
// import Menu from "./components/Menu.vue";
import Feed from "./components/Feed.vue";

export default {
  name: 'App',
  components: {
    // Menu,
    Feed
  },
  data: () => ({
    //
  }),
};
</script>
