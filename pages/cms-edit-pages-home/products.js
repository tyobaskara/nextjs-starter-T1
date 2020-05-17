// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditPagesList from '@components/CmsEditPages-List.container';

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

function CmsEditPagesHomeProductsPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Products',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/products',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/products/delete',
    linkActionList:  '/cms-edit-pages-home-products'
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomeProductsPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesHomeProductsPage;
