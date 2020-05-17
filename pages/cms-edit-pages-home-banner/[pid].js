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
    route: '/cms-edit-pages-home/banner',
    name: 'Banner'
  }
];

function CmsEditPagesHomeBannerDetailPage() {
  const breadCrumbListActive = {
    route: '/cms-edit-pages-home/banner',
    name: 'Banner'
  }

  const getProps = () => ({
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/banners',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/banners/update',
    breadCrumbList,
    breadCrumbListActive,
    drawerActiveMenu: editPages,
    inputFileList: ['mobileBanner', 'desktopBanner']
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomeBannerDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesHomeBannerDetailPage;
