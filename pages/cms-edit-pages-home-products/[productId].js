// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditProductDetail from '@components/CmsEdit-Product-Detail.container';

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
    route: '/cms-edit-pages-home/products',
    name: 'Products'
  }
];

function CmsEditPagesProductsDetailPage() {
  const getProps = () => ({
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/products/list',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/products/[productId]',
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: ['icon', 'dashboardIcon', 'desktopImage', 'mobileImage']
  });

  return (
    <LayoutMainCms>
      <CmsEditProductDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesProductsDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesProductsDetailPage;
