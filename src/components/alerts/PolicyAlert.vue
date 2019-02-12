<template>
  <v-flex>
    <v-layout v-for="item in dataAlerts" :key="item.id" row justify-center align-center>
      <v-flex xs1>
        <v-icon v-if="item.type === 1" color="default">info</v-icon>
        <v-icon v-if="item.type === 2" color="error">cancel</v-icon>
        <v-icon v-if="item.type === 3" color="success">check_circle</v-icon>
      </v-flex>
      <v-flex xs10>
        <div class="elevation-1">
          <div class="text-xs-left px-2 pt-1 pb-2" style="height: 50px">{{item.text}}</div>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
export default {
  props: {
    dataAlerts: Array
  },
};
</script>
