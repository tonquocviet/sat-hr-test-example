<template>
  <div class="px-3 py-3">
    <ProfileHeader/>
    <ProfileListDate :dates.sync="daysOff"/>
    <v-layout column>
      <ProfileFooter
        :dataUpcommingAbsence="dataUpcommingAbsence"
        :dataAbsenceList="dataAbsenceList"
        @receivePopupAbsenceApproved="receivePopupAbsenceApproved"
        @receivePopupAbsenceRequest="receivePopupAbsenceRequest"
      />
    </v-layout>
    <ModalDetailAbsence
      @closeDialog="isShowAbsenceDetailsModal = false"
      :absenceDetail="absenceDetail"
      :isShow="isShowAbsenceDetailsModal"
    />
    <AbsenceCreate
      :getAbsenceReasonsApiUrl="apiAbsence.getReason"
      :items="dataCardCreate"
      :leaveTypes="leaveTypes"
      :popup="popup"
    />
  </div>
</template>
<script>
import ProfileHeader from "./ProfileHeader";
import ProfileListDate from "./ProfileListDate";
import ProfileFooter from "./ProfileFooter";
import ModalDetailAbsence from "../modal-detail-absence/Form";
import AbsenceCreate from "../CreateAbsence";
import { leaveTypes } from "../../../config.js";
import { dataCardCreate } from "../data";

export default {
  props: {
    apiAbsence: Object,
    leaveTypes: {
      type: Array,
      default: () => leaveTypes
    },
    dataCardCreate: {
      type: Array,
      default: () => dataCardCreate
    }
  },
  mounted() {
    const apiFilterWhoAbsencing = this.apiAbsence.filterWhoAbsencing;
    const apiFilterUpcommingAbsence = this.apiAbsence.filterUpcommingAbsence;
    this.getDataAbsenceFromApi(apiFilterWhoAbsencing).then(data => {
      const { items } = data;
      this.dataAbsenceList = items;
    });
    this.getDataAbsenceFromApi(apiFilterUpcommingAbsence).then(data => {
      const { items } = data;
      this.dataUpcommingAbsence = items;
    });
  },
  methods: {
    getDataAbsenceFromApi(apiUrl) {
      return new Promise(resolve => {
        this.$http.post(`${apiUrl}`).then(res => {
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
  },
  data() {
    return {
      dataAbsenceList: [],
      dataUpcommingAbsence: [],
      isShowAbsenceDetailsModal: false,
      absenceDetail: null,
      popup: {
        showCreate: false
      },
      daysOff: [
        "2019-01-25",
        "2019-01-26",
        "2019-02-02",
        "2019-02-05",
        "2019-02-15",
        "2019-03-15",
        "2019-04-05",
        "2019-05-12",
        "2019-06-15",
        "2019-07-13",
        "2019-08-23",
        "2019-09-21",
        "2019-11-10"
      ]
    };
  },
  components: {
    ProfileHeader,
    ProfileListDate,
    ProfileFooter,
    ModalDetailAbsence,
    AbsenceCreate
  }
};
</script>
