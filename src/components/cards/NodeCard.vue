<template>
  <v-card
    :class="`mx-auto v-cardContainer ${nodeData.isActive ? 'card-active' : ''}`"
    width="100%"
    height="100%"
    @click="detailNodeCard"
  >
    <div v-if="typeId === 4">
      <v-card-actions class="mb-1 v-img-container">
        <img v-bind:src="avtBoardStruct" class="v-image-user" :style="imgUser">
      </v-card-actions>
      <v-card-title class="success--text">
        <span
          style="text-align: center;"
          class="font-weight-bold headline v-cardTitle"
        >{{nodeData.cardTitle}}</span>
        <span
          style="text-align: center;"
          class="font-weight-light text v-cardSubTitle"
        >{{nodeData.cardSubTitle}}</span>
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
    </div>
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
    typeId: Number
  },
  data: () => ({
    drawer: true,
    avtBoardStruct:
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
  }),
  components: {
    AvatarsList,
    RoleTag
  },
  methods: {
    detailNodeCard() {
      const nodeDataDetail = this.nodeData;
      console.log(nodeDataDetail)
      this.$emit("emitCardNodeContainer", nodeDataDetail);
    }
  },
  computed: {
    imgUser: function() {
      return {
        background: "blue"
      };
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
}

.v-img-container {
  justify-content: center;
  align-items: center;
}
</style>
