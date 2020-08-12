// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesDetail from '@components/CmsEditPages-Detail.container';

// Constants
import Constants from '@constants/constants';

// Config
import Config from '@config/api';

const {
  cms: {
    drawerActiveMenu: {
      editPages
    }
  }
} = Constants;

const breadCrumbList = [
  {
    route: '/cms/edit-pages',
    name: 'Edit Pages'
  },
  {
    route: '/cms-edit-pages/home',
    name: 'Home'
  },
  {
    route: '/cms-edit-pages-home/coverage',
    name: 'Coverage Of Clients'
  }
];

function CmsEditPagesHomeCoverageDetailPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    apiGetDataUrl: `${apiUrl}/client-coverage/[id]/details`,
    apiGetDataUrlKey: '[id]',
    apiUpdateUrl: `${apiUrl}/client-coverage?id=[id]`,
    apiUpdateUrlKey: '[id]',
    breadCrumbList,
    activeKey: 'name',
    drawerActiveMenu: editPages,
    inputFileList: [],
    nestedStateKey: ['latitude', 'longitude']
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomeCoverageDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesHomeCoverageDetailPage;
