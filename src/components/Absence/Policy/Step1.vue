<template>
  <v-card>
    <v-layout class="px-4 mt-3">
      <v-card class="elevation-4 card-title-policy" color="success">
        <v-layout class="pa-3">
          <h2 class="pr-1 white--text font-weight-light">Step 1: Setup</h2>
        <v-icon
          style="cursor: pointer; color: rgba(255, 255, 255, 0.79)"
          v-if="readonly"
          @click="readonly = false"
        >border_color</v-icon>
        </v-layout>
      </v-card>
    </v-layout>
    <FormStep1
      :itemsCountry="step1.itemsCountry"
      :readonly="readonly"
      @onReadonly="readonly = true"
    />
  </v-card>
</template>

<script>
import FormStep1 from "./FormStep1";

export default {
  components: {
    FormStep1
  },
  props: {
    step1: Object
  },
  data() {
    return {
      readonly: true
    };
  }
};
</script>



