import Absence from "../views/AbsencePage";
import OrgChart from "../views/OrgChartPage";
import SettingPage from "../views/SettingPage";
import PolicyAbsencePage from "../views/PolicyAbsencePage";
import PolicyDetailPage from "../views/PolicyDetailPage";


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
    path: '/absence-policy',
    name: 'AbsencePolicy',
    component: PolicyAbsencePage
  },
  {
    path: '/absence-policy/:id',
    name: 'AbsenceDetail',
    component: PolicyDetailPage
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