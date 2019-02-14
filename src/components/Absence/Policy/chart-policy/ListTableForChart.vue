<template>
  <v-flex xs12>
    <div class="mt-5">
      <v-data-table
        :headers="headers"
        :items="dataFilterAbsences"
        :pagination.sync="pagination"
        :total-items="totalRecords"
        :loading="loading"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.startDate | formatFullDay }}</td>
          <td class="text-xs-left">{{ props.item.endDate | formatFullDay }}</td>
          <td class="text-xs-left">{{ props.item.employeeId }}</td>
          <td class="text-xs-left">{{ props.item.employeeName }}</td>
          <td class="text-xs-left">{{ onOffDays(props.item.startDate,props.item.endDate)}} Days</td>
          <td class="text-xs-left">
            <v-layout row wrap>
              <v-flex sm3 v-for="item in props.item.approvers" :key="item.id">
                <div class="v-image-user">
                  <user-avatar
                    :imageUrl="(item.avatar||{}).imageUrl"
                    :name="item.lastName + ' ' + item.firstName"
                    width="unset"
                  />
                </div>
              </v-flex>
            </v-layout>
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-right pt-2">
        <v-pagination light v-model="pagination.page" :total-visible="7" :length="pages"></v-pagination>
      </div>
    </div>
  </v-flex>
</template>
<script>
import moment from "moment";
import UserAvatar from "../../../avatars/Avatar";
export default {
  components: {
    UserAvatar
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
        const id = this.$route.params.id;
        const url = this.apiPolicy.filterTablePerformance(id);
        this.$http.post(url, filterRequest).then(res => {
          this.loading = false;
          resolve({
            items: res.data.list,
            totalRecords: res.data.totalRecords
          });
        });
      });
    },
    onOffDays(start, end) {
      const startDate = moment(start);
      const endDate = moment(end);
      return endDate.diff(startDate, "days") + 1;
    }
  },
  data() {
    return {
      dataFilterAbsences: [],
      totalRecords: 0,
      pagination: {},
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
        {
          text: "Avatar",
          align: "left",
          value: "avatar",
          sortable: false
        }
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
