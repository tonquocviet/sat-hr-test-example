<template>
  <div class="px-3 py-3">
    <v-layout row>
      <v-layout column>
        <v-flex xs10>
          <h3 class="headline font-weight-bold">Absence</h3>
        </v-flex>
        <v-flex xs10>
          <h3 class="caption">Home > absence</h3>
        </v-flex>
      </v-layout>
      <v-flex xs2 row>
        <v-btn color="primary">
          <v-icon>add_circle</v-icon>Add New Leave
        </v-btn>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout>
      <v-flex xs9>
        <LeaveCard :dataLeaveCard="dataLeaveCard"/>
        <v-flex sm12 md12>
          <EmployViewContent :items="itemsLeave"/>
        </v-flex>
      </v-flex>
      <v-flex xs3>
        <EmployViewListRight :dataAbsenceList="dataAbsenceList"/>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import LeaveCard from "../../cards/LeaveCard";
import EmployViewListRight from "./EmployViewListRight";
import EmployViewContent from "./EmployViewContent";
import { dataLeaveCard, itemsLeave } from "../data";
export default {
  components: {
    LeaveCard,
    EmployViewContent,
    EmployViewListRight
  },
  props: {
    dataLeaveCard: {
      type: Array,
      default: () => dataLeaveCard
    },
    itemsLeave: {
      type: Array,
      default: () => itemsLeave
    },
    apiListEmployView: Object
  },
  data() {
    return {
      dataAbsenceList: []
    };
  },
  methods: {
    getDataList() {
      return new Promise(resolve => {
        this.$http
          .post(`${this.apiListEmployView.filterWhoAbsencing}`)
          .then(res => {
            resolve({
              items: res.data.list,
              totalRecords: res.data.totalRecords
            });
          });
      });
    }
  },
  mounted() {
    this.getDataList().then(data => {
      this.dataAbsenceList = data.items;
      this.totalRecords = data.totalRecords;
    });
  }
};
</script>