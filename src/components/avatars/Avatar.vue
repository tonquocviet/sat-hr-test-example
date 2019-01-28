<template>
  <v-list-tile-avatar
    :size="avatarSize"
    :color="`${backgroundColor} img-avatar`"
    :style="{zIndex:index, width, justifyContent}"
  >
    <v-img
      v-if="!!imageUrl"
      :class="imgActive ? 'v-profile' : (typeId === 4 ? 'v-img' : 'elevation-6')"
      :src="imageUrl"
    ></v-img>
    <span v-if="!imageUrl" class="white--text headline">{{nameSymbol}}</span>
  </v-list-tile-avatar>
</template>
<script>
export default {
  props: {
    avatarSize: String,
    width: String,
    justifyContent: String,
    imageUrl: String,
    name: String,
    backgroundColor: String,
    index: Number,
    typeId: Number,
    imgActive: Boolean
  },
  computed: {
    nameSymbol: function() {
      if (this.imageUrl) return null;
      if (!this.name.trim().length) return "";
      let words = this.name.split(" ");
      if (words.length == 1) {
        return this.name.substring(0, 2).toUpperCase();
      }
      return (words[0][0] + "" + words[words.length - 1][0]).toUpperCase();
    }
  }
};
</script>
<style scoped>
.img-avatar {
  min-width: 40px;
}
.v-list__tile__avatar {
  width: 24px;
  min-width: 24px;
}
.v-profile {
  width: 100px;
  height: 100px;
}
.v-img {
  width: 130px;
  height: 130px;
}
</style>