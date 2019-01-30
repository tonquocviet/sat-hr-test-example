<template>
  <v-flex>
    <h3 class="mt-3">{{title}}</h3>
    <v-card class="mt-3" v-for="item in items" :key="item.id">
      <v-layout class="py-4">
        <v-flex xs2 column text-md-left class="pl-3">
          <h4 class="primary--text">Start Date</h4>
          <h3>{{ startDate(item.startDate) }}</h3>
        </v-flex>
        <v-flex xs2 column text-md-left class="pl-3">
          <h4 class="primary--text">End Date</h4>
          <h3>{{ endDate(item.endDate)}}</h3>
        </v-flex>
        <v-flex xs2 column text-md-left class="pl-3">
          <h4 class="primary--text">Leave Type</h4>
          <LeaveTypeChip :leaveType="item.leaveType.name"/>
        </v-flex>
        <v-flex xs2 column text-md-left class="pl-3">
          <h4 class="primary--text">Approved By</h4>
          <h3>{{ item.employeeName }}</h3>
        </v-flex>
        <v-flex xs2 column text-md-left class="pl-3">
          <h4 class="primary--text">Status</h4>
          <h3 v-if="item.status == 'approved'" class="success--text">{{ item.status }}</h3>
          <h3 v-if="item.status == 'pending'" class="error--text">{{ item.status }}</h3>
          <h3 v-if="item.status == 'rejected'" class="grey--text">{{ item.status }}</h3>
        </v-flex>
        <v-flex xs2 column text-md-left class="pl-3">
          <h4 class="primary--text">Address</h4>
          <h3>{{ item.location }}</h3>
        </v-flex>
        <v-flex xs2>
          <v-layout class="primary--text text-uppercase">
            <template>
              <v-btn
                flat
                color="error"
                v-if="item.status == 'pending'"
                @click="openPopupAbsenceApproved"
              >
                <span>cancel</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
              <v-btn flat v-else color="default" @click="openPopupAbsenceRequest(item)">
                <span>view</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
            </template>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>
<script>
import moment from "moment";
import LeaveTypeChip from "../../chips/LeaveTypeChip";

export default {
  components: {
    LeaveTypeChip
  },
  props: {
    items: Array,
    title: String
  },
  methods: {
    openPopupAbsenceApproved() {
      this.$emit("emitPopupAbsenceApproved");
    },
    openPopupAbsenceRequest(absenceDetail) {
      this.$emit("emitPopupAbsenceRequest", absenceDetail);
    }
  },
  computed: {
    startDate() {
      return date => moment(date).format("MM-DD-YYYY");
    },
    endDate() {
      return date => moment(date).format("MM-DD-YYYY");
    }
  }
};
</script>
