<template>
  <v-card>
    <v-layout class="pa-2 mt-3">
      <v-card style="width:100%; margin-top: -20px" color="teal">
        <v-layout class="pa-3">
          <v-toolbar-title class="pr-1 white--text font-weight-light">Step 1: Setup</v-toolbar-title>
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



