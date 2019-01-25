<template>
  <v-layout row>
    <v-flex md9 class="mt-2">
      <v-flex xs12 right class="right-button-container">
        <v-btn color="info">Add New Policy</v-btn>
        <v-btn icon class="primary--text">
          <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn
          v-if="viewMode === 'card'"
          icon
          @click="changeViewMode(true)"
        >
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn v-else icon @click="changeViewMode(false)">
          <v-icon>apps</v-icon>
        </v-btn>
      </v-flex>
      <PolicyList v-if="viewMode === 'list'" :apiPolicy="apiPolicy"/>
    </v-flex>
  </v-layout>
</template>
<script>
import PolicyList from "./PolicyList";

export default {
  components: {
    PolicyList,
  },
  props: {
    viewMode: String,
    apiPolicy: Object
  },
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
    }
  },
  data() {
    return {
      pageIndex: 0,
      loading: true,
    };
  }
};
</script>
<style scoped>
.right-button-container {
  position: relative;
  z-index: 1;
}
</style>
