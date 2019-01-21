import Absence from "../components/AbsenceWrapper";
import OrgChart from "../views/OrgChartPage";
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
  }
];
