/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import CmsEditProductListAction from '@components/CmsEdit-Product-List-Action.component';

export default function CmsEditProductList(props) {
  const _renderCmsEditProductListAction = () => {
    const { token, apiGetListUrl, showPagination = false,
      breadCrumbList, linkActionList, listTitle, routeType, productId } = props;

    return (
      <CmsEditProductListAction 
        title={listTitle}
        apiGetListUrl={apiGetListUrl}
        breadCrumbList={breadCrumbList}
        linkActionList={linkActionList}
        token={token}
        showPagination={showPagination}
        routeType={routeType}
        productId={productId}
      />
    );
  };

  return (
    <LayoutCms 
      {...props}
      activeMenu={props.drawerActiveMenu}
    >
      <div className='cms-wrapper'>
        <div className='cms-container'>
          {_renderCmsEditProductListAction()}
        </div>
      </div>
    </LayoutCms>
  );
}
