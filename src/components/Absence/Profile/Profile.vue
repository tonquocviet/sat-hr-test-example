<template>
  <div class="px-3 py-3">
    <ProfileHeader></ProfileHeader>
    <ProfileListDate :dates.sync="daysOff"></ProfileListDate>
    <v-layout column>
      <ProfileFooter :items="items"></ProfileFooter>
    </v-layout>
  </div>
</template>
<script>
  import ProfileHeader from "./ProfileHeader"
  import ProfileListDate from "./ProfileListDate"
  import ProfileFooter from "./ProfileFooter"

  export default {
    data () {
      return {
        daysOff: [
          "2019-01-25",
          "2019-01-26",
          "2019-02-02",
          "2019-02-05",
          "2019-02-15",
          "2019-03-15",
          "2019-04-05",
          "2019-05-12",
          "2019-06-15",
          "2019-07-13",
          "2019-08-23",
          "2019-09-21",
          "2019-11-10"
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
      ProfileFooter
    }
  }
</script>