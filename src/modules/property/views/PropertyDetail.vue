<template>
  <v-container fluid>
    <v-row>
      <v-col class="mx-5">
        <v-alert
          v-if="Receiver.loaded && Receiver.data"
          dense
          text
          class="mt-3"
          icon="fa-home-user"
        >
          <span class="h4">
            {{ Receiver.data.bedrooms }} Bedroom,
            {{ Receiver.data.address.county }},
            {{ Receiver.data.address.region }},
            {{ Receiver.data.address.city }}
          </span>
        </v-alert>

        <v-skeleton-loader
          v-if="!Receiver.loaded"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>

        <div v-else>
          <v-row class="mb-5">
            <v-col cols="12" md="7">
              <flickity
                v-if="Receiver.data.images"
                ref="flickity"
                :options="flickityOptions"
              >
                <div
                  v-for="image in Receiver.data.images"
                  :key="image"
                  class="carousel-cell"
                >
                  <CImage
                    :image_url="getImage(image)"
                    temp_asset_img="No_image.svg.png"
                    :width="750"
                    :height="400"
                  />
                </div>
              </flickity>
              <CImage
                v-else
                :image_url="null"
                temp_asset_img="No_image.svg.png"
                :width="750"
                :height="400"
              />
            </v-col>
            <v-col cols="12" md="5">
              <p>
                <span class="text-h5 primary--text">
                  <v-icon color="primary">fa-address-card</v-icon>
                  Owner Infomation
                </span>
                <br />
                <span class="text-subtitle-2">
                  Name:
                  <span class="text-h6 secondary--text">
                    {{ Receiver.data.owner.first_name }}
                    {{ Receiver.data.owner.last_name }}
                    <span
                      class="text-caption black--text"
                      v-if="isPropertyOwner"
                      >(You)</span
                    >
                  </span>
                </span>
              </p>
              <p>
                <span class="text-h5 primary--text">
                  <v-icon color="primary">fa-map-marker</v-icon>
                  Property Address
                </span>
                <br />
                <span class="text-subtitle-2">
                  <!-- {{ Receiver.data.address}} -->
                  Country: {{ Receiver.data.address.county }}<br />
                  Reginon: {{ Receiver.data.address.region }}<br />
                  City: {{ Receiver.data.address.city }}<br/>
                  Woreda: {{Receiver.data.address.woreda ? Receiver.data.address.woreda: "--"}}<br/>
                  Kebele: {{Receiver.data.address.kebele ? Receiver.data.address.kebele: "--"}}<br/>
                </span>
              </p>
              <p class="mb-5">
                <span class="text-h5 primary--text">
                  <v-icon color="primary">fa-money-bill</v-icon>
                  Price
                </span>
                <br />
                <span class="text-subtitle-2">
                  Price:
                  <span class="text-h5 secondary--text"
                    >{{ Receiver.data.price }} ETB</span
                  >
                  /month
                </span>
              </p>
              <p class="mt-5">
                <span v-if="!loggedIn" class="red--text">
                  <v-icon small color="red" class="mb-2 mr-2"
                    >fa-info-circle</v-icon
                  >
                  Please Login or Register to our platform to contact the
                  Property Owner
                </span>
                <span v-else>
                  <!-- is owner -->
                  <span v-if="isPropertyOwner">
                    <v-btn
                      x-large
                      color="red white--text mb-2"
                      @click="RemoveProperty"
                      :loading="DeleteReceiver.loading"
                    >
                      <v-icon small>fa-ban</v-icon>
                      <span class="ml-2 text-capitalize">Remove</span>
                    </v-btn>
                  </span>
                  <!-- is not owner -->
                  <span v-else>
                    <v-btn
                      large
                      color="secondary white--text mb-2"
                      @click="CreateRentRequest"
                    >
                      <v-icon small>fa-house</v-icon>
                      <span class="ml-2 text-capitalize">Request to Rent</span>
                    </v-btn>
                    <br />
                    <!-- <v-btn 
                      large 
                      color="secondary white--text mb-2"
                      @click="ScheduleVisitation"
                    >
                      <v-icon small>fa-calendar</v-icon>
                      <span class="ml-2 text-capitalize">Schedule Visitation</span>
                    </v-btn>
                    <br/>
                    <v-btn 
                      large 
                      color="secondary white--text mb-2"
                      @click="ChatWithOwner"
                    >
                      <v-icon small>fa-comment-alt</v-icon>
                      <span class="ml-2 text-capitalize">Chat with Owner</span>
                    </v-btn> -->
                  </span>
                </span>
              </p>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="12" md="7">
              <!-- {{ Receiver.data }} -->
              <DictTable
                title="Property Details"
                :data="Receiver.data"
                :header="detailHeaders"
              />
            </v-col>
          </v-row>

          <v-dialog v-model="rentDialog" max-width="590">
            <RentRequestForm @close="CloseRentDialog" :property="Receiver.data"/>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PropertyService } from "../../../services/property.service";
import CImage from "../../../components/CImage.vue";
import ImageUrl from "../../../resources/imgUrl";
import DictTable from "../../../components/DictTable.vue";
import RentRequestForm from "../components/RentRequestForm.vue";

import Flickity from "vue-flickity";

import { mapGetters } from "vuex";

export default {
  name: "property_detail",
  components: {
    Flickity,
    CImage,
    DictTable,
    RentRequestForm
  },
  data() {
    return {
      flickityOptions: {
        initialIndex: 3,
        // prevNextButtons: false,
        // pageDots: false,
        wrapAround: true,
      },
      rentDialog: false,
      Receiver: {
        data: null,
        loaded: false,
        error: null,
      },
      DeleteReceiver: {
        loading: false,
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
        { text: "No of floor", value: "floor", format: (val) => val ? "#" + val : "-" },
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
          format: (val) => val ? "#" + val : "-",
        },
        {
          text: "Max no of Kides prefered",
          value: "max_kids_size",
          format: (val) => val ? "#" + val : "-",
        },
        {
          text: "Max no of Pets prefered",
          value: "max_pet_size",
          format: (val) => val ? "#" + val : "-",
        },
        {
          text: "Max allowed no of vehicles",
          value: "max_vehicle_size",
          format: (val) => val ? "#" + val : "-",
        },
        // { text: "", value: "", format: (val) => val },
        // { text: "", value: "", format: (val) => val },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      loggedIn: "auth/loggedIn",
    }),
    isPropertyOwner() {
      if (this.user == null || this.user.id == null) return false;
      return this.user.id == this.Receiver.data.owner.id;
    },
  },
  methods: {
    async getPropertyDetail() {
      await this.propertyService.getProperty(
        this.$route.params.id,
        this.Receiver
      );
    },
    getImage(imageName) {
      return ImageUrl(imageName);
    },
    async RemoveProperty() {
      await this.propertyService.removeProperty(this.$route.params.id, this.DeleteReceiver);
    },
    ChatWithOwner() {
      alert("chating");
    },
    ScheduleVisitation() {
      alert("schedule visitation");
    },
    CreateRentRequest() {
      this.OpenRentDialog();
    },
    OpenRentDialog() {
      this.rentDialog = true;
    },
    CloseRentDialog() {
      this.rentDialog = false;
    },
  },
  async created() {
    this.propertyService = new PropertyService(this);
    await this.getPropertyDetail();
  },
};
</script>

<style scoped>
.carousel-cell {
  width: 100%; /* full width */
  height: 430px; /* height of carousel */
  margin-right: 10px;
}
</style>