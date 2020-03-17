import { PureComponent } from 'react';
import Constants from '../../../public/static/js/constants';

// HOC
import WithToken from '../../../hoc/WithToken';

// Components
import Button from '../../../components/button/button.component';

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
        <h1>Dashboard Pagee</h1>

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
