// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditProductList from '@components/CmsEdit-Product-List.container';

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
    route: '/cms-edit-pages/product',
    name: 'Product'
  }
];

function CmsEditPagesHomeProductsPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Product',
    apiGetListUrl: `${apiUrl}/products`,
    linkActionList:  '/cms-edit-product-item-list'
  });

  return (
    <LayoutMainCms>
      <CmsEditProductList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomeProductsPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesHomeProductsPage;
