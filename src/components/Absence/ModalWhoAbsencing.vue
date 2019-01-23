<template>
  <div class="text-xs-center">
    <v-dialog v-model="AbsenceModal.isOpenWhoAbsencing" width="1200">
      <v-card>
        <v-card-title class="headline default lighten-2" style="padding: 16px 25px">
          <div style="width:30px;height:2px;margin-right:5px;background:orange"></div>
          <span>{{title}}</span>
        </v-card-title>
        <v-card-text class="card-user">
          <div v-if="AbsenceModal.loadingViewFull" style="text-align:center;padding-bottom: 40px;">
            <v-btn flat color="success">
              <v-progress-circular indeterminate color="green"></v-progress-circular>
            </v-btn>
          </div>
          <v-layout v-else row wrap>
            <v-flex
              v-for="(item, index) in items"
              xs12
              sm6
              md4
              class="pl-2 pr-2 pt-2 pb-2"
              :key="index"
            >
              <AbsenceCard :item="item"/>
            </v-flex>
            <v-flex sm12 style="text-align:center">
              <v-btn flat color="success" v-if="AbsenceModal.loadingViewMore">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-btn>
              <v-btn v-else @click="viewMore">View More</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AbsenceCard from "../cards/AbsenceCard";

export default {
  components: {
    AbsenceCard
  },
  props: {
    title: String,
    items: Array,
    AbsenceModal: Object
  },
  methods: {
    viewMore() {
      this.$emit("viewMoreAbsense", "WhoAbsensing");
    }
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .card-user {
    padding: unset;
  }
}
</style>

