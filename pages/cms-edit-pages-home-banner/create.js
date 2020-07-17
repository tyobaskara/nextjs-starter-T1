// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesCreate from '@components/CmsEditPages-Create.container';

// Constants
import Constants from '@constants/constants';
import dataFixture from '@constants/fixtures.bannerData';

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
  },
  {
    route: '/cms-edit-pages-home-banner/create',
    name: 'Create'
  }
];

const defaultFormData = {
  titleIdn: '',
  titleEn: '',
  descriptionIdn: '',
  descriptionEn: '',
  buttonIdn: '',
  buttonEn: '',
  buttonLink: '',
  desktopBannerIdn: '',
  desktopBannerEn: '',
  mobileBannerIdn: '',
  mobileBannerEn: ''
};

function CmsEditPagesHomeBannerCreatePage() {
  const getProps = () => ({
    apiCreateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/banners',
    breadCrumbList,
    drawerActiveMenu: editPages,
    dataFixture,
    defaultFormData,
    inputFileList: ['mobileBanner', 'desktopBanner']
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesCreate 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomeBannerCreatePage.getInitialProps = () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesHomeBannerCreatePage;
