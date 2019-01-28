import Absence from "../views/AbsencePage";
import Profile from "../views/ProfilePage";
import OrgChart from "../views/OrgChartPage";
import SettingPage from "../views/SettingPage";
import PolicyAbsencePage from "../views/PolicyAbsencePage";
import EmployListView from "../views/EmployListView";

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
    path: "/profile",
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
    path: "/settings",
    name: "Settings",
    component: SettingPage
  }
];
