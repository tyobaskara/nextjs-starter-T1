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
  },
  {
    route: '/cms-edit-pages-about-us-section-5/item',
    name: 'Section 5 - Item'
  }
];

function CmsEditPagesAboutUsSection5ItemDetailPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const breadCrumbListActive = {
    name: ''
  }

  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetKey: 'items',
    apiGetDataUrl: `${apiUrl}/about-us?section=5`,
    apiUpdateUrl: `${apiUrl}/about-us/section-5/item`,
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

CmsEditPagesAboutUsSection5ItemDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection5ItemDetailPage;
