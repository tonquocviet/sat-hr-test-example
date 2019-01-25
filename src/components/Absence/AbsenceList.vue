<template>
  <div class="v-container">
    <v-data-table
      :headers="headers"
      :items="dataFilterAbsences"
      :pagination.sync="pagination"
      :total-items="totalRecords"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ startDate(props.item.startDate) }}</td>
        <td class="text-xs-left">{{ endDate(props.item.endDate) }}</td>
        <td class="text-xs-left">{{ props.item.employeeId }}</td>
        <td class="text-xs-left">
          <a
            class="black--text"
            target="_blank"
            :href="detailLink + '/' + props.item.id"
            style="text-decoration: none;"
          >{{ props.item.employeeName }}</a>
        </td>
        <td class="text-xs-left">{{ onOffDays(props.item.startDate,props.item.endDate)}} Days</td>
        <td class="text-xs-left">
          <v-chip
            small
            :color="getColorFromLeaveName(props.item.leaveType.name)"
            text-color="white"
          >{{ props.item.leaveType.name }}</v-chip>
        </td>
        <td class="text-xs-left">{{ props.item.location }}</td>
        <td class="text-xs-left">
          <v-layout row>
            <v-btn flat icon @click="showDetailModal(props.item)">
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
            <v-btn flat icon @click="approvedRequest(props.item)">
              <v-icon>check_circle_outline</v-icon>
            </v-btn>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination light v-model="pagination.page" :total-visible="7" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { leaveTypes } from "../../config";
export default {
  props: {
    apiAbsence: Object,
    detailLink: String
  },
  methods: {
    showDetailModal(absenceDetail) {
      this.$emit("showDetailModal", absenceDetail);
    },
    approvedRequest() {
      // Xử lý request từ peding sang approved request.... (Api ?)
    },
    getDataFromApi() {
      this.loading = true;
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      const filterRequest = {
        pageSize: rowsPerPage,
        pageIndex: page,
        sort: {
          isAsc: !descending,
          columnName: sortBy
        }
      };
      return new Promise(resolve => {
        this.$http
          .post(`${this.apiAbsence.filterAbsences}`, filterRequest)
          .then(res => {
            this.loading = false;
            resolve({
              items: res.data.list,
              totalRecords: res.data.totalRecords
            });
          });
      });
    },
    getColorFromLeaveName(leaveName) {
      return (
        leaveTypes.filter(x => x.name === leaveName)[0] || { color: "primary" }
      ).color;
    },
    startDate(date) {
      return moment(date).format("MM/DD/YYYY");
    },
    endDate(date) {
      return moment(date).format("MM/DD/YYYY");
    },
    onOffDays(start, end) {
      const startDate = moment(start);
      const endDate = moment(end);
      return endDate.diff(startDate, "days") + 1;
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.dataFilterAbsences = data.items;
      this.totalRecords = data.totalRecords;
    });
  },
  data() {
    return {
      search: "",
      dataFilterAbsences: [],
      totalRecords: 0,
      pagination: {},
      selected: [],
      loading: true,
      headers: [
        {
          text: "Start Dates",
          align: "left",
          value: "startDate"
        },
        { text: "End Dates", align: "left", value: "endDate" },
        { text: "Emp ID", align: "left", value: "employeeId" },
        { text: "Emp Name", align: "left", value: "employeeName" },
        { text: "No Of Days", align: "left", value: "noOfdays" },
        { text: "Leave Type", align: "left", value: "leaveType" },
        { text: "Location", align: "left", value: "location" },
        { text: "Actions", align: "left", value: "location" }
      ]
    };
  },
  computed: {
    pages() {
      if (
        !this.pagination ||
        !this.pagination.rowsPerPage ||
        !this.totalRecords
      )
        return 0;
      return Math.ceil(this.totalRecords / this.pagination.rowsPerPage);
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.dataFilterAbsences = data.items;
          this.totalRecords = data.totalRecords;
        });
      },
      deep: true
    }
  }
};
</script>