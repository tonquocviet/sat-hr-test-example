<template>
  <MaterialPanel
    panel-title="Step 1"
    panel-sub-title="General settings"
    @save="submit"
    @cancel="readonly = true"
    @edit="readonly = false"
    :readonly="readonly"
  >
    <v-progress-linear v-if="isLoading" class="pb-4" :indeterminate="true"></v-progress-linear>
    <v-form v-else ref="form" v-model="valid" lazy-validation>
      <v-layout class="px-3 py-2" row wrap>
        <v-flex xs12 sm6 px-2 py-2>
          <v-text-field
            :readonly="readonly"
            v-model="name"
            :counter="1024"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <v-autocomplete
            :append-icon="readonly ? '' : $vuetify.icons.dropdown"
            :readonly="readonly"
            :rules="countryRules"
            v-model="country"
            item-text="name"
            item-value="name"
            label="Choose Country"
            :items="itemsCountry"
            return-object
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <v-select
            :append-icon="readonly ? '' : $vuetify.icons.dropdown"
            :readonly="readonly"
            v-model="status"
            :items="statusItems"
            :rules="[v => !!v || 'status is required']"
            label="Status"
            required
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-text-field
                v-if="readonly"
                prepend-icon="event"
                readonly
                :value="startDateFormatted"
                label="Start Date"
              />
              <v-menu
                v-else
                ref="menuStartDate"
                :close-on-content-click="false"
                v-model="menuStartDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <v-text-field
                  slot="activator"
                  v-model="startDateFormatted"
                  label="Start Date"
                  persistent-hint
                  prepend-icon="event"
                  @blur="startDate = parseDate(startDateFormatted)"
                ></v-text-field>
                <v-date-picker
                  :min="parseDate(dateCurrent)"
                  v-model="startDate"
                  no-title
                  @input="menuStartDate = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-if="readonly"
                prepend-icon="event"
                readonly
                :value="endDateFormatted"
                label="End Date"
              />
              <v-menu
                v-else
                :close-on-content-click="false"
                v-model="menuEndDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <v-text-field
                  slot="activator"
                  v-model="endDateFormatted"
                  label="End Date"
                  persistent-hint
                  prepend-icon="event"
                  @blur="endDate = parseDate(endDateFormatted)"
                ></v-text-field>
                <v-date-picker
                  :min="startDate"
                  v-model="endDate"
                  no-title
                  @input="menuEndDate = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <h4>Absence Type Code</h4>
          <div class="py-2" v-if="readonly">{{absenceTypeCode}}</div>
          <v-textarea v-else solo v-model="absenceTypeCode" name="input-7-4"></v-textarea>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <h4>Short Description</h4>
          <div class="py-2" v-if="readonly">{{shortDescription}}</div>
          <v-textarea v-else solo v-model="shortDescription" name="input-7-4"></v-textarea>
        </v-flex>
        <v-flex xs12 px-2 pt-3>
          <v-checkbox
            :readonly="readonly"
            class="pa-0 ma-0"
            :label="`Allow Request in ESSD`"
            v-model="allowRequest"
          ></v-checkbox>
        </v-flex>
        <v-flex xs12 px-2>
          <v-checkbox
            :readonly="readonly"
            class="pa-0 ma-0"
            :label="`Automatically Approve`"
            v-model="automatically"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-form>
  </MaterialPanel>
</template>

<script>
import MaterialPanel from "../../panels/MaterialPanel";
const newDate = new Date().toISOString().substr(0, 10);
const formatDate = date => {
  if (!date) return null;
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
};
const nameRules = [
  v => !!v || "Name is required",
  v => (v && v.length < 1024) || "Name must be less than 30 characters"
];
const countryRules = [v => !!v || "Country is required"];
export default {
  components: {
    MaterialPanel
  },
  props: {
    getCountriesApiUrl: String
  },
  data: () => ({
    isLoading: false,
    valid: true,
    name: "",
    nameRules,
    country: "",
    itemsCountry: [],
    countryRules,
    status: null,
    statusItems: ["Active", "Inactive", "Testing"],
    menuStartDate: false,
    menuEndDate: false,
    dateCurrent: "",
    startDate: "",
    endDate: "",
    startDateFormatted: "",
    endDateFormatted: "",
    absenceTypeCode: "",
    shortDescription: "",
    allowRequest: false,
    automatically: false,
    readonly: true
  }),
  mounted() {
    this.getCountries().then(({ items }) => {
      this.itemsCountry = items;
    });
    this.getPolicyDetail();
  },
  methods: {
    getCountries() {
      return new Promise(resolve => {
        this.$http
          .get(`${this.getCountriesApiUrl}`)
          .then(res => resolve({ items: res.data }));
      });
    },
    getPolicyDetail() {
      this.isLoading = true;
      setTimeout(() => {
        this.name = "Brittany R Williams";
        this.country = "USA";
        this.status = "Active";
        this.dateCurrent = formatDate(newDate);
        this.startDate = newDate;
        this.endDate = newDate;
        this.absenceTypeCode =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
        this.shortDescription =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
        this.allowRequest = true;
        this.automatically = true;
        this.isLoading = false;
      }, 3000);
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.readonly = true;
      }
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  watch: {
    startDate() {
      let startDate = this.startDate.replace(/-/g, "");
      let endDate = this.endDate.replace(/-/g, "");
      if (startDate >= endDate) {
        this.endDateFormatted = formatDate(this.startDate);
        this.endDate = this.startDate;
      }
      this.startDateFormatted = formatDate(this.startDate);
    },
    endDate() {
      this.endDateFormatted = formatDate(this.endDate);
    }
  }
};
</script>
