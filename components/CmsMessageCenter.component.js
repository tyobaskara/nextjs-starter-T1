/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import ActionList from '@components/component.ActionList';

import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      messageCenter
    }
  }
} = Constants;

const messageCenterListRoute = [
  {
    route: '/cms-message-center/free-demo',
    name: 'Free Demo'
  },
  {
    route: '/cms-message-center/inquiry',
    name: 'Inquiry'
  }
];

const breadCrumbList = [
  {
    route: '/cms/message-center',
    name: messageCenter
  }
];

export default class CmsMessageCenter extends PureComponent {
  _renderBreadCrumb = () => (
    <BreadCrumb data={breadCrumbList} />
  );

  _renderActionList = () => (
    <ActionList data={messageCenterListRoute} />
  );

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={messageCenter}
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
