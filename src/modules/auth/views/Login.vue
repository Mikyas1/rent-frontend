<template>
  <div class="c-background">
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="5" lg="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>
                <v-icon>fa-sign-in</v-icon>
                <span
                  class="ml-2 link"
                  @click="$router.push({ name: 'property_list' })"
                  >Betoch Login</span
                >
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-on:submit.prevent="login">
                <v-text-field
                  label="Email"
                  prepend-icon="fa-at"
                  type="text"
                  v-model="email"
                  :rules="emailRules"
                  required
                />

                <v-text-field
                  id="password"
                  label="Password"
                  prepend-icon="fa-lock"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                />
                <v-card-actions>
                  <!-- <div>
                    <p class="text-read" v-if="Receiver.error">
                      {{ Receiver.error }}
                    </p>
                  </div> -->

                  <v-spacer />
                  <v-btn
                    color="primary white--text text-capitalize"
                    type="submit"
                    :loading="Receiver.loading"
                  >
                    <v-icon small>fa-sign-in</v-icon>
                    <span class="ml-2">Login</span>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { AuthService } from '../../../services/api/auth.service';
import { emailRules, passwordRules } from "../../../resources/validators";
import { AuthService } from "../../../services/auth.service";

export default {
  name: "login_page",
  data() {
    return {
      emailRules,
      passwordRules,
      Receiver: {
        data: null,
        loaded: false,
        loading: false,
        error: null,
      },
      email: "",

      password: "",
    };
  },
  components: {},
  methods: {
    async login() {
      if (!this.$refs.form) return;
      if (!this.$refs.form.validate()) return;
      await this.authService.login(this.Receiver, {
        email: this.email,
        password: this.password,
      });
    },
  },
  created() {
    this.authService = new AuthService(this);
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.c-form {
  margin-top: 30vh;
}
.text-read {
  color: red;
}
.link {
  cursor: pointer;
}
</style>