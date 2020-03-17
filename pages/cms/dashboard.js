import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

// Layout
import AdminLayout from '../../components/_layouts/admin.layout';

// Container
import CmsDashboardContainer from '../../containers/cmsDashboard/cmsDashboard.container';

const { 
  cms: {
    route: { loginPage },
    loginTokenName
  }
} = Constants;

class DashboardPage extends PureComponent {
  render() {
    return (
      <AdminLayout>
        <CmsDashboardContainer />
      </AdminLayout>
    )
  }
}

export default DashboardPage;
