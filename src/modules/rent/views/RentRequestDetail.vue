<template>
  <v-container fluid>
    <v-row>
      <v-col class="mx-5">
        <v-alert dense text class="mt-3" icon="fa-inbox">
          <span class="body-2">Recived Rent Requests</span>
        </v-alert>

        <v-skeleton-loader
          v-if="!Receiver.loaded"
          type="table"
        ></v-skeleton-loader>
        <dir v-else>
          <v-row class="mb-5">
            <v-col cols="12" md="6">
              <!-- {{ Receiver.data.requester }} -->

              <DictTable
                title="Rent Request Details"
                :data="Receiver.data"
                :header="detailRentHeaders"
              />
              <v-btn
                large
                color="secondary white--text mb-2"
                @click="AcceptRequest"
                class="mr-3"
              >
                <v-icon small>fa-check-circle</v-icon>
                <span class="ml-2 text-capitalize">Accept Request</span>
              </v-btn>
              <v-btn
                large
                color="red white--text mb-2"
                @click="RejectRequest"
              >
                <v-icon small>fa-ban</v-icon>
                <span class="ml-2 text-capitalize">Reject Request</span>
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <DictTable
                title="Property Details"
                :data="Receiver.data.property"
                :header="detailHeaders"
              />
            </v-col>
          </v-row>
        </dir>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RentService } from "../../../services/rent.service";
import DictTable from "../../../components/DictTable.vue";

export default {
  name: "rent_request_detail",
  components: {
    DictTable,
  },
  data() {
    return {
      Receiver: {
        data: null,
        loaded: false,
        error: null,
      },
      detailHeaders: [
        { text: "Property Type", value: "property_type" },
        {
          text: "Property Size",
          value: "property_size",
          format: (val) => val + " m*m",
        },
        {
          text: "Land Area",
          value: "land_area",
          format: (val) => val + " m*m",
        },
        {
          text: "Bedrooms",
          value: "bedrooms",
          format: (val) => val + " room" + (val > 1 ? "s" : ""),
        },
        {
          text: "Bathrooms",
          value: "bathrooms",
          format: (val) => val + " room" + (val > 1 ? "s" : ""),
        },
        {
          text: "Garage rooms",
          value: "garage_no",
          format: (val) => (val ? val + " rooms" : "-"),
        },
        { text: "No of floor", value: "floor", format: (val) => "#" + val },
        {
          text: "Year built",
          value: "year_built",
          format: (val) => (val ? val : "-"),
        },
        { text: "Description", value: "description" },
        { text: "Furnished", value: "furnished" },
        { text: "Features", value: "features" },
        {
          text: "Max family size prefered",
          value: "max_family_size",
          format: (val) => "#" + val,
        },
        {
          text: "Max no of Kides prefered",
          value: "max_kids_size",
          format: (val) => "#" + val,
        },
        {
          text: "Max no of Pets prefered",
          value: "max_pet_size",
          format: (val) => "#" + val,
        },
        {
          text: "Max allowed no of vehicles",
          value: "max_vehicle_size",
          format: (val) => "#" + val,
        },
        // { text: "", value: "", format: (val) => val },
        // { text: "", value: "", format: (val) => val },
      ],
      detailRentHeaders: [
        {
          text: "Request Id",
          value: "id",
        },
        {
          text: "Price",
          value: "property",
          format: (val) => +val.price + " ETB",
        },
        {
          text: "Rent Duration",
          value: "rent_duration",
          format: (val) => +val + " months",
        },
        {
          text: "Payment Type",
          value: "payment_type",
        },
        {
          text: "Requester Name",
          value: "requester",
          format: (val) => val.first_name + " " + val.last_name,
        },
        {
          text: "Requester Email",
          value: "requester",
          format: (val) => val.email,
        },
        {
          text: "Requester Age",
          value: "age",
          format: (val) => (val ? val : "-----"),
        },
        {
          text: "Requester's Family Size",
          value: "requester",
          format: (val) =>
            val.renter_profile ? "#" + val.renter_profile.family_size : "-----",
        },
        {
          text: "Requester's no of Pets",
          value: "requester",
          format: (val) =>
            val.renter_profile ? "#" + val.renter_profile.pet_size : "-----",
        },
        {
          text: "Requester's no of Vehicles",
          value: "requester",
          format: (val) =>
            val.renter_profile ? "#" + val.renter_profile.vehicles : "-----",
        },
        {
          text: "Requester's Special needs'",
          value: "requester",
          format: (val) =>
            val.renter_profile ? val.renter_profile.special_needs : "",
        },
      ],
    };
  },
  methods: {
      async AcceptRequest() {
          await this.rentService.acceptRentRequest(this.$route.params.id);
      },
      async RejectRequest() {
          await this.rentService.rejectRentRequest(this.$route.params.id);
      },
  },
  async created() {
    this.rentService = new RentService(this);
    await this.rentService.getRentRequestDetail(
      this.$route.params.id,
      this.Receiver
    );
  },
};
</script>