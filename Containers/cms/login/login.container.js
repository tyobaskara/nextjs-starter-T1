import { PureComponent } from 'react';
import Constants from '../../../public/static/js/constants';

// HOC
import WithToken from '../../../hoc/WithToken';

// Components
import Button from '../../../components/button/button.component';

const { 
  cms: {
    route: { dashboardPage },
    loginTokenName
  }
} = Constants;

class LoginContainer extends PureComponent {
  _onLogin = () => {
    const { onLogin } = this.props;
    const tokenValue = 'token1234';

    onLogin(tokenValue);
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1>Login Page</h1>

          <Button className="btn btn-primary" onClick={this._onLogin}>Login</Button>
        </div>
      </div>
    );
  }
}

export default WithToken({
  isLoginPage: true,
  redirectRoute: dashboardPage,
  tokenName: loginTokenName
})(LoginContainer);
