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
    route: '/cms-edit-pages-home/key-features',
    name: 'Key Features'
  }
];

function CmsEditPagesHomeKeyFeaturesPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Key Features',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/key-features',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/key-features/delete',
    linkActionList:  '/cms-edit-pages-home-key-features',
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

CmsEditPagesHomeKeyFeaturesPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesHomeKeyFeaturesPage;
