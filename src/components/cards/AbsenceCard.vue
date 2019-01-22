<template>
  <v-card>
    <div class="user-infomation pl-3 pr-3 pt-3 pb-3">
      <v-layout>
        <v-flex xs8 sm9>
          <v-layout>
            <user-avatar :imageUrl="item.avatar.imageUrl" :name="item.name" width="unset"/>
            <v-layout class="column pl-1 justify-space-between">
              <div class="subheading font-weight-bold">{{item.avatar.name}}</div>
              <div class="grey--text">{{item.position}}</div>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex xs4 sm3>
          <v-layout class="grey--text justify-end v-date-time">
            <v-icon size="15">av_timer</v-icon>
            <span>08 Aug 16</span>
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
      <div
        class="user-description pl-3 pr-3 pt-2 pb-2"
      >Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools</div>
      <v-layout class="pl-3 pr-3 pt-2 pb-2">
        <v-icon size="15">av_timer</v-icon>
        <span>
          Due date
          <span class="red--text">{{formatDateTime(item.start)}}</span>
        </span>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";

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
</style>
