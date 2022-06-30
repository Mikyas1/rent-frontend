<template>
  <dir>
    <v-form v-on:submit.prevent="submit" style="width: 100%">
      <v-container class="px-5">
        <v-text-field
          label="Family Size"
          type="number"
          outlined
          dense
          v-model.number="family_size"
        />
        <v-text-field
          label="Number of Pets"
          type="number"
          outlined
          dense
          v-model.number="pet_size"
        />
        <v-text-field
          label="Number of Vehicles"
          type="number"
          outlined
          dense
          v-model.number="vehicles"
        />
        <v-textarea
          label="Special Needs and Requirements"
          outlined
          dense
          v-model="special_needs"
        />
        <v-btn color="primary darken-1" @click="submit"> Update </v-btn>
      </v-container>
    </v-form>
  </dir>
</template>

<script>
export default {
  name: "renter_profile_form",
  props: {
    renter_profile_in: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      renter_profile: {
        family_size: 1,
        pet_size: 0,
        vehicles: 0,
        special_needs: "",
      },
    };
  },
  methods: {
    submit() {},
  },
};
</script>