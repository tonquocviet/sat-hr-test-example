<template>
  <v-layout row justify-center>
    <v-dialog v-model="popup.showCreate" width="60%">
      <v-card>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs5>
              <v-select
                v-model="name_employer"
                :items="items"
                item-text="name"
                item-value="id"
                label="Choose name employer"
                persistent-hint
                return-object
                single-line
              ></v-select>
              <p class="font-weight-bold">Absence Type</p>
              <v-select
                v-model="type_absence"
                :items="items"
                item-text="name"
                item-value="id"
                label="Choose type absence"
                persistent-hint
                return-object
                single-line
              ></v-select>

              <v-text class="font-weight-bold">Absence Category : </v-text> Unpaind Leave
              <p class="font-weight-bold mt-4">Absence Reason</p>
              <v-select
                v-model="reason_employer"
                :items="items"
                item-text="name"
                item-value="id"
                label="Choose reason absence"
                persistent-hint
                return-object
                single-line
              ></v-select>

              <p class="font-weight-bold">Select days</p>
              <v-date-picker ref="picker" v-model="date" :picker-date.sync="pickerDate" full-width></v-date-picker>
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
                    <v-text class="body-1">On May 28 there's a shortage of IOS developers </v-text>
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
                    <v-text class="body-1">On May 28 there's a shortage of IOS developers</v-text>
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
                    <v-text class="body-1">On May 28 there's a shortage of IOS developers</v-text>
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
    items: Object
  },
  data() {
    return {
      dialog: true,
      date: new Date().toISOString().substr(0, 10),
      pickerDate: null,
      name_employer: null,
      type_absence: null,
      reason_employer: null,

    };
  },
  watch: {
    pickerDate(val) {
      this.notes = [
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)]
      ].filter((value, index, self) => self.indexOf(value) === index);
    }
  }
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