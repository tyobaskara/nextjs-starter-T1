import { PureComponent } from 'react';
import Constants from '../../../public/static/js/constants';

// HOC
import WithToken from '../../../HOC/WithToken';

// Components
import Button from '../../../Components/Button/Button.component';

const { 
  cms: {
    route: { loginPage },
    loginTokenName
  }
} = Constants;

class DashboardContainer extends PureComponent {
  render() {
    return (
      <div className="container">
        <h1>Dashboard Page</h1>

        <Button className="btn btn-danger" onClick={this.props.onLogOut}>logout</Button>
      </div>
    )
  }
}

export default WithToken({
  isLoginPage: false,
  redirectRoute: loginPage,
  tokenName: loginTokenName
})(DashboardContainer);
