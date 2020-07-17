/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import ActionList from '@components/component.ActionList';

export default function CmsEditPagesMainList(props) {
  const _renderBreadCrumb = () => (
    <BreadCrumb data={props.breadCrumbList} />
  );

  const _renderActionList = () => (
    <ActionList data={props.editPagesListRoute} />
  );

  return (
    <LayoutCms 
      {...props}
      activeMenu={props.drawerActiveMenu}
    >
      <div className='cms-wrapper'>
        <div className='cms-container'>
          {_renderBreadCrumb()}
          {_renderActionList()}
        </div>
      </div>
    </LayoutCms>
  );
}
