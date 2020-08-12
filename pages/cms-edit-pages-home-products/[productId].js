// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditProductDetail from '@components/CmsEdit-Product-Detail.container';

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
    route: '/cms-edit-pages-home/products',
    name: 'Products'
  }
];

function CmsEditPagesProductsDetailPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    apiGetDataUrl: `${apiUrl}/products/list`,
    apiUpdateUrl: `${apiUrl}/products/[productId]`,
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: ['icon', 'dashboardIcon', 'desktopImage', 'mobileImage'],
    whiteList: ['dashboardIcon', 'descriptionEn', 'descriptionId', 'link', 'titleEn', 'titleId']
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
