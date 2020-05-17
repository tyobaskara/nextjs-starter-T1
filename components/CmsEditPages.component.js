/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';

// Layout
import LayoutCms from '@components/LayoutCms.layout';

// Component
import BreadCrumb from '@components/BreadCrumb.component';
import ActionList from '@components/ActionList.component';

import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      editPages
    }
  }
} = Constants;

const editPagesListRoute = [
  {
    route: '/cms-edit-pages/home',
    name: 'Home'
  },
  {
    route: '/cms-edit-pages/about-us',
    name: 'About Us'
  }
];

const breadCrumbList = [
  {
    route: '/cms/edit-pages',
    name: 'Edit Pages'
  }
];

export default class EditPages extends PureComponent {
  _renderBreadCrumb = () => (
    <BreadCrumb data={breadCrumbList} />
  );

  _renderActionList = () => (
    <ActionList data={editPagesListRoute} />
  );

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={editPages}
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            {this._renderBreadCrumb()}
            {this._renderActionList()}
          </div>
        </div>
      </LayoutCms>
    )
  }
}
