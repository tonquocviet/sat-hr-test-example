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
    <v-layout row wrap class="ml-2">
      <v-flex xs12 class="pt-2">
        <v-card class="colorful-calendar">
          <VDatePickerExtend
            :value="dates.map(x=>x.date)"
            :pickerDate="pickerDate"
            :titleDateFormat="titleDateFormat"
            :selectedColor="getColorByLeaveDate"
            multiple
            width="100%"
            @update:pickerDate="changePickerDate"
          ></VDatePickerExtend>
        </v-card>
        <v-card class="mt-3">
          <v-layout row wrap>
            <v-flex v-for="item in tags" :key="item.name" lg6 sm4 xs6 class="pa-1">
              <LeaveTypeChip :leaveType="item.name"/>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="mt-2 ml-2">
      <AbsenceDetailList
        name="WhoAbsencing"
        @absenceClick="showDetailModal"
        :items="dataTeamPlanned"
        title="Team's Planned Absence"
        @viewFull="isShowEmployeeModal = true"
      />
      <ModalForSubFilter
        :isShow="isShowEmployeeModal"
        :apiUrl="apiAbsence.filterWhoAbsencing"
        title="Team's Planned Absence"
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
import VDatePickerExtend from "../../vuetify/VDatePickerExtend/VDatePickerExtend";
import LeaveTypeChip from "../../chips/LeaveTypeChip";
import { leaveTypes } from "../../../config";
import ModalForSubFilter from "../ModalForSubFilter";
import ModalDetailAbsence from "../modal-detail-absence/Form";

export default {
  components: {
    AbsenceDetailList,
    VDatePickerExtend,
    LeaveTypeChip,
    ModalForSubFilter,
    ModalDetailAbsence
  },
  props: {
    dates: Array,
    tags: Array,
    dataTeamPlanned: Array
  },
  data() {
    return {
      selectedIndex: new Date().getMonth(),
      isShowEmployeeModal: false,
      isShowAbsenceDetailsModal: false,
      absenceDetail: null,
      year: new Date().getFullYear()
    };
  },
  methods: {
    changeDates(selectedDates) {
      this.$emit("update:dates", selectedDates);
    },
    changePickerDate(pickerDate) {
      const [year, month] = pickerDate.split("-").map(Number);
      this.year = year;
      this.selectedIndex = month - 1;
    },
    getColorByLeaveDate(date) {
      const leaveType = (
        this.dates.filter(x => x.date === date)[0] || { leaveType: "" }
      ).leaveType;
      return (
        leaveTypes.filter(x => x.name === leaveType)[0] || { color: "primary" }
      ).color;
    },
    titleDateFormat(dates) {
      const count = dates.filter(x => {
        const [, month] = x.split("-").map(Number);
        return month === this.selectedIndex + 1;
      }).length;
      return `${count} day(s)`;
    },
    showDetailModal(item) {
      this.isShowAbsenceDetailsModal = true;
      this.absenceDetail = item;
    }
  },
  computed: {
    pickerDate() {
      const year = this.year;
      return `${year}-${this.selectedIndex + 1}`;
    }
  },
  mounted() {
    this.$emit("getDataAbsenceDaysOff", this.pickerDate.split("-")[0]);
  },
  watch: {
    year() {
      this.$emit("getDataAbsenceDaysOff", this.pickerDate.split("-")[0]);
    }
  }
};
</script>
