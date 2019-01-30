<template>
  <MaterialPanel
    panel-title="Step 1"
    panel-sub-title="General settings"
    @save="save"
    @cancel="cancel"
    @edit="edit"
    :readonly="readonly"
  >
    <v-progress-linear v-if="isLoading" class="pb-4" :indeterminate="true"></v-progress-linear>
    <v-form v-else ref="form" v-model="object.valid" lazy-validation>
      <v-layout class="px-3 py-2" row wrap>
        <v-flex xs12 sm6 px-2 py-2>
          <v-text-field
            :readonly="readonly"
            v-model="object.name"
            :counter="1024"
            :rules="[v => !!v || 'Name is required',v => (v && v.length < 1024) || 'Name must be less than 30 characters']"
            label="Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <v-autocomplete
            :append-icon="readonly ? '' : $vuetify.icons.dropdown"
            :readonly="readonly"
            :rules="[v => !!v || 'Country is required']"
            v-model="object.country"
            item-text="name"
            item-value="name"
            label="Choose Country"
            :items="object.itemsCountry"
            return-object
          ></v-autocomplete>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <v-select
            :append-icon="readonly ? '' : $vuetify.icons.dropdown"
            :readonly="readonly"
            v-model="object.status"
            :items="object.statusItems"
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
                :value="object.startDateFormatted"
                label="Start Date"
              />
              <v-menu
                v-else
                ref="menuStartDate"
                :close-on-content-click="false"
                v-model="object.menuStartDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <v-text-field
                  slot="activator"
                  v-model="object.startDateFormatted"
                  label="Start Date"
                  persistent-hint
                  prepend-icon="event"
                  @blur="object.startDate = parseDate(object.startDateFormatted)"
                ></v-text-field>
                <v-date-picker
                  :min="parseDate(object.dateCurrent)"
                  v-model="object.startDate"
                  no-title
                  @input="object.menuStartDate = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-if="readonly"
                prepend-icon="event"
                readonly
                :value="object.endDateFormatted"
                label="End Date"
              />
              <v-menu
                v-else
                :close-on-content-click="false"
                v-model="object.menuEndDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <v-text-field
                  slot="activator"
                  v-model="object.endDateFormatted"
                  label="End Date"
                  persistent-hint
                  prepend-icon="event"
                  @blur="object.endDate = parseDate(object.endDateFormatted)"
                ></v-text-field>
                <v-date-picker
                  :min="object.startDate"
                  v-model="object.endDate"
                  no-title
                  @input="object.menuEndDate = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <h4>Absence Type Code</h4>
          <div class="py-2" v-if="readonly">{{object.absenceTypeCode}}</div>
          <v-textarea v-else solo v-model="object.absenceTypeCode" name="input-7-4"></v-textarea>
        </v-flex>
        <v-flex xs12 sm6 px-2 py-2>
          <h4>Short Description</h4>
          <div class="py-2" v-if="readonly">{{object.shortDescription}}</div>
          <v-textarea v-else solo v-model="object.shortDescription" name="input-7-4"></v-textarea>
        </v-flex>
        <v-flex xs12 px-2 pt-3>
          <v-checkbox
            :readonly="readonly"
            class="pa-0 ma-0"
            label="Allow Request in ESSD"
            v-model="object.allowRequest"
          ></v-checkbox>
        </v-flex>
        <v-flex xs12 px-2>
          <v-checkbox
            :readonly="readonly"
            class="pa-0 ma-0"
            label="Automatically Approve"
            v-model="object.automatically"
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
export default {
  components: {
    MaterialPanel
  },
  props: {
    getCountriesApiUrl: String
  },
  data: () => ({
    isLoading: false,
    readonly: true,
    object: {
      valid: true,
      name: "",
      country: "",
      itemsCountry: [],
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
      automatically: false
    },
    editingObject: {}
  }),
  mounted() {
    this.getCountries().then(({ items }) => {
      this.object.itemsCountry = items;
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
        this.object = {
          ...this.object,
          name: "Brittany R Williams",
          country: "USA",
          status: "Active",
          dateCurrent: formatDate(newDate),
          startDate: newDate,
          endDate: newDate,
          absenceTypeCode:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          shortDescription:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          allowRequest: true,
          automatically: true
        };
        this.isLoading = false;
      }, 0);
    },
    edit() {
      this.editingObject = JSON.parse(JSON.stringify(this.object)) ;
      this.readonly = false;
    },
    cancel() {
      this.object = JSON.parse(JSON.stringify(this.editingObject));
      this.readonly = true;
    },
    save() {
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
    "object.startDate"() {
      let startDate = this.object.startDate.replace(/-/g, "");
      let endDate = this.object.endDate.replace(/-/g, "");
      if (startDate >= endDate) {
        this.object.endDateFormatted = formatDate(this.object.startDate);
        this.object.endDate = this.object.startDate;
      }
      this.object.startDateFormatted = formatDate(this.object.startDate);
    },
    "object.endDate"() {
      this.object.endDateFormatted = formatDate(this.object.endDate);
    }
  }
};
</script>
