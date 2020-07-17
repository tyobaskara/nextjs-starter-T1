// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesCreate from '@components/CmsEditPages-Create.container';

// Constants
import Constants from '@constants/constants';
import dataFixture from '@constants/fixtures.keyFeatures';

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
    route: '/cms-edit-pages-home/key-features',
    name: 'Key Features'
  },
  {
    route: '/cms-edit-pages-home-key-features/create',
    name: 'Create'
  }
];

const defaultFormData = {
  textIdn: '',
  textEn: '',
  image: ''
};

function CmsEditPagesKeyFeaturesCreatePage() {
  const getProps = () => ({
    apiCreateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/key-features',
    breadCrumbList,
    drawerActiveMenu: editPages,
    dataFixture,
    defaultFormData,
    inputFileList: ['image']
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesCreate 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesKeyFeaturesCreatePage.getInitialProps = () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesKeyFeaturesCreatePage;
