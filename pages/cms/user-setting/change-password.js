// Layout
import MainCMSLayout from '../../../components/_layouts/main-cms.layout';

// Container
import CmsChangePassword from '../../../containers/CmsChangePassword/CmsChangePassword.container';

export default function CmsChangePasswordPage(props) {
  return (
    <MainCMSLayout>
      <CmsChangePassword {...props} />
    </MainCMSLayout>
  );
}
