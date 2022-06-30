<template>
  <div>
    <v-text-field 
      v-if="type == 'text' || type == 'number'" 
      :label="label"
      outlined 
      dense
      :type="type"
      v-model="value"
      :rules="rules"
    >
    </v-text-field>
    <v-select 
      v-else-if="type == 'select'" 
      :label="label" 
      outlined 
      dense
      :items="options"
      v-model="value"
      :rules="rules"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'base_input',
  props: {
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array
    },
    rules: {
      type: Array,
    },
  },
  data() {
    return {
      value: null,
    }
  },
  watch: {
    value: function (val) {
      this.$emit('input', val);
    }
  },
};
</script>
