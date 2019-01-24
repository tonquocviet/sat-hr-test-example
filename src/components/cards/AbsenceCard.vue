<template>
  <v-card>
    <div class="user-infomation pl-3 pr-3 pt-3 pb-3">
      <v-layout>
        <v-flex xs8 sm9>
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
        <v-flex xs4 sm3>
          <v-layout class="grey--text justify-end v-date-time">
            <span>
              <v-chip
                small
                :color="getColorFromLeaveName(item.leaveType.name)"
                text-color="white"
              >{{ item.leaveType.name }}</v-chip>
            </span>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <div class="elevation-3">
      <div class="text-xs-center pl-3 pr-3 pt-2 pb-2">
        <v-layout>
          <v-flex xs3>
            <h3>{{formatMonth(item.startDate)}}</h3>
            <h1>{{formatDate(item.startDate)}}</h1>
            <h3 class="grey--text">{{formatDay(item.startDate)}}</h3>
          </v-flex>
          <v-flex xs6 class="user-date-arrow">
            <v-layout class="justify-center">
              <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
              <h4
                style="position: absolute;bottom: 0px;"
              >{{countDay(item.startDate, item.endDate)}} days anhual leave</h4>
            </v-layout>
          </v-flex>
          <v-flex xs3>
            <h3>{{formatMonth(item.endDate)}}</h3>
            <h1>{{formatDate(item.endDate)}}</h1>
            <h3 class="grey--text">{{formatDay(item.endDate)}}</h3>
          </v-flex>
        </v-layout>
      </div>
      <v-flex class="v-number-of-line">
        <div class="user-description pl-3 pr-3 pt-2 pb-2">{{item.leaveDescription}}</div>
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
import { leaveTypes } from "../../config";
import UserAvatar from "../avatars/Avatar";

export default {
  components: {
    UserAvatar
  },
  props: {
    item: Object
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
    submittedDate(date) {
      return moment(date).format("MM-DD-YYYY");
    },
    getColorFromLeaveName(leaveName) {
      return (
        leaveTypes.filter(x => x.name === leaveName)[0] || { color: "primary" }
      ).color;
    }
  }
};
</script>

<style scopes>
.user-infomation {
  border-left: 4px solid #ffd400;
  margin-left: -1px;
}
.user-date-arrow {
  position: relative;
}
.user-description {
  background: #ececec59;
}
.v-date-time {
  width: 100px;
  position: absolute;
  right: 10px;
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