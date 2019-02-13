<template>
  <v-layout row wrap>
    <v-flex sm12 md3>
      <UserAvatar
        :imageUrl="employeeProfileImageUrl"
        :name="employeeProfileFullname"
        width="unset"
        justifyContent="flex-start"
        avatarSize="250px"
        class="user-img"
        backgroundColor="primary"
      />
    </v-flex>
    <v-flex sm12 md9>
      <h2>Deavax Leave</h2>
      <v-layout row wrap>
        <v-flex md3 class="px-1 py-1">
          <v-card style="border-top:7px solid blue;border-radius:6px">
            <v-card-title>
              <div style="width:100%">
                <h3>A Leave Of Absence</h3>
                <span class="font-weight-bold display-1 blue--text">7/7</span>
                <br>
                <b>Absence</b>
                <br>
                <v-layout>
                  <v-flex xs6 class="grey--text">Number</v-flex>
                  <v-flex xs6 class="grey--text text-xs-right">2</v-flex>
                </v-layout>
              </div>
            </v-card-title>
            <v-card-actions class="px-0">
              <v-btn flat color="blue" @click="isShowModalAdjust = true">
                <span>ADJUST</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex md3 class="px-1 py-1">
          <v-card style="border-top:7px solid green;border-radius:6px">
            <v-card-title>
              <div style="width:100%">
                <h3>A Leave Of Absence</h3>
                <span class="font-weight-bold display-1 green--text">16/16</span>
                <br>
                <b>Absence</b>
                <br>
                <v-layout>
                  <v-flex xs6 class="grey--text">Number</v-flex>
                  <v-flex xs6 class="grey--text text-xs-right">2</v-flex>
                </v-layout>
              </div>
            </v-card-title>
            <v-card-actions class="px-0">
              <v-btn flat color="green" @click="isShowModalAdjust = true">
                <span>ADJUST</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex md3 class="px-1 py-1">
          <v-card style="border-top:7px solid red;border-radius:6px">
            <v-card-title>
              <div style="width:100%">
                <h3>A Leave Of Absence</h3>
                <span class="font-weight-bold display-1 red--text">7/7</span>
                <br>
                <b>Absence</b>
                <br>
                <v-layout>
                  <v-flex xs6 class="grey--text">Number</v-flex>
                  <v-flex xs6 class="grey--text text-xs-right">2</v-flex>
                </v-layout>
              </div>
            </v-card-title>
            <v-card-actions class="px-0">
              <v-btn flat color="red" @click="isShowModalAdjust = true">
                <span>ADJUST</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex md3 class="px-1 py-1">
          <v-card style="border-top:7px solid purple;border-radius:6px">
            <v-card-title>
              <div style="width:100%">
                <h3>A Leave Of Absence</h3>
                <span class="grey--text">Absence</span>
                <br>
                <span class="grey--text">Absence</span>
                <br>
                <span class="grey--text">Absence</span>
                <br>
                <span class="grey--text">Absence</span>
              </div>
            </v-card-title>
            <v-card-actions class="px-0">
              <v-btn flat color="purple" @click="isShowModalAdjust = true">
                <span>ADJUST</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <ModalAdjust :isShowModalAdjust="isShowModalAdjust" @closeDialog="isShowModalAdjust = false"/>
  </v-layout>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";
import ModalAdjust from "./ModalAdjust";
export default {
  components: {
    UserAvatar,
    ModalAdjust
  },
  props: {
    employeeProfile: Object
  },
  computed: {
    employeeProfileImageUrl() {
      return this.employeeProfile && this.employeeProfile.avatar
        ? this.employeeProfile.avatar.imageUrl
        : null;
    },
    employeeProfileFullname() {
      return this.employeeProfile
        ? `${this.employeeProfile.firstName} ${this.employeeProfile.lastName}`
        : "";
    }
  },
  data() {
    return {
      isShowModalAdjust: false
    };
  }
};
</script>
<style scoped>
@media only screen and (max-width: 960px) {
  .user-img {
    justify-content: center !important;
  }
}
</style>
