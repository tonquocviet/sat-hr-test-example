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
        <td class="text-xs-left">
          <router-link :to="`/absence-policy/${ props.item.id}`">{{ props.item.name }}</router-link>
        </td>
        <td
          class="text-xs-left"
        >{{ props.item.createdBy.firstName }} {{ props.item.createdBy.lastName }}</td>
        <td class="text-xs-left">
          <v-chip
            v-if="props.item.status == 'active'"
            small
            color="success"
            text-color="white"
          >{{ props.item.status }}</v-chip>
          <v-chip v-else small color="default">{{ props.item.status }}</v-chip>
        </td>
        <td class="text-xs-left">{{props.item.expiredDate | formatFullDay}}</td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination :total-visible="7" light v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    status: String
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
        },
        status: this.status || ""
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
    }
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
        { text: "Created by", align: "left", value: "createdBy" },
        { text: "Status", align: "left", value: "status" },
        { text: "Expiration", align: "left", value: "expiration" }
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

