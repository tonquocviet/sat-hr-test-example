<template>
  <v-layout column xs12>
    <v-flex xs12>
      <BarChart
        :totalPending="totalPending"
        :totalApproved="totalApproved"
        :totalReject="totalReject"
        :thisMonthTotal="thisMonthTotal"
        :dataChartBar="dataChartBar"
      />
    </v-flex>
    <v-flex xs12>
      <PieChart
        :totalPending="totalPending"
        :totalApproved="totalApproved"
        :totalReject="totalReject"
        :dataPolicySloved="dataPolicySloved"
      />
    </v-flex>
    <v-flex xs12>
      <ListTableForChart/>
    </v-flex>
  </v-layout>
</template>
<script>
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ListTableForChart from "./ListTableForChart";
import { dataPolicySloved } from "./data-chart";
export default {
  components: {
    BarChart,
    PieChart,
    ListTableForChart
  },
  data() {
    return {
      dataChartBar: []
    };
  },
  mounted() {
    const { id } = this.$route.params;
    const url = this.apiAbsence.getMonthAbsenceStatistic(id);

    this.$http
      .get(url, {
        params: {
          month: (new Date()).toISOString().substr(0, 7).replace('-', '')
        }
      })
      .then(res => {
        this.dataChartBar = res.data;
      });
  },
  computed: {
    totalApproved() {
      return this.dataChartBar.map(e => e.approved).reduce((a, b) => a + b, 0);
    },
    totalPending() {
      return this.dataChartBar.map(e => e.pending).reduce((a, b) => a + b, 0);
    },
    totalReject() {
      return this.dataChartBar.map(e => e.reject).reduce((a, b) => a + b, 0);
    },
    thisMonthTotal() {
      return this.dataChartBar
        .map(e => e.reject + e.approved + e.pending)
        .reduce((a, b) => a + b, 0);
    }
  },
  props: {
    dataPolicySloved: {
      type: Array,
      default: () => dataPolicySloved
    }
  }
};
</script>
