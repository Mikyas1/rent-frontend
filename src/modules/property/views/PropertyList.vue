<template>
  <v-container fluid>
    <v-row>
      <v-col class="mx-5">
        <v-alert dense text class="mt-3" icon="fa-house">
          <span class="body-2">Top Properties</span>
        </v-alert>

        <v-skeleton-loader
          v-if="!propertyReceiver.loaded && !OptionsReceiver.loaded"
          type="list-item-avatar-three-line, image, article"
        ></v-skeleton-loader>
        <div v-else>
          <!-- filter section -->
          <!-- filter section -->
          <!-- filter section -->
          <!-- filter section -->

          <v-form v-if="OptionsReceiver.data" ref="form">
            <v-container fluid>
              <v-row>
                <v-col class="pl-0 pr-1" cols="12" sm="6" md="2">
                  <v-text-field
                    label="Min Price"
                    outlined
                    dense
                    type="number"
                    v-model.number="filterData.min_price"
                    :rules="min0('Min Price')"
                  />
                </v-col>
                <v-col class="pl-0 pr-1" cols="12" sm="6" md="2">
                  <v-text-field
                    label="Max Price"
                    outlined
                    dense
                    type="number"
                    v-model.number="filterData.max_price"
                    :rules="min0('Max Price')"
                  />
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-text-field
                    label="Bedrooms"
                    outlined
                    dense
                    type="number"
                    v-model.number="filterData.bedrooms"
                    :rules="min0('Bedrooms')"
                  />
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-text-field
                    label="Bathrooms"
                    outlined
                    dense
                    type="number"
                    v-model.number="filterData.bathrooms"
                    :rules="min0('Bathrooms')"
                  />
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-select
                    label="Furnished"
                    outlined
                    dense
                    :items="[
                      {
                        text: 'Yes',
                        value: true,
                      },
                      {
                        text: 'No',
                        value: false,
                      },
                      {
                        text: '-',
                        value: null,
                      },
                    ]"
                    v-model="filterData.furnished"
                  ></v-select>
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-select
                    :items="OptionsReceiver.data.property_types"
                    label="Propety type"
                    outlined
                    dense
                    v-model="filterData.property_type"
                  ></v-select>
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-select
                    :items="OptionsReceiver.data.countries"
                    label="Country"
                    outlined
                    dense
                    v-model="filterData.county"
                  ></v-select>
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-select
                    :items="OptionsReceiver.data.regions"
                    label="Region"
                    outlined
                    dense
                    v-model="filterData.region"
                  ></v-select>
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-select
                    :items="OptionsReceiver.data.cities"
                    label="City"
                    outlined
                    dense
                    v-model="filterData.city"
                  ></v-select>
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="2">
                  <v-select
                    v-model="filterData.features"
                    :items="OptionsReceiver.data.features"
                    label="Features"
                    outlined
                    dense
                    multiple
                  ></v-select>
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="1">
                  <v-btn
                    depressed
                    dark
                    color="success"
                    class="text-capitalize ml-3"
                    height="38"
                    v-on:click="go"
                  >
                    <v-icon left> fa-search </v-icon>
                    Filter
                  </v-btn>
                </v-col>
                <v-col class="px-1" cols="12" sm="6" md="1">
                  <v-btn
                    depressed
                    dark
                    color="primary"
                    class="text-capitalize ml-3"
                    height="38"
                    v-on:click="clear"
                  >
                    <v-icon left> fa-eraser </v-icon>
                    Clear
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <!-- pagination and result -->
          <!-- pagination and result -->
          <!-- pagination and result -->
          <!-- pagination and result -->

          <v-row justify="space-between">
            <v-col md="9">
              <p class="body-2">
                <span
                  ><strong class="primary--text">{{
                    propertyReceiver.data.total
                  }}</strong>
                  Properties Found,
                </span>
                Showing
                <strong class="primary--text">{{
                  propertyReceiver.data.limit_per_page
                }}</strong>
                per page
              </p>
            </v-col>
          </v-row>

          <!-- body section -->
          <!-- body section -->
          <!-- body section -->
          <!-- body section -->
          <!-- body section -->
          <!-- body section -->
          <v-container>
            <v-row>
              <v-col
                v-for="property in propertyReceiver.data.properties"
                :key="property.id"
                cols="12"
                sm="6"
                md="3"
              >
                <PropertCard :property="property" @navigate="NavigateToDetailPage"/>
              </v-col>
            </v-row>
          </v-container>

          <!-- {{propertyReceiver.data.properties}} -->

          <v-row>
            <v-col md="9"></v-col>
            <v-col md="3" class="page">
              <v-btn
                :disabled="leftDisabled"
                v-on:click="previous"
                class="ma-2"
                small
                outlined
                fab
                color="teal"
              >
                <v-icon small>fa-chevron-left</v-icon>
              </v-btn>
              Page {{ propertyReceiver.data.page }}
              <v-btn
                :disabled="rightDisabled"
                v-on:click="next"
                class="ma-2"
                small
                outlined
                fab
                color="teal"
              >
                <v-icon small>fa-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PropertyService } from "../../../services/property.service";
// import BaseInput from "../../../components/BaseInput.vue";
import PropertCard from "../components/PropertyCard.vue";
import { min0 } from "../../../resources/validators";

export default {
  name: "property_list",
  components: {
    // BaseInput,
    PropertCard,
  },
  data() {
    return {
      min0,
      propertyReceiver: {
        data: [],
        loaded: false,
        error: null,
      },
      OptionsReceiver: {
        data: null,
        loaded: false,
        error: null,
      },
      filterData: {
        min_price: null,
        max_price: null,
        bedrooms: null,
        bathrooms: null,
        furnished: null,
        property_type: null,
        county: null,
        region: null,
        city: null,
        features: null,
      },
    };
  },
  methods: {
    async filterList(filterData) {
      if (!this.$refs.form) return;
      if (!this.$refs.form.validate()) return;
      await this.propertyService.getProperties(
        filterData,
        null,
        this.propertyReceiver
      );
    },
    NavigateToDetailPage(id) {
      this.$router.push({ name: "property_detail", params: { id } });
    },
    async go() {
      let ret = {};
      for (let key in this.filterData) {
        if (
          (this.filterData[key] != null && this.filterData[key] != '') ||
          typeof this.filterData[key] == 'boolean'
        ) {
          ret[key] = this.filterData[key];
        }
      }

      await this.propertyService.getProperties(ret, null, this.propertyReceiver);

    },
    clear() {
      this.filterData = {
        min_price: null,
        max_price: null,
        bedrooms: null,
        bathrooms: null,
        furnished: null,
        property_type: null,
        county: null,
        region: null,
        city: null,
        features: null,
      }
    },
    async previous() {
      let data = {
        page: this.propertyReceiver.data.page - 1,
        limit: this.propertyReceiver.data.limit_per_page,
        filterData: this.filterData,
      };
      await this.paginate(data);
    },
    async next() {
      let data = {
        page: this.propertyReceiver.data.page + 1,
        limit: this.propertyReceiver.data.limit_per_page,
        filterData: this.filterData,
      };
      await this.paginate(data);
    },
    async paginate(paginationData) {
      await this.propertyService.getProperties(
        paginationData.filterData,
        paginationData,
        this.propertyReceiver
      );
    },
  },
  computed: {
    leftDisabled() {
      return this.propertyReceiver.data.page <= 1;
    },
    rightDisabled() {
      return (
        this.propertyReceiver.data.page >=
        Math.ceil(
          this.propertyReceiver.data.total /
            this.propertyReceiver.data.limit_per_page
        )
      );
    },
  },
  async created() {
    this.propertyService = new PropertyService(this);
    await this.propertyService.getProperties({}, null, this.propertyReceiver);
    await this.propertyService.getPropertyOptions(this.OptionsReceiver);
  },
};
</script>