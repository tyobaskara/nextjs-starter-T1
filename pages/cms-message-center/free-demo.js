// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

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
