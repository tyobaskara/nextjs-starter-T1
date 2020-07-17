// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditAboutUsDetail from '@components/CmsEditAboutUs-Detail.container';

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

function CmsEditPagesAboutUsSection2Page() {
  const breadCrumbListActive = {
    name: `Section`
  }

  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us?section=2',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us/section-2',
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

CmsEditPagesAboutUsSection2Page.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection2Page;
