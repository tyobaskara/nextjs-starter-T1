// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesMainList from '@components/CmsEditPages-MainList.container';

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
    route: '/cms-edit-pages-home',
    name: 'Home'
  }
];

const editPagesListRoute = [
  {
    route: '/cms-edit-pages-home/banner',
    name: 'Banner'
  },
  {
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  },
  {
    route: '/cms-edit-pages-home/key-features',
    name: 'Key Features'
  },
  {
    route: '/cms-edit-pages-home/products',
    name: 'Products'
  },
  {
    route: '/cms-edit-pages-home/clients',
    name: 'Clients'
  },
  // {
  //   route: '/cms-edit-pages-home/coverage-of-clients',
  //   name: 'Coverage Of Clients'
  // }
];

function CmsEditPagesHomePage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    editPagesListRoute
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesMainList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomePage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesHomePage;
