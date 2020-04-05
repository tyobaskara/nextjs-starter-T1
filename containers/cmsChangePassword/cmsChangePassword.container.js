import Constants from '../../public/static/js/constants';

// HOC
import WithToken from '../../hoc/WithToken';

// Components
import CmsChangePasswordComponent from './cmsChangePassword.component';

// Redux Actions
import { toggleCmsDrawer } from '../../redux/actions/cmsDrawerActions';

const { 
  cms: {
    route: { loginPage },
    loginTokenName
  }
} = Constants;

const Container = props => <CmsChangePasswordComponent {...props} />;

const mapStateToProps = state => ({
  cmsDrawer: state.cmsDrawer
});

const mapDispatchToProps = {
  toggleCmsDrawer
};

export default WithToken({
  connect: { mapStateToProps, mapDispatchToProps },
  isLoginPage: false,
  redirectRoute: loginPage,
  tokenName: loginTokenName
})(Container);
