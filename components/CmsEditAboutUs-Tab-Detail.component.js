/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

// Layout
import LayoutCms from '@components/LayoutCms.layout';

// Component
import CmsEditAboutUsTabDetailForm from '@components/CmsEditAboutUs-Tab-Detail-Form.component';
import Loader from '@components/Loader.component';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditAboutUsDetail extends PureComponent {
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
    const { tabIndex, apiGetDataUrl } = this.props;

    try {
      const { data: response } = await axios.get(apiGetDataUrl);
      const detailData = response.data[tabIndex];

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
        transformedData[topLevelKeyName] = nestedDetailData0;
      }
    }

    return transformedData;
  };

  _renderCmsEditAboutUsTabDetailForm = () => {
    const { tabIndex, breadCrumbList, breadCrumbListActive, 
      apiUpdateUrl, inputFileList, tabId } = this.props;
    const { detailData, formData } = this.state;
    const detailBreadCrumbList = [
      ...breadCrumbList,
      {
        route: '',
        name: `${breadCrumbListActive.name}-${parseInt(tabIndex) + 1}`
      }
    ];

    return !isEmpty(detailData) && (
      <CmsEditAboutUsTabDetailForm 
        contentType='application/json'
        detailBreadCrumbList={detailBreadCrumbList}
        detailData={detailData}
        defaultFormData={formData}
        apiUpdateUrl={`${apiUpdateUrl}?id=${tabId}`}
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
            {this._renderCmsEditAboutUsTabDetailForm()}
            {this._renderErrorMessage()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    );
  }
}
