/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/LayoutCms.layout';

// Component
import BreadCrumb from '@components/BreadCrumb.component';
import ActionTabList from '@components/ActionTabList.component';

export default function CmsEditTabsList(props) {
  const _renderBreadCrumb = () => (
    <BreadCrumb data={props.breadCrumbList} />
  );

  const _renderActionTabList = () => (
    <ActionTabList 
      data={props.editTabsListRoute} 
      fetchTabsData={props.fetchTabsData}
      token={props.token}
    />
  );

  return (
    <LayoutCms 
      {...props}
      activeMenu={props.drawerActiveMenu}
    >
      <div className='cms-wrapper'>
        <div className='cms-container'>
          {_renderBreadCrumb()}
          {_renderActionTabList()}
        </div>
      </div>
    </LayoutCms>
  );
}
