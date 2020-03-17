import { PureComponent } from 'react';
import Constants from '../../../public/static/js/constants';

// HOC
import WithToken from '../../../HOC/WithToken';

// Components
import Button from '../../../Components/Button';

const { 
  cms: {
    route: { dashboardPage },
    loginTokenName
  }
} = Constants;

class LoginContainer extends PureComponent {
  _onLogin = () => {
    const { onLogin } = this.props;
    const tokenValue = 'token123';

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
