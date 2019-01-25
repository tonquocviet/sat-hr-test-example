import Absence from "../views/AbsencePage";
import OrgChart from "../views/OrgChartPage";
import SettingPage from "../views/SettingPage";
import ReportPage from "../views/ReportPage";

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
    path: '/org-chart',
    name: 'OrgChart',
    component: OrgChart
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingPage
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportPage
  }
];
