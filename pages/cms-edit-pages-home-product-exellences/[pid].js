// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesDetail from '@components/CmsEditPages-Detail.container';

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
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  }
];

function CmsEditPagesProductExellencesDetailPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const breadCrumbListActive = {
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  }

  const getProps = () => ({
    apiGetDataUrl: `${apiUrl}/product-exellences`,
    apiUpdateUrl: `${apiUrl}/product-exellences/update`,
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
