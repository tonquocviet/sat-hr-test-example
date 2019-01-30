<template>
  <v-card>
    <v-layout class="px-4 mt-3">
      <v-card class="elevation-4 card-title-policy" dark color="primary">
        <v-layout class="pa-3">
          <div>
            <h4 class="title pr-1 font-weight-light">{{panelTitle}}</h4>
            <p v-if="!!panelSubTitle" class="category font-weight-thin mb-0 mt-1">{{panelSubTitle}}</p>
          </div>
          <v-btn
            flat
            icon
            color="white"
            class="btn-edit"
            absolute
            right
            v-if="readonly"
            @click="edit"
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
      <v-btn @click="saveClick" color="primary">Save</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    panelTitle: String,
    panelSubTitle: String,
    readonly: Boolean
  },
  methods: {
    cancelClick() {
      this.$emit("cancel");
    },
    saveClick() {
      this.$emit("save");
    },
    edit() {
      this.$emit("edit");
    }
  },
  watch: {
    isReadonly: {
      handler(v) {
        if (!v === undefined) {
          this.readonly = v;
        }
      }
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
  top: calc(50% - 18px);
}
</style>


