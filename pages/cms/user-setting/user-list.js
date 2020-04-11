// Layout
import MainCMSLayout from '~/components/_layouts/main-cms.layout';

// Container
import CmsUserList from '~/containers/CmsUserList/CmsUserList.container';

export default function CmsUserListPage() {
  return (
    <MainCMSLayout>
      <CmsUserList />
    </MainCMSLayout>
  );
}
