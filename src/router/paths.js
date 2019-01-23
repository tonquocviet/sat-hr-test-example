import Absence from "../views/AbsencePage";
import Profile from "../views/ProfilePage";
import OrgChart from "../views/OrgChartPage";
export default [{
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
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/org-chart',
    name: 'OrgChart',
    component: OrgChart
  }
];