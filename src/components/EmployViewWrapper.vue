<template>
  <v-content>
    <v-container fluid class="pa-0">
      <EmployView :apiListEmployView="apiListEmployView"/>
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
    apiListEmployView: Object
  }
};
</script>