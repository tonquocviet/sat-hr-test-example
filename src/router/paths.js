import Absence from "../views/AbsencePage";
import Profile from "../views/ProfilePage";
import OrgChart from "../views/OrgChartPage";
import SettingPage from "../views/SettingPage";
import ReportPage from "../views/ReportPage";
import PolicyAbsencePage from "../views/PolicyAbsencePage";
import EmployListView from "../views/EmployListView";
import PolicyDetailPage from "../views/PolicyDetailPage";

export default [
  {
    path: "/",
    name: "Root",
    redirect: {
      name: "Absence"
    }
  },
  {
    path: "/absence",
    name: "Absence",
    component: Absence
  },
  {
    path: "/absence-profile/:id",
    name: "Profile",
    component: Profile
  },
  {
    path: "/absence-policy",
    name: "AbsencePolicy",
    component: PolicyAbsencePage
  },
  {
    path: "/employ-list-view",
    name: "EmployListView",
    component: EmployListView
  },
  {
    path: "/org-chart",
    name: "OrgChart",
    component: OrgChart
  },
  {
    path: "/absence-policy/:id",
    name: "AbsenceDetail",
    component: PolicyDetailPage
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingPage
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportPage
  }
];
