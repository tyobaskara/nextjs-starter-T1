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
    route: '/cms-edit-pages/testimonial',
    name: 'Testimonial'
  },
  {
    route: '',
    name: 'Create'
  }
];

const defaultFormData = {
  job: '',
  name: '',
  problemEn: '',
  problemId: '',
  quotationEn: '',
  quotationId: '',
  solutionEn: '',
  solutionId: '',
  video: '',
  photo: '',
};

function CmsEditPagesAboutUsSection2ItemCreatePage() {
  const getProps = () => ({
    apiCreateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/testimonial',
    breadCrumbList,
    drawerActiveMenu: editPages,
    dataFixture: defaultFormData,
    defaultFormData,
    contentType: '',
    inputFileList: ['photo']
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
