// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditAboutUsDetail from '@components/CmsEditAboutUs-Detail.container';

// Config
import Config from '@config/api';

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
    route: '/cms-edit-pages/about-us',
    name: 'About Us'
  }
];

function CmsEditPagesAboutUsSection1Page() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const breadCrumbListActive = {
    name: `Section`
  }

  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: `${apiUrl}/about-us?section=1`,
    apiUpdateUrl: `${apiUrl}/about-us/section-1`,
    breadCrumbList,
    breadCrumbListActive,
    drawerActiveMenu: editPages,
    inputFileList: ['desktopImageEn', 'desktopImageId', 'mobileImageEn', 'mobileImageId']
  });

  return (
    <LayoutMainCms>
      <CmsEditAboutUsDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection1Page.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection1Page;
