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
import CmsEditProductItemDetailForm from '@components/CmsEdit-Product-Item-Detail-Form.component';
import Loader from '@components/component.Loader';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditProductItemDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isSuccess: false,
      isFetchDetailError: false,
      errorMessage: '',
      successMessage: '',
      productItemData: {}
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchDetailData();
  }

  fetchDetailData = async () => {
    const { apiGetDataUrl, productId, itemId } = this.props;

    try {
      const url = apiGetDataUrl.replace('[productId]', productId);
      const { data: { data } } = await axios.get(url);
      const productItemData = data.find(key => key.id == itemId);

      this.setState({ 
        isLoading: false, 
        productItemData,
        formData: this.getTransformedData(productItemData)
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDetailError: true, errorMessage });
    }
  };

  getTransformedData = (productItemData) => {
    const { unorderedList = [] } = this.props;
    let transformedData = {};

    for (let key in productItemData) {
      const topLevelKeyName = key;
      const nestedDetailData0 = productItemData[key];
      
      if (isObject(nestedDetailData0)) {
        if (unorderedList.indexOf(topLevelKeyName) > -1) {
          const textareaData = nestedDetailData0.join('\n');
          transformedData[topLevelKeyName] = textareaData;
        }
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
    const { productId, itemId, breadCrumbList, apiUpdateUrl, inputFileList, editorList } = this.props;
    const { productItemData, formData } = this.state;
    
    const detailBreadCrumbList = [
      ...breadCrumbList,
      {
        route: '',
        name: productItemData.titleEn
      }
    ];

    let updateUrl = apiUpdateUrl.replace('[productId]', productId);
    updateUrl = updateUrl.replace('[itemId]', itemId);

    return !isEmpty(productItemData) && (
      <CmsEditProductItemDetailForm 
        detailBreadCrumbList={detailBreadCrumbList}
        productItemData={productItemData}
        defaultFormData={formData}
        apiUpdateUrl={updateUrl}
        inputFileList={inputFileList}
        editorList={editorList}
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
