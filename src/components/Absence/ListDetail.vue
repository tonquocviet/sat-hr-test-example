<template>
  <v-layout>
    <v-flex xs12>
      <v-card flat>
        <h3 class="ml-2 pt-2">{{ title }}</h3>
      </v-card>
      <v-card flat v-for="item in items" :key="item.id" @click="absenceClick(item)" class="py-1">
        <v-list two-line class="item-card-absence">
          <v-list-tile>
            <div class="v-image-user">
              <UserAvatar
                :imageUrl="(item.avatar||{}).imageUrl"
                :name="item.employeeName"
                width="unset"
                class="user-img"
              />
            </div>
            <v-list-tile-sub-title>
              <span class="font-weight-bold">{{ item.employeeName }}</span>
              <v-layout>
                <v-icon class="caption">date_range</v-icon>
                <span class="caption ml-1">{{ submittedDate(item.startDate) }}</span>
                <v-icon class="caption ml-4">date_range</v-icon>
                <span class="caption ml-1">{{ submittedDate(item.endDate) }}</span>
              </v-layout>
              <v-layout column>
                <span class="date-off error--text mr-3">{{countDay(item.startDate)}}</span>
                <div>
                  <v-chip
                    class="mx-0 my-0"
                    small
                    :color="getColorFromLeaveName(item.leaveType.name)"
                    text-color="white"
                  >{{ item.leaveType.name }}</v-chip>
                </div>
              </v-layout>
            </v-list-tile-sub-title>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-card flat>
        <v-layout justify-end>
          <v-btn @click="viewFull" flat color="success">View full</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import moment from "moment";
import UserAvatar from "../avatars/Avatar";
import { leaveTypes } from "../../config";

export default {
  components: {
    UserAvatar
  },
  props: {
    items: Array,
    title: String,
    name: String
  },
  methods: {
    absenceClick(absenceDetail) {
      this.$emit("absenceClick", absenceDetail);
    },
    countDay(startDate) {
      const start = moment(startDate);
      return start.startOf("day").fromNow();
    },
    submittedDate(date) {
      return moment(date).format("MM-DD-YYYY");
    },
    viewFull() {
      this.$emit("viewFull", this.name);
    },
    getColorFromLeaveName(leaveName) {
      return (
        leaveTypes.filter(x => x.name === leaveName)[0] || { color: "primary" }
      ).color;
    }
  }
};
</script>
<style scoped >
.item-card-absence {
  cursor: pointer;
}
.item-card-absence:hover {
  background-color: #eeeeee;
}
.v-image-user {
  margin-right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  background: grey;
  justify-content: center;
  align-items: center;
}
</style>