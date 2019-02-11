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
      <v-flex xs12 sm12 lg6 v-for="item in data.items" :key="item.id" class="px-2 pb-3 pt-2">
        <h3 class="pb-3">{{item.name}}</h3>
        <div v-for="item in item.data" :key="item.id">
          <v-checkbox
            :readonly="readonly"
            class="pa-0 ma-0 mt-1 step4-fontSize-checkbox"
            v-model="selected"
            :label="item.text"
            :value="item.text"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex xs12 sm12 lg6>
        <v-flex xs12 class="px-2">
          <v-text-field
            class="step4-fontSize-label"
            v-model="dataInput.balances"
            label="FMLA Balances"
            :readonly="readonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class="px-2">
          <v-text-field
            class="step4-fontSize-label"
            v-model="dataInput.available"
            label="Leave Available"
            :readonly="readonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class="px-2">
          <v-text-field
            class="step4-fontSize-label"
            v-model="dataInput.leaveTaken"
            label="Leave Taken"
            :readonly="readonly"
          ></v-text-field>
        </v-flex>
      </v-flex>
      <v-flex xs12 lg6 v-for="item in data.items3" :key="item.id" class="px-2 pb-3 pt-2">
        <h3 class="pb-3">{{item.name}}</h3>
        <div v-for="item in item.data" :key="item.id">
          <v-layout row wrap>
            <v-flex xs9 sm11>
              <v-checkbox
                :readonly="readonly"
                class="pa-0 ma-0 mt-1"
                v-model="selected2"
                :label="item.text"
                :value="item.text"
              ></v-checkbox>
            </v-flex>
            <v-flex xs3 sm1 class="px-1">
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
import data from "./dataStep4";

export default {
  components: {
    MaterialPanel
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      readonly: true,
      data: {},
      dataInput: {
        balances: "",
        available: "",
        leaveTaken: ""
      },
      selected: [],
      selected2: [],
      prevData: {},
      prevSelected: [],
      prevSelected2: [],
      prevDataInput: {}
    };
  },
  methods: {
    getDataUsers() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.data = data;
        this.dataInput = this.data.items2;
        this.data.items.map(e =>
          e.data.map(e1 => {
            if (e1.check) {
              return (this.selected = [...this.selected, e1.text]);
            }
            return e1;
          })
        );
      }, 2000);
    },
    edit() {
      this.prevData = JSON.parse(JSON.stringify(this.data));
      this.prevDataInput = JSON.parse(JSON.stringify(this.dataInput));
      this.prevSelected = JSON.parse(JSON.stringify(this.selected));
      this.prevSelected2 = JSON.parse(JSON.stringify(this.selected2));
      this.readonly = false;
    },
    cancel() {
      this.data = JSON.parse(JSON.stringify(this.prevData));
      this.dataInput = JSON.parse(JSON.stringify(this.prevDataInput));
      this.selected = JSON.parse(JSON.stringify(this.prevSelected));
      this.selected2 = JSON.parse(JSON.stringify(this.prevSelected2));
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
.step4-fontSize-label .v-label {
  font-size: 1.2em;
}
.step4-fontSize-checkbox .v-label {
  font-size: 15px;
}
</style>


