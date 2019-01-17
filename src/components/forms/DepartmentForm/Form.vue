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
  data() {
    return {
      valid: true,
      corporateLoading: false,
      corporates: this.nodeDataDetail.name ? [this.nodeDataDetail.name] : [],
      corporateSearch: null,
      nodePositionLoading: false,
      nodePositions: this.nodeDataDetail.nodePosition
        ? [this.nodeDataDetail.nodePosition]
        : [],
      nodePositionSearch: null
    };
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

<style scoped>
.right-form .v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
</style>
