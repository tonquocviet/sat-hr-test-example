<template>
  <v-flex xs12 class="mt-2">
    <v-layout row style="height: 40px;">
      <v-layout row>
        <v-flex xs0>
          <div class="v-image-user">
            <user-avatar
              :imageUrl="(absenceDetail.avatar||{}).imageUrl"
              :name="absenceDetail.employeeName"
              width="unset"
            />
          </div>
        </v-flex>
        <v-flex xs12>
          <v-list-tile style="position: absolute; left: 35px">
            <span class="body-1">
              <a>
                <u>John Mayers</u>
              </a> replied on
              <b>May 27th, 2017 at 7:42am</b>
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

    <v-flex xs12>
      <div class="text-xs-left ml-2 mt-2">
        <span class="caption">{{absenceDetail.leaveDescription}}</span>
      </div>
    </v-flex>
    <!-- <v-flex xs12>
      <v-flex right xs4>
        <v-btn flat small color="primary">
          <v-icon>attach_file</v-icon>Bug Report.xml
        </v-btn>
      </v-flex>
      <v-flex right xs4>
        <v-btn flat small color="primary">
          <v-icon>image</v-icon>SytemInformation.txt
        </v-btn>
      </v-flex>
    </v-flex> -->
  </v-flex>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";
export default {
  components: {
    UserAvatar
  },
  props: {
    itemsComment: Array,
    absenceDetail: Object
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