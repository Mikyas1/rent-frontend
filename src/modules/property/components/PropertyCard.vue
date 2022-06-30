<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img height="250" 
        :src="getImage(property.images) ? getImage(property.images) : require('@/assets/No_image.svg.png')"
    ></v-img>

    <v-card-title>
        {{ property.bedrooms }} Bedroom,
        {{ property.address.county }} <br/>
        {{ property.address.region }},
        {{ property.address.city }}
    </v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <!-- <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div> -->
        <v-icon color="primary">fa-money-bill</v-icon> 
        <span class="text-h5 ml-2 secondary--text"
        >{{ property.price }} ETB</span>
      </v-row>

      <div class="my-4 text-subtitle-1">
        <v-icon small color="blue" class="mr-2 mb-2">fa-home</v-icon> 
          <span class="text-body-2">{{property.property_type}}</span>
      </div>

      <div>
        Currently Available
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn @click="navigate" color="primary text-capitalize" depressed>
        <v-icon small left> fa-info </v-icon>
        See Detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ImageUrl from "../../../resources/imgUrl";

export default {
  name: "propert_card",
  props: {
    property: {
      type: Object,
      requeired: true,
    },
  },
  methods: {
    getImage(imageNames) {
        console.log(imageNames)
        if (imageNames != null && imageNames.length >= 1) {
            return ImageUrl(imageNames[0]);
        } else {
            return null;
        }
    },
    navigate() {
        this.$emit('navigate', this.property.id);
    }
  },
};
</script>