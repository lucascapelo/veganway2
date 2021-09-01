<template>
  <v-app>
    <!-- <Menu/> -->
    <!--<Login/>-->
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
//import Login from "./components/Login.vue";

export default {
  name: 'App',
  components: {
    // Menu,
    Feed,
    //ReceitaTeste,
    //Login
  },
  data: () => ({

  }),
};
</script>
