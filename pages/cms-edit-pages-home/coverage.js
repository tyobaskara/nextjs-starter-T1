// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesList from '@components/CmsEditPages-List.container';

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
    route: '/cms-edit-pages/home',
    name: 'Home'
  },
  {
    route: '/cms-edit-pages-home/coverage',
    name: 'Coverage Of Clients'
  }
];

function CmsEditPagesHomeBannerPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: '',
    titleKey: 'name',
    apiGetListUrl: `${apiUrl}/client-coverage/list`,
    apiRemoveListUrl: `${apiUrl}/client-coverage`,
    linkActionList:  '/cms-edit-pages-home-coverage',
    showPagination: true,
    searchFormKey: 'searchByName'
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomeBannerPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesHomeBannerPage;