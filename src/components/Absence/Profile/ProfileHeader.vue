<template>
  <v-layout row wrap>
    <v-flex sm12 md3>
      <UserAvatar
        imageUrl="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
        name="Vuong Phan"
        width="unset"
        justifyContent="flex-start"
        avatarSize="250px"
        class="user-img"
      />
    </v-flex>
    <v-flex sm12 md9>
      <h2>Regular Leave</h2>
      <v-layout row wrap>
        <LeaveTypeCard v-for="(item, index) in absenceBalance.slice(0, 4)" :leaveData="item" :key="index" type="AJUST" />
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";
import LeaveTypeCard from '@/components/cards/LeaveTypeCard';
export default {
  components: {
    UserAvatar,
    LeaveTypeCard
  },
  props: {
    absenceBalance: Array
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
