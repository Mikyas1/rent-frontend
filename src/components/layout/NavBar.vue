<template>
  <div>
    <v-app-bar app color="primary accent-4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer">
          <v-icon>fa-align-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/">
          <span class="white--text h2 mr-2">Betoch</span>
          <v-icon small class="mb-2">fa-house</v-icon>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="mr-4">
        <span v-if="loggedIn">
          <v-icon class="mr-2 mb-1" small>fa-user</v-icon>
          <span class="mr-2">{{ user.first_name }} {{ user.last_name }}</span>

          <v-btn
            link
            color="white--text mb-2"
            text
            v-bind:to="{ name: 'logout' }"
          >
            <v-icon small>fa-sign-out</v-icon>
            <span class="ml-2 text-capitalize">Logout</span>
          </v-btn>
        </span>
        <span v-else>
          <v-btn
            link
            color="white--text mb-2"
            text
            v-bind:to="{ name: 'login' }"
          >
            <v-icon small>fa-sign-in</v-icon>
            <span class="ml-2 text-capitalize">Login</span>
          </v-btn>

          <v-btn
            link
            color="white--text mb-2"
            text
            v-bind:to="{ name: 'register' }"
          >
            <v-icon small>fa-user-plus</v-icon>
            <span class="ml-2 text-capitalize">Sign Up</span>
          </v-btn>
        </span>
      </div>
    </v-app-bar>


    <v-navigation-drawer v-model="drawer" app left color="white">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <h2 class="logo1">
                <span class="primary--text">Betoch </span>
                <v-icon small class="mb-2" color="primary">fa-house</v-icon>
            </h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list nav>
        <v-list-item-group v-if="routes" v-model="selectedItem" color="secondary">
          <v-list-item
            color="green"
            v-for="(item, i) in routes"
            :key="i"
            router
            v-bind:to="{ name: item.route }"
          >
            <v-list-item-icon>
              <v-icon small v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <p v-else>
            <v-icon small color="primary" class="mb-2 mr-2">fa-info-circle</v-icon>
            <span class="primary--text">Please Login or SignUp to access more features</span>
        </p>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "nav_bar",
  data() {
      return {
          drawer: false,
          selectedItem: 0,
          items: [
              { text: 'My Properties', icon: 'fa-home-user', route: 'my_properties' },
              { text: 'My Renter Profile', icon: 'fa-address-card', route: 'renter_profile' },
              { text: 'My rents', icon: 'fa-key', route: 'my_rents' },
              { text: 'Recived Rent Requests', icon: 'fa-inbox', route: 'recived_rent_requests' },
              // { text: 'Messages', icon: 'fa-comment-alt', route: 'driver_list' },
              { text: 'My Rent Requests', icon: 'fa-database', route: 'my_rent_requests' },
              { text: 'My Rented Properties', icon: 'fa-handshake', route: 'my_rented_properties' },
          ],
      }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      loggedIn: "auth/loggedIn",
    }),
    routes() {
        if (this.loggedIn) {
            return this.items;
        } else {
            return null;
        }
    }
  },
};
</script>

<style scoped>
.logo {
  cursor: pointer;
}
.logo1 {
    border-bottom: 1px solid green;
    padding-top: 10px;
    padding-bottom: 14px;
}
</style>
