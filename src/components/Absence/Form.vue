<template>
  <v-layout row>
    <v-flex md9 class="mt-2">
      <v-flex xs12 right class="right-button-container">
        <v-btn color="info" @click="popup.showCreate = true">Add New Absence</v-btn>
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
          :items="dataAbsenceList"
          :title="`Who are absencing ?`"
          @viewFull="isShowAbsencingModal=true"
        />
        <v-divider/>
        <AbsenceDetailList
          name="UpcommingAbsence"
          :items="dataAbsenceList2"
          :title="`Upcomming absences`"
          @viewFull="isShowUpcommingAbsenceModal = true"
        />
      </v-container>
      <AbsenceCreate :items="data1" :popup="popup"></AbsenceCreate>
    </v-flex>
    <ModalForSubFilter
      :isShow="isShowAbsencingModal"
      :apiUrl="apiAbsence.filterWhoAbsencing"
      :title="`Who is abcensing`"
      @closeDialog="isShowAbsencingModal = false"
    />
    <ModalForSubFilter
      :isShow="isShowUpcommingAbsenceModal"
      :apiUrl="apiAbsence.filterUpcommingAbsence"
      :title="`Upcommming absences`"
      @closeDialog="isShowUpcommingAbsenceModal = false"
    />
    <!-- <ModalForSubFilter
      :title="titleUpcoming"
      :items="dataUpcomingAbsence"
      :isLoadingViewMore="false"
      :isLoadingViewFull="false"
      :popup="popup"
      :hasShowMoreUpcoming="hasShowMoreUpcoming"
      @viewMoreAbsence="viewMoreAbsence"
    />-->
  </v-layout>
</template>
<script>
import AbsenceList from "./AbsenceList";
import AbsenceCard from "./AbsenceCard";
import AbsenceDetailList from "./ListDetail";
import ModalForSubFilter from "./ModalForSubFilter";
import AbsenceCreate from "./CreateAbsence";

export default {
  components: {
    AbsenceList,
    AbsenceDetailList,
    ModalForSubFilter,
    AbsenceCreate,
    AbsenceCard
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
    this.getDataAbsenceListRequest(urlWhoAbsencing).then(data => {
      const { items, totalRecords } = data;
      this.dataAbsenceList = items;
      this.totalRecordsWhoAbsencing = totalRecords;
    });
    this.getDataAbsenceListRequest(urlUpcommingAbsencing).then(data => {
      const { items, totalRecords } = data;
      this.dataAbsenceList2 = items;
      this.totalRecordsUpcomming = totalRecords;
    });
  },
  computed: {
    hasShowMore() {
      return !this.dataFilterAbsences
        ? 0
        : this.dataFilterAbsences.length < this.totalRecords;
    },
    hasShowMoreWhoAbsencing() {
      return !this.dataWhoAbsencing
        ? 0
        : this.dataWhoAbsencing.length < this.totalRecordsWhoAbsencing;
    },
    hasShowMoreUpcoming() {
      return !this.dataUpcomingAbsence
        ? 0
        : this.dataUpcomingAbsence.length < this.totalRecordsUpcomming;
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
    getDataAbsenceListRequest(url) {
      return new Promise(resolve => {
        this.$http.post(`${url}`).then(res => {
          resolve({
            items: res.data.list,
            totalRecords: res.data.totalRecords
          });
        });
      });
    },
    getDataMoreAbsenceListRequest(url, pageIndex) {
      const filterRequest = {
        pageSize: 9,
        pageIndex
      };
      return new Promise(resolve => {
        this.$http.post(`${url}`, filterRequest).then(res => {
          resolve({
            items: res.data.list,
            totalRecords: res.data.totalRecords
          });
        });
      });
    },
    viewMoreUpcomming() {
      this.upcommingAbsenceModalModel.pageIndex++;
      this.upcommingAbsenceModalModel.isLoadingViewMore = true;
      if (this.upcommingAbsenceModalModel.pageIndex === 0) {
        this.upcommingAbsenceModalModel.isLoadingViewFull = true;
      }
      console.log(this.upcommingAbsenceModalModel);
      const url = this.apiAbsence.filterUpcommingAbsence;
      this.getDataMoreAbsenceListRequest(
        url,
        this.upcommingAbsenceModalModel.pageIndex
      ).then(data => {
        const { items, totalRecords } = data;
        this.upcommingAbsenceModalModel.isLoadingViewMore = false;
        this.upcommingAbsenceModalModel.isLoadingViewFull = false;
        this.upcommingAbsenceModalModel.items = this.upcommingAbsenceModalModel.items.concat(
          items
        );
        this.upcommingAbsenceModalModel.hasShowMore =
          totalRecords > this.upcommingAbsenceModalModel.items.length;
      });
    },
    viewMoreAbsence(name) {
      this.ModalAbsenceList.loadingViewMore = true;
      this.ModalAbsenceList.pageIndex += 1;
      const { url } = this.ModalAbsenceList;
      this.getDataMoreAbsenceListRequest(url).then(data => {
        const { items, totalRecords } = data;
        this.ModalAbsenceList.loadingViewMore = false;
        if ("WhoAbsencing" === name) {
          this.dataWhoAbsencing = this.dataWhoAbsencing.concat(items);
          this.totalRecordsWhoAbsencing = totalRecords;
        } else {
          this.dataUpcomingAbsence = this.dataUpcomingAbsence.concat(items);
          this.totalRecordsUpcomming = totalRecords;
        }
      });
    },
    viewFull(name) {
      if ("WhoAbsencing" === name) {
        this.whoAbsencingModalModel.isShow = true;
        this.whoAbsencingModalModel.pageIndex = -1;
        this.whoAbsencingModalModel.items = [];
        this.viewMoreUpcomming();
      }
      if ("UpcommingAbsence" === name) {
        this.upcommingAbsenceModalModel.isShow = true;
        this.upcommingAbsenceModalModel.pageIndex = -1;
        this.upcommingAbsenceModalModel.items = [];
        this.viewMoreUpcomming();
      }
    }
  },
  data() {
    return {
      isShowUpcommingAbsenceModal: false,
      isShowAbsencingModal: false,
      popup: {
        showCreate: false,
        showWhoAbsencing: false,
        showUpcomingAbsence: false
      },
      dataFilterAbsences: [],
      pageIndex: 0,
      loading: true,
      isShowMore: false,
      itemList: [
        { text: "Pending Requests" },
        { text: "Approved Request" },
        { text: "Rejected Request" }
      ],
      data1: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "Ông nội",
          date_start: "25 Agust 1995",
          date_end: "25 May 1995",
          description: "Style hơi chuối xí :D "
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          name: "Cha",
          date_start: "25 Agust 1995",
          date_end: "25 May 1995",
          description: "Style hơi chuối xí :D "
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Con",
          date_start: "25 Agust 1995",
          date_end: "25 May 1995",
          description: "Style hơi chuối xí :D "
        }
      ],
      totalRecordsWhoAbsencing: 0,
      totalRecordsUpcomming: 0,
      dataAbsenceList: [],
      dataAbsenceList2: [],
      dataWhoAbsencing: [],
      dataUpcomingAbsence: []
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
