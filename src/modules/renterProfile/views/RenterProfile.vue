<template>
  <v-container fluid>
    <v-row>
      <v-col class="mx-5">
        <v-alert dense text class="mt-3" icon="fa-address-card">
          <span class="body-2">Renter Profile</span>
        </v-alert>

        <v-skeleton-loader
          v-if="!Receiver.loaded"
          type="table"
        ></v-skeleton-loader>

        <dir v-else>
          <!-- {{ Receiver.data }} -->
          <v-form v-on:submit.prevent="submit" style="width: 100%">
            <v-container class="px-5">
              <v-text-field
                label="Family Size"
                type="number"
                outlined
                dense
                v-model.number="renter_profile.family_size"
              />
              <v-text-field
                label="Number of Pets"
                type="number"
                outlined
                dense
                v-model.number="renter_profile.pet_size"
              />
              <v-text-field
                label="Number of Vehicles"
                type="number"
                outlined
                dense
                v-model.number="renter_profile.vehicles"
              />
              <v-textarea
                label="Special Needs and Requirements"
                outlined
                dense
                v-model="renter_profile.special_needs"
              />
              <v-btn
                color="primary darken-1"
                :loading="Receiver.loading"
                type="submit"
              >
                Update
              </v-btn>
            </v-container>
          </v-form>
          <!-- {{ renter_profile }} -->
        </dir>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RenterProfileService } from "../../../services/renterProfile.service";

export default {
  name: "renter_profile",
  components: {},
  data() {
    return {
      Receiver: {
        data: null,
        loaded: false,
        error: null,
      },
      renter_profile: {
        family_size: 1,
        pet_size: 0,
        vehicles: 0,
        special_needs: "",
      },
    };
  },
  methods: {
    setRenterProfile(val) {
      if (val != null) {
        let data = val;
        this.renter_profile.family_size = data.family_size;
        this.renter_profile.pet_size = data.pet_size;
        this.renter_profile.vehicles = data.vehicles;
        this.renter_profile.special_needs = data.special_needs;
      }
    },
    async submit() {
        await this.renterProfileService.updateRenterProfile(this.Receiver, this.renter_profile);
        this.setRenterProfile(this.Receiver.data);
    },
  },
  async created() {
    this.renterProfileService = new RenterProfileService(this);
    await this.renterProfileService.getRenterProfile(this.Receiver);
    this.setRenterProfile(this.Receiver.data);
  },
};
</script>