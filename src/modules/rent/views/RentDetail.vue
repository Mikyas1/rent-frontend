<template>
  <v-container fluid>
    <v-row>
      <v-col class="mx-5">
        <v-alert dense text class="mt-3" icon="fa-handshake">
          <span class="body-2">Rent Detail</span>
        </v-alert>

        <v-skeleton-loader
          v-if="!Receiver.loaded"
          type="table"
        ></v-skeleton-loader>
        <dir v-else>
          <v-row class="mb-5">
            <v-col cols="12" md="6">
              
              <DictTable
                class="mb-5"
                title="Renter"
                :data="Receiver.data"
                :header="renterHeaders"
              />
              <dir style="height: 29px;"></dir>

              <DictTable
                class="mt-5"
                title="Property Owner"
                :data="Receiver.data"
                :header="ownerHeaders"
              />
                <!-- {{ Receiver.data.owner }} -->
              <dir style="height: 29px;"></dir>
            <v-btn
                large
                color="secondary white--text mb-2"
                @click="GenerateContract"
                class="mr-3"
              >
                <v-icon small>fa-check-circle</v-icon>
                <span class="ml-2 text-capitalize">Generate Contract</span>
              </v-btn>

            </v-col>
            <v-col cols="12" md="6">
              
              <DictTable
                title="Rent Status"
                :data="Receiver.data"
                :header="rentDetailHeaders"
              />
              <dir style="height: 29px;"></dir>

                <DictTable
                title="Property Detail"
                :data="Receiver.data"
                :header="propertyHeaders"
              />
                <!-- {{ Receiver.data.rent_request }} -->

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
var moment = require('moment');

export default {
  name: "rent_detail",
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
      moment,
      renterHeaders: [
        {text: "Name", value: "requester", format: (val) => val.first_name + " " + val.last_name},
        {text: "Requester Email", value: "requester", format: (val) => val.email },
        {text: "Requester Age", value: "requester", format: (val) => (val.age ? val.age : "-----"),},
      ],
      rentDetailHeaders: [
        {text: "Price", value: "rent_request", format: (val) => val.property.price + " ETB"},
        {text: "Payment Type", value: "rent_request", format: val => val.payment_type},
        {text: "Rent Duration", value: "rent_request", format: (val) => val.rent_duration + " months"},
        {text: "Started", value: "created_at", format: val => moment(val).fromNow()},
        {text: "Status", value: "status"},
      ],
      ownerHeaders: [
        {text: "Name", value: "owner", format: (val) => val.first_name + " " + val.last_name},
        {text: "Owner Email", value: "owner", format: (val) => val.email },
        // {text: "Owner Age", value: "owner", format: (val) => (val.age ? val.age : "-----"),},
      ],
      propertyHeaders: [
        { text: "Property Type", value: "rent_request", format: val => val.property.property_type },
        {
          text: "Property Size",
          value: "rent_request",
          format: (val) => val.property.property_size + " m*m",
        },
        {
          text: "Land Area",
          value: "rent_request",
          format: (val) => val.property.land_area + " m*m",
        },
        {
          text: "Bedrooms",
          value: "rent_request",
          format: (val) => val.property.bedrooms + " room" + (val.property.bedrooms > 1 ? "s" : ""),
        },
        {
          text: "Bathrooms",
          value: "rent_request",
          format: (val) => val.property.bathrooms + " room" + (val.property.bathrooms > 1 ? "s" : ""),
        },
        {
          text: "Garage rooms",
          value: "rent_request",
          format: (val) => (val.property.garage_no ? val.property.garage_no + " rooms" : "-"),
        },
        { text: "No of floor", value: "floor", format: (val) => "#" + val },
        {
          text: "Year built",
          value: "rent_request",
          format: (val) => (val.property.year_built ? val.property.year_built : "-"),
        },
        { text: "Description", value: "rent_request", format: val => val.property.description },
        { text: "Furnished", value: "rent_request", format: val => val.property.furnished  },
        { text: "Features", value: "rent_request", format: val => val.property.features  },
      ],
    };
  },
  methods: {
      GenerateContract() {
        this.$router.push({ name: "contract", params: { id: this.$route.params.id } });
      }
  },
  async created() {
    this.rentService = new RentService(this);
    await this.rentService.rentDetail(this.$route.params.id, this.Receiver);
  },
};
</script>