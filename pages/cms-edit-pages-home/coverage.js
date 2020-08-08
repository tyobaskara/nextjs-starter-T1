// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesList from '@components/CmsEditPages-List.container';

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
    route: '/cms-edit-pages/home',
    name: 'Home'
  },
  {
    route: '/cms-edit-pages-home/coverage',
    name: 'Coverage Of Clients'
  }
];

function CmsEditPagesHomeBannerPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: '',
    titleKey: 'name',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/client-coverage/list',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/client-coverage',
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
