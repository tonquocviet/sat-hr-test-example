<template>
  <v-content>
    <v-container fluid class="pa-0">
      <Absence :viewMode="viewMode" @changeViewMode="onViewModeChange"/>
    </v-container>
  </v-content>
</template>
<script>
import Absence from "./Absence/Form";
export default {
  components: {
    Absence
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
