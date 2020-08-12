// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditAboutUsTabItemCreate from '@components/CmsEditAboutUs-Tab-Item-Create.container';

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
    route: '/cms-edit-pages/about-us',
    name: 'About Us'
  },
  {
    route: '/cms-edit-pages-about-us-section-6',
    name: 'Section 6'
  }
];

const defaultFormData = {
  titleEn: '',
  titleId: '',
  desktopImageEn: '',
  desktopImageId: '',
  mobileImageEn: '',
  mobileImageId: ''
};

function CmsEditPagesAboutUsSection6TabItemCreatePage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiCreateUrl: `${apiUrl}/about-us/section-6/[tabId]/item`,
    breadCrumbList,
    drawerActiveMenu: editPages,
    dataFixture: defaultFormData,
    defaultFormData,
    inputFileList: ['desktopImageEn', 'desktopImageId', 'mobileImageEn', 'mobileImageId']
  });

  return (
    <LayoutMainCms>
      <CmsEditAboutUsTabItemCreate 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection6TabItemCreatePage.getInitialProps = () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection6TabItemCreatePage;
