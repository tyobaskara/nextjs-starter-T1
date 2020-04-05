/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';

// layout
import CmsLayout from '../../components/_layouts/cms.layout';

export default class CmsDashboard extends PureComponent {
  render() {
    return (
      <CmsLayout 
        {...this.props}
        activeMenu='UserSetting'
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            <h1>User Setting Page</h1>
          </div>
        </div>
      </CmsLayout>
    )
  }
}
