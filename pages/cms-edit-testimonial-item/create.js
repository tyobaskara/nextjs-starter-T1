// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesCreate from '@components/CmsEditPages-Create.container';

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
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    apiCreateUrl: `${apiUrl}/testimonial`,
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
