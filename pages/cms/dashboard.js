// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsDashboard from '@components/CmsDashboard.container';

function CmsDashboardPage() {
  return (
    <LayoutMainCms>
      <CmsDashboard />
    </LayoutMainCms>
  );
}

CmsDashboardPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsDashboardPage;
