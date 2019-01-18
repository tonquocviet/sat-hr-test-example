<template>
  <Editing
    v-if="!isShowModal"
    :nodeDataDetail="nodeDataDetail"
    :apiEndPoints="apiEndPoints"
    @saveDetails="saveDetails"
    @closeModal="closeModal"
  />

  <Preview :editForm="editForm" :detailLink="detailLink" :nodeDataDetail="nodeDataDetail" v-else/>
</template>
<script>
import Preview from "./Preview";
import Editing from "./Editing";
export default {
  components: {
    Preview,
    Editing
  },
  props: {
    nodeDataDetail: Object,
    apiEndPoints: Object,
    isShowModal: Boolean,
    editForm: Function,
    detailLink: String
  },
  methods: {
    saveDetails(data) {
      this.$emit("saveDetails", data);
    },
    closeModal() {
      this.$emit("closeModal");
    }
  }
};
</script>