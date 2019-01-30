<template>
  <v-content>
    <v-container fluid class="pa-0">
      <Profile :apiAbsence="apiAbsence"/>
    </v-container>
  </v-content>
</template>
<script>
import Profile from "./Absence/Profile/Profile";
export default {
  props: {
    apiAbsence: Object
  },
  components: {
    Profile
  }
};
</script>
