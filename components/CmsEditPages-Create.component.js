/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import axios from 'axios';

// Layout
import LayoutCms from '@components/LayoutCms.layout';

// Component
import CmsEditPagesCreateForm from '@components/CmsEditPages-Create-Form.component';

export default class CmsEditPagesCreate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formData: props.defaultFormData
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
  }

  _renderCmsEditPagesCreateForm = () => {
    const { formData } = this.state;
    const { apiCreateUrl, inputFileList, breadCrumbList, dataFixture } = this.props;

    return (
      <CmsEditPagesCreateForm 
        detailBreadCrumbList={breadCrumbList}
        detailData={dataFixture}
        defaultFormData={formData}
        apiCreateUrl={apiCreateUrl}
        inputFileList={inputFileList}
      />
    );
  };

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={this.props.drawerActiveMenu}
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            {this._renderCmsEditPagesCreateForm()}
          </div>
        </div>
      </LayoutCms>
    );
  }
}
