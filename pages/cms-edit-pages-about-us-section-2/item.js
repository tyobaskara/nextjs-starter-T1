// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditAboutUsList from '@components/CmsEditAboutUs-List.container';

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
    route: '/cms-edit-pages/about-us',
    name: 'About Us'
  },
  {
    route: '',
    name: 'Section 2 - Item'
  }
];

function CmsEditPagesAboutUsSection2ItemPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Item',
    apiGetKey: 'items',
    apiGetListUrl: `${apiUrl}/about-us?section=2`,
    apiRemoveListUrl: `${apiUrl}/about-us`,
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
