<template>
  <v-card class="mx-auto v-cardContainer" width="100%" height="100%" @click="detailNodeCard">
    <v-card-title class="success--text">
      <span class="font-weight-bold headline v-cardTitle">{{nodeData.cardTitle}}</span>
      <span class="font-weight-light text v-cardSubTitle">{{nodeData.cardSubTitle}}</span>
      <div class="v-line"></div>
    </v-card-title>
    <v-card-actions class="mb-1">
      <avatars-list :members="nodeData.avatarList"/>
      <v-layout align-center justify-end>
        <v-icon class="mr-1">people</v-icon>
        <span class="subheading">{{nodeData.numberOfMember}}</span>
      </v-layout>
    </v-card-actions>
    <v-card-actions v-if="nodeData.tagType !== null">
      <role-tag :tag-type="nodeData.tagType"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import AvatarsList from "../avatars/AvatarsList";
import RoleTag from "../tags/RoleTag";
export default {
  props: {
    nodeData: {
      cardTitle: String,
      cardSubTitle: String,
      avatarList: Array,
      numberOfMember: Number,
      tagTypes: Number
    },
    openModal: { default: () => openModal }
  },
  data: () => ({
    drawer: true
  }),
  components: {
    AvatarsList,
    RoleTag
  },
  methods: {
    detailNodeCard() {
      const nodeDataDetail = this.nodeData;
      this.$emit("emitCardNodeContainer", nodeDataDetail);
      this.openModal();
    }
  }
};
</script>

<style>
.v-cardContainer {
  cursor: pointer;
}

.v-line {
  width: 100%;
  padding-top: 20px;
  border-bottom: 1px solid #7575757d;
}

.v-cardTitle {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.v-cardSubTitle {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
