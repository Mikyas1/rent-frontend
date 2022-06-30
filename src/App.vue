<template>
  <v-app>
    <Snackbar/>
    <router-view />
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.vue";
export default {
  name: "App",
  components: {
    Snackbar,
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
};
</script>
