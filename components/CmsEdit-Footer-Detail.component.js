/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import CmsEditFooterDetailForm from '@components/CmsEdit-Footer-Detail-Form.component';
import Loader from '@components/component.Loader';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditFooterDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSuccess: false,
      isFetchDetailError: false,
      errorMessage: '',
      successMessage: '',
      detailData: {}
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchDetailData();
  }

  fetchDetailData = async () => {
    const { apiGetDataUrl, nestedKey } = this.props;

    try {
      const { data: response } = await axios.get(apiGetDataUrl);
      let detailData = response.data;
      
      if (nestedKey) {
        detailData = response.data[nestedKey];
      }

      this.setState({ 
        isLoading: false, 
        detailData,
        formData: this.getTransformedData(detailData)
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDetailError: true, errorMessage });
    }
  };

  getTransformedData = (detailData) => {
    let transformedData = {};

    for (let key in detailData) {
      const topLevelKeyName = key;
      const nestedDetailData0 = detailData[key];
      
      if (isObject(nestedDetailData0)) {
        continue;
      } else {
        if (key !== 'id') {
          transformedData[topLevelKeyName] = nestedDetailData0;
        }
      }
    }
    
    return transformedData;
  };

  _renderCmsEditAboutUsDetailForm = () => {
    const { breadCrumbList, apiUpdateUrl, inputFileList, contentType = '' } = this.props;
    const { detailData, formData } = this.state;

    return !isEmpty(detailData) && (
      <CmsEditFooterDetailForm 
        contentType={contentType}
        detailBreadCrumbList={breadCrumbList}
        detailData={detailData}
        defaultFormData={formData}
        apiUpdateUrl={apiUpdateUrl}
        inputFileList={inputFileList}
      />
    )
  }

  _renderErrorMessage = () => this.state.isFetchDetailError ? (
    <p className='form-error mt-5'>{this.state.errorMessage}</p>
  ) : null;

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={this.props.drawerActiveMenu}
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            {this._renderCmsEditAboutUsDetailForm()}
            {this._renderErrorMessage()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    );
  }
}
