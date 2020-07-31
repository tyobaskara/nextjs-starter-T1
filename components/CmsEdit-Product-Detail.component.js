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
import CmsEditProductDetailForm from '@components/CmsEdit-Product-Detail-Form.component';
import Loader from '@components/component.Loader';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditProductDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSuccess: false,
      isFetchDetailError: false,
      errorMessage: '',
      successMessage: '',
      productData: {}
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchDetailData();
  }

  fetchDetailData = async () => {
    const { apiGetDataUrl: url, productId } = this.props;

    try {
      const { data: { data } } = await axios.get(url);
      const productData = data.find(key => key.id == productId);
      
      this.setState({ 
        isLoading: false, 
        productData,
        formData: this.getTransformedData(productData)
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDetailError: true, errorMessage });
    }
  };

  getTransformedData = (productData) => {
    let transformedData = {};

    for (let key in productData) {
      const topLevelKeyName = key;
      const nestedDetailData0 = productData[key];
      
      if (isObject(nestedDetailData0)) {
        continue;
      } else {
        if (key != 'id') {
          transformedData[topLevelKeyName] = nestedDetailData0;
        }
      }
    }

    return transformedData;
  };

  _renderCmsEditPagesDetailForm = () => {
    const { productId, breadCrumbList, apiUpdateUrl, inputFileList, whiteList } = this.props;
    const { productData, formData } = this.state;
    const detailBreadCrumbList = [
      ...breadCrumbList,
      {
        route: '',
        name: productData.titleEn
      }
    ];
    const updateUrl = apiUpdateUrl.replace('[productId]', productId);

    return !isEmpty(productData) && (
      <CmsEditProductDetailForm 
        detailBreadCrumbList={detailBreadCrumbList}
        productData={productData}
        defaultFormData={formData}
        apiUpdateUrl={updateUrl}
        inputFileList={inputFileList}
        whiteList={whiteList}
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
