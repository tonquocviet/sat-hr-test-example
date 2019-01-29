<template>
  <MaterialPanel panel-title="Step 1: Setup" @save="onSave">
    <template slot-scope="{ readonly }">
      <FormStep1
        ref="formStep1"
        :itemsCountry="step1.itemsCountry"
        :readonly="readonly"
        @onReadonly="readonly = true"
      />
    </template>
  </MaterialPanel>
</template>

<script>
import FormStep1 from "./FormStep1";
import MaterialPanel from "../../panels/MaterialPanel";

export default {
  components: {
    FormStep1,
    MaterialPanel
  },
  props: {
    step1: Object
  },
  methods: {
    onSave() {
      this.$refs.formStep1.submit();
    }
  }
};
</script>



