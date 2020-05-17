// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditPagesCreate from '@components/CmsEditPages-Create.container';

// Constants
import Constants from '@constants/constants';
import dataFixture from '@constants/productExellences.fixtures';

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
    route: '/cms-edit-pages-home/product-exellences',
    name: 'Product Exellences'
  },
  {
    route: '/cms-edit-pages-home-product-exellences/create',
    name: 'Create'
  }
];

const defaultFormData = {
  titleIdn: '',
  titleEn: '',
  descriptionIdn: '',
  descriptionEn: '',
  image: ''
};

function CmsEditPagesProductExellencesCreatePage() {
  const getProps = () => ({
    apiCreateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/product-exellences',
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

CmsEditPagesProductExellencesCreatePage.getInitialProps = () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesProductExellencesCreatePage;
