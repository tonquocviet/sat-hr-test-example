<template>
  <v-flex>
    <v-layout v-for="item in dataApproved" :key="item.id" row justify-center align-center>
      <v-flex xs1>
        <v-icon v-if="item.type === 1" color="black">error</v-icon>
        <v-icon v-if="item.type === 2" color="error">cancel</v-icon>
        <v-icon v-if="item.type === 3" color="success">check_circle</v-icon>
      </v-flex>
      <v-flex xs10>
        <div class="elevation-1">
          <div class="text-xs-left pl-3 pr-3 pt-2 pb-2" style="height: 50px">{{item.text}}</div>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
export default {
  props: {
    dataApproved: Array
  }
};
</script>
