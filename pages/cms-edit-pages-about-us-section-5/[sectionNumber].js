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

function CmsEditPagesAboutUsSection5Page() {
  const breadCrumbListActive = {
    name: `Section`
  }

  const getProps = () => ({
    contentType: 'application/json',
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us?section=5',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us/section-5',
    breadCrumbList,
    breadCrumbListActive,
    drawerActiveMenu: editPages,
    inputFileList: []
  });

  return (
    <LayoutMainCms>
      <CmsEditAboutUsDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection5Page.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection5Page;
