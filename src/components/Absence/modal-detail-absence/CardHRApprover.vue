<template>
  <v-card width="120" height="110">
    <v-flex justify-center align-center style="height: 60px; display: flex;" class="v-card-image">
      <div class="v-image-user">
        <UserAvatar
          :imageUrl="(item.user.avatar||{}).imageUrl"
          :name="item.user.firstName + ' ' + item.user.lastName"
          width="unset"
        />
      </div>
    </v-flex>
    <span class="body-2">{{item.user.firstName + " " + item.user.lastName}}</span>
    <v-btn
      class="mt-3"
      position
      absolute
      flat
      icon
      :color="item.status ? (item.status === 'request-info' ? 'warning' : null ) || (item.status === 'rejected' ? 'dark' : null ) || (item.status === 'approved' ? 'success' : null ) : null"
      style="margin-left: -15px"
      v-if="item.status"
    >
      <v-icon v-if="item.status === 'request-info'">warning</v-icon>
      <v-icon v-if="item.status === 'rejected'">cancel</v-icon>
      <v-icon v-if="item.status === 'approved'">check_circle</v-icon>
    </v-btn>
  </v-card>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    item: Object
  }
};
</script>
<style scoped>
.v-image-user {
  margin: auto;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  background: grey;
  justify-content: center;
  align-items: center;
}
</style>
