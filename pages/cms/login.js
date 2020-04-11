// Layout
import MainCMSLayout from '~/components/_layouts/main-cms.layout';

// Container
import CmsLogin from '~/containers/CmsLogin/CmsLogin.container';

export default function CmsLoginPage() {
  return (
    <MainCMSLayout>
      <CmsLogin />
    </MainCMSLayout>
  );
}
