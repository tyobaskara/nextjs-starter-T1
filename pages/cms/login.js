import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

// HOC
import WithToken from '../../hoc/WithToken';

// Component
import AdminLayout from '../../components/_layouts/AdminLayout';

export class login extends PureComponent {
  _onLogin = () => {
    const { onLogin } = this.props;
    const tokenValue = 'token123';

    onLogin(tokenValue);
  };

  render() {
    return (
      <AdminLayout>
        <div className="container">
          <h1>Login Form</h1>

          <button className="btn btn-primary" onClick={this._onLogin}>Login</button>
        </div>
      </AdminLayout>
    )
  }
}

export default WithToken({
  isLoginPage: true,
  redirectRoute: '/cms/dashboard',
  tokenName: Constants.loginToken
})(login);
