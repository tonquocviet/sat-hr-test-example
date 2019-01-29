<template>
  <div class="pa-3">
    <v-layout row wrap>
      <v-flex xs12 class="mb-3">
        <Description/>
      </v-flex>
      <v-flex xs12 class="mb-3">
        <Step1 :step1="step1"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Description from "./Description";
import Step1 from "./Step1";

export default {
  components: {
    Description,
    Step1
  },
  data() {
    return {
      step1: {
        itemsCountry: []
      }
    }
  },
  props: {
    apiPolicy: Object
  },
  methods: {
    getCountries() {
      return new Promise(resolve => {
        this.$http
          .get(`${this.apiPolicy.getCountries}`)
          .then(res => resolve({ items: res.data }));
      });
    }
  },
  mounted() {
    this.getCountries().then(data => (this.step1.itemsCountry = data.items));
  }
};
</script>

