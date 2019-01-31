<template>
  <v-layout column wrap>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs1>
          <div class="v-image-user">
            <UserAvatar
              :imageUrl="(avatar.avatar||{}).imageUrl"
              :name="avatar.employeeName"
              width="unset"
            />
          </div>
        </v-flex>
        <v-flex xs11 style="z-index: 1;">
          <v-textarea
            type="text"
            solo
            name="input-7-4"
            label="Comment"
            v-model="comment"
            @keypress="onComment"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout row wrap>
        <v-checkbox class="mt-0" color="primary" label="Mark Public" v-model="checkbox"></v-checkbox>
        <v-btn flat icon>
          <v-icon>attach_file</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";
export default {
  components: {
    UserAvatar
  },
  methods: {
    onComment(event) {
      if (event.key === "Enter") {
        this.$emit("onComment", this.comment);
      }
    }
  },
  data() {
    return {
      comment: "",
      checkbox: false
    };
  },
  props: {
    avatar: Object
  }
};
</script>
<style scoped>
.v-image-user {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  background: grey;
  justify-content: center;
  align-items: center;
}
</style>
