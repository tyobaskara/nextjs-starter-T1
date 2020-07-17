// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsUserSetting from '@components/CmsUserSetting.container';

function CmsUserSettingPage() {
  return (
    <LayoutMainCms>
      <CmsUserSetting />
    </LayoutMainCms>
  );
}

CmsUserSettingPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsUserSettingPage;
