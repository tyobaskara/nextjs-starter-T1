// Layout
import AdminLayout from '../../components/_layouts/admin.layout';

// Container
import CmsLoginContainer from '../../containers/cmsLogin/cmsLogin.container';

export default function LoginPage() {
  return (
    <AdminLayout>
      <CmsLoginContainer />
    </AdminLayout>
  );
}
