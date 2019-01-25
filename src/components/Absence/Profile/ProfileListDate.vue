<template>
  <v-layout row wrap class="mt-5">
    <v-flex sm4 xs12>
      <v-card>
        <v-date-picker v-model="dates" multiple width="100%"></v-date-picker>
      </v-card>
    </v-flex>
    <v-flex xs12 sm8>
      <v-layout row wrap class="scroll-year-absence px-3 mt-3">
        <v-flex
          v-for=" item in years"
          :key="item.id"
          class="xs12 sm6 md3 month-absence mt-4 h-100"
          @click="changeMonth(item)"
        >
          <v-card class="mt-3 ml-3 card-date-of-month">
            <v-date-picker v-model="item.dates" multiple no-title disabled width="100%"></v-date-picker>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    years: Array
  },
  data() {
    return {
      dates: []
    };
  },
  methods: {
    changeMonth(item) {
      this.dates = item.dates;
    }
  }
};
</script>
<style scopes>
.month-absence {
  cursor: pointer;
}
.scroll-year-absence {
  height: 360px;
  overflow-x: auto;
  overflow: auto;
}
@media only screen and (max-width: 868px) {
  .card-date-of-month {
    margin-left: 5px !important;
  }
}
</style>