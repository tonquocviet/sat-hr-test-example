<template>
  <v-layout row justify-center>
    <v-dialog @input="$emit('closeDialog')" :value="isShowModalAdjust" width="700px">
      <v-card>
        <v-layout justify-center align-center>
          <v-card-title>
            <span class="display-1">12 Adjustment</span>
          </v-card-title>
        </v-layout>
        <v-card-text>
          <h3 class="subheading">
            <span class="subheading font-weight-bold">William birkin</span> has been in
            <span class="subheading font-weight-bold">12</span> policy since
            <span class="subheading font-weight-bold">31/01/2019</span>
          </h3>
        </v-card-text>
        <v-card-text>
          <h3 class="subheading">
            Click
            <span
              class="subheading font-weight-bold"
              style="cursor: pointer;"
              @click="removeEmployName"
            >here</span> to remove
            <span class="subheading font-weight-bold">William birkin</span> out of this
            <span class="subheading font-weight-bold">12</span> policy.
          </h3>
        </v-card-text>
        <v-card-text>
          <h3 class="subheading">
            To lower
            <span class="subheading font-weight-bold">William birkin 12</span>
            balance, please maje an absence request with
            <span
              class="subheading font-weight-bold"
            >12</span> as reason and then approve it.
          </h3>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    isShowModalAdjust: Boolean
  },
  methods: {
    removeEmployName() {
      this.$emit("closeDialog");
    }
  }
};
</script>
