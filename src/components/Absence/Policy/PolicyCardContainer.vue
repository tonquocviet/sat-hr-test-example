<template>
  <PolicyCard
    :dataFilterPolicy="dataFilterPolicy"
    :loading="loading"
    :isShowMore="isShowMore"
    :hasShowMore="hasShowMore"
    @showMoreView="showMoreView"
  />
</template>
<script>
import PolicyCard from "./PolicyCard";

export default {
  components: {
    PolicyCard
  },
  props: {
    status: String
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.dataFilterPolicy = data.items;
      this.totalRecords = data.totalRecords;
    });
  },
  computed: {
    hasShowMore() {
      return (
        !!this.dataFilterPolicy &&
        this.dataFilterPolicy.length < this.totalRecords
      );
    }
  },
  methods: {
    showMoreView() {
      this.pageIndex++;
      this.isShowMore = true;
      this.getDataFromApi().then(data => {
        this.dataFilterPolicy = this.dataFilterPolicy.concat(data.items);
        this.totalRecords = data.totalRecords;
      });
    },
    getDataFromApi() {
      const filterRequest = {
        pageSize: 9,
        pageIndex: this.pageIndex,
        status: this.status || ""
      };
      return new Promise(resolve => {
        this.$http.post(`${this.apiPolicy.filterPolicy}`, filterRequest).then(res => {
          this.loading = false;
          this.isShowMore = false;
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
      pageIndex: 0,
      loading: true,
      isShowMore: false
    };
  }
};
</script>