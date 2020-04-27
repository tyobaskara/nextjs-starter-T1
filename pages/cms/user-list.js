// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsUserList from '@components/CmsUserList.container';

function CmsUserListPage() {
  return (
    <LayoutMainCms>
      <CmsUserList />
    </LayoutMainCms>
  );
}

CmsUserListPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsUserListPage;
