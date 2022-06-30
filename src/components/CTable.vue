<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="h in header" :key="h.text" class="text-left">
              {{ h.text }}
            </th>
          </tr>
        </thead>
        <tbody v-if="data.length > 0">
          <tr
            class="t-row"
            v-for="item in data"
            :key="item.id"
            v-on:click="() => rowClicked(item)"
          >
            <td v-for="h in header" :key="h.text">
              <span v-if="'format' in h && typeof h.format === 'function'">
                {{ h.format(item[h.value]) }}
              </span>
              <span v-else>
                <span v-if="typeof item[h.value] == 'boolean'">
                  {{ item[h.value] ? 'Yes' : 'No' }}
                </span>
                <span v-else>
                  {{ item[h.value] }}
                </span>
              </span>
            </td>
          </tr>
        </tbody>
        <div class="ma-5 pa-5" v-else>
          No records to show :(
        </div>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'simple_table',
  props: {
    data: {
      type: Array,
      required: true,
    },
    header: {
      type: Array,
      required: true,
    },
    clickReturn: {
      type: String,
    },
  },
  methods: {
    rowClicked(row) {
      let ret;
      if (row[this.clickReturn] != null && row[this.clickReturn] != undefined) {
        ret = row[this.clickReturn];
      } else {
        ret = row;
      }
      this.$emit('rowClicked', ret);
    },
  },
};
</script>
<style lang="scss" scoped>
.t-row {
  cursor: pointer;
}
</style>
