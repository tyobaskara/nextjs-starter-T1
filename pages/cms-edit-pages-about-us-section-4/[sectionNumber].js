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

function CmsEditPagesAboutUsSection4Page() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const breadCrumbListActive = {
    name: `Section`
  }

  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: `${apiUrl}/about-us?section=4`,
    apiUpdateUrl: `${apiUrl}/about-us/section-4`,
    breadCrumbList,
    breadCrumbListActive,
    drawerActiveMenu: editPages,
    inputFileList: ['desktopImage', 'mobileImage']
  });

  return (
    <LayoutMainCms>
      <CmsEditAboutUsDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection4Page.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection4Page;
