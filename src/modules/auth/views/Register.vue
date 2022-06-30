<template>
  <div class="c-background">
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="5" lg="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>
                <v-icon>fa-user-plus</v-icon>
                <span
                  class="ml-2 link"
                  @click="$router.push({ name: 'property_list' })"
                  >Betoch Sign Up</span
                >
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-on:submit.prevent="register">
                <v-text-field
                  label="First Name"
                  prepend-icon="fa-user"
                  type="text"
                  v-model="first_name"
                  :rules="lenRules('First Name', 3)"
                  required
                />

                <v-text-field
                  label="Last Name"
                  prepend-icon="fa-user"
                  type="text"
                  v-model="last_name"
                  :rules="lenRules('Last Name', 3)"
                  required
                />

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
                <v-text-field
                  id="re-password"
                  label="Confirm Password"
                  prepend-icon="fa-lock"
                  type="password"
                  v-model="conf_password"
                  :rules="conf_password_rules()"
                  required
                />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary white--text text-capitalize"
                    type="submit"
                    :loading="Receiver.loading"
                  >
                    <v-icon small>fa-user-plus</v-icon>
                    <span class="ml-2">Register</span>
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
import {
  emailRules,
  passwordRules,
  lenRules,
} from "../../../resources/validators";
import { AuthService } from "../../../services/auth.service";

export default {
  name: "register_page",
  data() {
    return {
      emailRules,
      passwordRules,
      lenRules,
      Receiver: {
        data: null,
        loaded: false,
        loading: false,
        error: null,
      },
      email: "",
      password: "",
      conf_password: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    async register() {
      if (!this.$refs.form) return;
      if (!this.$refs.form.validate()) return;
      await this.authService.register(this.Receiver, {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
      });
    },
    conf_password_rules() {
      let rules = [
        ...this.passwordRules,
        (v) => v == this.password || "Confirm Password don't match Password",
      ];
      return rules;
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
