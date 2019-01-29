<template>
  <v-card
    :class="isClickable ? `v-pointer-card` : null"
    @click="isClickable ? showModalDetail() : null"
  >
    <div :class="'pl-3 pr-3 pt-3 pb-3 user-infomation-' + item.status">
      <v-layout row wrap justify-space-between>
        <v-flex sm6 md6 lg6>
          <v-layout>
            <v-layout class="column pl-1 justify-space-between">
              <div class="subheading font-weight-bold v-number-of-line-name">
                {{item.name}}
              </div>
              <div class="grey--text">
                {{ item.createdBy.firstName }} {{ item.createdBy.lastName }}
              </div>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex align-self-center>
          <v-layout justify-end class="grey--text">
            <v-chip
              v-if="item.status == 'active'"
              small
              color="success"
              text-color="white"
            >{{ item.status }}</v-chip>
            <v-chip v-else small color="default">{{ item.status }}</v-chip>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div class="elevation-3">
      <v-layout class="pl-3 pr-3 pt-2 pb-2" justify-space-between>
        <div>
          <v-icon size="15">av_timer</v-icon>
          <span>
            Expired date
            <span class="red--text">{{formatDateTime(item.expiredDate)}}</span>
          </span>
        </div>
        <div>
          <v-icon size="15">supervisor_account</v-icon>
          <span>{{item.numberOfEmployees}}</span>
        </div>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    item: Object,
    isClickable: Boolean
  },
  methods: {
    formatDateTime(date) {
      return moment(date).format("DD MMM YYYY");
    },
    showModalDetail() {
      this.$emit("showDetailModal", this.item);
    }
  }
};
</script>

<style scopes>
.user-infomation-active {
  border-left: 4px solid #24b314 ;
  margin-left: -1px;
}
.user-infomation-inactive {
  border-left: 4px solid #e0e0e0;
  margin-left: -1px;
}
</style>