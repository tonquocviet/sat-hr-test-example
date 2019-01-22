<template>
  <v-layout row>
    <v-flex md9 style="margin-top:20px">
      <v-flex xs12 right position absolute>
        <v-btn color="info" class="v-btn-add-filter">Add New Absence</v-btn>
        <v-btn icon class="primary--text v-btn-add-filter">
          <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn
          v-if="viewMode === 'card'"
          icon
          class="v-btn-add-filter"
          @click="changeViewMode(true)"
        >
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn v-else icon class="v-btn-add-filter" @click="changeViewMode(false)">
          <v-icon>apps</v-icon>
        </v-btn>
      </v-flex>
      <v-tabs color="transparent" dark slider-color="primary">
        <v-tab v-for="item in itemList" :key="item.id" ripple class="primary--text">{{ item.text }}</v-tab>
        <v-tab-item>
          <AbsenceList :apiAbsence="apiAbsence"/>
        </v-tab-item>
        <v-tab-item>Approved Request</v-tab-item>
        <v-tab-item>Rejected Request</v-tab-item>
      </v-tabs>
    </v-flex>
    <v-flex md3 class="ml-3">
      <v-container fluid class="pa-0 elevation-2">
        <AbsenceDetailList
          :items="dataAbsencing.items"
          :title="this.titleAbsence"
          :viewFull="viewFull"
          :value="value"
        />
        <v-divider/>
        <!-- <AbsenceDetailList :items="data1" :title="this.titleUpcoming" :value="value"/> -->
      </v-container>
    </v-flex>
    <ModalListDetail
      title="Who's on leave"
      :viewMoreWhoAbsencing="viewMoreWhoAbsencing"
      :data="dataWhoAbsencing"
      :value="value"
    />
  </v-layout>
</template>
<script>
import AbsenceList from "./AbsenceList";
import AbsenceDetailList from "./ListDetail";
import ModalListDetail from "./ModalListDetail";

export default {
  components: {
    AbsenceList,
    AbsenceDetailList,
    ModalListDetail
  },
  props: {
    viewMode: String,
    apiAbsence: Object
  },
  data() {
    return {
      value: {
        loadingViewFull: false,
        loadingViewMore: false,
        isOpen: false,
        pageSize: 9,
        pageIndex: 0
      },
      titleAbsence: "Who are Absencing ?",
      titleUpcoming: "Upcoming Absence",
      itemList: [
        { text: "Peding Requests" },
        { text: "Approved Request" },
        { text: "Rejected Request" }
      ],
      dataAbsencing: {},
      dataWhoAbsencing: {}
    };
  },
  methods: {
    getDataAbsencingRequest() {
      return new Promise(resolve => {
        this.$http.post(`${this.apiAbsence.filterWhoAbsencing}`).then(res => {
          resolve({
            items: res.data.list,
            totalRecords: res.data.totalRecords
          });
        });
      });
    },
    getDataWhoAbsencingRequest() {
      const { pageSize, pageIndex } = this.value;
      const filterRequest = {
        pageSize,
        pageIndex
      };
      return new Promise(resolve => {
        this.$http
          .post(`${this.apiAbsence.filterWhoAbsencing}`, filterRequest)
          .then(res => {
            resolve({
              items: res.data.list,
              totalRecords: res.data.totalRecords
            });
          });
      });
    },
    viewMoreWhoAbsencing() {
      const { pageSize } = this.value;
      this.value.loadingViewMore = true;
      this.getDataWhoAbsencingRequest().then(data => {
        this.dataWhoAbsencing = data;
        this.value.loadingViewMore = false;
      });
    },
    viewFull(name) {
      if (name === "WhoAbsencing") {
        this.value.loadingViewFull = true;
        this.value.pageSize = 9;
        this.getDataWhoAbsencingRequest().then(data => {
          this.value.isOpen = true;
          this.dataWhoAbsencing = data;
          this.value.loadingViewFull = false;
        });
      }
    }
  },
  mounted() {
    this.getDataAbsencingRequest().then(data => {
      this.dataAbsencing = data;
    });
  }
};
</script>
<style>
.v-btn-card {
  margin-right: 90px;
}
.v-btn-add-filter {
  z-index: 10;
}
</style>
