// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditPages from '@components/CmsEditPages.container';

function CmsEditPagesPage() {
  return (
    <LayoutMainCms>
      <CmsEditPages />
    </LayoutMainCms>
  );
}

CmsEditPagesPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesPage;
