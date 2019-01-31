<template>
  <div class="pa-3">
    <v-layout row wrap>
      <v-flex xs12 class="mb-3">
        <Description/>
      </v-flex>
      <v-flex xs12 class="mb-3">
        <FormStep1 :getCountriesApiUrl="apiPolicy.getCountries"/>
      </v-flex>
      <v-flex xs12 class="mb-3">
        <TableStep2 />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Description from "./Description";
import FormStep1 from "./FormStep1";
import TableStep2 from "./TableStep2";

export default {
  components: {
    Description,
    FormStep1,
    TableStep2
  },
  props: {
    apiPolicy: Object
  }
};
</script>

