// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsChangePassword from '@components/CmsChangePassword.container';

export default function CmsChangePasswordPage(props) {
  return (
    <LayoutMainCms>
      <CmsChangePassword {...props} />
    </LayoutMainCms>
  );
}
