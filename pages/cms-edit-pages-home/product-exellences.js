// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

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
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  }
];

function CmsEditPagesHomeProductExellencesPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Product Exellences',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/product-exellences',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/product-exellences/delete',
    linkActionList:  '/cms-edit-pages-home-product-exellences',
    videoConfig: 'PDE',
    showPagination: true
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomeProductExellencesPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesHomeProductExellencesPage;
