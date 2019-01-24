<template>
  <v-card width="120" height="110">
    <v-flex justify-center align-center style="height: 60px; display: flex;" class="v-card-image">
      <div class="v-image-user">
        <user-avatar
          :imageUrl="(item.avatar||{}).imageUrl"
          :name="item.employeeName"
          width="unset"
        />
      </div>
    </v-flex>
    <span class="body-2">{{item.employeeName}}</span>
    <v-btn
      class="mt-3"
      position
      absolute
      flat
      icon
      :color="item.type ? (item.type === 1 ? `warning` : null ) || (item.type === 2 ? `dark` : null ) || (item.type === 3 ? `success` : null ) : null"
      style="margin-left: -15px"
      v-if="item.type"
    >
      <v-icon v-if="item.type === 1">warning</v-icon>
      <v-icon v-if="item.type === 2">cancel</v-icon>
      <v-icon v-if="item.type === 3">check_circle</v-icon>
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
<style>
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
