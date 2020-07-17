// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditPagesMainList from '@components/CmsEditPages-MainList.container';

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
  }
];

const editPagesListRoute = [
  {
    route: '/cms-edit-footer/data',
    name: 'Data'
  },
  {
    route: '/cms-edit-footer/social-media',
    name: 'Social Media'
  }
];

function CmsEditPagesHomePage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    editPagesListRoute
  });

  return (
    <LayoutMainCms>
      <CmsEditPagesMainList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesHomePage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesHomePage;
