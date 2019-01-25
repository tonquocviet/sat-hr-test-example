<template>
  <div class="v-container">
    <v-data-table
      :headers="headers"
      :items="dataFilterPolicy"
      :pagination.sync="pagination"
      :total-items="totalRecords"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ startDate(props.item.startDate) }}</td>
        <td class="text-xs-left">{{ endDate(props.item.endDate) }}</td>
        <td class="text-xs-left">{{ props.item.numberOfEmployees }}</td>
        <td class="text-xs-left">
          <v-chip small v-for="item in props.item.tags" :key="item.id">{{ item }}</v-chip>
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
          pageIndex: page - 1,
          sort: {
            isAsc: !descending,
            columnName: sortBy
          }
        };
        return new Promise(resolve => {
          this.$http
            .post(`${this.apiPolicy.filterPolicy}`, filterRequest)
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
      }
    },
    mounted() {
      this.getDataFromApi().then(data => {
        this.dataFilterPolicy = data.items;
        this.totalRecords = data.totalRecords;
      });
    },
    data() {
      return {
        dataFilterPolicy: [],
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
            this.dataFilterPolicy = data.items;
            this.totalRecords = data.totalRecords;
          });
        },
        deep: true
      }
    }
  };
</script>

