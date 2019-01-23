<template>
  <v-layout row justify-center>
    <v-dialog v-model="popup.showCreate" width="60%">
      <v-card>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs5>
              <p class="font-weight-bold">Employer name</p>
              <v-autocomplete
                v-model="name_employer"
                item-text="name"
                item-value="id"
                :items="items"
                label="Choose name employer"
                return-object
              ></v-autocomplete>
              <p class="font-weight-bold">Absence Type</p>
              <v-autocomplete
                v-model="type_absence"
                item-text="name"
                item-value="id"
                :items="items"
                label="Choose type absence"
                return-object
              ></v-autocomplete>
              <span class="font-weight-bold">Absence Category : </span> Unpaind Leave
              <p class="font-weight-bold mt-4">Absence Reason</p>
              <v-autocomplete
                v-model="reason_employer"
                item-text="name"
                item-value="id"
                label="Choose reason employer"
                :items="items"
                return-object
              ></v-autocomplete>
              <p class="font-weight-bold mt-4">Select days</p>
                <v-card>
                  <v-date-picker 
                    v-model="dates"
                    multiple
                    width="100%"
                  ></v-date-picker>
                </v-card>
            </v-flex>
            <v-flex xs5 offset-xs1>
              <v-layout row wrap>
                <v-flex xs6>
                  <div class="show-note text-md-center white--text">
                    <span>10 out of 22 used</span>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div class="show-note text-md-center white--text">
                    <span>10 out of 22 used</span>
                  </div>
                </v-flex>
              </v-layout>
              <div class="mt-5">
                <span>You've selected</span>
                <span class="font-weight-bold"> May 24 - 30 .</span>
                <span>That's a total of</span>
                <span class="font-weight-bold">$ working days</span>
                <span> spanning over</span>
                <span class="font-weight-bold"> 7 days</span>
              </div>
              <v-layout row wrap class="mt-5">
                <v-flex xs2 class="pt-3 mr-2">
                  <v-btn color="error" fab>
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs9>
                  <v-card class="blockquote">
                    <span class="body-1">On May 28 there's a shortage of IOS developers </span>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="mt-5">
                <v-flex xs2 class="pt-3 mr-2">
                  <v-btn color="grey" fab dark>
                    <v-icon>priority_high</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs9>
                  <v-card class="blockquote">
                    <span class="body-1">On May 28 there's a shortage of IOS developers</span>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="mt-5">
                <v-flex xs2 class="pt-3 mr-2">
                  <v-btn color="success" fab>
                    <v-icon>done</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs9>
                  <v-card class="blockquote">
                    <span class="body-1">On May 28 there's a shortage of IOS developers</span>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        <div class="ml-4">
          <span class="font-weight-bold text-uppercase">reason</span>
          <v-textarea class="mr-3 mt-3" solo value="Optional" required></v-textarea>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="popup.showCreate = false">Create</v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="popup.showCreate = false"
          >Create & Approve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    popup: Object,
    items: Array
  },
  data() {
    return {
      dates: [],
      name_employer: null,
      type_absence: null,
      reason_employer: null,
    };
  },
};
</script>
<style scoped>
.text-day-out {
  margin-top: 108px !important;
}
.show-note {
  height: 50px;
  background-color: grey;
  line-height: 50px;
}
</style>