<template>
  <AbsenceCard
    :dataFilterAbsences="dataFilterAbsences"
    :loading="loading"
    :isShowMore="isShowMore"
    :hasShowMore="hasShowMore"
    @showMoreView="showMoreView"
    @showDetailModal="v=>this.$emit('showDetailModal',v)"
  />
</template>
<script>
import AbsenceCard from "./AbsenceCard";

export default {
  components: {
    AbsenceCard
  },
  props: {
    filterApiUrl: String,
    absenceStatus: {
      type: String,
      default: "pending"
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.dataFilterAbsences = data.items;
      this.totalRecords = data.totalRecords;
    });
  },
  computed: {
    hasShowMore() {
      return (
        !!this.dataFilterAbsences &&
        this.dataFilterAbsences.length < this.totalRecords
      );
    }
  },
  methods: {
    showMoreView() {
      this.pageIndex++;
      this.isShowMore = true;
      this.getDataFromApi().then(data => {
        this.dataFilterAbsences = this.dataFilterAbsences.concat(data.items);
        this.totalRecords = data.totalRecords;
      });
    },
    getDataFromApi() {
      this.loading = true;
      const filterRequest = {
        pageSize: 9,
        pageIndex: this.pageIndex,
        status: this.absenceStatus
      };
      return new Promise(resolve => {
        this.$http.post(`${this.filterApiUrl}`, filterRequest).then(res => {
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
      dataFilterAbsences: [],
      pageIndex: 0,
      loading: true,
      isShowMore: false
    };
  }
};
</script>