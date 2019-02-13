<template>
  <v-layout row wrap>
    <v-flex sm12 md3>
      <UserAvatar
        :imageUrl="employeeProfileImageUrl"
        :name="employeeProfileFullname"
        width="unset"
        justifyContent="flex-start"
        avatarSize="250px"
        class="user-img"
        backgroundColor="primary"
      />
    </v-flex>
    <v-flex sm12 md9>
      <h2>Regular Leave</h2>
      <v-layout row wrap>
        <LeaveTypeCard
          v-for="(item, index) in absenceBalance.slice(0, 4)"
          :leaveData="item"
          :key="index"
          type="AJUST"
          :employeeName="employeeProfileFullname"
        />
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";
import LeaveTypeCard from "@/components/cards/LeaveTypeCard";
export default {
  components: {
    UserAvatar,
    LeaveTypeCard
  },
  props: {
    absenceBalance: Array,
    employeeProfile: Object
  },
  computed: {
    employeeProfileImageUrl() {
      return this.employeeProfile && this.employeeProfile.avatar
        ? this.employeeProfile.avatar.imageUrl
        : null;
    },
    employeeProfileFullname() {
      return this.employeeProfile
        ? `${this.employeeProfile.firstName} ${this.employeeProfile.lastName}`
        : "";
    }
  }
};
</script>
<style scoped>
@media only screen and (max-width: 960px) {
  .user-img {
    justify-content: center !important;
  }
}
</style>
