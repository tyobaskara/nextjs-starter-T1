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
import CmsEditAboutUsTabItemDetailForm from '@components/CmsEditAboutUs-Tab-Item-Detail-Form.component';
import Loader from '@components/Loader.component';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default class CmsEditAboutUsDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSuccess: false,
      isFetchDetailError: false,
      errorMessage: '',
      successMessage: '',
      tabItemData: {}
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchDetailData();
  }

  fetchDetailData = async () => {
    const { tabId, itemId, apiGetKey, apiGetDataUrl } = this.props;

    try {
      const { data: response } = await axios.get(apiGetDataUrl);
      const tabData = response.data.find(key => key.id == tabId);
      const tabItemData = tabData[apiGetKey].find(key => key.id == itemId);

      this.setState({ 
        isLoading: false, 
        tabItemData: tabItemData,
        formData: this.getTransformedData(tabItemData)
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDetailError: true, errorMessage });
    }
  };

  getTransformedData = (tabItemData) => {
    let transformedData = {};

    for (let key in tabItemData) {
      const topLevelKeyName = key;
      const nestedDetailData0 = tabItemData[key];
      
      if (isObject(nestedDetailData0)) {
        for (let nestedKey0 in nestedDetailData0) {
          const nestedDetailData1 = nestedDetailData0[nestedKey0];
          const nestedKey1 = nestedKey0 === 'id' ? 'Idn' : capitalizeFirstLetter(nestedKey0);
          const formDataKey0 = `${topLevelKeyName}${nestedKey1}`;

          if (isObject(nestedDetailData1)) {
            for (let nestedKey1 in nestedDetailData1) {
              const nestedDetailData2 = nestedDetailData1[nestedKey1];
              const nestedKey2 = nestedKey1 === 'id' ? 'Idn' : capitalizeFirstLetter(nestedKey1);
              const formDataKey1 = `${topLevelKeyName}${nestedKey2}`;

              transformedData[formDataKey1] = nestedDetailData2;
            }
          } else {
            transformedData[formDataKey0] = nestedDetailData1;
          }
        }
      } else {
        transformedData[topLevelKeyName] = nestedDetailData0;
      }
    }

    return transformedData;
  };

  _renderCmsEditAboutUsTabItemDetailForm = () => {
    const { tabItemIndex, breadCrumbList, apiUpdateUrl, 
      inputFileList, itemId, tabIndex, tabId } = this.props;
    const { tabItemData, formData } = this.state;
    const detailBreadCrumbList = [
      ...breadCrumbList,
      {
        route: `/cms-edit-pages-about-us-section-6-tab-list/${tabIndex}?tabId=${tabId}`,
        name: `Tab ${parseInt(tabIndex) + 1} - List`
      },
      {
        route: '',
        name: tabItemIndex
      }
    ];
    const updateUrl = apiUpdateUrl.replace('[tabId]', tabId).replace('[itemId]', itemId);

    return !isEmpty(tabItemData) && (
      <CmsEditAboutUsTabItemDetailForm 
        detailBreadCrumbList={detailBreadCrumbList}
        tabItemData={tabItemData}
        defaultFormData={formData}
        apiUpdateUrl={updateUrl}
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
            {this._renderCmsEditAboutUsTabItemDetailForm()}
            {this._renderErrorMessage()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    );
  }
}
