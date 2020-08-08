// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesDetail from '@components/CmsEditPages-Detail.container';

// Constants
import Constants from '@constants/constants';

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
  const getProps = () => ({
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/client-coverage/[id]/details',
    apiGetDataUrlKey: '[id]',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/client-coverage?id=[id]',
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
