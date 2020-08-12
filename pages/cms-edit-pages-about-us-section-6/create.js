// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesCreate from '@components/CmsEditPages-Create.container';

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
    route: '/cms-edit-pages-about-us-section-6',
    name: 'Section 6'
  },
  {
    route: '',
    name: 'Create'
  }
];

const defaultFormData = {
  technologyId: '',
  technologyEn: ''
};

function CmsEditPagesAboutUsSection6CreatePage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    apiCreateUrl: `${apiUrl}/about-us/section-6`,
    breadCrumbList,
    drawerActiveMenu: editPages,
    dataFixture: defaultFormData,
    defaultFormData,
    contentType: 'application/json',
    inputFileList: []
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesCreate 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection6CreatePage.getInitialProps = () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection6CreatePage;
