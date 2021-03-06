import Vue from "vue";
import Axios from "axios";

Vue.prototype.$http = Axios;

const baseUrl =
  "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
Vue.prototype.apiAbsence = {
  filterAbsences: `${baseUrl}/absence/filter`,
  filterWhoAbsencing: `${baseUrl}/absence/filter-absencing`,
  filterUpcommingAbsence: `${baseUrl}/absence/filter-upcomming`,
  filterTeamPlannedAbsencing: `${baseUrl}/absence/filter-absencing`,
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
  getAbsenceProfileBalance: `${baseUrl}/my-absence-profile/balance`,
  getAbsenceProfileCalendar: `${baseUrl}/my-absence-profile/leave-data`,
  getEmployees: `${baseUrl}/get-employees`,
  availablePolicies: employeeId =>
    `${baseUrl}/employee/${employeeId}/available-policies`,
  absencePolicyReasons: policyId =>
    `${baseUrl}/absence-policy/${policyId}/reasons`,
  getMonthAbsenceStatistic: policyId =>
    `${baseUrl}/absence-policy/${policyId}/month-absence-statistics`
};
Vue.prototype.apiPolicy = {
  filterPolicy: `${baseUrl}/absence-policy/filter`,
  filterTablePerformance: policyId =>
    `${baseUrl}/absence-policy/${policyId}/absences/filter`,
  filterCountPolicy: `${baseUrl}/absence-policy/count`,
  getCountries: `${baseUrl}/get-countries`,
  filterTableEmpoloyee: policyId =>
    `${baseUrl}/absence-policy/${policyId}/employees/filter`,
};
