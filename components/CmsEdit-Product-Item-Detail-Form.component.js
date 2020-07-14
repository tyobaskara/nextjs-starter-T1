/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

// Component
import BreadCrumb from '@components/BreadCrumb.component';
import Loader from '@components/Loader.component';
import Snagbar from '@components/Snagbar.component';
import Image from '@components/Image.component';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default class CmsEditProductItemDetailForm extends PureComponent {
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
    const { productItemData } = this.props;
    const formKeys = Object.keys(productItemData);

    return this._getFormItems(productItemData, formKeys);
  };

  _getFormItems = (productItemData, keys) => {
    const { unorderedList = [] } = this.props;
    const _renderFormItems = [];

    for (let i = 0; i < keys.length; i++) {
      const topLevelLabelName = keys[i];
      const formItemData = productItemData[topLevelLabelName];
      
      if (isObject(formItemData)) {
        if (unorderedList.indexOf(topLevelLabelName) > -1) {
          _renderFormItems.push(this._renderFormGroup(topLevelLabelName));
        }
        continue;
      } else if (topLevelLabelName !== 'id') {
        _renderFormItems.push(this._renderFormGroup(topLevelLabelName));
      }
    }

    return _renderFormItems;
  };

  _renderFormGroup = (inputLabel, topLevelLabelName) => {
    const { inputFileList = [], unorderedList = [] } = this.props;
    const conditionalLabelName = inputLabel === 'id' ? 
      'Idn' : capitalizeFirstLetter(inputLabel);
    const stateKey = topLevelLabelName ? 
      `${topLevelLabelName}${conditionalLabelName}` : inputLabel;

    if (inputFileList.indexOf(topLevelLabelName) > -1 || inputFileList.indexOf(inputLabel) > -1) {
      return this._renderInputFile(stateKey, inputLabel);
    } else if (unorderedList.indexOf(topLevelLabelName) > -1 || unorderedList.indexOf(inputLabel) > -1) {
      return this._renderInputUnorderedList(stateKey, inputLabel);
    }

    return this._renderInputText(stateKey, inputLabel);
  };

  _renderInputUnorderedList = (stateKey, label) => {
    const value = this.state.formData[stateKey];

    return (
      <div className="form-group" key={stateKey}>
        <label htmlFor={stateKey}>{capitalizeFirstLetter(label)}</label>
        <textarea 
          className="form-control"
          id={stateKey} 
          onChange={event => this.onTextareaChange(event, stateKey)} 
          value={value}
          rows={5}
          cols={5}
        ></textarea>
      </div>
    );
  };

  onTextareaChange = (event, stateKey) => {
    const { value } = event.target;

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [stateKey]: value
      },
      isError: false
    }));
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
      isLoading: true
    }, this.fetchUpdateDetail)
  };

  fetchUpdateDetail = async () => {
    const { formData } = this.state;
    const { apiUpdateUrl, unorderedList = [] } = this.props;
    
    let fetchFormData = new FormData();
    for ( let key in formData ) {
      const data = formData[key];
      
      if (unorderedList.indexOf(key) > -1) {
        const textAreaData = data.split('\n');
        fetchFormData.append(key, JSON.stringify(textAreaData));
        
        continue;
      }

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
    const { productItemData } = this.props;

    return (
      <Fragment>
        {this._renderBreadCrumb()}
        {!isEmpty(productItemData) ? this._renderFormContainer() : null}
        {this._renderSuccessInfo()}
        {this.state.isLoading ? <Loader /> : null}
      </Fragment>
    );
  }
}
