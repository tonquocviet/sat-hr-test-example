<template>
  <v-layout row justify-center>
    <v-dialog v-model="popup.showCreate" width="60%">
      <v-card>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs5>
              <v-autocomplete
                v-model="employeeName"
                item-text="name"
                @change="changeEmployeeName"
                item-value="id"
                :items="dataEmployees"
                label="Choose name employer"
                return-object
                :disabled="employeeView"
              ></v-autocomplete>
              <v-autocomplete
                v-model="absenceType"
                item-text="name"
                @change="changeAbsenceType"
                item-value="id"
                :items="dataAvailablePolicies"
                label="Choose type absence"
                return-object
              ></v-autocomplete>
              <v-autocomplete
                v-model="employeeReason"
                item-text="name"
                item-value="id"
                label="Choose reason employer"
                :items="dataPolicyReasons"
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
                <v-layout row wrap v-for="(day, index) in dates" :key="index">
                  <v-flex class="mt-3">
                    <span>You have selected&nbsp;</span>
                    <span v-if="absenceInfo[day].fullDay">{{ day | formatFullDay }} full day</span>
                    <span v-else>{{ formatHour(day) }}</span>
                  </v-flex>
                  <v-spacer/>
                  <v-flex class="text-xs-right">
                    <v-icon
                      @click="removeSelectDay(index, day)"
                      class="mt-3 remove-select-day"
                      color="black"
                    >remove_circle</v-icon>
                  </v-flex>
                </v-layout>
              </div>
              <v-flex class="mt-4">
                <v-layout column style="height: 200px">
                  <PolicyAlert :dataAlerts="dataApproved"/>
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
export default {
  components: {
    PolicyAlert
  },
  props: {
    popup: Object,
    leaveTypes: Array,
    dataEmployees: Array,
    employeeView: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    getAbsencePolicyReasons() {
      const url = this.apiAbsence.absencePolicyReasons(this.policyId);
      this.$http.get(url).then(res => {
        this.dataPolicyReasons = res.data;
      });
    },
    removeSelectDay(index, day) {
      this.dates.splice(index, 1);

      delete this.absenceInfo[day];
    },
    formatHour(date) {
      return `${date} from ${this.absenceInfo[date].timeFrom} to ${
        this.absenceInfo[date].timeTo
      }`;
    },
    clearInfo() {
      this.fullDay = true;
      this.timeFrom = this.timeTo = "";
    },
    changeEmployeeName(e) {
      this.employeeId = e.id;
      this.dataApproved = null;
      this.getAvailablePolicies();
    },
    getAvailablePolicies() {
      const url = this.apiAbsence.availablePolicies(this.employeeId);
      this.$http.get(url).then(res => {
        this.dataAvailablePolicies = res.data;
      });
    },
    changeAbsenceType(e) {
      this.dataApproved = e.alerts;
      this.policyId = e.id;
      this.getAbsencePolicyReasons();
    }
  },
  watch: {
    dates(val) {
      if (val.length > Object.keys(this.absenceInfo).length) {
        this.absenceInfo[val[val.length - 1]] = {
          fullDay: this.fullDay,
          timeFrom: this.timeFrom,
          timeTo: this.timeTo
        };
        this.clearInfo();
      } else {
        Object.keys(this.absenceInfo).forEach(v => {
          if (!val.includes(v)) delete this.absenceInfo[v];
        });
        if (val.length) {
          const info = this.absenceInfo[val[val.length - 1]];
          this.fullDay = info.fullDay;
          this.timeFrom = info.timeFrom;
          this.timeTo = info.timeTo;
        } else {
          this.clearInfo();
        }
      }
    },
    timeFrom(val) {
      if (this.dates.length) {
        this.absenceInfo[this.dates[this.dates.length - 1]].timeFrom = val;
      }
    },
    timeTo(val) {
      if (this.dates.length) {
        this.absenceInfo[this.dates[this.dates.length - 1]].timeTo = val;
      }
    },
    fullDay(val) {
      if (this.dates.length) {
        this.absenceInfo[this.dates[this.dates.length - 1]].fullDay = val;
      }
    }
  },
  computed: {
    hours() {
      if (this.timeFrom && this.timeTo) {
        const [h1, m1] = this.timeFrom.split(":").map(t => +t);
        const [h2, m2] = this.timeTo.split(":").map(t => +t);
        return ((h2 * 60 + m2 - (h1 * 60 + m1)) / 60).toFixed(1);
      }
      return 0;
    }
  },
  data() {
    return {
      dataAbsenceReasons: [],
      dates: [],
      dataAvailablePolicies: [],
      dataPolicyReasons: [],
      dataApproved: [],
      employeeName: null,
      absenceType: null,
      employeeReason: null,
      absenceInfo: {},
      fullDay: true,
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
.remove-select-day {
  cursor: pointer;
}
</style>
