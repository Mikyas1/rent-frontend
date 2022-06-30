<template>
  <v-snackbar
    v-model="snackbar.value"
    v-bind:timeout="snackbar.timeout"
    right
    v-bind:color="color"
    v-bind:multi-line="snackbar.multiline === true"
    :min-width="200"
  >
    <v-icon small color="white" class="mr-3">{{ icon }}</v-icon>
    <span>{{ snackbar.message }}</span>

    <v-btn text icon class="white--text ml-5" v-on:click="CLOSE_SNCKBAR">
        <v-icon>fa-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "snack_bar",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["CLOSE_SNCKBAR"])
  },
  computed: {
    ...mapGetters({
      snackbar: "snackbar"
    }),
    icon() {
      if (this.snackbar.status == "success") {
        return "fa-check";
      } else {
        return "fa-warning";
      }
    },
    color() {
      if (this.snackbar.status == "success") {
        return "secondary";
      } else {
        return "";
      }
    }
  },
};
</script>
