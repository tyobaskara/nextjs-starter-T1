// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

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
    route: '/cms-edit-pages/about-us',
    name: 'About Us'
  }
];

const editPagesListRoute = [
  {
    route: '/cms-edit-pages-about-us-section-1/1',
    name: 'Section 1'
  },
  {
    route: '/cms-edit-pages-about-us-section-2/2',
    name: 'Section 2'
  },
  {
    route: '/cms-edit-pages-about-us-section-2/item',
    name: 'Section 2 - Item'
  },
  {
    route: '/cms-edit-pages-about-us-section-3/3',
    name: 'Section 3'
  },
  {
    route: '/cms-edit-pages-about-us-section-4/4',
    name: 'Section 4'
  },
  {
    route: '/cms-edit-pages-about-us-section-5/5',
    name: 'Section 5'
  },
  {
    route: '/cms-edit-pages-about-us-section-5/item',
    name: 'Section 5 - Item'
  },
  {
    route: '/cms-edit-pages-about-us-section-6',
    name: 'Section 6'
  }
];

function CmsEditPagesAboutUsPage() {
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

CmsEditPagesAboutUsPage.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesAboutUsPage;
