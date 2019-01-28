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
          <router-link :to="detailLink + '/' + props.item.id">{{ props.item.employeeName }}</router-link>
        </td>
        <td class="text-xs-left">{{ onOffDays(props.item.startDate,props.item.endDate)}} Days</td>
        <td class="text-xs-left">
          <LeaveTypeChip :leaveType="props.item.leaveType.name"/>
        </td>
        <td class="text-xs-left">{{ props.item.location }}</td>
        <td class="text-xs-center">
          <v-layout row>
            <v-btn flat icon @click="absenceClick(props.item)" class="ma-0" color="grey">
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
            <v-btn flat icon @click="openModalConfirm(props.item)" class="ma-0" color="success">
              <v-icon>check_circle_outline</v-icon>
            </v-btn>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination light v-model="pagination.page" :total-visible="7" :length="pages"></v-pagination>
    </div>
    <v-dialog v-model="confirmRequest" max-width="290">
      <v-card>
        <v-card-text>Please confirm that you want to approve for this request?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color=" darken-1" flat="flat" @click="confirmRequest = false">No</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="approvedRequest">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="infoSnackbar" :bottom="true" :left="true" :timeout="6000">
      {{ savedMessage }}
      <v-btn color="primary" flat @click="infoSnackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import moment from "moment";
import LeaveTypeChip from "../chips/LeaveTypeChip";
export default {
  props: {
    apiAbsence: Object,
    detailLink: String
  },
  components: {
    LeaveTypeChip
  },
  methods: {
    absenceClick(absenceDetail) {
      this.$emit("showDetailModal", absenceDetail);
    },
    openModalConfirm(itemAbsence) {
      this.confirmRequest = true;
      this.itemAbsence = itemAbsence;
    },
    approvedRequest() {
      this.$http
        .post(`${this.apiAbsence.approveRequest}`, {
          id: this.itemAbsence.id
        })
        .then(() => {
          this.confirmRequest = false;
          this.infoSnackbar = true;
          this.savedMessage = "Approve success !!";
        })
        .catch(() => {
          this.infoSnackbar = true;
          this.savedMessage = "Approve failed !!";
        });
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
  data() {
    return {
      search: "",
      dataFilterAbsences: [],
      totalRecords: 0,
      pagination: {},
      selected: [],
      loading: true,
      confirmRequest: false,
      infoSnackbar: false,
      savedMessage: "",
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
        { text: "Actions", align: "center", value: "location", sortable: false }
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