<template>
  <v-form ref="form" v-model="valid" lazy-validation class="right-form">
    <v-layout align-center justify-center>
      <v-btn @click="openNewTab" small color="primary" class="v-btn-full">Full</v-btn>
      <v-btn @click="editForm" small color="#FCC439" class="v-btn-edit">Edit</v-btn>
    </v-layout>

    <v-container v-if="isShow">
      <v-layout>
        <v-flex xs12>
          <v-autocomplete
            v-model="nodeDataDetail.name"
            cache-items
            :async-loading="corporateLoading"
            item-text="name"
            item-value="id"
            :items="corporates"
            :rules="[v => !!v || 'Please choose Corporate name']"
            :search-input.sync="corporateSearch"
            label="Corporate Name"
            return-object
          ></v-autocomplete>
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

    <v-container v-else>
      <v-layout>
        <v-flex xs12>
          <h4>{{nodeDataDetail.name.name}}</h4>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h4>{{nodeDataDetail.nodePosition.name}}</h4>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h4>{{nodeDataDetail.description}}</h4>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h4>{{nodeDataDetail.name.name}}</h4>
          <div class="v-div-card">
            <div class="div-card">
              <v-card class="v-card">
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.newHires}}</h1>
                  <h6>New Hires</h6>
                </v-card-title>
              </v-card>
              <v-card class="v-card">
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.managers}}</h1>
                  <h6>Managers</h6>
                </v-card-title>
              </v-card>
            </div>
            <div class="div-card">
              <v-card class="v-card">
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.employees}}</h1>
                  <h6>Employees</h6>
                </v-card-title>
              </v-card>
              <v-card width="45%" height="100">
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.team}}</h1>
                  <h6>Teams</h6>
                </v-card-title>
              </v-card>
            </div>
          </div>
        </v-flex>
      </v-layout>
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
      isShow: false,
      corporateLoading: false,
      corporates: this.nodeDataDetail.name ? [this.nodeDataDetail.name] : [],
      corporateSearch: null,
      nodePositionLoading: false,
      nodePositions: this.nodeDataDetail.nodePosition
        ? [this.nodeDataDetail.nodePosition]
        : [],
      nodePositionSearch: null
    };
  },

  methods: {
    openNewTab() {
      
    },
    editForm() {
      this.isShow = true;
    },
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
        const { name, nodePosition, id } = this.nodeDataDetail;
        const data = {
          id,
          name,
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
          .get(`${this.apiEndPoints.getFullCoporates}`, {
            params: {
              s: val
            }
          })
          .then(res => (this.corporates = res.data));
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

.v-btn-full {
  text-transform: none;
}

.v-btn-edit {
  color: #000;
  text-transform: none;
}

.v-div-card {
  width: 100%;
  height: 230px;
  background: #f3f4f8;
}

.div-card {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 8px 5px 3px 5px;
}

.v-card-title {
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}

.v-card {
  height: 100px;
  width: 45%;
}
</style>
