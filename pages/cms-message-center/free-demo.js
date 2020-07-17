// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsMessageCenterFreeDemo from '@components/CmsMessageCenterFreeDemo.container';

function CmsMessageCenterFreeDemoPage() {
  return (
    <LayoutMainCms>
      <CmsMessageCenterFreeDemo />
    </LayoutMainCms>
  );
}

CmsMessageCenterFreeDemoPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsMessageCenterFreeDemoPage;
