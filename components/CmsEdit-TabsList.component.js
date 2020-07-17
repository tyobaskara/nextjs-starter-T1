/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import ActionTabList from '@components/component.ActionTabList';

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
