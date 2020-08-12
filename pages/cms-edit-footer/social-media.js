// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditFooterSocialMediaList from '@components/CmsEdit-Footer-SocialMedia-List.container';

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

function CmsEditFooterSocialMediaPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Social Media',
    apiGetListUrl: `${apiUrl}/footer`,
    apiRemoveListUrl: '',
    linkActionList:  '/cms-edit-footer-social-media',
    btnAddList: false,
    btnRemoveList: false
  });

  return (
    <LayoutMainCms>
      <CmsEditFooterSocialMediaList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditFooterSocialMediaPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditFooterSocialMediaPage;
