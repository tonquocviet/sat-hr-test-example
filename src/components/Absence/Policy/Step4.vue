<template>
  <MaterialPanel
    panel-title="Step 4"
    panel-sub-title="Automatic Approval Setup"
    :readonly="readonly"
    :isShowEdit="true"
    @save="save"
    @cancel="cancel"
    @edit="edit"
  >
    <v-progress-linear v-if="isLoading" class="pb-4" :indeterminate="true"></v-progress-linear>
    <v-layout v-else row wrap class="px-3 py-2">
      <v-flex xs12 sm6 v-for="item in object" :key="item.id" class="px-2 pb-3 pt-2">
        <h2>{{item.name}}</h2>
        <div v-for="item in item.data" :key="item.id">
          <v-checkbox
            :readonly="readonly"
            class="pa-0 ma-0 mt-1"
            v-model="selected"
            :label="item.text"
            :value="item.text"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <v-flex xs12 class="px-2">
          <v-text-field v-model="dataInput.balances" label="FMLA Balances" :readonly="readonly"></v-text-field>
        </v-flex>
        <v-flex xs12 class="px-2">
          <v-text-field v-model="dataInput.available" label="Leave Available" :readonly="readonly"></v-text-field>
        </v-flex>
        <v-flex xs12 class="px-2">
          <v-text-field v-model="dataInput.leaveTaken" label="Leave Taken" :readonly="readonly"></v-text-field>
        </v-flex>
      </v-flex>
      <v-flex xs12 sm6 v-for="item in object2" :key="item.id" class="px-2 pb-3 pt-2">
        <h2>{{item.name}}</h2>
        <div v-for="item in item.data" :key="item.id">
          <v-layout row wrap>
            <v-flex xs11>
              <v-checkbox
              :readonly="readonly"
              class="pa-0 ma-0 mt-1"
              v-model="selected2"
              :label="item.text"
              :value="item.text"
            ></v-checkbox>
            </v-flex>
            <v-flex xs1>
              <v-text-field :readonly="readonly" :label="item.date" v-model="item.number"></v-text-field>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </MaterialPanel>
</template>

<script>
import MaterialPanel from "../../panels/MaterialPanel";

export default {
  components: {
    MaterialPanel
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      readonly: true,
      selected: [],
      selected2: [],
      object: [],
      prevSelected: [],
      dataInput: {
        balances: "",
        available: "",
        leaveTaken: ""
      },
      prevDataInput: {},
      object2: [],
      prevSelected: [],
      prevObject2: []
    };
  },
  methods: {
    getDataUsers() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.object = [
          {
            id: 1,
            name: "Eligibility Details",
            data: [
              {
                id:100,
                text: "Cordially convinced did incommode existence put",
                check: true
              },
              {
                id:101,
                text:
                  "On at tolerably depending do perceived On at tolerably depending do perceived On at tolerably depending do perceived",
                check: false
              },
              {
                id:102,
                text: "Did son unreserved themselves indulgence its",
                check: true
              }
            ]
          },
          {
            id:2,
            name: "Federal Eligibility",
            data: [
              {
                id:103,
                text: "Months had too ham cousin remove",
                check: false
              },
              { id: 104, text: "Civil songs so large shade in cause", check: true },
              {
                id: 105,
                text: "Delivered is to ye belonging enjoyment preferred",
                check: false
              }
            ]
          },
          {
            id:3,
            name: "State Eligibility",
            data: [
              {
                id:106,
                text: "Did friendly eat breeding building few nor",
                check: false
              },
              { id: 107, text: "Period saw his houses square and misery", check: true },
              { id: 108, text: "It maids decay as there he", check: false }
            ]
          }
        ];
        this.object.map(e =>
          e.data.map(e1 => {
            if (e1.check) {
              return (this.selected = [...this.selected, e1.text]);
            }
            return e;
          })
        );
        this.dataInput = {
          balances: "Period saw",
          available: "Did friendly",
          leaveTaken: "and misery"
        };
        this.object2 = [
          {
            id: 200,
            name: "Department Eligibility",
            data: [
              {
                id:1000,
                text:
                  "Automatically approve requests if the Department where Employee beloos to have lessthan absence approvals",
                number: 1,
                date: "month"
              }
            ]
          },
          {
            id: 201,
            name: "Employee Eligibility",
            data: [
              {
                id:1001,
                text:
                  "Automatically approve requests if employee has not taken absence in weeks",
                number: 2,
                date: "weeks"
              },
              {
                id:1002,
                text:
                  "Automatically approve requests if employee has more than absence balance days",
                number: 3,
                date: "days"
              }
            ]
          }
        ];
      }, 2000);
    },
    edit() {
      this.prevSelected = JSON.parse(JSON.stringify(this.selected));
      this.prevDataInput = JSON.parse(JSON.stringify(this.dataInput));
      this.prevSelected2 = JSON.parse(JSON.stringify(this.selected2));
      this.prevObject2 = JSON.parse(JSON.stringify(this.object2));
      this.readonly = false;
    },
    cancel() {
      this.selected = JSON.parse(JSON.stringify(this.prevSelected));
      this.dataInput = JSON.parse(JSON.stringify(this.prevDataInput));
      this.selected2 = JSON.parse(JSON.stringify(this.prevSelected2));
      this.object2 = JSON.parse(JSON.stringify(this.prevObject2));
      this.readonly = true;
    },
    save() {
      this.readonly = true;
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


