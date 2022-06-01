<template>
  <div>
    <!-- <NavBar /> -->

    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col>
            <!-- Center content injection -->
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Footer from '../components/Footer.vue';
// import NavBar from '../components/NavBar.vue';

export default {
  name: 'main_layout',

//   components: { Footer, NavBar },
};
</script>
