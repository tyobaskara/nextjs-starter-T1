// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsLogin from '@components/CmsLogin.container';

function CmsLoginPage() {
  return (
    <LayoutMainCms>
      <CmsLogin />
    </LayoutMainCms>
  );
}

CmsLoginPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsLoginPage;