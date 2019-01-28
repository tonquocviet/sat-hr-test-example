<template>
  <v-layout row>
    <v-flex md9 class="mt-2">
      <v-flex xs12 right class="right-button-container">
        <v-btn icon class="primary--text">
          <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn
          v-if="viewMode === 'card'"
          icon
          @click="changeViewMode(true)"
        >
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn v-else icon @click="changeViewMode(false)">
          <v-icon>apps</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-tabs color="transparent" dark slider-color="primary">
          <v-tab v-for="item in itemList" :key="item.id" ripple class="primary--text">
            {{ item.text }}
            <v-chip color="primary" text-color="white" small>{{ countPolicy }}</v-chip>
          </v-tab>
          <v-tab-item>
            <PolicyTable @lengthPolicy="lengthPolicy" v-if="viewMode === 'list'" :apiPolicy="apiPolicy"/>
          </v-tab-item>
          <v-tab-item>
            Page active
          </v-tab-item>
          <v-tab-item>
            Page In active
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-flex>
    <CreatePolicy :isShow="isShowCreate" @closeDialog="isShowCreate = false"></CreatePolicy>
    <v-layout>
      <v-btn @click="isShowCreate = true" color="success" class="create-policy mr-5 mb-5 " fab dark position absolute>
        <v-icon>create</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>
<script>
import PolicyTable from "./PolicyTable";
import CreatePolicy from "./CreatePolicy";

export default {
  components: {
    PolicyTable,
    CreatePolicy
  },
  props: {
    viewMode: String,
    apiPolicy: Object,
  },
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
    },
    lengthPolicy(item){
      this.countPolicy = item;
    },
  },
  data() {
    return {
      pageIndex: 0,
      loading: true,
      countPolicy: 0,
      isShowCreate: false,
      itemList: [
        { text: "All" },
        { text: "Active" },
        { text: "Inactive" }
      ],
    };
  }
};
</script>
<style scoped>
.right-button-container {
  position: relative;
  z-index: 1;
}
.create-policy{
  bottom: 0;
  right: 0;
}
</style>
