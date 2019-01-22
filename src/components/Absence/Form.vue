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
      <v-tabs color="transparent" dark slider-color="primary" v-if="viewMode === 'list'">
        <v-tab v-for="item in itemList" :key="item.id" ripple class="primary--text">{{ item.text }}</v-tab>
        <v-tab-item>
          <AbsenceList :apiAbsence="apiAbsence"/>
        </v-tab-item>
        <v-tab-item>Approved Request</v-tab-item>
        <v-tab-item>Rejected Request</v-tab-item>
      </v-tabs>
      <AbsenceCard :data="data" v-if="viewMode === 'card'"/>
    </v-flex>
    <v-flex md3 class="ml-3">
      <v-container fluid class="pa-0 elevation-2">
        <AbsenceDetailList :items="data1" :title="this.titleAbsence" :value="value"/>
        <v-divider/>
        <AbsenceDetailList :items="data1" :title="this.titleUpcoming" :value="value"/>
      </v-container>
    </v-flex>
    <ModalListDetail title="Who's on leave" :data="data" :value="value"/>
  </v-layout>
</template>
<script>
import AbsenceList from "./AbsenceList";
import AbsenceCard from "./AbsenceCard";
import AbsenceDetailList from "./ListDetail";
import ModalListDetail from "./ModalListDetail";
import { data } from "./data.js";

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
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
    }
  },
  data() {
    return {
      value: {
        isOpen: false,
        end: 3
      },
      titleAbsence: "Who are Absencing ?",
      titleUpcoming: "Upcoming Absence",
      itemList: [
        { text: "Peding Requests" },
        { text: "Approved Request" },
        { text: "Rejected Request" }
      ],
      data,
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
<style>
.v-btn-card {
  margin-right: 90px;
}
.v-btn-add-filter {
  z-index: 10;
}
</style>
