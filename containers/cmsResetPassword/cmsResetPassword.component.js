/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import Link from 'next/link';

// layout
import CmsLayout from '../../components/_layouts/cms.layout';

import Constants from '../../public/static/js/constants.js';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    }
  }
} = Constants;

export default class CmsResetPassword extends PureComponent {
  _renderBreadCrumb = () => (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/cms/user-setting">
            <a>User Setting</a>
          </Link>
        </li>
        <li className="breadcrumb-item active">
          <Link href="/cms/user-setting/reset-password">
            <a>Reset Password</a>
          </Link>
        </li>
      </ol>
    </nav>
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
