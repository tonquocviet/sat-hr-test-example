<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-autocomplete
            v-model="nodeDataDetail.name"
            cache-items
            :async-loading="employeeNameLoading"
            item-text="name"
            item-value="id"
            :items="employeeNames"
            :rules="[v => !!v || 'Please employee name']"
            label="Employee name"
            :search-input.sync="employeeNameSearch"
            return-object
          ></v-autocomplete>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.boardTitle"
            cache-items
            :async-loading="titleLoading"
            item-text="name"
            item-value="id"
            :items="boardTitles"
            :rules="[v => !!v || 'Please Board title']"
            :search-input.sync="nameBoardSearch"
            label="Board title"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-autocomplete
            v-model="nodeDataDetail.nodePosition"
            cache-items
            :async-loading="nodeLocationLoading"
            item-text="name"
            item-value="id"
            :items="nodeLocations"
            :rules="[v => !!v || 'Please node location']"
            :search-input.sync="nodeLocationSearch"
            return-object
            label="Node location"
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
      nameBoardSearch: null,
      titleLoading: false,
      boardTitles: [],
      nodeLocationLoading: false,
      nodeLocations: this.nodeDataDetail.nodePosition
        ? [this.nodeDataDetail.nodePosition]
        : [],
      nodeLocationSearch: null,
      employeeNameSearch: null,
      employeeNameLoading: false,
      employeeNames: this.nodeDataDetail.name ? [this.nodeDataDetail.name] : []
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
        const { name, boardTitle, nodePosition, id } = this.nodeDataDetail;
        const data = {
          id,
          boardTitle,
          employeeName: name,
          nodeLocation: nodePosition
        };
        this.$emit("saveDetails", data);
      }
    },
    onCancel() {
      this.$emit("closeModal");
    }
  },
  watch: {
    nodeLocationSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getNodePositions}`, {
            params: {
              q: val
            }
          })
          .then(res => (this.nodeLocations = res.data));
      }
    },
    employeeNameSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getEmployees}`, {
            params: {
              q: val
            }
          })
          .then(res => (this.employeeNames = res.data));
      }
    },
    nameBoardSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getBoardNames}`, {
            params: {
              q: val
            }
          })
          .then(res => (this.boardTitles = res.data));
      }
    }
  }
};
</script>

<style scoped>
</style>