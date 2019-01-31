<template>
  <MaterialPanel
    panel-title="Step 3"
    panel-sub-title="HR Approvers"
    :readonly="true"
    :isShowEdit="false"
  >
    <v-progress-linear v-if="isLoading" class="pb-4" :indeterminate="true"></v-progress-linear>
    <v-layout v-else class="px-3 py-2">
      <v-flex xs12 class="px-2 pb-3 pt-2">
        <v-layout row wrap>
          <div v-for="item in dataUsers" :key="item.id" class="ma-1 approvers-step3">
            <UserAvatar :imageUrl="item.avatar" :name="item.name" width="unset" class="user-img"/>
            <span aria-label="Active Now" class="status-approvar"></span>
          </div>
          <v-layout style="flex: unset" justify-center align-center class="ma-1 approvers-step3">
            <v-icon style="width:100%;height:100%" @click="isShow = true" color="white">add</v-icon>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
    <ModalAddUser :isShow="isShow" @closeDialog="isShow = false" @addUser="addUser"/>
  </MaterialPanel>
</template>

<script>
import UserAvatar from "../../avatars/Avatar";
import MaterialPanel from "../../panels/MaterialPanel";
import ModalAddUser from "./AddUserStep3";

export default {
  components: {
    UserAvatar,
    MaterialPanel,
    ModalAddUser
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      dataUsers: []
    };
  },
  methods: {
    getDataUsers() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        const srcs = {
          1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          3: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        };
        this.dataUsers = [
          { name: "Sandra Adams", avatar: srcs[1] },
          { name: "Ali Connors", avatar: srcs[2] },
          { name: "Trevor Hansen", avatar: srcs[3] }
        ];
      }, 2000);
    },
    addUser(user) {
      this.dataUsers = [...this.dataUsers, ...user];
    }
  },
  mounted() {
    this.getDataUsers();
  }
};
</script>

<style>
.approvers-step3 {
  position: relative;
  width: 40px;
  border-radius: 20px;
  background: grey;
}
.status-approvar {
  background: rgb(66, 183, 42);
  border-radius: 50%;
  height: 10px;
  position: absolute;
  width: 10px;
  bottom: 0;
  left: 34px;
}
</style>


