<template>
  <v-layout row>
    <v-flex md9 class="mt-2">
      <v-flex xs12 right class="right-button-container">
        <v-btn color="info" @click="popup.showCreate = true">Add New Absence</v-btn>
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
        <AbsenceDetailList :items="data1" :title="this.titleAbsence" :value="value"/>
        <v-divider/>
        <AbsenceDetailList :items="data1" :title="this.titleUpcoming" :value="value"/>
      </v-container>
      <AbsenceCreate :items="data1" :popup ="popup"></AbsenceCreate>
    </v-flex>
    <ModalListDetail title="Who's on leave" :data="dataFilterAbsences" :value="value"/>
  </v-layout>
</template>
<script>
import AbsenceList from "./AbsenceList";
import AbsenceCard from "./AbsenceCard";
import AbsenceDetailList from "./ListDetail";
import AbsenceCreate from "./CreateAbsence";
import ModalListDetail from "./ModalListDetail";

export default {
  components: {
    AbsenceList,
    AbsenceDetailList,
    AbsenceCreate,
    AbsenceCard,
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
    }
  },
  data() {
    return {
      popup: {
         showCreate: false,
      },
      value: {
        isOpen: false,
        end: 3
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
      ]
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
