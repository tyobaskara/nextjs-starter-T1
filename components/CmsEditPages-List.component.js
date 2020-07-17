/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import CmsEditPagesListAction from '@components/CmsEditPages-List-Action.component';

export default function CmsEditPagesList(props) {
  const _renderCmsEditPagesListAction = () => {
    const { token, apiGetListUrl, apiRemoveListUrl, showPagination = false,
      breadCrumbList, linkActionList, listTitle, videoConfig } = props;

    return (
      <CmsEditPagesListAction 
        title={listTitle}
        apiGetListUrl={apiGetListUrl}
        apiRemoveListUrl={apiRemoveListUrl}
        breadCrumbList={breadCrumbList}
        linkActionList={linkActionList}
        token={token}
        showPagination={showPagination}
        videoConfig={videoConfig}
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
          {_renderCmsEditPagesListAction()}
        </div>
      </div>
    </LayoutCms>
  );
}
