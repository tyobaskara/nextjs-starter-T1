// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditProductList from '@components/CmsEdit-Product-List.container';

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
    route: '/cms-edit-pages-home/product',
    name: 'Product'
  }
];

function CmsEditPagesHomeProductsPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Product',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/products',
    linkActionList:  '/cms-edit-product-item/list',
    routeType: 'productItemList'
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
