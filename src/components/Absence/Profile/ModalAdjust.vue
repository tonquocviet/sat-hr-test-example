<template>
  <v-layout row justify-center>
    <v-dialog @input="$emit('closeDialog')" :value="isShowModalAdjust" width="700px">
      <v-card>
        <v-card-title
          class="headline info lighten-2 text-xs-center"
          primary-title
        >
          <LeaveTypeChip :leaveType="leaveType" is-responsive/> Adjustment
        </v-card-title>
        <v-card-text>
          <h3 class="subheading">
            <span class="subheading font-weight-bold">{{employeeName}}</span> has been in
            <span class="subheading font-weight-bold"><LeaveTypeChip :leaveType="leaveType" is-responsive/></span> policy since
            <span class="subheading font-weight-bold">{{effectiveDate | formatFullDay}}</span>
          </h3>
        </v-card-text>
        <v-card-text>
          <h3 class="subheading">
            Click
            <a
              class="subheading font-weight-bold"
              @click="removeEmployName"
            >here</a> to remove
            <span class="subheading font-weight-bold">{{employeeName}}</span> out of this
            <span class="subheading font-weight-bold"><LeaveTypeChip :leaveType="leaveType" is-responsive/></span> policy.
          </h3>
        </v-card-text>
        <v-card-text>
          <h3 class="subheading">
            To lower
            <span class="subheading font-weight-bold">{{employeeName}} <LeaveTypeChip :leaveType="leaveType" is-responsive/></span>
            balance, please make an absence request with
            <span
              class="subheading font-weight-bold"
            ><LeaveTypeChip :leaveType="leaveType" is-responsive/></span> as reason and then approve it.
          </h3>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            flat
            @click="$emit('closeDialog')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import LeaveTypeChip from '@/components/chips/LeaveTypeChip';

export default {
  components: {
    LeaveTypeChip
  },
  props: {
    isShowModalAdjust: Boolean,
    leaveType: String,
    effectiveDate: String,
    employeeName: String
  },
  methods: {
    removeEmployName() {
      this.$emit("closeDialog");
    }
  }
};
</script>
