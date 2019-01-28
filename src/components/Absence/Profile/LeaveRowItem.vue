<template>
  <v-card class="mt-3">
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
        <v-chip small>{{ item.leaveType }}</v-chip>
      </v-flex>
      <v-flex xs2 column text-md-left class="pl-3">
        <h4 class="primary--text">Approved By</h4>
        <h3>{{ item.approvedBy }}</h3>
      </v-flex>
      <v-flex xs2 column text-md-left class="pl-3">
        <h4 class="primary--text">Status</h4>
        <h3 v-if="item.status == 'approved'" class="success--text">{{ item.status }}</h3>
        <h3 v-if="item.status == 'pending'" class="error--text">{{ item.status }}</h3>
        <h3 v-if="item.status == 'canceled'" class="grey--text">{{ item.status }}</h3>
      </v-flex>
      <v-flex xs2 column text-md-left class="pl-3">
        <h4 class="primary--text">Address</h4>
        <h3>{{ item.address }}</h3>
      </v-flex>
      <v-flex xs2>
        <v-layout class="primary--text text-uppercase">
          <template v-if="passLeave">
            <v-btn flat color="default">
              <span>view</span>
              <v-icon size="15">arrow_forward</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn flat color="success" v-if="item.status == 'canceled'">
              <span>reopen</span>
              <v-icon size="15">arrow_forward</v-icon>
            </v-btn>
            <v-btn flat color="error" v-else>
              <span>cancel</span>
              <v-icon size="15">arrow_forward</v-icon>
            </v-btn>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  props: {
    item: Object,
    passLeave: Boolean,
  }
};
</script>