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

export default {
  name: "rent_requests_recived",
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
      header: [
        {
          text: "Requester",
          value: "requester",
          format: (val) => val.first_name + " " + val.last_name,
        },
        {
          text: "Bedrooms",
          value: "property",
          format: (val) =>
            val.bedrooms + " room" + (val.bedrooms > 1 ? "s" : ""),
        },
        {
          text: "Location",
          value: "property",
          format: (val) =>
            val.address.county +
            ", " +
            val.address.region +
            ", " +
            val.address.city,
        },
        {
          text: "Price",
          value: "property",
          format: (val) => val.price + " ETB",
        },
        { text: "Payment Type", value: "payment_type" },
        {
          text: "Rent Duration",
          value: "rent_duration",
          format: (val) => val + " months",
        },
        { text: "Status", value: "status" },
        { text: "active", value: "active" },
      ],
    };
  },
  methods: {
    NavigateToDetailPage(id) {
      this.$router.push({ name: "rent_requests_detail", params: { id } });
    },
  },
  async created() {
    this.rentService = new RentService(this);
    await this.rentService.getRentRequestsAsOwner(this.Receiver);
  },
};
</script>