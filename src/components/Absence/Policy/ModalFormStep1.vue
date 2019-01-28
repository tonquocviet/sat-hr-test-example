<template>
  <v-dialog :value="isShow" @input="$emit('closeDialog')" width="1200px">
    <v-card>
      <v-card-title class="headline default lighten-2">
        <span>Step 1</span>
      </v-card-title>
      <v-divider/>
      <div class="px-2">
        <FormStep1
          @closeDialog="$emit('closeDialog')"
          :isShow="isShow"
          :itemsCountry="itemsCountry"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import FormStep1 from "./FormStep1";
export default {
  components: {
    FormStep1
  },
  props: {
    isShow: Boolean,
    apiUrl: String
  },
  data() {
    return {
      itemsCountry: []
    };
  },
  methods: {
    getCountries() {
      return new Promise(resolve => {
        this.$http
          .get(`${this.apiUrl}`)
          .then(res => resolve({ items: res.data }));
      });
    }
  },
  watch: {
    isShow: {
      handler(isOpen) {
        if (isOpen) {
          this.getCountries().then(data => (this.itemsCountry = data.items));
        }
      }
    }
  }
};
</script>

