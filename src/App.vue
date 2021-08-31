<template>
  <v-app>
    <!-- <Menu/> -->
     <Feed/>
    <!--<ReceitaTeste/> -->
    <!-- <v-main>
      <router-view/>
    </v-main> -->
  </v-app>
</template>

<script>
// import Menu from "./components/Menu.vue";
import Feed from "./components/Feed.vue";
//import ReceitaTeste from "./components/ReceitaTeste.vue";

export default {
  name: 'App',
  components: {
    // Menu,
    Feed,
    //ReceitaTeste,
  },
  data: () => ({
    //
  }),
};
</script>
