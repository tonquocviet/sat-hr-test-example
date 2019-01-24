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
        <td class="text-xs-left">
          <v-chip
            small
            :color="getColorFromLeaveName(props.item.leaveType.name)"
            text-color="white"
          >{{ props.item.leaveType.name }}</v-chip>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination light v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { leaveTypes } from "../../config";
export default {
  props: {
    apiPolicy: Object
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
          .post(`${this.apiPolicy.filterAbsences}`, filterRequest)
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
        { text: "Policy Name", align: "left", value: "namePolicy" },
        { text: "Policy ID", align: "left", value: "idPolicy" },
        { text: "Start Date", align: "left", value: "startDate" },
        { text: "End Date", align: "left", value: "endDate" },
        { text: "Number Policy", align: "left", value: "numberPolicy" },
        { text: "Tag", align: "left", value: "Tag" }
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