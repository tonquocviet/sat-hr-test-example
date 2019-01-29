<template>
  <v-content>
    <v-container fluid class="pa-0">
      <Policy :viewMode="viewMode" @changeViewMode="onViewModeChange" :apiCountPolicy="apiCountPolicy" :apiPolicy="apiPolicy"/>
    </v-container>
  </v-content>
</template>
<script>
import Policy from "./Absence/Policy/Form";
export default {
  props: {
    apiPolicy: Object,
    apiCountPolicy: Object
  },
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
