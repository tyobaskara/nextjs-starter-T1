/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/LayoutCms.layout';

// Component
import CmsEditPagesCommonList from '@components/CmsEditPages-Common-List.component';

export default function CmsEditPagesList(props) {
  const _renderCmsEditPagesCommonList = () => {
    const { token, apiGetListUrl, apiRemoveListUrl,
      breadCrumbList, linkActionList, listTitle, videoConfig } = props;

    return (
      <CmsEditPagesCommonList 
        title={listTitle}
        apiGetListUrl={apiGetListUrl}
        apiRemoveListUrl={apiRemoveListUrl}
        breadCrumbList={breadCrumbList}
        linkActionList={linkActionList}
        token={token}
        showPagination={false}
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
          {_renderCmsEditPagesCommonList()}
        </div>
      </div>
    </LayoutCms>
  );
}
