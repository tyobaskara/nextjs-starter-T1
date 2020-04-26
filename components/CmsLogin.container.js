import Constants from '@constants/constants';

// HOC
import WithToken from '@hoc/WithToken';

// Component
import CmsLogin from './CmsLogin.component';

const { 
  cms: {
    route: { dashboardPage },
    loginTokenName
  }
} = Constants;

const Container = props => <CmsLogin {...props} />

export default WithToken({
  isLoginPage: true,
  redirectRoute: dashboardPage,
  tokenName: loginTokenName
})(Container);
