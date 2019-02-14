<template>
  <v-flex>
    <v-layout row>
      <v-flex xs6 align-center d-flex class="text-xs-left">
        <h3 class="headling ml-2">Calendar</h3>
      </v-flex>
      <v-flex xs6 class="text-xs-right">
        <v-btn small flat color="success">View full</v-btn>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="ml-2">
      <v-date-picker
        width="100%"
        v-model="dateTimeColor"
        event-color="date"
        :events="functionEvents"
        readonly
      ></v-date-picker>
    </v-flex>
    <v-layout row class="mt-1">
      <v-flex pa-1 align-center d-flex>
        <v-icon color="blue" size="15">fiber_manual_record</v-icon>Holiday
      </v-flex>
      <v-flex pa-1 align-center d-flex>
        <v-icon color="green" size="15">fiber_manual_record</v-icon>Casual Absence
      </v-flex>
      <v-flex pa-1 align-center d-flex>
        <v-icon color="red" size="15">fiber_manual_record</v-icon>Sick Absence
      </v-flex>
    </v-layout>
    <v-flex xs12 class="mt-2 ml-2">
      <AbsenceDetailList
        name="WhoAbsencing"
        @absenceClick="showDetailModal"
        :items="dataTeamPlane"
        :title="`Team's Planned Absence`"
        @viewFull="isShowEmployeeModal = true"
      />
      <ModalForSubFilter
        :isShow="isShowEmployeeModal"
        :apiUrl="apiAbsence.filterWhoAbsencing"
        :title="`Team's Planned Absence`"
        @closeDialog="isShowEmployeeModal = false"
      />
      <ModalDetailAbsence
        :isShow="isShowAbsenceDetailsModal"
        :absenceDetail="absenceDetail"
        @closeDialog="isShowAbsenceDetailsModal = false"
      />
    </v-flex>
  </v-flex>
</template>
<script>
import AbsenceDetailList from "../ListDetail";
import ModalForSubFilter from "../ModalForSubFilter";
import ModalDetailAbsence from "../modal-detail-absence/Form";

export default {
  components: {
    AbsenceDetailList,
    ModalForSubFilter,
    ModalDetailAbsence,
  },
  props: {
    dataTeamPlane: Array
  },
  data() {
    return {
      dateTimeColor: new Date().toISOString().substr(0, 10),
      arrayEvents: null,
      isShowEmployeeModal: false,
      isShowAbsenceDetailsModal: false,
      absenceDetail: null
    };
  },
  methods: {
    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return ["red"];
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["blue"];
      if ([11, 4, 25].includes(parseInt(day, 10))) return ["green"];
      return false;
    },
    showDetailModal(item) {
      this.isShowAbsenceDetailsModal = true;
      this.absenceDetail = item;
    }
  },
  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  }
};
</script>
