import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

// HOC
import WithToken from '../../hoc/WithToken';

// Component
import AdminLayout from '../../components/_layouts/AdminLayout';

const { 
  cms: {
    route: {
      loginPage
    },
    loginTokenName
  }
} = Constants;

export class dashboard extends PureComponent {
  render() {
    return (
      <AdminLayout>
        <div className="container">
          <h1>Dashboard</h1>

          <button className="btn btn-danger" onClick={this.props.onLogOut}>logout</button>
        </div>
      </AdminLayout>
    )
  }
}

export default WithToken({
  isLoginPage: false,
  redirectRoute: loginPage,
  tokenName: loginTokenName
})(dashboard);
