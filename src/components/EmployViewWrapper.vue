<template>
  <v-content>
    <v-container fluid class="pa-0">
      <EmployView :apiEmploy="apiEmploy"/>
    </v-container>
  </v-content>
</template>
<script>
import EmployView from "./Absence/employ-view/Form";
export default {
  components: {
    EmployView
  },
  props: {
    apiEmploy: Object
  }
};
</script>