<template>
  <v-flex xs12 class="mt-2" >
    <v-layout row style="height: 40px;">
      <v-layout row>
        <v-flex xs0>
          <div class="v-image-user">
            <user-avatar
              :imageUrl="(comment.user.avatar||{}).imageUrl"
              :name="comment.user.lastName + ' ' + comment.user.firstName "
              width="unset"
            />
          </div>
        </v-flex>
        <v-flex xs12>
          <v-list-tile style="position: absolute; left: 35px">
            <span class="body-1">
              <a>
                <u>{{ comment.user.lastName }} {{ comment.user.firstName }}</u>
              </a> replied on
              <b>{{ dateFormatComment }}</b>
            </span>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-flex xs1>
        <v-menu bottom right>
          <v-btn flat icon slot="activator">
            <v-icon size="20">settings</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, i) in itemsComment" :key="i" style="cursor: pointer;">
              <v-icon size="20" color="dark">{{item.icon}}</v-icon>
              <v-list-tile-title class="body-1 dark--text ml-2">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>

    <v-layout xs12>
      <v-flex class="text-xs-left ml-2 mt-2">
        <pre>{{comment.comment}}</pre>
      </v-flex>
    </v-layout>
    <v-flex xs12>
      <AttachmentComment :items="comment.attachments"></AttachmentComment>
    </v-flex>
  </v-flex>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";
import AttachmentComment from "./AttachmentComment"
import moment from "moment";
export default {
  components: {
    UserAvatar,
    AttachmentComment
  },
  props: {
    itemsComment: Array,
    comment: Object,
    absenceDetail: Object
  },
  computed: {
    dateFormatComment(){
      return moment(this.comment.submittedDate).format("MMM DD, YYYY") + " at " + moment(this.comment.submittedDate).format("h:mm A");
    }
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