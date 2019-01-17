<template>
   <v-container>
    <v-layout align-center justify-center>
      <v-btn
        :href="detailLink + '/' + nodeDataDetail.id"
        target="blank"
        small
        color="default"
      >Full</v-btn>
      <v-btn @click="editForm" small color="primary" >Edit</v-btn>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">{{nodeDataDetail.name}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">{{nodeDataDetail.address}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">{{nodeDataDetail.contactPersonnel.name}}</h4>
        <h4 class="mt-4">{{nodeDataDetail.telephone}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <p class="mt-4">{{nodeDataDetail.description}}</p>
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

<style scoped >
.v-div-card {
  width: 100%;
  height: 230px;
  background: #f3f4f8;
}

.div-card {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 8px 5px 3px 5px;
}

.v-card-title {
  justify-content: center;
  margin-left: 20px;
  align-items: center;
  height: 100%;
  flex-direction: column;
}

.v-card {
  height: 100px;
  width: 45%;
}

.v-percent {
  position: absolute;
  right: 20px;
  top: 5px;
}
</style>
