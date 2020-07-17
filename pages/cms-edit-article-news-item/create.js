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
    route: '/cms-edit-pages/article-news',
    name: 'Article and News'
  },
  {
    route: '',
    name: 'Create'
  }
];

const defaultFormData = {
  label: '',
  image: '',
  titleEn: '',
  titleId: '',
  bodyEn: '',
  bodyId: ''
};

function CmsEditPagesAboutUsSection2ItemCreatePage() {
  const getProps = () => ({
    apiCreateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/article',
    breadCrumbList,
    drawerActiveMenu: editPages,
    dataFixture: defaultFormData,
    defaultFormData,
    contentType: 'multipart/form-data',
    inputFileList: ['image'],
    editorList: ['bodyEn', 'bodyId'],
    selectOptionList: [{
      selectKey: 'label',
      options: ['NEWS', 'ARTICLE']
    }]
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
