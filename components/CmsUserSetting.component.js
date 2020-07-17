/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import concat from 'lodash/concat';

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import ActionList from '@components/component.ActionList';

import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    }
  }
} = Constants;

const superAdminMenuList = [
  {
    route: '/cms/user-list',
    name: 'User list'
  },
  {
    route: '/cms/create-user',
    name: 'Create User'
  }
];

const adminMenuList = [
  {
    route: '/cms/change-password',
    name: 'Change Password'
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

  _renderActionList = () => {
    const isSuperAdmin = true;
    const superAdminMenu = concat(superAdminMenuList, adminMenuList);

    const actionListData = isSuperAdmin ? superAdminMenu : adminMenuList

    return (
      <ActionList data={actionListData} />
    );
  };

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={userSetting}
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
