<template>
  <v-card>
    <v-layout class="pa-2">
      <v-toolbar-title class="pr-1">Step 1: Setup</v-toolbar-title>
      <v-icon
        style="cursor: pointer;"
        v-if="readonly"
        @click="readonly = false"
        size="20"
      >border_color</v-icon>
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



