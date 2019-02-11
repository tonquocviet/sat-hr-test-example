<template>
  <v-content>
    <v-container fluid class="pa-0">
      <Policy :viewMode="viewMode" @changeViewMode="onViewModeChange"/>
    </v-container>
  </v-content>
</template>
<script>
import Policy from "./Absence/Policy/Form";
export default {
  components: {
    Policy
  },
  data() {
    return {
      viewMode: "list"
    };
  },
  methods: {
    onViewModeChange(mode) {
      this.viewMode = mode;
    }
  }
};
</script>
