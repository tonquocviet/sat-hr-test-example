<template>
  <v-layout row>
    <v-flex class="mt-2">
      <v-flex xs12 right class="right-button-container">
        <v-btn v-if="viewMode === 'card'" icon @click="changeViewMode(true)">
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn v-else icon @click="changeViewMode(false)">
          <v-icon>apps</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-tabs color="transparent" dark slider-color="primary">
          <v-tab v-for="(text,index) in tabs" :key="index" ripple class="primary--text">
            {{ text }}
            <v-chip color="primary" text-color="white" small>{{ countPolicy }}</v-chip>
          </v-tab>
          <v-tab-item>
            <PolicyTable
              v-if="viewMode === 'list'"
              :apiPolicy="apiPolicy"
            />
          </v-tab-item>
          <v-tab-item>Page active</v-tab-item>
          <v-tab-item>Page In active</v-tab-item>
        </v-tabs>
      </v-flex>
    </v-flex>
    <CreatePolicy :isShow="isShowCreate" @closeDialog="isShowCreate = false"></CreatePolicy>
    <v-btn @click="isShowCreate = true" color="error" fab dark fixed right bottom>
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>
<script>
import PolicyTable from "./PolicyTable";
import CreatePolicy from "./CreatePolicy";

export default {
  components: {
    PolicyTable,
    CreatePolicy
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
      countPolicy: 5,
      isShowCreate: false,
      tabs: ["All", "Active", "Inactive"]
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
