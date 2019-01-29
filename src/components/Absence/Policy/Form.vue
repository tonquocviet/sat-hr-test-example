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
          <v-tab v-for="item in tabs" :key="item" ripple class="primary--text">
            {{ item }}
            <v-chip v-if="item == 'all'" color="primary" text-color="white" small>{{ active + inactive }}</v-chip>
            <v-chip v-if="item == 'active'" color="primary" text-color="white" small>{{ active }}</v-chip>
            <v-chip v-if="item == 'inactive'" color="primary" text-color="white" small>{{ inactive }}</v-chip>
          </v-tab>
          <v-tab-item>
            <PolicyTable v-if="viewMode === 'list'" :apiPolicy="apiPolicy"/>
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
  mounted() {
    this.getCountPolicy();
  },
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
    },
    getCountPolicy() {
      this.$http
        .get(`${this.apiPolicy.filterCountPolicy}`)
        .then(data => {
          this.active = data.data.active
          this.inactive = data.data.inactive
        });
    }
  },
  data() {
    return {
      isShowCreate: false,
      inactive: 0,
      active: 0,
      tabs: [
        "all", "active", "inactive"
      ]
    };
  },
};
</script>
<style scoped>
.right-button-container {
  position: relative;
  z-index: 1;
}
</style>
