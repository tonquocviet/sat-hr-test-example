<template>
  <v-layout row>
    <v-flex xs12 md2>
      <v-menu
        ref="menu"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field slot="activator" v-model="picker" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="picker" type="month" no-title scrollable></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12 md8>
      <LeaveTypeChip v-for="item in colors" :key="item.name" :leaveType="item.name" is-responsive/>
    </v-flex>
    <v-flex xs12 md2 class="d-flex">
      <v-layout column>
        <v-flex class="d-flex" shrink>
          <v-layout>
            <v-flex shrink class="pr-3">
              <ReportCell dateType="weekend" employeeType="notEmployed"/>
            </v-flex>
            <v-flex grow class="font-weight-bold">Not employed</v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="d-flex">
          <v-layout>
            <v-flex shrink class="pr-3">
              <ReportCell dateType="weekend" employeeType="notApplicable"/>
            </v-flex>
            <v-flex grow class="font-weight-bold">Not applicable</v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import LeaveTypeChip from "../chips/LeaveTypeChip";
import ReportCell from "./ReportCell";

export default {
  components: {
    LeaveTypeChip,
    ReportCell
  },
  props: {
    date: String,
    colors: Array
  },
  data() {
    return {
      menu: false,
      modal: false,
      picker: this.date
    };
  },
  watch: {
    picker: function(val) {
      this.$emit("changeDate", val);
    }
  }
};
</script>
