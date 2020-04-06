/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';

// Layout
import CmsLayout from '../../components/_layouts/cms.layout';

// Component
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb.component';
import ActionList from '../../components/ActionList/ActionList.component';

import Constants from '../../public/static/js/constants.js';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    }
  }
} = Constants;

const actionList = [
  {
    route: '/cms/user-setting/create-user',
    name: 'Create User'
  },
  {
    route: '/cms/user-setting/user-list',
    name: 'User list'
  },
  {
    route: '/cms/user-setting/change-password',
    name: 'Change Password'
  },
  {
    route: '/cms/user-setting/reset-password',
    name: 'Reset Password'
  }
];

const breadCrumbList = [
  {
    route: '/cms/user-setting',
    name: 'User Setting'
  }
];

export default class CmsUserSetting extends PureComponent {
  _renderBreadCrumb = () => (
    <BreadCrumb data={breadCrumbList} />
  );

  _renderActionList = () => (
    <ActionList data={actionList} />
  );

  render() {
    return (
      <CmsLayout 
        {...this.props}
        activeMenu={userSetting}
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            {this._renderBreadCrumb()}
            {this._renderActionList()}
          </div>
        </div>
      </CmsLayout>
    )
  }
}
