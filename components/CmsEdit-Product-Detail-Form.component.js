/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import Loader from '@components/component.Loader';
import Snagbar from '@components/component.Snagbar';
import Image from '@components/component.Image';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default class CmsEditProductDetailForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSuccess: false,
      errorMessage: '',
      successMessage: '',
      formData: props.defaultFormData
    }
  }

  _renderFormContainer = () => {
    return (
      <form className='form-cmsContent' onSubmit={this._submitForm}>
        {this._renderFormItems()}
        {this._renderErrorMessage()}
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    );
  };

  _renderErrorMessage = () => this.state.isError ? (
    <div className="form-group">
      <span className='form-error'>{this.state.errorMessage}</span>
    </div>
  ) : null;

  _renderFormItems= () => {
    const { productData } = this.props;
    const formKeys = Object.keys(productData);

    return this._getFormItems(productData, formKeys);
  };

  _getFormItems = (productData, keys) => {
    const { whiteList = [] } = this.props;
    const _renderFormItems = [];

    for (let i = 0; i < keys.length; i++) {
      const topLevelLabelName = keys[i];
      const formItemData = productData[topLevelLabelName];

      if (isObject(formItemData)) {
        continue;
      } else if (topLevelLabelName !== 'id') {
        if (whiteList.length > 0) {
          if (whiteList.indexOf(topLevelLabelName) > -1) {
            _renderFormItems.push(this._renderFormGroup(topLevelLabelName));
          }
        } else {
          _renderFormItems.push(this._renderFormGroup(topLevelLabelName));
        }
      }
    }

    return _renderFormItems;
  };

  _renderFormGroup = (inputLabel, topLevelLabelName) => {
    const { inputFileList = [] } = this.props;
    const conditionalLabelName = inputLabel === 'id' ? 'Idn' : capitalizeFirstLetter(inputLabel);
    const stateKey = topLevelLabelName ? `${topLevelLabelName}${conditionalLabelName}` : inputLabel;
    
    if (inputFileList.indexOf(topLevelLabelName) > -1 || inputFileList.indexOf(inputLabel) > -1) {
      return this._renderInputFile(stateKey, inputLabel);
    }

    return this._renderInputText(stateKey, inputLabel);
  };

  _renderInputFile = (stateKey, label) => {
    const file = this.state.formData[stateKey];
    const imageSrc = isObject(file) 
      ? URL.createObjectURL(file) 
      : file;

    return (
      <div className="form-group" key={stateKey}>
        <label htmlFor={stateKey}>{capitalizeFirstLetter(label)}</label>
        <Image className='preview-image' src={imageSrc} />

        <input 
          type="file" 
          className="form-control" 
          id={stateKey} 
          name={stateKey} 
          onChange={event => this.onInputFileChange(event, stateKey)}
        />
      </div>
    );
  }

  onInputFileChange = (event, stateKey) => {
    const { files } = event.target;
    const file = files[0];

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [stateKey]: file
      },
      isError: false
    }));
  };

  _renderInputText = (stateKey, label) => {
    return (
      <div className="form-group" key={stateKey}>
        <label htmlFor={stateKey}>{capitalizeFirstLetter(label)}</label>
        <input 
          type="text" 
          className="form-control" 
          id={stateKey} 
          onChange={event => this.onInputChange(event, stateKey)} 
          value={this.state.formData[stateKey]}
        />
      </div>
    );
  }

  onInputChange = (event, stateKey) => {
    const { value } = event.target;

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [stateKey]: value
      },
      isError: false
    }));
  };

  _submitForm = (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      isError: false
    }, this.fetchUpdateDetail)
  };

  fetchUpdateDetail = async () => {
    const { formData } = this.state;
    const { apiUpdateUrl } = this.props;

    let fetchFormData = new FormData();
    for ( let key in formData ) {
      fetchFormData.append(key, formData[key]);
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data'
        },
        data: fetchFormData,
        url: apiUpdateUrl
      };
      const response = await axios(options);
      const successMessage = response.data.message;
      
      this.setState({ 
        isLoading: false, 
        isSuccess: true, 
        successMessage
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isError: true, errorMessage });
    }
  };

  _renderBreadCrumb = () => (
    <BreadCrumb data={this.props.detailBreadCrumbList} />
  );
  
  _renderSuccessInfo = () => {
    const { successMessage, isSuccess } = this.state;

    if (isSuccess) {
      setTimeout(() => {
        this.setState({ isSuccess: false, successMessage: '' });
      }, 1000);
    }

    return (
      <Snagbar 
        message={successMessage}
        isShow={isSuccess}
      />
    );
  };

  render() {
    const { productData } = this.props;

    return (
      <Fragment>
        {this._renderBreadCrumb()}
        {!isEmpty(productData) ? this._renderFormContainer() : null}
        {this._renderSuccessInfo()}
        {this.state.isLoading ? <Loader /> : null}
      </Fragment>
    );
  }
}