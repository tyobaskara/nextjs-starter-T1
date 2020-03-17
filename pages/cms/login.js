import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

// Layout
import AdminLayout from '../../components/_layouts/AdminLayout';

// HOC
import WithToken from '../../hoc/WithToken';

// Components
// import Button from '../../components/button/button.component';

const { 
  cms: {
    route: { dashboardPage },
    loginTokenName
  }
} = Constants;

class LoginPage extends PureComponent {
  _onLogin = () => {
    const { onLogin } = this.props;
    const tokenValue = 'token1234';

    onLogin(tokenValue);
  };

  render() {
    return (
      <AdminLayout>
        <div className="container">
          <h1>Login Page</h1>

          <button className="btn btn-primary" onClick={this._onLogin}>Login</button>
        </div>
      </AdminLayout>
    );
  }
}

export default WithToken({
  isLoginPage: true,
  redirectRoute: dashboardPage,
  tokenName: loginTokenName
})(LoginPage);
