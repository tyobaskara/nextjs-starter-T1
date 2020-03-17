// Layout
import AdminLayout from '../../components/_layouts/admin.layout';

// Container
import CmsDashboardContainer from '../../containers/cmsDashboard/cmsDashboard.container';

export default function DashboardPage() {
  return (
    <AdminLayout>
      <CmsDashboardContainer />
    </AdminLayout>
  );
}
