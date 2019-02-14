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
        <v-btn color="primary" @click="popup.showCreate = true">
          <v-icon>add_circle</v-icon>Add New Absence
        </v-btn>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout>
      <v-flex xs9>
        <v-layout row wrap>
          <LeaveTypeCard
            v-for="(item, index) in dataAbsenceBalance.slice(0, 4)"
            :leaveData="item"
            :key="index"
            type="APPLY"
          />
        </v-layout>
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
    />
    <AbsenceCreate :items="dataCardCreate" :leaveTypes="leaveTypes" :popup="popup" employee-view/>
  </div>
</template>
<script>
import ListOnTheRight from "./ListOnTheRight";
import EmployViewContent from "./EmployViewContent";
import ModalDetailAbsence from "../modal-detail-absence/Form";
import AbsenceCreate from "../CreateAbsence";
import LeaveTypeCard from "../../cards/LeaveTypeCard";
import { leaveTypes } from "../../../config.js";
import { dataEmployCard, dataCardCreate, dataAbsenceList } from "../data";

export default {
  components: {
    EmployViewContent,
    ListOnTheRight,
    ModalDetailAbsence,
    AbsenceCreate,
    LeaveTypeCard
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
    }
  },
  data() {
    return {
      dataWhoAbsencing: [],
      dataUpcommingAbsence: [],
      isShowAbsenceDetailsModal: false,
      absenceDetail: null,
      popup: {
        showCreate: false
      },
      dataAbsenceBalance: []
    };
  },
  mounted() {
    const apiEmployWhoAbsencing = this.apiAbsence.filterWhoAbsencing;
    const apiEmployUpcommingAbsence = this.apiAbsence.filterUpcommingAbsence;
    this.getDataEmployView(apiEmployWhoAbsencing).then(data => {
      const { items } = data;
      this.dataWhoAbsencing = items;
    });
    this.getDataEmployView(apiEmployUpcommingAbsence).then(data => {
      const { items } = data;
      this.dataUpcommingAbsence = items;
    });
    this.getAbsenceBalance();
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
    getAbsenceBalance() {
      const url = this.apiAbsence.getAbsenceProfileBalance;
      this.$http.get(url).then(res => {
        this.dataAbsenceBalance = res.data;
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
