// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditAboutUsTabList from '@components/CmsEditAboutUs-Tab-List.container';

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
    route: '/cms-edit-pages/about-us',
    name: 'About Us'
  },
  {
    route: '/cms-edit-pages-about-us-section-6',
    name: 'Section 6'
  }
];

function CmsEditPagesAboutUsSection6TabItem() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    titleKey: 'titleEn',
    apiGetKey: 'implementations',
    apiGetListUrl: `${apiUrl}/about-us?section=6`,
    linkActionList:  '/cms-edit-pages-about-us-section-6-tab-item'
  });

  return (
    <LayoutMainCms>
      <CmsEditAboutUsTabList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection6TabItem.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesAboutUsSection6TabItem;
