// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsChangePassword from '@components/CmsChangePassword.container';

function CmsChangePasswordPage(props) {
  return (
    <LayoutMainCms>
      <CmsChangePassword {...props} />
    </LayoutMainCms>
  );
}

CmsChangePasswordPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsChangePasswordPage;
