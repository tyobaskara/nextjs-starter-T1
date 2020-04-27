// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

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
