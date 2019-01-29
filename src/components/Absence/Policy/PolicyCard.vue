<template>
  <div class="v-container">
    <v-progress-linear v-if="loading" style="margin-left: 5px" :indeterminate="true"></v-progress-linear>
    <v-card-text class="card-user">
      <v-layout row wrap>
        <v-flex
          v-for="(item, index) in dataFilterPolicy"
          xs12
          sm6
          md4
          class="pl-2 pr-2 pt-2 pb-2"
          :key="index"
        >
          <PolicyCard 
            @showDetailModal="showDetailModal" 
            :isClickable="true" 
            :item="item"
          />
        </v-flex>
        <v-flex sm12 style="text-align:center" v-if="hasShowMore">
          <v-btn v-if="isShowMore">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-btn>
          <v-btn @click="$emit('showMoreView')" v-else>View More</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </div>
</template>
<script>
import PolicyCard from "../../cards/PolicyCard";

export default {
  components: {
    PolicyCard
  },
  methods: {
    showDetailModal(policyDetail) {
      this.$emit("showDetailModal", policyDetail);
    }
  },
  props: {
    dataFilterPolicy: Array,
    loading: Boolean,
    isShowMore: Boolean,
    hasShowMore: Boolean
  }
};
</script>
