<template>
  <v-container v-if="isShowModal && this.isShowInfo == true">
    <v-layout align-center justify-center>
      <v-btn  small color="default">Full</v-btn>
      <v-btn @click="editForm" small color="primary" >Edit</v-btn>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">{{nodeDataDetail.name}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">{{nodeDataDetail.address}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">{{nodeDataDetail.contactPersonnel.name}}  <span class="ml-5">{{nodeDataDetail.telephone}}</span></h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">{{nodeDataDetail.description}}</h4>
      </v-flex>
    </v-layout>
  </v-container>
  <v-form ref="form" v-model="valid" lazy-validation class="right-form" v-else>
    <v-container>
      <v-text-field
        v-model="nodeDataDetail.name"
        :rules="nameRules"
        label="Branch Name"
        required
        class="mt-0 pt-0"
      ></v-text-field>
      <v-layout>
        <v-flex xs12>
          <v-text-field
            v-model="nodeDataDetail.address"
            :rules="addressRules"
            label="Address"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          <v-autocomplete
            v-model="nodeDataDetail.country"
            @change="changeCountry"
            item-text="name"
            item-value="id"
            :items="countries"
            :rules="[v => !!v || 'Country is required']"
            label="Contry"
            return-object
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-autocomplete
            v-model="nodeDataDetail.city"
            :items="cities"
            :rules="[v => !!v || 'City is required']"
            item-text="name"
            item-value="id"
            label="City"
            return-object
          ></v-autocomplete>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          <v-text-field
            v-model="nodeDataDetail.zipCode"
            :rules="zipCodeRules"
            label="Zip Code"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs6></v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-text-field
            v-model="nodeDataDetail.telephone"
            :rules="telephoneRules"
            label="Phone number"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.contactPersonnel"
            cache-items
            :async-loading="contactPersonnelLoading"
            item-text="name"
            item-value="id"
            :items="contacts"
            :rules="[v => !!v || 'Please choose Contact Personnel']"
            label="Contact Personnel"
            :search-input.sync="contactPersonnelSearch"
            return-object
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
            :items="nodes"
            :rules="[v => !!v || 'Please choose position']"
            label="Node position"
            :search-input.sync="nodePositionSearch"
            return-object
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
    apiEndPoints: Object,
    isShowModal: Boolean,
  },
  mounted() {
    this.countrySearch();
    if (this.nodeDataDetail && this.nodeDataDetail.country) {
      this.citySearch();
    }
  },
  data() {
    return {
      isShowInfo: true,
      valid: true,
      nodePositionLoading: false,
      nodes: this.nodeDataDetail.nodePosition
        ? [this.nodeDataDetail.nodePosition]
        : [],
      cities: [],
      countries: [],
      nodePositionSearch: null,
      contactPersonnelLoading: false,
      contacts: this.nodeDataDetail.contactPersonnel
        ? [this.nodeDataDetail.contactPersonnel]
        : [],
      contactPersonnelSearch: null,
      nameRules: [v => !!v || "Name is required"],
      addressRules: [v => !!v || "Address is required"],
      zipCodeRules: [
        v => !!v || "Zip code is required",
        v => /^[0-9]{5}(?:-[0-9]{4})?$/.test(v) || "Zip code is invalid"
      ],
      telephoneRules: [
        v => !!v || "Phone number is required",
        v =>
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) || // eslint-disable-line
          "Phone number is invalid"
      ]
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    changeCountry() {
      this.citySearch();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onSave() {
      if (this.$refs.form.validate()) {
        const data = { ...this.nodeDataDetail };
        this.$emit("saveDetails", data);
      }
    },
    onCancel() {
      this.$emit("closeModal");
    },
    countrySearch() {
      this.$http
        .get(`${this.apiEndPoints.getCountries}`)
        .then(res => (this.countries = res.data));
    },
    citySearch() {
      this.$http
        .get(
          `${this.apiEndPoints.getCitiesByCountryId}/${
            this.nodeDataDetail.country.id
          }`
        )
        .then(res => (this.cities = res.data));
    },
    editForm(){
     this.isShowInfo = false;
    }
  },
  watch: {
    nodePositionSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getNodePositions}`, {
            params: {
              q: val
            }
          })
          .then(res => (this.nodes = res.data));
      }
    },
    contactPersonnelSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getContactPersonnels}`, {
            params: {
              q: val
            }
          })
          .then(res => (this.contacts = res.data));
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
