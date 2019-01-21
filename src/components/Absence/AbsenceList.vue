<template>
  <div class="v-container">
    <v-data-table
      :headers="headers"
      :items="desserts.list"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
      light
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ startDate(props.item.startDate) }}</td>
        <td class="text-xs-center">{{ endDate(props.item.endDate) }}</td>
        <td class="text-xs-center">{{ props.item.employeeId }}</td>
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
      this.$http.post(`${this.apiAbsence.getPostAbsenceData}`).then(
        res => (
          (this.desserts = res.data),
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
      return moment(date).format("DD-MM-YYYY");
    },
    endDate(date) {
      return moment(date).format("DD-MM-YYYY");
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
      desserts: [],
      pagination: {},
      selected: [],
      headers: [
        {
          text: "Start Dates",
          align: "center",
          value: "startDate"
        },
        { text: "End Dates", align: "center", value: "endDate" },
        { text: "Emp ID", align: "center", value: "empId" },
        { text: "Emp Name", align: "center", value: "empName" },
        { text: "No Of Days", align: "center", value: "noOfdays" },
        { text: "Leave Type", align: "center", value: "leaveType" },
        { text: "Location", align: "center", value: "location" }
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