<template>
  <v-list-tile class="grow">
    <v-btn
      :color="tagStyle.color "
      :class="`${tagStyle.textColor} font-weight-bold`"
    >{{tagStyle.text}}</v-btn>
  </v-list-tile>
</template>

<script>
const tagTypeStyles = [
  {
    color: "warning",
    textColor: "secondary--text",
    text: "HUMAN RESOURCES"
  },
  {
    color: "default",
    textColor: "primary--text",
    text: "MANAGER"
  },
  {
    color: "error",
    textColor: "white--text",
    text: "CORPORATE"
  }
];
export default {
  props: {
    tagType: Number
  },
  computed: {
    tagStyle: function() {
      return tagTypeStyles[this.tagType];
    }
  }
};
</script>
