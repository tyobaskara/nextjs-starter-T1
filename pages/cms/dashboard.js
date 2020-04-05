// Layout
import MainCMSLayout from '../../components/_layouts/main-cms.layout';

// Container
import CmsDashboardContainer from '../../containers/cmsDashboard/cmsDashboard.container';

export default function DashboardPage() {
  return (
    <MainCMSLayout>
      <CmsDashboardContainer />
    </MainCMSLayout>
  );
}
