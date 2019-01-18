<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-btn :href="detailLink + '/' + nodeDataDetail.id" target="blank" small color="default">Full</v-btn>
      <v-btn @click="editForm" small color="primary">Edit</v-btn>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4>{{nodeDataDetail.name}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4>{{nodeDataDetail.nodePosition.name}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <p>{{nodeDataDetail.description}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    nodeDataDetail: Object,
    editForm: Function,
    detailLink: String
  }
};
</script>