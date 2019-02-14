import Vue from "vue";
import Axios from "axios";

Vue.prototype.$http = Axios;

const baseUrl =
  "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
Vue.prototype.apiAbsence = {
  filterAbsences: `${baseUrl}/absence/filter`,
  filterWhoAbsencing: `${baseUrl}/absence/filter-absencing`,
  filterUpcommingAbsence: `${baseUrl}/absence/filter-upcomming`,
  getReason: `${baseUrl}/absence/get-reasons`,
  approveRequest: `${baseUrl}/absence/approve-request`,
  getAbsenceHRApprovers: absenceId =>
    `${baseUrl}/absence/${absenceId}/approvers`,
  getAbsenceDaysOff: id => `${baseUrl}/absence-profile/${id}/leave-data`,
  getAbsenceBalance: id => `${baseUrl}/absence-profile/${id}/balance`,
  getCommentAbsence: absenceId => `${baseUrl}/absence/${absenceId}/comments`,
  getAbsencePolicies: absenceId => `${baseUrl}/absence/${absenceId}/policies`,
  rejectRequest: `${baseUrl}/absence/reject-request`,
  getAbsenceReportUrl: month => `${baseUrl}/absence/report/${month}`,
  getAbsenceEmployeeProfileApi: employeeId =>
    `${baseUrl}/employee/${employeeId}/profile`,
  getEmployees: `${baseUrl}/get-employees`,
  availablePolicies: employeeId =>
    `${baseUrl}/employee/${employeeId}/available-policies`
};
Vue.prototype.apiPolicy = {
  filterPolicy: `${baseUrl}/absence-policy/filter`,
  filterTablePerformance: `${baseUrl}/absence/filter`,
  filterCountPolicy: `${baseUrl}/absence-policy/count`,
  getCountries: `${baseUrl}/get-countries`
};
