/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import CmsEditAboutUsListAction from '@components/CmsEditAboutUs-List-Action.component';

export default function CmsEditAboutUsList(props) {
  const _renderCmsEditAboutUsListAction = () => {
    const { token, apiGetListUrl, apiRemoveListUrl, apiGetKey,
      breadCrumbList, linkActionList, listTitle } = props;

    return (
      <CmsEditAboutUsListAction 
        listTitle={listTitle}
        apiGetKey={apiGetKey}
        apiGetListUrl={apiGetListUrl}
        apiRemoveListUrl={apiRemoveListUrl}
        breadCrumbList={breadCrumbList}
        linkActionList={linkActionList}
        token={token}
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
          {_renderCmsEditAboutUsListAction()}
        </div>
      </div>
    </LayoutCms>
  );
}
