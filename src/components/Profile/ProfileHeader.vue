<template>
  <v-layout row wrap class="date-absence-header">
    <v-flex sm12 md3>
      <UserAvatar
        imageUrl="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
        name="Vuong Phan"
        width="unset"
        justifyContent="flex-start"
        avatarSize="250px"
        class="user-img"
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
              <v-btn flat color="blue">
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
              <v-btn flat color="green">
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
              <v-btn flat color="red">
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
              <v-btn flat color="purple">
                <span>ADJUST</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import UserAvatar from "../avatars/Avatar";
  export default {
    components: {
      UserAvatar
    }
  };
</script>
<style>
  @media only screen and (max-width: 960px) {
    .user-img {
      justify-content: center !important;
    }
  }
</style>


