// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditFooterSocialMediaDetail from '@components/CmsEdit-Footer-SocialMedia-Detail.container';

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
    route: '/cms-edit-pages/footer',
    name: 'Footer'
  },
  {
    route: '/cms-edit-footer/social-media',
    name: 'Social Media'
  }
];

function CmsEditFooterSocialMediaDetailPage() {
  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/footer',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/footer/social-media/[itemId]',
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: ['icon']
  });

  return (
    <LayoutMainCms>
      <CmsEditFooterSocialMediaDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditFooterSocialMediaDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditFooterSocialMediaDetailPage;
