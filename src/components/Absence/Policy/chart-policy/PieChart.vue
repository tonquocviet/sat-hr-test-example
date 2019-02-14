<template>
  <v-layout row xs12>
    <v-flex xs6 justify-center align-center d-flex>
      <v-layout column>
        <h3 class="title font-weight-bold ml-5 mb-2">Absence Cases Sloved Per HR Approvers</h3>
        <v-flex v-for="item in dataPolicySloved" :key="item.id" xs6 class="mt-5">
          <v-layout row justify-center align-center>
            <v-flex xs1>
              <div class="v-image-user">
                <user-avatar
                  :imageUrl="(item.avatar||{}).imageUrl"
                  :name="item.name"
                  width="unset"
                />
              </div>
            </v-flex>
            <v-flex xs3>
              <v-layout row>
                <v-icon size="30" color="red">block</v-icon>
                <v-layout column>
                  <h3 class="body-2 ml-1">Reject</h3>
                  <h3 class="body-2 ml-3">{{item.numberReject}}</h3>
                </v-layout>
              </v-layout>
            </v-flex>
            <v-flex xs3>
              <v-layout row>
                <v-icon size="30" color="#EFCC64">swap_horizontal_circle</v-icon>
                <v-layout column>
                  <h3 class="body-2 ml-1">Pending</h3>
                  <h3 class="body-2 ml-4">{{item.numberPeding}}</h3>
                </v-layout>
              </v-layout>
            </v-flex>
            <v-flex xs3>
              <v-layout row>
                <v-icon size="30" color="#53C5AC">check_circle</v-icon>
                <v-layout column>
                  <h3 class="body-2 ml-1">Approved</h3>
                  <h3 class="body-2 ml-4">{{item.numberApproved}}</h3>
                </v-layout>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-layout justify-center align-center>
      <v-flex xs6>
        <ReceiveDataPieChart :chart-data="datacollection" :options="options"/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
import ReceiveDataPieChart from "./ReceiveDataPieChart";
import UserAvatar from "../../../avatars/Avatar";

export default {
  props: {
    dataPolicySloved: Array,
    totalPending: Number,
    totalApproved: Number,
    totalReject: Number
  },
  components: {
    UserAvatar,
    ReceiveDataPieChart
  },
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        title: {},
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const total = dataset.data.reduce(function(
                previousValue,
                currentValue
              ) {
                return previousValue + currentValue;
              });
              const currentValue = dataset.data[tooltipItem.index];
              const precentage = Math.floor((currentValue / total) * 100 + 0.5);
              return precentage + "%";
            }
          }
        }
      }
    };
  },
  computed: {
    datacollection() {
      if (!this.totalApproved && !this.totalPending && !this.totalReject) return null;
      return {
        labels: ["Approved", "Pending", "Reject"],
        datasets: [
          {
            data: [this.totalApproved, this.totalPending, this.totalReject],
            backgroundColor: ["#53C5AC", "#EFCC64", "#8C9098"]
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.v-image-user {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  background: grey;
  justify-content: center;
  align-items: center;
}
</style>
