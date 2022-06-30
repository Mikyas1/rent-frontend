<template>
  <div>
    <NavBar />

    <v-main class="c-main">
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col>
            <!-- Center content injection -->
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Footer />
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Footer from './Footerr.vue';

export default {
  name: 'main_layout',

  components: { Footer, NavBar },
};
</script>

<style scoped>
.c-main {
  min-height: 68vh;
}
</style>