<template>
  <v-card>
    <div class="user-infomation pl-3 pr-3 pt-2 pb-2">
      <v-layout>
        <v-flex xs8 sm9>
          <div class="user-infomation-avatar">
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar>
            <div class="infomation pl-1">
              <div class="subheading font-weight-bold">{{item.name}}</div>
              <div class="grey--text">{{item.work}}</div>
            </div>
          </div>
        </v-flex>
        <v-flex xs4 sm3>
          <div class="grey--text" style="display: flex;justify-content: flex-end;">
            <v-icon size="15">av_timer</v-icon>
            <span>08 Aug 16</span>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div class="user-date-start-end pl-3 pr-3 pt-2 pb-2">
      <v-layout>
        <v-flex xs3>
          <div class="user-date-start">
            <h3>{{formatMonth(item.start)}}</h3>
            <h1>{{formatDate(item.start)}}</h1>
            <h3 class="grey--text">{{formatDay(item.start)}}</h3>
          </div>
        </v-flex>
        <v-flex xs6 class="user-date-arrow" justify-center align-center>
          <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
          <h4
            style="position: absolute;bottom: 0px;"
          >{{countDay(item.start, item.end)}} days anhual leave</h4>
        </v-flex>
        <v-flex xs3>
          <div>
            <h3>{{formatMonth(item.end)}}</h3>
            <h1>{{formatDate(item.end)}}</h1>
            <h3 class="grey--text">{{formatDay(item.end)}}</h3>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div
      class="user-description pl-3 pr-3 pt-2 pb-2"
    >Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools</div>
    <div class="user-date-start-2 pl-3 pr-3 pt-2 pb-2" align-center>
      <v-icon size="15">av_timer</v-icon>
      <span>
        Due date
        <span class="red--text">{{formatDateTime(item.start)}}</span>
      </span>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    formatDate(date) {
      return this.moment(date).format("DD");
    },
    formatDay(date) {
      return this.moment(date).format("dddd");
    },
    formatMonth(date) {
      return this.moment(date).format("MMM");
    },
    formatDateTime(date) {
      return this.moment(date).format("DD MMM");
    },
    countDay(startDate, endDate) {
      const start = this.moment(startDate);
      const end = this.moment(endDate);
      return end.diff(start, "days");
    }
  }
};
</script>

<style scopes>
.user-infomation {
  border-left: 4px solid #ffd400;
}
.user-infomation-avatar {
  display: flex;
}
.infomation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.user-date-start-end {
  text-align: center;
  box-shadow: 1px -1px 4px 0px rgba(0, 0, 0, 0.08);
}
.user-date-arrow {
  position: relative;
  display: flex;
  flex-direction: column;
}
.user-description {
  background: #ececec59;
}
.user-date-start-2 {
  display: flex;
}
</style>
