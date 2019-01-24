<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="v => v ? openDialog() : $emit('closeDialog')" width="1200">
      <v-card>
        <v-card-title class="headline default lighten-2" style="padding: 16px 25px">
          <div style="width:30px;height:2px;margin-right:5px;background:orange"></div>
          <span>{{title}}</span>
        </v-card-title>
        <AbsenceCard
          @showMoreView="viewMore"
          :dataFilterAbsences="items"
          :loading="isLoadingViewFull"
          :isShowMore="isLoadingViewMore"
          :hasShowMore="hasShowMore"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AbsenceCard from "./AbsenceCard";

export default {
  components: {
    AbsenceCard
  },
  props: {
    title: String,
    apiUrl: String,
    isShow: Boolean
  },
  data() {
    return {
      items: [],
      isLoadingViewFull: false,
      isLoadingViewMore: false,
      hasShowMore: false,
      pageIndex: 0
    };
  },
  methods: {
    getDataMoreAbsenceListRequest() {
      const filterRequest = {
        pageSize: 9,
        pageIndex: this.pageIndex
      };
      return new Promise(resolve => {
        this.$http.post(`${this.apiUrl}`, filterRequest).then(res => {
          resolve({
            items: res.data.list,
            totalRecords: res.data.totalRecords
          });
        });
      });
    },
    openDialog() {
      this.pageIndex = -1;
      this.items = [];
      this.viewMore();
    },
    viewMore() {
      this.pageIndex++;
      this.isLoadingViewMore = true;
      if (this.pageIndex === 0) {
        this.isLoadingViewFull = true;
      }
      this.getDataMoreAbsenceListRequest().then(data => {
        const { items, totalRecords } = data;
        this.isLoadingViewMore = false;
        this.isLoadingViewFull = false;
        this.items = this.items.concat(items);
        this.hasShowMore =
          totalRecords > this.items.length;
      });
      this.$emit("viewMoreAbsence");
    }
  },
  watch: {
    isShow: {
      handler(isOpen) {
        if (isOpen) {
          this.openDialog();
        }
      }
    }
  }
};
</script>
