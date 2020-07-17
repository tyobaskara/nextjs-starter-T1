// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsMessageCenterInquiry from '@components/CmsMessageCenterInquiry.container';

function CmsMessageCenterInquiryPage() {
  return (
    <LayoutMainCms>
      <CmsMessageCenterInquiry />
    </LayoutMainCms>
  );
}

CmsMessageCenterInquiryPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsMessageCenterInquiryPage;
