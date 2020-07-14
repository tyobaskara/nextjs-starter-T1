import { useRouter } from 'next/router'
import Constants from '@constants/constants';

// HOC
import WithToken from '@hoc/WithToken';

// Components
import CmsEditAboutUsDetail from './CmsEditAboutUs-Detail.component';

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
  const { sectionNumber, itemId, itemIndex } = router.query;
  const newProps = {
    ...props,
    sectionNumber,
    itemId,
    itemIndex
  };

  return <CmsEditAboutUsDetail {...newProps} />
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
