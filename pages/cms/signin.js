import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

// HOC
import WithToken from '../../hoc/WithToken';

// Component
import AdminLayout from '../../components/_layouts/AdminLayout';

export class signin extends PureComponent {
  _onSignIn = () => {
    const { onLogin } = this.props;
    const tokenValue = 'token123';

    onLogin(tokenValue);
  };

  render() {
    return (
      <AdminLayout>
        <div className="container">
          <h1>Sign In Form</h1>

          <button className="btn btn-primary" onClick={this._onSignIn}>Sign In</button>
        </div>
      </AdminLayout>
    )
  }
}

export default WithToken({
  isLoginPage: true,
  redirectTo: '/cms/dashboard',
  tokenName: Constants.loginToken
})(signin);
