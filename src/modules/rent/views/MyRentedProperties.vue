<template>
  <v-container fluid>
    <v-row>
      <v-col class="mx-5">
        <v-alert dense text class="mt-3" icon="fa-handshake">
          <span class="body-2">My Rented Properties</span>
        </v-alert>

        <v-skeleton-loader
          v-if="!Receiver.loaded"
          type="table"
        ></v-skeleton-loader>
        <dir v-else>
          <!-- {{ Receiver.data }} -->
          <SimpleTable
            :data="Receiver.data"
            :header="header"
            clickReturn="id"
            @rowClicked="NavigateToDetailPage"
          />
        </dir>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RentService } from "../../../services/rent.service";
import SimpleTable from "../../../components/CTable.vue";
var moment = require('moment');

export default {
  name: "my_rented_properties",
  components: {
    SimpleTable,
  },
  data() {
    return {
      Receiver: {
        data: null,
        loaded: false,
        error: null,
      },
      moment,
      header: [
        {text: "Renter", value: "requester", format: (val) => val.first_name + " " + val.last_name},
        {text: "Bedrooms", value: "rent_request", format: (val) => val.property ? val.property.bedrooms + " room" + (val.property.bedrooms > 1 ? "s" : "") : ""},
        {text: "Bathrooms", value: "rent_request", format: (val) => val.property ? val.property.bathrooms + " room" + (val.property.bathrooms > 1 ? "s" : "") : ""},
        {text: "Location", value: "rent_request", format: (val) => val.property.address.county + ", " + val.property.address.region + ", " + val.property.address.city},
        {text: "Price", value: "rent_request", format: (val) => val.property.price + " ETB"},
        {text: "Payment Type", value: "rent_request", format: val => val.payment_type},
        {text: "Rent Duration", value: "rent_request", format: (val) => val.rent_duration + " months"},
        {text: "Started", value: "created_at", format: val => moment(val).fromNow()},
        {text: "Status", value: "status"},
        ],
    };
  },
  methods: {
    NavigateToDetailPage(id) {
      this.$router.push({ name: "rent_detail", params: { id } });
    },
  },
  async created() {
    this.rentService = new RentService(this);
    await this.rentService.rentsAsOwner(this.Receiver);
  },
};
</script>