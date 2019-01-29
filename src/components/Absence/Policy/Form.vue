<template>
  <v-layout row>
    <v-flex class="mt-2">
      <v-flex xs12 right class="right-button-container">
        <v-btn icon class="primary--text">
          <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn v-if="viewMode === 'card'" icon @click="changeViewMode(true)">
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn v-else icon @click="changeViewMode(false)">
          <v-icon>apps</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-tabs color="transparent" dark slider-color="primary">
          <v-tab v-for="item in Object.keys(person)" :key="item" ripple class="primary--text">
            {{ item }}
            <v-chip v-if="item == 'all'" color="primary" text-color="white" small>{{ person.all }}</v-chip>
            <v-chip v-if="item == 'active'" color="primary" text-color="white" small>{{ person.active }}</v-chip>
            <v-chip v-if="item == 'inactive'" color="primary" text-color="white" small>{{ person.inactive }}</v-chip>
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
    apiPolicy: Object,
    apiCountPolicy: Object
  },
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
    },
    getCountPolicy() {
      this.$http
        .get(`${this.apiCountPolicy.filterCountPolicy}`)
        .then(({ data }) => {
          this.person = {
            all: data.active + data.inactive,
            active: data.active,
            inactive: data.inactive
          };
        });
    }
  },
  data() {
    return {
      isShowCreate: false,
      person: {
        all: 0,
        inactive: 0,
        active: 0,
      },
    };
  },
  created(){
    this.getCountPolicy();
  }
};
</script>
<style scoped>
.right-button-container {
  position: relative;
  z-index: 1;
}
</style>
