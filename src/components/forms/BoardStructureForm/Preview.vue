<template>
  <v-form>
    <v-container>
      <v-layout align-center justify-center>
        <div class="btn-in-new">
          <v-btn
            absolute
            light
            small
            fab
            top
            right
            :href="detailLink + '/' + nodeDataDetail.id"
            target="blank"
          >
            <v-icon>open_in_new</v-icon>
          </v-btn>
        </div>
        <div class="btn-edit">
          <v-btn
            absolute
            small
            fab
            top
            right
            color="success"
            @click="editForm"
          >
            <v-icon>create</v-icon>
          </v-btn>
        </div>
      </v-layout>
      <v-layout>
        <v-flex class="v-flex-img" xs12>
          <div class="v-image-user">
            <user-avatar
              :imageUrl="nodeDataDetail.avatar.imageUrl"
              :name="nodeDataDetail.avatar.name"
              class="user-img"
              :imgActive="imgActive"
            />
          </div>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-toolbar-title class="primary--text">{{nodeDataDetail.avatar.name}}</v-toolbar-title>
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
import UserAvatar from "../../avatars/Avatar";
export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      imgActive: true
    };
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

.btn-in-new a{
  top: 8px !important
}

.btn-edit button{
  top: 70px !important
}

</style>
