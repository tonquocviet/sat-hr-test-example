import Absence from "../views/AbsencePage";
import OrgChart from "../views/OrgChartPage";
import SettingPage from "../views/SettingPage";
import PolicyPage from "../views/PolicyPage";

export default [
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'Absence'
    }
  },
  {
    path: '/absence',
    name: 'Absence',
    component: Absence
  },
  {
    path: '/policies',
    name: 'Policy',
    component: PolicyPage
  },
  {
    path: '/org-chart',
    name: 'OrgChart',
    component: OrgChart
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingPage
  }
];
