// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditFooterDetail from '@components/CmsEdit-Footer-Detail.container';

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
  const getProps = () => ({
    contentType: 'application/json',
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/footer',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/footer',
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
