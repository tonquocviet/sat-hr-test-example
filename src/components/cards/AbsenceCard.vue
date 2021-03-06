<template>
  <v-card
    :class="isClickable ? `v-pointer-card` : null"
    @click="isClickable ? showModalDetail() : null"
  >
    <div class="user-infomation pl-3 pr-3 pt-3 pb-3">
      <v-layout row wrap justify-space-between>
        <v-flex md6 lg6>
          <v-layout>
            <div class="v-image-user">
              <user-avatar
                :imageUrl="(item.avatar||{}).imageUrl"
                :name="item.employeeName"
                width="unset"
                class="user-img"
              />
            </div>
            <v-layout class="column pl-1 justify-space-between">
              <div class="subheading font-weight-bold v-number-of-line-name">{{item.employeeName}}</div>
              <div class="grey--text">{{item.employeeRole.name}}</div>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex md6 lg6 align-self-center>
          <v-layout justify-end class="grey--text">
            <LeaveTypeChip :leaveType="item.leaveType.name" is-responsive/>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div class="elevation-3">
      <div class="text-xs-center pl-3 pr-3 pt-2 pb-2">
        <AbsenceInfoCard :leaveData="item.leaveData"/>
      </div>
      <v-flex class="user-description">
        <div class="pl-3 pr-3 pt-2 pb-2">{{item.leaveDescription}}</div>
      </v-flex>
      <v-layout class="pl-3 pr-3 pt-2 pb-2">
        <v-icon size="15">av_timer</v-icon>
        <span>
          Due date
          <span class="red--text">{{formatDateTime(item.dueAppliedDate)}}</span>
        </span>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import LeaveTypeChip from "../chips/LeaveTypeChip";
import UserAvatar from "../avatars/Avatar";
import AbsenceInfoCard from "./AbsenceInfoCard";

export default {
  components: {
    UserAvatar,
    LeaveTypeChip,
    AbsenceInfoCard
  },
  props: {
    item: Object,
    isClickable: Boolean
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD");
    },
    formatDay(date) {
      return moment(date).format("ddd");
    },
    formatMonth(date) {
      return moment(date).format("MMM");
    },
    formatDateTime(date) {
      return moment(date).format("DD MMM");
    },
    countDay(startDate, endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      return end.diff(start, "days");
    },
    showModalDetail() {
      this.$emit("showDetailModal", this.item);
    }
  }
};
</script>

<style scoped>
.v-pointer-card {
  cursor: pointer;
}
.user-infomation {
  border-left: 4px solid #ffd400;
  margin-left: -1px;
}
.user-date-arrow {
  position: relative;
}

.user-description {
  background: #ececec59;
  height: 145px;
  overflow: auto;
}
.user-description::-webkit-scrollbar-track {
  background-color: #ececec59;
}

.user-description::-webkit-scrollbar {
  width: 3px;
  background-color: #ececec59;
}

.user-description::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 1px solid #ececec59;
}
.user-img {
  justify-content: center;
}
.v-image-user {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  background: grey;
  justify-content: center;
  align-items: center;
}
.v-number-of-line-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.v-number-of-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  height: 130px;
}
</style>