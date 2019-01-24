<template>
  <v-flex>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs0>
          <div class="v-image-user">
            <user-avatar
              :imageUrl="(avatar.avatar||{}).imageUrl"
              :name="avatar.employeeName"
              width="unset"
            />
          </div>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            type="text"
            solo
            style="height: 50px"
            name="input-7-4"
            label="Comment"
            v-model="comment"
            @keypress="onComment"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
      <v-flex xs3 right style="height: 20px" class="mt-5">
        <v-checkbox color="primary" label="Mark Public" v-model="checkbox"></v-checkbox>
      </v-flex>
    </v-flex>
  </v-flex>
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
<style>
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
