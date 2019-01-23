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
          <AbsenceList v-if="viewMode === 'list'" :apiAbsence="apiAbsence"/>
          <AbsenceCard
            @showMoreView="showMoreView"
            :dataFilterAbsences="dataFilterAbsences"
            :loading="loading"
            :isShowMore="isShowMore"
            :hasShowMore="hasShowMore"
            v-else
          />
        </v-tab-item>
        <v-tab-item>Approved Request</v-tab-item>
        <v-tab-item>Rejected Request</v-tab-item>
      </v-tabs>
    </v-flex>
    <v-flex md3 class="ml-3">
      <v-container fluid class="pa-0 elevation-2">
        <AbsenceDetailList
          name="WhoAbsencing"
          :items="dataAbsencing"
          :title="titleAbsence"
          :viewFull="viewFull"
          :whoIsAbsensingModel="whoIsAbsensingModel"
        />
        <v-divider/>
        <AbsenceDetailList
          name="UpcommingAbsencing"
          :items="dataAbsencing2"
          :title="titleUpcoming"
          :viewFull="viewFull"
          :whoIsAbsensingModel="whoIsAbsensingModel"
        />
      </v-container>
    </v-flex>
    <ModalListDetail
      :viewMoreAbsencing="viewMoreAbsencing"
      :items="dataWhoAbsencing"
      :whoIsAbsensingModel="whoIsAbsensingModel"
    />
  </v-layout>
</template>
<script>
import AbsenceList from "./AbsenceList";
import AbsenceCard from "./AbsenceCard";
import AbsenceDetailList from "./ListDetail";
import ModalListDetail from "./ModalListDetail";

export default {
  components: {
    AbsenceList,
    AbsenceCard,
    AbsenceDetailList,
    ModalListDetail
  },
  props: {
    viewMode: String,
    apiAbsence: Object
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.dataFilterAbsences = data.items;
      this.totalRecords = data.totalRecords;
    });
    const urlWhoAbsencing = this.apiAbsence.filterWhoAbsencing;
    const urlUpcommingAbsencing = this.apiAbsence.filterUpcommingAbsence;
    this.getDataAbsencingRequest(urlWhoAbsencing).then(data => {
      const { items } = data;
      this.dataAbsencing = items;
    });
    this.getDataAbsencingRequest(urlUpcommingAbsencing).then(data => {
      const { items } = data;
      this.dataAbsencing2 = items;
    });
  },
  computed: {
    hasShowMore() {
      return !this.dataFilterAbsences
        ? 0
        : this.dataFilterAbsences.length < this.totalRecords;
    }
  },
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
    },
    showMoreView() {
      this.pageIndex++;
      this.isShowMore = true;
      this.getDataFromApi().then(data => {
        this.dataFilterAbsences = this.dataFilterAbsences.concat(data.items);
        this.totalRecords = data.totalRecords;
      });
    },
    getDataFromApi() {
      this.loading = true;
      const filterRequest = {
        pageSize: 9,
        pageIndex: this.pageIndex
      };
      return new Promise(resolve => {
        this.$http
          .post(`${this.apiAbsence.filterAbsences}`, filterRequest)
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
    getDataAbsencingRequest(url) {
      return new Promise(resolve => {
        this.$http.post(`${url}`).then(res => {
          resolve({ items: res.data.list });
        });
      });
    },
    getDataMoreAbsencingRequest(url) {
      const { pageSize, pageIndex } = this.whoIsAbsensingModel;
      const filterRequest = {
        pageSize,
        pageIndex
      };
      return new Promise(resolve => {
        this.$http.post(`${url}`, filterRequest).then(res => {
          resolve({ items: res.data.list });
        });
      });
    },
    viewMoreAbsencing() {
      this.whoIsAbsensingModel.loadingViewMore = true;
      const { url } = this.whoIsAbsensingModel;
      this.getDataMoreAbsencingRequest(url).then(data => {
        const { items } = data;
        this.whoIsAbsensingModel.loadingViewMore = false;
        this.dataWhoAbsencing = this.dataWhoAbsencing.concat(items);
      });
    },
    viewFull(name) {
      if ("WhoAbsencing" === name) {
        this.whoIsAbsensingModel.url = this.apiAbsence.filterWhoAbsencing;
        this.whoIsAbsensingModel.titleModalListDetail = this.titleAbsence;
      }
      if ("UpcommingAbsencing" === name) {
        this.whoIsAbsensingModel.url = this.apiAbsence.filterUpcommingAbsence;
        this.whoIsAbsensingModel.titleModalListDetail = this.titleUpcoming;
      }
      const { url } = this.whoIsAbsensingModel;
      this.whoIsAbsensingModel.loadingViewFull = true;
      this.whoIsAbsensingModel.pageSize = 9;
      this.whoIsAbsensingModel.pageIndex = 0;
      this.getDataMoreAbsencingRequest(url).then(data => {
        const { items } = data;
        this.whoIsAbsensingModel.isOpen = true;
        this.whoIsAbsensingModel.loadingViewFull = false;
        this.dataWhoAbsencing = items;
      });
    }
  },
  data() {
    return {
      whoIsAbsensingModel: {
        titleModalListDetail: "",
        name: "",
        loadingViewFull: false,
        loadingViewMore: false,
        isOpen: false,
        pageSize: 9,
        pageIndex: 0
      },
      dataFilterAbsences: [],
      pageIndex: 0,
      loading: true,
      isShowMore: false,
      titleAbsence: "Who are Absencing ?",
      titleUpcoming: "Upcoming Absence",
      itemList: [
        { text: "Peding Requests" },
        { text: "Approved Request" },
        { text: "Rejected Request" }
      ],
      dataAbsencing: [],
      dataAbsencing2: [],
      dataWhoAbsencing: [],
      dataUpcommingAbsencing: []
    };
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
