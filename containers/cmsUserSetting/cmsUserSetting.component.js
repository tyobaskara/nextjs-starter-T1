/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import concat from 'lodash/concat';

// Layout
import CmsLayout from '~/components/_layouts/cms.layout';

// Component
import BreadCrumb from '~/components/BreadCrumb/BreadCrumb.component';
import ActionList from '~/components/ActionList/ActionList.component';

import Constants from '~/constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    }
  }
} = Constants;

const superAdminMenuList = [
  {
    route: '/cms/user-setting/user-list',
    name: 'User list'
  },
  {
    route: '/cms/user-setting/create-user',
    name: 'Create User'
  }
];

const adminMenuList = [
  {
    route: '/cms/user-setting/change-password',
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
