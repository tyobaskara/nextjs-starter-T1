// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditAboutUsTabList from '@components/CmsEditAboutUs-Tab-List.container';

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
  },
  {
    route: '/cms-edit-pages-about-us-section-6',
    name: 'Section 6'
  }
];

function CmsEditPagesAboutUsSection6TabItem() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    titleKey: 'titleEn',
    apiGetKey: 'implementations',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us?section=6',
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
