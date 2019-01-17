<template>
  <v-form>
    <v-container>
      <v-layout align-center justify-center>
        <v-btn
          :href="detailLink + '/' + nodeDataDetail.id"
          target="blank"
          small
          color="default"
        >Full</v-btn>
        <v-btn @click="editForm" small color="primary">Edit</v-btn>
      </v-layout>
      <v-layout>
        <v-flex class="v-flex-img" xs12>
          <div class="v-image-user">
            <user-avatar
              :imageUrl="nodeDataDetail.avatar.imageUrl"
              :name="nodeDataDetail.avatar.name"
              class="user-img"
            />
          </div>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-toolbar-title style="color: #6D42C7;">{{nodeDataDetail.avatar.name}}</v-toolbar-title>
      </v-layout>
      <v-layout justify-center>
        <span>Position: {{nodeDataDetail.position.name}}</span>
      </v-layout>
      <v-layout justify-center>
        <h4>Department: {{nodeDataDetail.department.name}}</h4>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import UserAvatar from "./UserAvatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    nodeDataDetail: Object,
    editForm: Function,
    detailLink: String
  }
};
</script>

<style scoped >
.v-flex-img {
  justify-content: center;
  display: flex;
}
.v-image-user {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  display: flex;
  background: grey;
  justify-content: center;
  align-items: center;
}
.user-img {
  justify-content: center;
}
</style>
