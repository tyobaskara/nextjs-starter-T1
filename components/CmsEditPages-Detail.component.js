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
import CmsEditPagesDetailForm from '@components/CmsEditPages-Detail-Form.component';
import Loader from '@components/component.Loader';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default class CmsEditPagesDetail extends PureComponent {
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
    const { listId, apiGetDataUrl, apiGetDataUrlKey = '' } = this.props;
    let url = `${apiGetDataUrl}/${listId}`;
    if (apiGetDataUrlKey) {
      url = apiGetDataUrl.replace(apiGetDataUrlKey, listId);
    }

    try {
      const { data: response } = await axios.get(url);
      const detailData = response.data;

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
    const { nestedStateKey = [] } = this.props;
    let transformedData = {};

    for (let key in detailData) {
      const topLevelKeyName = key;
      const nestedDetailData0 = detailData[key];
      
      if (isObject(nestedDetailData0)) {
        for (let nestedKey0 in nestedDetailData0) {
          const nestedDetailData1 = nestedDetailData0[nestedKey0];
          const nestedKey1 = nestedKey0 === 'id' ? 'Idn' : capitalizeFirstLetter(nestedKey0);
          
          let formDataKey0 = `${topLevelKeyName}${nestedKey1}`;
          if (nestedStateKey.indexOf(nestedKey0) > -1) {
            formDataKey0 = nestedKey1.toLowerCase();
          }

          if (isObject(nestedDetailData1)) {
            for (let nestedKey1 in nestedDetailData1) {
              const nestedDetailData2 = nestedDetailData1[nestedKey1];
              const nestedKey2 = nestedKey1 === 'id' ? 'Idn' : capitalizeFirstLetter(nestedKey1);
              
              let formDataKey1 = `${topLevelKeyName}${nestedKey2}`;
              if (nestedStateKey.indexOf(nestedKey1) > -1) {
                formDataKey1 = nestedKey2.toLowerCase();
              }

              if (formDataKey1 == 'id') continue;
              transformedData[formDataKey1] = nestedDetailData2;
            }
          } else {
            if (formDataKey0 == 'id') continue;
            transformedData[formDataKey0] = nestedDetailData1;
          }
        }
      } else {
        if (topLevelKeyName == 'id') continue;
        transformedData[topLevelKeyName] = nestedDetailData0;
      }
    }

    return transformedData;
  };

  getBreadCrumbList = () => {
    const { pid, breadCrumbList, breadCrumbListActive = {}, activeKey } = this.props;
    const { detailData } = this.state;
    let result = [];

    if (!isEmpty(breadCrumbListActive)) {
      const { name } = breadCrumbListActive;
      
      result = [
        ...breadCrumbList,
        {
          route: '',
          name: `${name}-${pid}`
        }
      ];
    } else {
      result = [
        ...breadCrumbList,
        {
          route: '',
          name: detailData[activeKey]
        }
      ];
    }

    return result;
  }

  _renderCmsEditPagesDetailForm = () => {
    const { listId, apiUpdateUrl, inputFileList, nestedStateKey = [],
      apiUpdateUrlKey = '' } = this.props;
    const { detailData, formData } = this.state;

    let detailBreadCrumbList = this.getBreadCrumbList();

    let updateUrl = `${apiUpdateUrl}/${listId}`;
    if (apiUpdateUrlKey) {
      updateUrl = apiUpdateUrl.replace(apiUpdateUrlKey, listId);
    }

    return !isEmpty(detailData) && (
      <CmsEditPagesDetailForm 
        detailBreadCrumbList={detailBreadCrumbList}
        detailData={detailData}
        defaultFormData={formData}
        apiUpdateUrl={updateUrl}
        inputFileList={inputFileList}
        nestedStateKey={nestedStateKey}
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
            {this._renderCmsEditPagesDetailForm()}
            {this._renderErrorMessage()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    );
  }
}
