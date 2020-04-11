// Layout
import MainCMSLayout from '~/components/_layouts/main-cms.layout';

// Container
import CmsCreateUser from '~/containers/CmsCreateUser/CmsCreateUser.container';

export default function CmsCreateUserPage() {
  return (
    <MainCMSLayout>
      <CmsCreateUser />
    </MainCMSLayout>
  );
}
