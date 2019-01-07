<template>
  <v-list-tile class="grow avatars-list">
    <user-avatar
      v-for="(member, index) in members"
      :key="member.id"
      :imageUrl="member.imageUrl"
      :name="member.name"
      :backgroundColor="colorsListForAvatars[index]"
      :index="members.lenght-index"
    />
  </v-list-tile>
</template>

<script>
import UserAvatar from "./Avatar";
import { colorsListForAvatars } from "../../config";
export default {
  data: () => ({
    colorsListForAvatars
  }),
  components: {
    UserAvatar
  },
  props: {
    members: Array
  }
};
</script>

<style>
.avatars-list .img-avatar:first {
  margin-left: 0px;
}
</style>
