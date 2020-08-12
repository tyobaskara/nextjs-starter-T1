// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditFooterSocialMediaDetail from '@components/CmsEdit-Footer-SocialMedia-Detail.container';

// Config
import Config from '@config/api';

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
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: `${apiUrl}/footer`,
    apiUpdateUrl: `${apiUrl}/footer/social-media/[itemId]`,
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
