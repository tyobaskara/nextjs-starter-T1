import { PureComponent } from 'react';
import Constants from '../../public/static/js/constants';

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

class CmsDashboardContainer extends PureComponent {
  render() {
    return (
      <div className="container">
        <h1>Dashboard Page</h1>

        <ButtonDanger onClick={this.props.onLogOut}>logout</ButtonDanger>
      </div>
    )
  }
}

export default WithToken({
  isLoginPage: false,
  redirectRoute: loginPage,
  tokenName: loginTokenName
})(CmsDashboardContainer);
