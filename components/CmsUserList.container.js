import Constants from '@constants/constants';

// HOC
import WithToken from '@hoc/WithToken';

// Components
import CmsUserList from './CmsUserList.component';

// Redux Actions
import { toggleCmsDrawer } from '@redux/actions/cmsDrawerActions';

const { 
  cms: {
    route: { loginPage },
    loginTokenName
  }
} = Constants;

const Container = props => <CmsUserList {...props} />;

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
