<template>
  <div class="px-3 py-3">
    <ProfileHeader :employeeProfile="employeeProfile"></ProfileHeader>
    <ProfileListDate
      :dates.sync="daysOff"
      :tags="tags"
      @getDataAbsenceDaysOff="getDataAbsenceDaysOff"
    ></ProfileListDate>
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
      isViewOnly
    />
    <AbsenceCreate :items="dataCardCreate" :leaveTypes="leaveTypes" :popup="popup"/>
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
    leaveTypes: {
      type: Array,
      default: () => leaveTypes
    },
    dataCardCreate: {
      type: Array,
      default: () => dataCardCreate
    }
  },
  data() {
    return {
      daysOff: [],
      employeeProfile: null,
      items: [
        {
          startDate: "25 Aug, Sun",
          endDate: "25 Aug, Sun",
          leaveType: "Nguyễn",
          approvedBy: "Văn",
          status: "approved",
          address: "Duy Sơn"
        },
        {
          startDate: "25 Aug, Sun",
          endDate: "25 Aug, Sun",
          leaveType: "Nguyễn",
          approvedBy: "Văn",
          status: "pending",
          address: "Duy Sơn"
        },
        {
          startDate: "25 Aug, Sun",
          endDate: "25 Aug, Sun",
          leaveType: "Nguyễn",
          approvedBy: "Văn",
          status: "canceled",
          address: "Duy Sơn"
        }
      ],
      tags: [
        { name: "Military Leave" },
        { name: "Jury Duty" },
        { name: "Religious Observance" },
        { name: "Bereavement" },
        { name: "Pregnancy" },
        { name: "Vacation" },
        { name: "Holiday" },
        { name: "Sick Leave" },
        { name: "Business Trip" },
        { name: "Maternity/Paternity" },
        { name: "Temporary Disability " },
        { name: "Childbirth" },
        { name: "Administrative Leave" }
      ],
      dataAbsenceList: [],
      dataUpcommingAbsence: [],
      isShowAbsenceDetailsModal: false,
      absenceDetail: null,
      popup: {
        showCreate: false
      }
    };
  },
  components: {
    ProfileHeader,
    ProfileListDate,
    ProfileFooter,
    ModalDetailAbsence,
    AbsenceCreate
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
    this.getEmployeeProfile();
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
    getDataAbsenceDaysOff(year) {
      const id = this.$route.params.id;
      const apiAbsenceDaysOff = this.apiAbsence.getAbsenceDaysOff(id);
      this.$http
        .get(apiAbsenceDaysOff, {
          params: {
            year
          }
        })
        .then(res => {
          this.daysOff = res.data.leaveData;
        });
    },
    receivePopupAbsenceApproved() {
      this.popup.showCreate = true;
    },
    receivePopupAbsenceRequest(absenceDetail) {
      this.absenceDetail = absenceDetail;
      this.isShowAbsenceDetailsModal = true;
    },
    getEmployeeProfile() {
      const id = this.$route.params.id;
      this.$http
        .get(this.apiAbsence.getAbsenceEmployeeProfileApi(id))
        .then(res => {
          debugger;
          this.employeeProfile = res.data;
        });
    }
  }
};
</script>
