import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

// HOC
import WithToken from '../../hoc/WithToken';

const { 
  cms: {
    route: { dashboardPage },
    loginTokenName
  }
} = Constants;

class CmsLoginContainer extends PureComponent {
  _onLogin = () => {
    const { onLogin } = this.props;
    const tokenValue = 'token1234';

    onLogin(tokenValue);
  };

  render() {
    return (
      <div className="container">
        <h1>Login Page</h1>

        <button className="btn btn-primary" onClick={this._onLogin}>Login</button>
      </div>
    );
  }
}

export default WithToken({
  isLoginPage: true,
  redirectRoute: dashboardPage,
  tokenName: loginTokenName
})(CmsLoginContainer);
