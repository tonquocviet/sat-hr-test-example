<template>
  <v-form ref="form" v-model="valid" lazy-validation class="right-form">
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.name"
            cache-items
            :async-loading="corporateLoading"
            :items="corporates"
            :rules="[v => !!v || 'Please enter Corporate name']"
            :search-input.sync="corporateSearch"
            return-object
            label="Corporate Name"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.company"
            cache-items
            :async-loading="corporationLoading"
            :items="corporations"
            :rules="[v => !!v || 'Please enter Corporation Position']"
            :search-input.sync="corporationSearch"
            label="Corporation Location"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-autocomplete
            v-model="nodeDataDetail.nodePosition"
            cache-items
            :async-loading="nodePositionLoading"
            item-text="name"
            item-value="id"
            :items="nodePositions"
            :rules="[v => !!v || 'Please choose Parrent Node']"
            :search-input.sync="nodePositionSearch"
            return-object
            label="Node Position"
          ></v-autocomplete>
        </v-flex>
      </v-layout>
      <v-btn v-on:click="onSave" color="primary">Save</v-btn>
      <v-btn v-on:click="onCancel" color="default">Cancel</v-btn>
    </v-container>
  </v-form>
</template>
<script>
export default {
  props: {
    nodeDataDetail: Object,
    apiEndPoints: Object
  },
  data() {
    return {
      valid: true,
      corporateLoading: false,
      corporates: [],
      corporateSearch: null,
      corporationLoading: false,
      corporations: [],
      corporationSearch: null,
      nodePositionLoading: false,
      nodePositions: this.nodeDataDetail.nodePosition
        ? [this.nodeDataDetail.nodePosition]
        : [],
      nodePositionSearch: null
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onSave() {
      if (this.$refs.form.validate()) {
        const { name, nodePosition, company, id } = this.nodeDataDetail;
        const data = {
          id,
          name,
          company,
          nodePosition
        };
        this.$emit("saveDetails", data);
      }
    },
    onCancel() {
      this.$emit("closeModal");
    }
  },
  watch: {
    corporateSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.loadCoporateNames}`, {
            params: {
              s: val
            }
          })
          .then(res => (this.corporates = res.data));
      }
    },
    corporationSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getLocations}`, {
            params: {
              q: val,
              t: "com"
            }
          })
          .then(res => (this.corporations = res.data));
      }
    },
    nodePositionSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getNodePositions}`, {
            params: {
              q: val
            }
          })
          .then(res => (this.nodePositions = res.data));
      }
    }
  }
};
</script>

<style scoped>
.right-form .v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
</style>
