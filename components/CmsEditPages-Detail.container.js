import { useRouter } from 'next/router'
import Constants from '@constants/constants';

// HOC
import WithToken from '@hoc/WithToken';

// Components
import CmsEditPagesDetail from './CmsEditPages-Detail.component';

// Redux Actions
import { toggleCmsDrawer } from '@redux/actions/cmsDrawerActions';

const { 
  cms: {
    route: { loginPage },
    loginTokenName
  }
} = Constants;

const Container = props => {
  const router = useRouter();
  const { pid, listId } = router.query;
  const newProps = {
    ...props,
    listId,
    pid,
  };

  return <CmsEditPagesDetail {...newProps} />
};

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
