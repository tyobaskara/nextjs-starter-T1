import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

// Layout
import AdminLayout from '../../components/_layouts/admin.layout';

// HOC
import WithToken from '../../hoc/WithToken';

// Components
import ButtonDanger from '../../components/buttonDanger/buttonDanger.component';

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
          <div className="container">
            <h1>Dashboard Pagee</h1>

            <ButtonDanger onClick={this.props.onLogOut}>logout</ButtonDanger>
          </div>
      </AdminLayout>
    )
  }
}

export default WithToken({
  isLoginPage: false,
  redirectRoute: loginPage,
  tokenName: loginTokenName
})(DashboardPage);
