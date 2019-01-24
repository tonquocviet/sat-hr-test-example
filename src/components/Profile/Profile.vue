<template>
  <div class="px-3 py-3">
    <ProfileHeader></ProfileHeader>
    <ProfileListDate :years="years"></ProfileListDate>
    <v-layout column class="date-absence-footer">
      <ProfileUpcoming :items="items"></ProfileUpcoming>
      <ProfilePast :items="items"></ProfilePast>
    </v-layout>
  </div>
</template>
<script>
  import ProfileHeader from "./ProfileHeader"
  import ProfileListDate from "./ProfileListDate"
  import ProfileUpcoming from "./ProfileUpcoming"
  import ProfilePast from "./ProfilePast"

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
            last_name: "Phong JR",
            day: "25 Aug, Sun",
            first_name: "Nguyễn",
            status: "success",
            address: "Duy Sơn"
          },
          {
            last_name: "Phong JR",
            day: "25 Aug, Sun",
            first_name: "Nguyễn",
            status: "pending",
            address: "Duy Sơn"
          },
          {
            last_name: "Phong JR",
            day: "25 Aug, Sun",
            first_name: "Nguyễn",
            status: "error",
            address: "Duy Sơn"
          }
        ]
      }
    },
    components: {
      ProfileHeader,
      ProfileListDate,
      ProfilePast,
      ProfileUpcoming
    }
  }
</script>