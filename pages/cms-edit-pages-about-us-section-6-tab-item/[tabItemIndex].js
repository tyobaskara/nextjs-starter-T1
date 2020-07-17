// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditAboutUsTabItemDetail from '@components/CmsEditAboutUs-Tab-Item-Detail.container';

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
  }
];

function CmsEditPagesAboutUsSection6TabItemDetailPage() {
  const breadCrumbListActive = {
    name: ''
  }

  const getProps = () => ({
    apiGetKey: 'implementations',
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us?section=6',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us/section-6/[tabId]/item?itemId=[itemId]',
    breadCrumbList,
    breadCrumbListActive,
    drawerActiveMenu: editPages,
    inputFileList: ['desktopImageEn', 'desktopImageId', 'mobileImageEn', 'mobileImageId']
  });

  return (
    <LayoutMainCms>
      <CmsEditAboutUsTabItemDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection6TabItemDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditPagesAboutUsSection6TabItemDetailPage;
