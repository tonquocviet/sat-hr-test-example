<template>
  <v-layout row justify-center>
    <v-dialog v-model="popup.showCreate" width="60%">
      <v-card>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs5>
              <v-autocomplete
                v-model="name_employer"
                item-text="name"
                item-value="id"
                :items="items"
                label="Choose name employer"
                return-object
              ></v-autocomplete>
              <v-autocomplete
                v-model="type_absence"
                item-text="name"
                item-value="id"
                :items="leaveTypes"
                label="Choose type absence"
                return-object
              ></v-autocomplete>
              <v-autocomplete
                v-model="reason_employer"
                item-text="name"
                item-value="id"
                label="Choose reason employer"
                :items="dataAbsenceReasons"
                return-object
              ></v-autocomplete>
              <p class="font-weight-bold mt-4">Select days</p>
              <v-card>
                <v-date-picker v-model="dates" multiple width="100%"></v-date-picker>
              </v-card>
            </v-flex>
            <v-flex xs5 offset-xs1>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-flex class="text-md-center">
                    <v-chip color="teal darken-1">
                      <span class="white--text">Current Balance</span>
                    </v-chip>
                  </v-flex>
                  <div class="show-note text-md-center white--text">
                    <span>10 out of 22 used</span>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <v-flex class="text-md-center">
                    <v-chip color="red darken-2">
                      <span class="white--text">New Balance</span>
                    </v-chip>
                  </v-flex>
                  <div class="show-note text-md-center white--text">
                    <span>10 out of 22 used</span>
                  </div>
                </v-flex>
              </v-layout>
              <div class="mt-4">
                <v-layout row wrap>
                  <v-flex class="mt-3">
                    <span>On May 28 there's a shortage of IOS developers</span>
                  </v-flex>
                  <v-flex xs2 class="mr-2">
                    <v-btn fab dark small color="black">
                      <v-icon class="mb-4" large>minimize</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex class="mt-3">
                    <span>On May 28 there's a shortage of IOS developers</span>
                  </v-flex>
                  <v-flex xs2 class="mr-2">
                    <v-btn fab dark small color="black">
                      <v-icon class="mb-4" large>minimize</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex class="mt-3">
                    <span>On May 28 there's a shortage of IOS developers</span>
                  </v-flex>
                  <v-flex xs2 class="mr-2">
                    <v-btn fab dark small color="black">
                      <v-icon class="mb-4" large>minimize</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </div>
              <v-flex>
                <v-layout column style="height: 200px">
                  <PolicyAlert :dataApproved="dataApproved"/>
                </v-layout>
              </v-flex>
              <v-checkbox color="black" label="Full Day" v-model="fullDay"></v-checkbox>
              <v-flex sm6 md3>
                <span>Or</span>
                <v-text-field :value="hours" label="hours" readonly></v-text-field>
              </v-flex>
              <v-layout>
                <v-flex>
                  <v-flex>
                    <span>From</span>
                  </v-flex>
                  <v-time-picker
                    format="24hr"
                    :width="200"
                    v-model="timeFrom"
                    :max="timeTo"
                    color="blue darken-2"
                    :readonly="fullDay"
                  ></v-time-picker>
                </v-flex>
                <v-flex>
                  <v-flex>
                    <span>To</span>
                  </v-flex>
                  <v-time-picker
                    format="24hr"
                    :width="200"
                    v-model="timeTo"
                    :min="timeFrom"
                    color="blue darken-2"
                    :readonly="fullDay"
                  ></v-time-picker>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        <div class="ml-4">
          <span class="font-weight-bold text-uppercase">reason</span>
          <v-textarea class="mr-3 mt-3" solo placeholder="Optional" required></v-textarea>
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
import PolicyAlert from "../alerts/PolicyAlert";
import { dataApproved } from "./data";
export default {
  components: {
    PolicyAlert
  },
  props: {
    popup: Object,
    getAbsenceReasonsApiUrl: String,
    leaveTypes: Array,
    items: Array,
    dataApproved: {
      type: Array,
      default: () => dataApproved
    }
  },
  mounted() {
    this.getAbsenceReasonsRequest().then(data => {
      this.dataAbsenceReasons = data.items;
    });
  },
  methods: {
    getAbsenceReasonsRequest() {
      return new Promise(resolve => {
        this.$http.get(`${this.getAbsenceReasonsApiUrl}`).then(res => {
          resolve({
            items: res.data
          });
        });
      });
    }
  },
  computed: {
    hours() {
      if (this.timeFrom && this.timeTo) {
        const [h1, m1] = this.timeFrom.split(":").map(t => +t);
        const [h2, m2] = this.timeTo.split(":").map(t => +t);
        return (h2 - h1 + (m2 - m1) / 60).toFixed(1);
      }
      return 0;
    }
  },
  data() {
    return {
      dataAbsenceReasons: [],
      dates: [],
      name_employer: null,
      type_absence: null,
      reason_employer: null,
      fullDay: false,
      timeFrom: "",
      timeTo: ""
    };
  }
};
</script>

<style scoped>
.show-note {
  height: 50px;
  background-color: grey;
  line-height: 50px;
}
.ic-status {
  z-index: 1;
}
</style>
