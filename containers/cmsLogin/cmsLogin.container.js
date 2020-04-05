import Constants from '../../public/static/js/constants';

// HOC
import WithToken from '../../hoc/WithToken';

// Component
import CmsLoginComponent from './cmsLogin.component';

const { 
  cms: {
    route: { dashboardPage },
    loginTokenName
  }
} = Constants;

const Container = props => <CmsLoginComponent {...props} />

export default WithToken({
  isLoginPage: true,
  redirectRoute: dashboardPage,
  tokenName: loginTokenName
})(Container);
