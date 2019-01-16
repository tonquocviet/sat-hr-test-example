<template>
  <v-card
    :class="`mx-auto v-cardContainer ${nodeData.isActive ? 'card-active' : ''}`"
    width="100%"
    height="100%"
    @click="detailNodeCard"
  >
    <div v-if="typeId === 4">
      <v-card-actions class="mb-1 v-img-container">
        <user-avatar
          :imageUrl="nodeData.avatar.imageUrl"
          :name="nodeData.avatar.name"
          class="v-image-user"
          :typeId="typeId"
        />
      </v-card-actions>
      <v-card-title class="success--text">
        <span
          style="text-align: center;"
          class="font-weight-bold headline v-cardTitle"
        >{{nodeData.cardTitle}}</span>
        <span
          style="text-align: center;"
          class="font-weight-light text v-cardSubTitle"
        >{{nodeData.cardSubTitle}}
        
        </span>
        <button @click.prevent="toggleNode" class="btn-drop-show" v-if="this.nodeData.children">
          <v-icon>{{ nodeData.isCollapse ? "expand_less" : "expand_more"}}</v-icon>
        </button>
      </v-card-title>
      
    </div>
    <div v-else>
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
      <button @click.prevent="toggleNode" class="btn-drop-show" v-if="this.nodeData.children">
          <v-icon>{{ nodeData.isCollapse ? "expand_less" : "expand_more"}}</v-icon>
      </button>
    </div>
  </v-card>
</template>

<script>
import AvatarsList from "../avatars/AvatarsList";
import UserAvatar from "../avatars/Avatar";
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
    typeId: Number
  },
  data: () => ({
    drawer: true
  }),
  components: {
    AvatarsList,
    UserAvatar,
    RoleTag
  },
  methods: {
    detailNodeCard() {
      const nodeDataDetail = this.nodeData;
      this.$emit("emitCardNodeContainer", nodeDataDetail);
    },
    toggleNode() {
      this.$emit("collapseOrExpandNode", this.nodeData);
    }
  }
};
</script>

<style scoped>
.v-cardContainer {
  cursor: pointer;
  border-radius: 6px;
  border-style: solid;
}
.card-active {
  border-color: #24b314;
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

.v-image-user {
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background: blue;
  justify-content: center;
  align-items: center;
}

.v-img-container {
  justify-content: center;
  align-items: center;
}

.btn-drop-show {
  position: ABSOLUTE ;
  right: 5px;
  margin-left: 90%;
  bottom:0
}
</style>
