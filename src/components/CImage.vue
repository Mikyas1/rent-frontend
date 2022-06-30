<template>
  <div>
    <v-img
      v-if="image_url != ''"
      :lazy-src="temp_asset_img ? require('@/assets/' + temp_asset_img) : ''"
      :height="height"
      :width="width"
      :src="image_url"
    ></v-img>
    <v-img
      v-else
      :lazy-src="temp_asset_img ? require('@/assets/' + temp_asset_img) : ''"
      :height="height"
      :width="width"
      :src="require('@/assets/' + temp_asset_img)"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: 'c_image',
  props: {
    image_url: {
      type: String,
    },
    temp_asset_img: {
      type: String,
      require: true,
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 150,
    },
  },
}
</script>