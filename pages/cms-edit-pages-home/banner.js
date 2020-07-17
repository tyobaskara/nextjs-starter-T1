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
    route: '/cms-edit-pages-home/banner',
    name: 'Banner'
  }
];

function CmsEditPagesHomeBannerPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Banner',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/banners',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/banners/delete',
    linkActionList:  '/cms-edit-pages-home-banner',
    showPagination: true
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
