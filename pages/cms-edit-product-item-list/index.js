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

function CmsEditProductItemDetailPage() {
  const getBreadCrumbList = Cookies.get('cmsProductItemBreadCrumb');
  const breadCrumbList = getBreadCrumbList ? 
    JSON.parse(getBreadCrumbList) : [];

  const getProps = () => ({
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/products/[productId]/items',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/products/[productId]/items?id=[itemId]',
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
