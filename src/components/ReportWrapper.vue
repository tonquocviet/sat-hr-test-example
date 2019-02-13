<template>
  <v-content>
    <v-container fluid class="pa-0">
      <v-tabs left color="transparent" dark slider-color="primary">
        <v-tab class="primary--text" ripple>Employee List</v-tab>
        <v-tab class="primary--text" ripple>Summary</v-tab>
        <v-tab-item>
          <ReportHeader :date="date" @changeDate="changeDate"/>
          <ReportTable :data="employees" :date="getMonth"/>
        </v-tab-item>
        <v-tab-item>Summary</v-tab-item>
      </v-tabs>
    </v-container>
  </v-content>
</template>

<script>
import ReportTable from "./Report/ReportTable";
import ReportHeader from "./Report/ReportHeader";

export default {
  components: {
    ReportTable,
    ReportHeader
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      employees: null
    };
  },
  mounted() {
    this.getReportData();
  },
  computed: {
    getMonth() {
      return {
        year: +this.date.split("-")[0],
        month: +this.date.split("-")[1]
      };
    }
  },
  methods: {
    changeDate(val) {
      this.date = val;
      this.getReportData();
    },
    getReportData() {
      this.employees = null;
      this.$http
        .get(
          this.apiAbsence.getAbsenceReportUrl(
            `${this.getMonth.year}${this.getMonth.month}`
          )
        )
        .then(res => {
          this.employees = res.data;
        });
    }
  }
};
</script>

