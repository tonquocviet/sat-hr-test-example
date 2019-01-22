<template>
  <div class="v-container">
    <v-data-table
      :headers="headers"
      :items="dataFilterAbsences.list"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
      light
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ startDate(props.item.startDate) }}</td>
        <td class="text-xs-left">{{ endDate(props.item.endDate) }}</td>
        <td class="text-xs-left">{{ props.item.employeeId }}</td>
        <td class="text-xs-left">{{ props.item.employeeName }}</td>
        <td class="text-xs-left">{{ onOffDays(props.item.startDate,props.item.endDate)}} Days</td>
        <td class="text-xs-left">{{ props.item.leaveType.name }}</td>
        <td class="text-xs-left">{{ props.item.location }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination light v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    apiAbsence: Object
  },
  methods: {
    datatable() {
      this.$http.post(`${this.apiAbsence.filterAbsences}`).then(
        res => (
          (this.dataFilterAbsences = res.data),
          (this.pagination = {
            descending: false,
            page: 5,
            rowsPerPage: 10,
            sortBy: "startDate",
            totalItems: res.data.totalRecords
          })
        )
      );
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
    this.datatable();
  },
  data() {
    return {
      search: "",
      dataFilterAbsences: [],
      pagination: {},
      selected: [],
      headers: [
        {
          text: "Start Dates",
          align: "left",
          value: "startDate"
        },
        { text: "End Dates", align: "left", value: "endDate" },
        { text: "Emp ID", align: "left", value: "empId" },
        { text: "Emp Name", align: "left", value: "empName" },
        { text: "No Of Days", align: "left", value: "noOfdays" },
        { text: "Leave Type", align: "left", value: "leaveType" },
        { text: "Location", align: "left", value: "location" }
      ]
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  }
};
</script>