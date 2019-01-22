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
        { text: "Location", align: "left", value: "location" }
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