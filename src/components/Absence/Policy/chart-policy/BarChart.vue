<template>
  <v-layout xs12>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs6>
          <v-layout class="ml-4 mt-2" column>
            <h3 class="subheading font-weight-bold">This Month</h3>
            <h3 class="subheading font-weight-bold">Total: {{thisMonthTotal}}</h3>
          </v-layout>
        </v-flex>
        <v-flex xs6 class="mt-2">
          <v-layout row>
            <v-flex xs4>
              <v-layout row>
                <v-icon size="30" color="red">block</v-icon>
                <v-layout column>
                  <h3 class="body-2">Reject</h3>
                  <h3 class="body-2">{{totalReject}}</h3>
                </v-layout>
              </v-layout>
            </v-flex>
            <v-flex xs4>
              <v-layout row>
                <v-icon size="30" color="#EFCC64">swap_horizontal_circle</v-icon>
                <v-layout column>
                  <h3 class="body-2">Pending</h3>
                  <h3 class="body-2">{{totalPending}}</h3>
                </v-layout>
              </v-layout>
            </v-flex>
            <v-flex xs4>
              <v-layout row>
                <v-icon size="30" color="#53C5AC">check_circle</v-icon>
                <v-layout column>
                  <h3 class="body-2">Approved</h3>
                  <h3 class="body-2">{{totalApproved}}</h3>
                </v-layout>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <ReceiveDataBarChart style="height: 500px" :chart-data="datacollection" :options="options"/>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import ReceiveDataBarChart from "./ReceiveDataBarChart";

export default {
  components: {
    ReceiveDataBarChart
  },
  props: {
    dataChartBar: Array,
    totalPending: Number,
    totalApproved: Number,
    thisMonthTotal: Number,
    totalReject: Number
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              categoryPercentage: 0.5,
              barPercentage: 1
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        },
        title: {
          display: true,
          text: "Total Absence Days under This Time-off Policy",
          position: "bottom"
        },
        legend: false //hide label chart
      }
    };
  },
  computed: {
    datacollection() {
      if (!this.dataChartBar || this.dataChartBar.length === 0) return null;

      const dataBarChart = this.dataChartBar.reduce(
        (prev, curr) => {
          prev.day.push(curr.day);
          prev.approved.push(curr.approved);
          prev.reject.push(curr.reject);
          prev.pending.push(curr.pending);
          return prev;
        },
        { day: [], approved: [], reject: [], pending: [] }
      );

      return {
        labels: dataBarChart.day,
        datasets: [
          {
            label: "Approved",
            data: dataBarChart.approved,
            backgroundColor: "#53C5AC",
            borderColor: "#53C5AC",
            borderWidth: 1
          },
          {
            label: "Pending",
            data: dataBarChart.pending,
            backgroundColor: "#EFCC64",
            borderColor: "#EFCC64",
            borderWidth: 1
          },
          {
            label: "Reject",
            data: dataBarChart.reject,
            backgroundColor: "#8C9098",
            borderColor: "#8C9098",
            borderWidth: 1
          }
        ]
      };
    }
  }
};
</script>
