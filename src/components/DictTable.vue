<template>
  <div>
    <h5 class="text-h5">{{title}}</h5>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>
              <!-- {{ title }} -->
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="h in header" :key="h.text">
            <td style="min-width: 120px !important">
              {{ h.text }}
            </td>
            <td>
              <span v-if="'format' in h && typeof h.format === 'function'">
                {{ h.format(data[h.value]) }}
              </span>
              <span v-else>
                <span v-if="typeof data[h.value] == 'boolean'">
                  {{ data[h.value] ? "Yes" : "No" }}
                </span>
                <span v-else-if="Array.isArray(data[h.value])">
                  <span v-for="d in data[h.value]" :key="d">
                    - {{ d }} <br />
                  </span>
                </span>
                <span v-else>
                  {{ data[h.value] }}
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "dict_table",
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    header: {
      type: Array,
      required: true,
    },
  },
};
</script>
