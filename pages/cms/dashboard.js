// Layout
import MainCMSLayout from '~/components/_layouts/main-cms.layout';

// Container
import CmsDashboard from '~/containers/CmsDashboard/CmsDashboard.container';

export default function CmsDashboardPage() {
  return (
    <MainCMSLayout>
      <CmsDashboard />
    </MainCMSLayout>
  );
}
