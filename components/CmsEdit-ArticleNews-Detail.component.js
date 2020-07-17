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
import CmsEditArticleNewsDetailForm from '@components/CmsEdit-Testimonial-Detail-Form.component';
import Loader from '@components/component.Loader';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditArticleNewsDetail extends PureComponent {
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
    const { apiGetDataUrl, itemId } = this.props;
    let url = apiGetDataUrl.replace('[itemId]', itemId);
    const urlEn = url.replace('[lang]', 'en');
    const urlId = url.replace('[lang]', 'id');

    try {
      const { data: { data: dataEn } } = await axios.get(urlEn);
      const { data: { data: dataId } } = await axios.get(urlId);
      const detailData = this.combineData(dataEn, dataId);

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

  combineData = (dataEn, dataId) => {
    const keyList = ['body', 'label', 'title', 'image'];
    const multiLangList = ['body', 'title'];

    let adjustEn = {};
    for (let key in dataEn) {
      if (keyList.indexOf(key) > -1) {
        if (multiLangList.indexOf(key) > -1) {
          const newKey = key + 'En';
          adjustEn[newKey] = dataEn[key];
        } else {
          adjustEn[key] = dataEn[key];
        }
      }
    }

    let adjustId = {};
    for (let key in dataId) {
      if (keyList.indexOf(key) > -1) {
        if (multiLangList.indexOf(key) > -1) {
          const newKey = key + 'Id';
          adjustId[newKey] = dataId[key];
        } else {
          adjustId[key] = dataId[key];
        }
      }
    }

    return {
      ...adjustEn,
      ...adjustId
    };
  }

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

  _renderCmsEditTestimonialDetailForm = () => {
    const { breadCrumbList, apiUpdateUrl, itemId, inputFileList, contentType = '', selectOptionList, editorList } = this.props;
    const { detailData, formData } = this.state;
    const detailBreadCrumbList = [
      ...breadCrumbList,
      {
        route: '',
        name: detailData.titleEn
      }
    ];
    const updateUrl = apiUpdateUrl.replace('[itemId]', itemId);

    return !isEmpty(detailData) && (
      <CmsEditArticleNewsDetailForm 
        contentType={contentType}
        detailBreadCrumbList={detailBreadCrumbList}
        detailData={detailData}
        defaultFormData={formData}
        apiUpdateUrl={updateUrl}
        inputFileList={inputFileList}
        selectOptionList={selectOptionList}
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
            {this._renderCmsEditTestimonialDetailForm()}
            {this._renderErrorMessage()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    );
  }
}
