/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/LayoutCms.layout';

// Component
import BreadCrumb from '@components/BreadCrumb.component';
import ActionList from '@components/ActionList.component';

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
