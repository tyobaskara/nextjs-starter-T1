// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

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
