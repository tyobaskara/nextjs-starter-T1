// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsMessageCenter from '@components/CmsMessageCenter.container';

function CmsMessageCenterPage() {
  return (
    <LayoutMainCms>
      <CmsMessageCenter />
    </LayoutMainCms>
  );
}

CmsMessageCenterPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsMessageCenterPage;
