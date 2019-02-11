<template>
  <v-list-tile-avatar
    :size="avatarSize"
    :color="`${backgroundColor}`"
    :style="{zIndex:index, width, justifyContent, minWidth:width}"
  >
    <v-img v-if="!!imageUrl" :src="imageUrl"></v-img>
    <span v-if="!imageUrl" class="white--text headline">{{nameSymbol}}</span>
  </v-list-tile-avatar>
</template>
<script>
export default {
  props: {
    avatarSize: String,
    backgroundColor: String,
    width: String,
    justifyContent: String,
    imageUrl: String,
    name: String,
    index: Number
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
