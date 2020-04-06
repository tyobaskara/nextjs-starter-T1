/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';

// layout
import CmsLayout from '../../components/_layouts/cms.layout';

// Component
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb.component';

import Constants from '../../public/static/js/constants.js';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    }
  }
} = Constants;

const breadCrumbList = [
  {
    route: '/cms/user-setting',
    name: 'User Setting'
  },
  {
    route: '/cms/user-setting/reset-password',
    name: 'Reset Password'
  }
];

export default class CmsResetPassword extends PureComponent {
  _renderBreadCrumb = () => (
    <BreadCrumb data={breadCrumbList} />
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
          </div>
        </div>
      </CmsLayout>
    )
  }
}
