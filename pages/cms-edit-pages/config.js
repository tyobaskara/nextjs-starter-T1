// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditPagesConfig from '@components/CmsEditPages-Config.container';

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
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  },
  {
    route: '/cms-edit-pages/config',
    name: 'Config'
  }
];

function CmsEditPagesConfigPage() {
  const getProps = () => ({
    apiConfig: 'http://nonprod.dhealth.arinanda.com/api/v1/configs',
    breadCrumbList,
    drawerActiveMenu: editPages
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesConfig 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesConfigPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesConfigPage;
