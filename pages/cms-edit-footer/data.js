// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditFooterDetail from '@components/CmsEdit-Footer-Detail.container';

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
    route: '/cms-edit-pages/footer',
    name: 'Footer'
  },
  {
    route: '/cms-edit-footer/data',
    name: 'Data'
  }
];

function CmsEditFooterDataPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    contentType: 'application/json',
    apiGetDataUrl: `${apiUrl}/footer`,
    apiUpdateUrl: `${apiUrl}/footer`,
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: []
  });

  return (
    <LayoutMainCms>
      <CmsEditFooterDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditFooterDataPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditFooterDataPage;
