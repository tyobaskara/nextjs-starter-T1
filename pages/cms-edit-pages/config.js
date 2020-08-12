// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesConfig from '@components/CmsEditPages-Config.container';

// Config
import Config from '@config/api';

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
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    apiConfig: `${apiUrl}/configs`,
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
