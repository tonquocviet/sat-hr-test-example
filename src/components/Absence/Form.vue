<template>
  <v-layout row>
    <v-flex md9 class="mt-2">
      <v-flex xs12 right class="right-button-container">
        <v-btn color="info" @click="popup.showCreate = true">Add New Absence</v-btn>
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
          <AbsenceList
            v-if="viewMode === 'list'"
            @showDetailModal="showDetailModal"
            :detailLink="detailLinks.forAbsenceProfile"
            :needRenderApproveAction="true"
          />
          <AbsenceCardContainer v-else @showDetailModal="showDetailModal"/>
        </v-tab-item>
        <v-tab-item>
          <AbsenceList
            v-if="viewMode === 'list'"
            @showDetailModal="showDetailModal"
            :detailLink="detailLinks.forAbsenceProfile"
          />
          <AbsenceCardContainer
            v-else
            @showDetailModal="showDetailModal"
            absence-status="approved"
          />
        </v-tab-item>
        <v-tab-item>
          <AbsenceList
            v-if="viewMode === 'list'"
            @showDetailModal="showDetailModal"
            :detailLink="detailLinks.forAbsenceProfile"
            absence-status="rejected"
          />
          <AbsenceCardContainer
            v-else
            @showDetailModal="showDetailModal"
            absence-status="rejected"
          />
        </v-tab-item>
      </v-tabs>
    </v-flex>
    <v-flex md3 class="ml-3">
      <v-container fluid class="pa-0 elevation-2">
        <AbsenceDetailList
          name="WhoAbsencing"
          @absenceClick="showDetailModal"
          :items="dataAbsenceList"
          :title="`Who are absencing ?`"
          @viewFull="isShowAbsencingModal = true"
        />
        <v-divider/>
        <AbsenceDetailList
          name="UpcomingAbsence"
          @absenceClick="showDetailModal"
          :items="dataAbsenceList2"
          :title="`Upcoming absences`"
          @viewFull="isShowUpcomingAbsenceModal = true"
        />
      </v-container>
      <AbsenceCreate :items="data1" :leaveTypes="leaveTypes" :popup="popup"/>
    </v-flex>
    <ModalDetailAbsence
      :isShow="isShowAbsenceDetailsModal"
      :absenceDetail="absenceDetail"
      @closeDialog="isShowAbsenceDetailsModal = false"
    />
    <ModalForSubFilter
      :isShow="isShowAbsencingModal"
      :apiUrl="apiAbsence.filterWhoAbsencing"
      :title="`Who is abcensing`"
      @closeDialog="isShowAbsencingModal = false"
    />
    <ModalForSubFilter
      :isShow="isShowUpcomingAbsenceModal"
      :apiUrl="apiAbsence.filterUpcommingAbsence"
      :title="`Upcoming absences`"
      @closeDialog="isShowUpcomingAbsenceModal = false"
    />
  </v-layout>
</template>
<script>
import AbsenceList from "./AbsenceList";
import AbsenceCardContainer from "./AbsenceCardContainer";
import AbsenceDetailList from "./ListDetail";
import ModalForSubFilter from "./ModalForSubFilter";
import AbsenceCreate from "./CreateAbsence";
import ModalDetailAbsence from "./modal-detail-absence/Form";
import { leaveTypes } from "../../config.js";

export default {
  components: {
    AbsenceList,
    AbsenceDetailList,
    ModalDetailAbsence,
    ModalForSubFilter,
    AbsenceCreate,
    AbsenceCardContainer
  },
  props: {
    viewMode: String,
    detailLinks: Object
  },
  mounted() {
    const urlWhoAbsencing = this.apiAbsence.filterWhoAbsencing;
    const urlUpcommingAbsence = this.apiAbsence.filterUpcommingAbsence;
    this.getDataAbsenceListRequest(urlWhoAbsencing).then(data => {
      const { items } = data;
      this.dataAbsenceList = items;
    });
    this.getDataAbsenceListRequest(urlUpcommingAbsence).then(data => {
      const { items } = data;
      this.dataAbsenceList2 = items;
    });
  },
  methods: {
    showDetailModal(item) {
      this.isShowAbsenceDetailsModal = true;
      this.absenceDetail = item;
    },
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
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
    }
  },
  data() {
    return {
      isShowUpcomingAbsenceModal: false,
      isShowAbsencingModal: false,
      popup: {
        showCreate: false
      },
      absenceDetail: null,
      isShowAbsenceDetailsModal: false,
      dataFilterAbsences: [],
      pageIndex: 0,
      loading: true,
      isShowMore: false,
      itemList: [
        { text: "Pending Requests" },
        { text: "Approved Request" },
        { text: "Rejected Request" }
      ],
      leaveTypes,
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
      dataAbsenceList: [],
      dataAbsenceList2: []
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
