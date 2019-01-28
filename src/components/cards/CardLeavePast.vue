<template>
  <v-layout class="py-4">
    <v-flex xs2 column text-md-left class="pl-3">
      <h4 class="primary--text">Start Date</h4>
      <h3>{{ item.startDate }}</h3>
    </v-flex>
    <v-flex xs2 column text-md-left class="pl-3">
      <h4 class="primary--text">End Date</h4>
      <h3>{{ item.endDate }}</h3>
    </v-flex>
    <v-flex xs2 column text-md-left class="pl-3">
      <h4 class="primary--text">Leave Type</h4>
      <h3>{{ item.leaveType }}</h3>
    </v-flex>
    <v-flex xs2 column text-md-left class="pl-3">
      <h4 class="primary--text">Approved By</h4>
      <h3>{{ item.approvedBy }}</h3>
    </v-flex>
    <v-flex xs2 column text-md-left class="pl-3">
      <h4 class="primary--text">Status</h4>
      <h3 v-if="item.type === 1" class="success--text">Success</h3>
      <h3 v-if="item.type === 2" class="error--text">Pending</h3>
      <h3 v-if="item.type === 3" class="grey--text">Canceled</h3>
    </v-flex>
    <v-flex xs2 column text-md-left class="pl-3">
      <h4 class="primary--text">Address</h4>
      <h3>{{ item.address }}</h3>
    </v-flex>
    <v-flex xs2>
      <v-layout class="primary--text text-uppercase py-3">
        <v-btn flat color="success" v-if="item.type === 1">
          <span>reopen</span>
          <v-icon size="15">arrow_forward</v-icon>
        </v-btn>
        <v-btn flat color="error" v-else>
          <span>cancel</span>
          <v-icon size="15">arrow_forward</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>