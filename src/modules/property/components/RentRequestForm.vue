<template>
  <div>
    <v-skeleton-loader
      v-if="!OptionsReceiver.loaded"
      type="table"
    ></v-skeleton-loader>
    <v-card v-else>
      <v-card-title class="text-h4"> Request Rent </v-card-title>

      <v-card-text>
        <v-form ref="form" style="width: 100%">
          <v-container class="px-5">
            <v-text-field
              label="* Rent Duration in months"
              type="number"
              dense
              v-model.number="rent_duration"
              :rules="min0('Rent Duration')"
            />
            <v-select
              :items="OptionsReceiver.data"
              label="* Paymet Type"
              v-model="payment_type"
              :rules="required('Paymet Type')"
            ></v-select>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>

          <!-- {{property}} -->
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          :loading="Receiver.loading"
          text
          @click="submit"
        >
          Submit
        </v-btn>

        <v-btn color="green darken-1" text @click="close"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { required, min0 } from "../../../resources/validators";
import { RentService } from "../../../services/rent.service";

export default {
  name: "rent_request_form",
  props: {
    property: {
        type: Object,
        required: true,
    }
  },
  data() {
    return {
      required,
      min0,
      Receiver: {
        data: null,
        loaded: false,
        error: null,
      },
      OptionsReceiver: {
        data: null,
        loaded: false,
        error: null,
      },
      rent_duration: null,
      payment_type: null,
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.form) return;
      if (!this.$refs.form.validate()) return;

      try {
        await this.rentService.createRentRequest(this.Receiver, {
          payment_type: this.payment_type,
          rent_duration: this.rent_duration,
          owner_id: this.property.owner_id,
          property_id: this.property.id,
        });
        this.close();
      } catch (err) {
          console.log(err);
      }
    },
    close() {
      this.$emit("close");
    },
  },
  async created() {
    this.rentService = new RentService(this);
    await this.rentService.getPaymentTypes(this.OptionsReceiver);
  },
};
</script>