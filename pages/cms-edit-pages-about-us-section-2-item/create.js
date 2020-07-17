// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesCreate from '@components/CmsEditPages-Create.container';

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
    route: '/cms-edit-pages-about-us-section-2/item',
    name: 'Section 2 - Item'
  },
  {
    route: '',
    name: 'Create'
  }
];

const defaultFormData = {
  descriptionEn: '',
  descriptionId: '',
  titleEn: '',
  titleId: ''
};

function CmsEditPagesAboutUsSection2ItemCreatePage() {
  const getProps = () => ({
    apiCreateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us/section-2/item',
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

CmsEditPagesAboutUsSection2ItemCreatePage.getInitialProps = () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection2ItemCreatePage;
