<template>
  <v-list-tile-avatar>
    <v-img v-if="!!imageUrl" class="v-img" :src="imageUrl"></v-img>
    <span v-if="!imageUrl" class="white--text headline">{{nameSymbol}}</span>
  </v-list-tile-avatar>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    name: String
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
.v-img {
  width: 100px;
  height: 100px;
}
</style>
