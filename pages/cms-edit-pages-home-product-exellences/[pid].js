// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

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
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  }
];

function CmsEditPagesProductExellencesDetailPage() {
  const breadCrumbListActive = {
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  }

  const getProps = () => ({
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/product-exellences',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/product-exellences/update',
    breadCrumbList,
    breadCrumbListActive,
    drawerActiveMenu: editPages,
    inputFileList: ['image']
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesProductExellencesDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesProductExellencesDetailPage;
