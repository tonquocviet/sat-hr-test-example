<template>
  <v-content>
    <v-container fluid class="pa-0">
      <EmployView/>
    </v-container>
  </v-content>
</template>
<script>
import EmployView from "./Absence/employ-view/Form";
export default {
  components: {
    EmployView
  }
};
</script>