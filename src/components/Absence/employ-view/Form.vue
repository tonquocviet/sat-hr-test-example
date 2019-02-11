<template>
  <div class="px-3 py-3">
    <v-layout row>
      <v-layout column>
        <v-flex xs10>
          <h3 class="headline font-weight-bold">Absence</h3>
        </v-flex>
        <v-flex xs10></v-flex>
      </v-layout>
      <v-flex xs2 row>
        <v-btn color="primary">
          <v-icon>add_circle</v-icon>Add New Absence
        </v-btn>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout>
      <v-flex xs9>
        <AbsenceEmployCard :dataEmployCard="dataEmployCard"/>
        <v-flex sm12 md12>
          <EmployViewContent
            :dataUpcommingAbsence="dataUpcommingAbsence"
            :dataWhoAbsencing="dataWhoAbsencing"
            @receivePopupAbsenceApproved="receivePopupAbsenceApproved"
            @receivePopupAbsenceRequest="receivePopupAbsenceRequest"
          />
        </v-flex>
      </v-flex>
      <v-flex xs3>
        <ListOnTheRight :dataAbsenceList="dataAbsenceList"/>
      </v-flex>
    </v-layout>
    <ModalDetailAbsence
      @closeDialog="isShowAbsenceDetailsModal = false"
      :absenceDetail="absenceDetail"
      :isShow="isShowAbsenceDetailsModal"
      :apiAbsence="apiEmploy"
    />
    <AbsenceCreate
      :getAbsenceReasonsApiUrl="apiEmploy.getReason"
      :items="dataCardCreate"
      :leaveTypes="leaveTypes"
      :popup="popup"
    />
  </div>
</template>
<script>
import AbsenceEmployCard from "../../cards/AbsenceEmployCard";
import ListOnTheRight from "./ListOnTheRight";
import EmployViewContent from "./EmployViewContent";
import ModalDetailAbsence from "../modal-detail-absence/Form";
import AbsenceCreate from "../CreateAbsence";
import { leaveTypes } from "../../../config.js";
import { dataEmployCard, dataCardCreate, dataAbsenceList } from "../data";

export default {
  components: {
    AbsenceEmployCard,
    EmployViewContent,
    ListOnTheRight,
    ModalDetailAbsence,
    AbsenceCreate
  },
  props: {
    dataEmployCard: {
      type: Array,
      default: () => dataEmployCard
    },
    leaveTypes: {
      type: Array,
      default: () => leaveTypes
    },
    dataCardCreate: {
      type: Array,
      default: () => dataCardCreate
    },
    dataAbsenceList: {
      type: Array,
      default: () => dataAbsenceList
    },
    apiEmploy: Object
  },
  data() {
    return {
      dataWhoAbsencing: [],
      dataUpcommingAbsence: [],
      isShowAbsenceDetailsModal: false,
      absenceDetail: null,
      popup: {
        showCreate: false
      }
    };
  },
  mounted() {
    const apiEmployWhoAbsencing = this.apiEmploy.filterWhoAbsencing;
    const apiEmployUpcommingAbsence = this.apiEmploy.filterUpcommingAbsence;
    this.getDataEmployView(apiEmployWhoAbsencing).then(data => {
      const { items } = data;
      this.dataWhoAbsencing = items;
    });
    this.getDataEmployView(apiEmployUpcommingAbsence).then(data => {
      const { items } = data;
      this.dataUpcommingAbsence = items;
    });
  },
  methods: {
    getDataEmployView(url) {
      return new Promise(resolve => {
        this.$http.post(`${url}`).then(res => {
          resolve({
            items: res.data.list,
            totalRecords: res.data.totalRecords
          });
        });
      });
    },
    receivePopupAbsenceApproved() {
      this.popup.showCreate = true;
    },
    receivePopupAbsenceRequest(absenceDetail) {
      this.absenceDetail = absenceDetail;
      this.isShowAbsenceDetailsModal = true;
    }
  }
};
</script>
