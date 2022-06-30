<template>
  <div>
    <v-skeleton-loader
      v-if="!OptionsReceiver.loaded"
      type="table"
    ></v-skeleton-loader>
    <v-card v-else>
      <v-card-title class="text-h4"> Add Property </v-card-title>

      <v-card-text>
        <v-form ref="form" style="width: 100%">
          <v-container class="px-5">
            <p class="text-h6 primary--text">Property Description</p>
            <v-text-field
              label="* Price (ETB)/month"
              type="number"
              dense
              v-model.number="property.price"
              :rules="required('Price')"
            />
            <v-text-field
              label="Property Size (m*m)"
              type="number"
              dense
              v-model.number="property.property_size"
            />
            <v-text-field
              label="Land Area (m*m)"
              type="number"
              dense
              v-model.number="property.land_area"
            />
            <v-text-field
              label="* No of Bedrooms"
              type="number"
              dense
              v-model.number="property.beadrooms"
              :rules="required('No of Beadrooms')"
            />
            <v-text-field
              label="* No of Bathrooms"
              type="number"
              dense
              v-model.number="property.bathrooms"
              :rules="required('No of Bathrooms')"
            />
            <v-text-field
              label="No of Garage"
              type="number"
              dense
              v-model.number="property.garage_no"
            />
            <v-text-field
              label="No of Floors"
              type="number"
              dense
              v-model.number="property.floor"
            />
            <v-text-field
              label="Year Build"
              type="number"
              dense
              v-model.number="property.year_build"
            />
            <v-select
              :items="OptionsReceiver.data.property_types"
              label="* Property Type"
              v-model="property.property_type"
              :rules="required('Property Type')"
            ></v-select>
            <v-select
              v-model="property.features"
              :items="OptionsReceiver.data.features"
              :menu-props="{ maxHeight: '400' }"
              label="Features"
              multiple
              hint="Pick features for your property"
              persistent-hint
            ></v-select>
            <v-checkbox
              v-model="property.furnished"
              label="Furnished"
            ></v-checkbox>
            <v-file-input
              multiple
              label="Images"
              v-model="property.images"
            ></v-file-input>
            <v-textarea
              label="Property Description"
              outlined
              dense
              v-model="property.description"
            />
            <!-- ========================== -->
            <!-- ========================== -->
            <!-- ========================== -->
            <p class="text-h6 primary--text">Owner Preference</p>
            <v-text-field
              label="Max No of Family size"
              type="number"
              dense
              v-model.number="property.max_family_size"
            />
            <v-text-field
              label="Max No of pets allowed"
              type="number"
              dense
              v-model.number="property.max_pet_size"
            />
            <v-text-field
              label="Max No of Vehicles allowed"
              type="number"
              dense
              v-model.number="property.max_vehicle_size"
            />
            <v-text-field
              label="Max No of kids preferred"
              type="number"
              dense
              v-model.number="property.max_kids_size"
            />
            <!-- ========================== -->
            <!-- ========================== -->
            <!-- ========================== -->
            <p class="text-h6 primary--text">Property Location</p>
            <v-select
              :items="OptionsReceiver.data.countries"
              label="* Country"
              v-model="property.country"
              :rules="required('Country')"
            ></v-select>
            <v-select
              :items="OptionsReceiver.data.regions"
              label="* Region"
              v-model="property.region"
              :rules="required('Region')"
            ></v-select>
            <v-select
              :items="OptionsReceiver.data.cities"
              label="* City"
              v-model="property.city"
              :rules="required('City')"
            ></v-select>
            <v-text-field
              label="Area"
              type="text"
              dense
              v-model="property.area"
            />
            <v-text-field
              label="Woreda"
              type="number"
              dense
              v-model.number="property.woreda"
              :rules="min0('Woreda')"
            />
            <v-text-field
              label="Kebele"
              type="number"
              dense
              v-model.number="property.kebele"
              :rules="min0('Kebele')"
            />
            <v-textarea
              label="Area Description"
              outlined
              dense
              v-model="property.address_description"
            />
            <!-- ========================== -->
            <!-- ========================== -->
            <!-- ========================== -->
            <p class="text-h6 primary--text">Property Verification data</p>
            <v-file-input
              multiple
              label="Blue Print or Other Ownership Verifying Images"
              v-model="property.blue_print"
            ></v-file-input>
            <v-file-input
              multiple
              label="Other Verification Images"
              v-model="property.other_docs"
            ></v-file-input>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
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
import { PropertyService } from "../../../services/property.service";
import { required, min0 } from "../../../resources/validators";

export default {
  name: "add_property",
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
      property: {
        price: 10,
        property_size: null,
        land_area: null,
        beadrooms: 1,
        bathrooms: 1,
        garage_no: null,
        floor: null,
        year_build: null,
        description: "",
        furnished: false,
        features: [], // option from backend
        property_type: "",
        images: [],

        max_family_size: null,
        max_pet_size: null,
        max_vehicle_size: null,
        max_kids_size: null,
        blue_print: [],
        other_docs: [],

        country: "",
        region: "",
        city: "",
        area: null,
        address_description: "",
        woreda: null,
        kebele: null,
      },
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.form) return;
      if (!this.$refs.form.validate()) return;
      // return;
      let data = this.property;
      let formData = new FormData();
      formData.append('price', data.price);
      formData.append('property_size', data.property_size);
      formData.append('land_area', data.land_area);
      formData.append('bedrooms', data.beadrooms);
      formData.append('bathrooms', data.bathrooms);
      formData.append('garage_no', data.garage_no);
      formData.append('floor', data.floor);
      formData.append('year_built', data.year_build);
      formData.append('description', data.description);
      formData.append('furnished', data.furnished);
      for (let feature of data.features) {
        formData.append('features', feature);
      }
      formData.append('property_type', data.property_type);
      for (let image of data.images) {
        formData.append('images', image);
      }
      formData.append('max_family_size', data.max_family_size);
      formData.append('max_pet_size', data.max_pet_size);
      formData.append('max_vehicle_size', data.max_vehicle_size);
      formData.append('max_kids_size', data.max_kids_size);
      for (let blue_print of data.blue_print) {
        formData.append('blue_print', blue_print);
      }
      for (let other_doc of data.other_docs) {
        formData.append('other_docs', other_doc);
      }
      formData.append('county', data.country);
      formData.append('region', data.region);
      formData.append('city', data.city);
      formData.append('area', data.area);
      formData.append('woreda', data.woreda);
      formData.append('kebele', data.kebele);
      formData.append('address_description', data.address_description);

      try {
        await this.propertyService.addProperties(this.Receiver, formData);
        this.$emit("refresh");
        this.$emit("close");
      } catch(err) {
        console.log(err);
        return;
      }
    },
    close() {
      this.$emit("close");
    },
    reset() {},
  },
  async created() {
    this.propertyService = new PropertyService(this);
    await this.propertyService.getPropertyOptions(this.OptionsReceiver);
  },
};
</script>