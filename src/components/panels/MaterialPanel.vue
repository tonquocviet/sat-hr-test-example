<template>
  <v-card>
    <v-layout class="px-4 mt-3">
      <v-card class="elevation-4 card-title-policy" color="primary">
        <v-layout class="pa-3">
          <h4 class="title pr-1 white--text font-weight-light">{{panelTitle}}</h4>
          <v-btn
            flat
            icon
            color="white"
            class="btn-edit"
            absolute
            right
            v-if="readonly"
            @click="readonly = false"
          >
            <v-icon>edit</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-layout>
    <slot :readonly="readonly"/>
    <div v-if="!readonly" style="text-align: right" class="pb-2">
      <v-divider/>
      <v-btn @click="cancelClick" color="default ">Cancel</v-btn>
      <v-btn @click="saveClick" color="info ">Save</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      readonly: true
    };
  },
  props: {
    panelTitle: String
  },
  methods: {
    cancelClick() {
      this.readonly = true;
      this.$emit("cancel");
    },
    saveClick() {
      this.$emit("save");
    }
  }
};
</script>

<style scoped>
.card-title-policy {
  width: 100%;
  margin-top: -20px;
  border-radius: 6px;
}
.btn-edit {
  top: 8px;
}
</style>


