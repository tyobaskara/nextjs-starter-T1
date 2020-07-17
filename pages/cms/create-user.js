// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsCreateUser from '@components/CmsCreateUser.container';

function CmsCreateUserPage() {
  return (
    <LayoutMainCms>
      <CmsCreateUser />
    </LayoutMainCms>
  );
}

CmsCreateUserPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsCreateUserPage;
