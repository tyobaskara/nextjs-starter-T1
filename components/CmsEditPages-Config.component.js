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
import CmsEditPagesConfigForm from '@components/CmsEditPages-Config-Form.component';
import Loader from '@components/component.Loader';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default class CmsEditPagesConfig extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSuccess: false,
      isFetchConfigError: false,
      errorMessage: '',
      successMessage: '',
      configData: {}
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchConfigData();
  }

  fetchConfigData = async () => {
    const { configKey, apiConfig } = this.props;
    const url = `${apiConfig}/${configKey}`;

    try {
      const { data: response } = await axios.get(url);
      const configData = response.data;

      this.setState({ 
        isLoading: false, 
        configData,
        formData: this.getTransformedData(configData)
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchConfigError: true, errorMessage });
    }
  };

  getTransformedData = (configData) => {
    let transformedData = {};

    for (let key in configData) {
      const topLevelKeyName = key;
      const nestedConfigData0 = configData[key];

      if (key === 'id') continue;
      
      if (isObject(nestedConfigData0)) {
        for (let nestedKey0 in nestedConfigData0) {
          const nestedConfigData1 = nestedConfigData0[nestedKey0];
          const nestedKey1 = nestedKey0 === 'id' ? 'Idn' : capitalizeFirstLetter(nestedKey0);
          const formDataKey0 = `${topLevelKeyName}${nestedKey1}`;

          if (isObject(nestedConfigData1)) {
            const nestedConfigData1 = nestedConfigData1;

            for (let nestedKey1 in nestedConfigData1) {
              const nestedConfigData2 = nestedConfigData1[nestedKey1];
              const nestedKey2 = nestedKey1 === 'id' ? 'Idn' : capitalizeFirstLetter(nestedKey1);
              const formDataKey1 = `${topLevelKeyName}${nestedKey2}`;

              transformedData[formDataKey1] = nestedConfigData2;
            }
          } else {
            transformedData[formDataKey0] = nestedConfigData1;
          }
        }
      } else {
        transformedData[topLevelKeyName] = nestedConfigData0;
      }
    }

    return transformedData;
  };

  _renderCmsEditPagesConfigForm = () => {
    const { breadCrumbList, apiConfig } = this.props;
    const { configData, formData } = this.state;

    return !isEmpty(configData) && (
      <CmsEditPagesConfigForm 
        breadCrumbList={breadCrumbList}
        configData={configData}
        defaultFormData={formData}
        apiSaveConfig={apiConfig}
      />
    )
  }

  _renderErrorMessage = () => this.state.isFetchConfigError ? (
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
            {this._renderCmsEditPagesConfigForm()}
            {this._renderErrorMessage()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    );
  }
}
