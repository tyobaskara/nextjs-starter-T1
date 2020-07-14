// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

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
