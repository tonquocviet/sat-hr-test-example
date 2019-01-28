<template>
  <div class="px-3 py-3">
    <ProfileHeader></ProfileHeader>
    <ProfileListDate :years="years"></ProfileListDate>
    <v-layout column>
      <LeavePast :items="items"></LeavePast>
      <LeavePast :items="items"></LeavePast>
    </v-layout>
  </div>
</template>
<script>
  import ProfileHeader from "./ProfileHeader"
  import ProfileListDate from "./ProfileListDate"
  import LeavePast from "./LeavePast"

  export default {
    data () {
      return {
        years: [
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-01", "2019-01-03", "2019-01-05"]
          },
          {
            dates: ["2019-01-02", "2019-01-04", "2019-01-06"]
          },
          {
            dates: ["2019-01-15", "2019-01-14", "2019-01-13"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
          {
            dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
          },
        ],
        items: [
          {
            startDate: "25 Aug, Sun",
            endDate: "25 Aug, Sun",
            leaveType: "Nguyễn",
            approvedBy: "Văn",
            status: "approved",
            address: "Duy Sơn"
          },
          {
            startDate: "25 Aug, Sun",
            endDate: "25 Aug, Sun",
            leaveType: "Nguyễn",
            approvedBy: "Văn",
            status: "pending",
            address: "Duy Sơn"
          },
          {
            startDate: "25 Aug, Sun",
            endDate: "25 Aug, Sun",
            leaveType: "Nguyễn",
            approvedBy: "Văn",
            status: "canceled",
            address: "Duy Sơn"
          }
        ]
      }
    },
    components: {
      ProfileHeader,
      ProfileListDate,
      LeavePast
    }
  }
</script>