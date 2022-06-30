<template>
  <v-container fluid>
    <v-row>
      <v-col class="mx-5">
        <v-alert dense text class="mt-3" icon="fa-home-user">
          <span class="body-2">My Properties</span>
        </v-alert>

        <v-skeleton-loader
          v-if="!Receiver.loaded"
          type="table"
        ></v-skeleton-loader>
        <dir v-else>
          <v-row justify="end">
            <v-col cols="1">
              <v-btn
                class="mx-2"
                v-on:click="openAddForm"
                fab
                dark
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- {{ Receiver.data[0] }} -->
          <SimpleTable
            :data="Receiver.data"
            :header="header"
            clickReturn="id"
            @rowClicked="NavigateToDetailPage"
          />
          <v-dialog v-model="addDialog" max-width="1090">
            <add-property
              title="Add New Subscription"
              :action="propertyService.addProperties"
              v-on:close="closeAddDialog"
              v-on:refresh="refreshData"
              type="add"
            />
          </v-dialog>
        </dir>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PropertyService } from "../../../services/property.service";
import SimpleTable from "../../../components/CTable.vue";
import AddProperty from "../components/AddProperty.vue";

export default {
  name: "my_properties",
  components: {
    SimpleTable,
    AddProperty,
  },
  data() {
    return {
      Receiver: {
        data: null,
        loaded: false,
        error: null,
      },
      header: [
        {text: "Price", value: "price", format: (val) => val + " ETB"},
        {text: "Bedrooms", value: "bedrooms", format: (val) => val + " room" + (val > 1 ? "s" : "")},
        // {text: "Bathroom", value: "bathrooms", format: (val) => val + " room" + (val > 1 ? "s" : "")},
        {text: "Property Type", value: "property_type", format: (val) => val + " ETB"},
        {text: "Country", value: "address", format: (val) => val.county},
        {text: "Region", value: "address", format: (val) => val.region},
        {text: "City", value: "address", format: (val) => val.city},
        {text: "Property Status", value: "property_status"},
      ],
      addDialog: false,
    };
  },
  methods: {
    NavigateToDetailPage(id) {
        this.$router.push({ name: "property_detail", params: { id } });
    },
    openAddForm() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
    async getMyPropertyList() {
      await this.propertyService.getMyProperties(this.Receiver);
    },
    async refreshData() {
      await this.getMyPropertyList();
    },
  },
  async created() {
    this.propertyService = new PropertyService(this);
    await this.getMyPropertyList();
  },
};
</script>