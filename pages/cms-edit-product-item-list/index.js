import Cookies from 'js-cookie';

// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditProductItemDetail from '@components/CmsEdit-Product-Item-Detail.container';

// Constants
import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      editPages
    }
  }
} = Constants;

// Config
import Config from '@config/api';

function CmsEditProductItemDetailPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getBreadCrumbList = Cookies.get('cmsProductItemBreadCrumb');
  const breadCrumbList = getBreadCrumbList ? 
    JSON.parse(getBreadCrumbList) : [];

  const getProps = () => ({
    apiGetDataUrl: `${apiUrl}/products/[productId]/items`,
    apiUpdateUrl: `${apiUrl}/products/[productId]/items?id=[itemId]`,
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: ['icon'],
    editorList: ['descriptionEn', 'descriptionId', 'featuresEn', 'featuresId']
    // unorderedList: ['featuresEn', 'featuresId']
  });

  return (
    <LayoutMainCms>
      <CmsEditProductItemDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditProductItemDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditProductItemDetailPage;
