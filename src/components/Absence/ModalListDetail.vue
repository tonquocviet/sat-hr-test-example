<template>
  <div class="text-xs-center">
    <v-dialog v-model="value.isOpen" width="1200">
      <v-card>
        <v-card-title class="headline default lighten-2" style="padding: 16px 25px">
          <div style="width:30px;height:2px;margin-right:5px;background:orange"></div>
          <span>{{title}}</span>
        </v-card-title>
        <v-card-text class="card-user">
          <v-layout row wrap>
            <v-flex
              v-for="(item, index) in data.slice(0, value.end)"
              xs12
              sm6
              md4
              class="pl-2 pr-2 pt-2 pb-2"
              :key="index"
            >
              <Card :item="item"/>
            </v-flex>
            <v-flex sm12 style="text-align:center">
              <v-btn @click="viewMore">View More</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Card from "../cards/Card";

export default {
  components: {
    Card
  },
  props: {
    title: String,
    data: Array,
    value: Object
  },
  methods: {
    viewMore() {
      if (this.data.length > this.value.end) {
        this.value.end += 3;
      }
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

