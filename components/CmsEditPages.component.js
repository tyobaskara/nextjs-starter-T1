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
  },
  {
    route: '/cms-edit-pages/product',
    name: 'Product'
  },
  {
    route: '/cms-edit-pages/testimonial',
    name: 'Testimonial'
  },
  {
    route: '/cms-edit-pages/article-news',
    name: 'Article and News'
  },
  {
    route: '/cms-edit-pages/footer',
    name: 'Footer'
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
