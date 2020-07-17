/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import CmsEditAboutUsTabListAction from '@components/CmsEditAboutUs-Tab-List-Action.component';

export default function CmsEditAboutUsList(props) {
  const _renderCmsEditAboutUsTabListAction = () => {
    const { token, apiGetListUrl, apiRemoveListUrl, apiGetKey,
      breadCrumbList, linkActionList, titleKey, tabIndex, tabId } = props;

    return (
      <CmsEditAboutUsTabListAction 
        titleKey={titleKey}
        apiGetKey={apiGetKey}
        apiGetListUrl={apiGetListUrl}
        apiRemoveListUrl={apiRemoveListUrl}
        breadCrumbList={breadCrumbList}
        linkActionList={linkActionList}
        token={token}
        tabIndex={tabIndex}
        tabId={tabId}
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
          {_renderCmsEditAboutUsTabListAction()}
        </div>
      </div>
    </LayoutCms>
  );
}
