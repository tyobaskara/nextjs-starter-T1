// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditAboutUsList from '@components/CmsEditAboutUs-List.container';

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
    route: '',
    name: 'Section 2 - Item'
  }
];

function CmsEditPagesAboutUsSection2ItemPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Item',
    apiGetKey: 'items',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us?section=2',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/about-us',
    linkActionList:  '/cms-edit-pages-about-us-section-2-item'
  });

  return (
    <LayoutMainCms>
      <CmsEditAboutUsList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesAboutUsSection2ItemPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesAboutUsSection2ItemPage;
