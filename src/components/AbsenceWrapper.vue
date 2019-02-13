<template>
  <v-content>
    <v-container fluid class="pa-0">
      <Absence
        :viewMode="viewMode"
        @changeViewMode="onViewModeChange"
        :detailLinks="detailLinks"
      />
    </v-container>
  </v-content>
</template>
<script>
import Absence from "./Absence/Form";
export default {
  props: {
    detailLinks: Object
  },
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
