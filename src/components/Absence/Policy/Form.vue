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
            <v-chip
              v-if="item == 'all'"
              color="primary"
              text-color="white"
              small
            >{{ active + inactive }}</v-chip>
            <v-chip v-if="item == 'active'" color="primary" text-color="white" small>{{ active }}</v-chip>
            <v-chip
              v-if="item == 'inactive'"
              color="primary"
              text-color="white"
              small
            >{{ inactive }}</v-chip>
          </v-tab>
          <v-tab-item>
            <PolicyTable v-if="viewMode === 'list'"/>
            <PolicyCardContainer 
              v-else 
            />
          </v-tab-item>
          <v-tab-item>
            <PolicyTable v-if="viewMode === 'list'" status="active"/>
            <PolicyCardContainer 
              v-else 
              status="active"
            />
          </v-tab-item>
          <v-tab-item>
            <PolicyTable v-if="viewMode === 'list'" status="inactive"/>
            <PolicyCardContainer 
              v-else
              status="inactive"
            />
          </v-tab-item>
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
import PolicyCardContainer from "./PolicyCardContainer";

export default {
  components: {
    PolicyTable,
    CreatePolicy,
    PolicyCardContainer
  },
  props: {
    viewMode: String,
  },
  mounted() {
    this.getCountPolicy();
  },
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
      if (!isListView) {
        this.pageIndex = 0;
        this.getDataFromApi().then(data => {
          this.dataFilterPolicy = data.items;
          this.totalRecords = data.totalRecords;
        });
      }
    },
    getDataFromApi() {
      this.loading = true;
      const filterRequest = {
        pageSize: 6,
        pageIndex: this.pageIndex
      };
      return new Promise(resolve => {
        this.$http
          .post(`${this.apiPolicy.filterPolicy}`, filterRequest)
          .then(res => {
            this.loading = false;
            this.isShowMore = false;
            resolve({
              items: res.data.list,
              totalRecords: res.data.totalRecords
            });
          });
      });
    },
    getCountPolicy() {
      this.$http.get(`${this.apiPolicy.filterCountPolicy}`).then(data => {
        this.active = data.data.active;
        this.inactive = data.data.inactive;
      });
    }
  },
  data() {
    return {
      dataFilterPolicy: [],
      pageIndex: 0,
      loading: true,
      countPolicy: 5,
      isShowCreate: false,
      inactive: 0,
      active: 0,
      tabs: ["all", "active", "inactive"]
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