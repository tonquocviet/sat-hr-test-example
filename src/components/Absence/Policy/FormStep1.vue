<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-layout row wrap>
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
            <v-menu
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
                :readonly="readonly"
                slot="activator"
                v-model="startDateFormatted"
                label="Start Date"
                persistent-hint
                prepend-icon="event"
                @blur="startDate = parseDate(startDateFormatted)"
              ></v-text-field>
              <v-date-picker
                :readonly="readonly"
                :min="parseDate(dateCurrent)"
                v-model="startDate"
                no-title
                @input="menuStartDate = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6>
            <v-menu
              :close-on-content-click="false"
              v-model="menuEndDate"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
            >
              <v-text-field
                :readonly="readonly"
                slot="activator"
                v-model="endDateFormatted"
                label="End Date"
                persistent-hint
                prepend-icon="event"
                @blur="endDate = parseDate(endDateFormatted)"
              ></v-text-field>
              <v-date-picker
                :readonly="readonly"
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
        <div>Absence Type Code</div>
        <v-textarea 
          :readonly="readonly" 
          solo 
          v-model="absenceTypeCode" 
          name="input-7-4"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6 px-2 py-2>
        <div>Short Description</div>
        <v-textarea 
          :readonly="readonly" 
          solo 
          v-model="shortDescription" 
          name="input-7-4"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 px-2>
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
    <v-btn 
    v-if="!readonly" 
    :disabled="!valid" 
    color="success"
    @click="submit"
    >Save</v-btn>
  </v-form>
</template>

<script>
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
  props: {
    itemsCountry: Array,
    readonly: Boolean,
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules,
    country: "",
    countryRules,
    status: null,
    statusItems: ["Active", "Inactive", "Testing"],
    menuStartDate: false,
    menuEndDate: false,
    dateCurrent: formatDate(newDate),
    startDate: newDate,
    endDate: newDate,
    startDateFormatted: formatDate(newDate),
    endDateFormatted: formatDate(newDate),
    absenceTypeCode: "",
    shortDescription: "",
    allowRequest: false,
    automatically: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("onReadonly");
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

