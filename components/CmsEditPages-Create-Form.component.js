/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import { Editor } from '@tinymce/tinymce-react'; 

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import Loader from '@components/component.Loader';
import Snagbar from '@components/component.Snagbar';
import Image from '@components/component.Image';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default class CmsEditPagesCreateForm extends PureComponent {
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
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  };

  _renderErrorMessage = () => this.state.isError ? (
    <div className="form-group">
      <span className='form-error'>{this.state.errorMessage}</span>
    </div>
  ) : null;

  _renderFormItems= () => {
    const { detailData } = this.props;
    const formKeys = Object.keys(detailData);

    return this._getFormItems(detailData, formKeys);
  };

  _getFormItems = (detailData, keys) => {
    const _renderFormItems = [];

    for (let i = 0; i < keys.length; i++) {
      const topLevelLabelName = keys[i];
      const formItemData = detailData[topLevelLabelName];

      if (isObject(formItemData)) {
        const nestedKeys = Object.keys(formItemData);
        const nestedFormItem1 = this._getNestedFormItem1(formItemData, nestedKeys, topLevelLabelName);

        _renderFormItems.push(
          <div className="form-group form-group--1" key={topLevelLabelName}>
            <label>{capitalizeFirstLetter(topLevelLabelName)}</label>
            {nestedFormItem1}
          </div>
        );
      } else if (topLevelLabelName !== 'id') {
        _renderFormItems.push(this._renderFormGroup(topLevelLabelName));
      }
    }

    return _renderFormItems;
  };

  _getNestedFormItem1 = (formItem, keys, topLevelLabelName) => {
    const _renderFormItem1 = [];

    for (let i = 0; i < keys.length; i++) {
      const labelName = keys[i];
      const formItemData = formItem[labelName];

      if (isObject(formItemData)) {
        const nestedKeys = Object.keys(formItemData);
        const nestedFormItem2 = this._getNestedFormItem2(nestedKeys, topLevelLabelName);

        _renderFormItem1.push(
          <div className="form-group form-group--2" key={labelName}>
            <label>{capitalizeFirstLetter(labelName)}</label>
            {nestedFormItem2}
          </div>
        );
      } else {
        _renderFormItem1.push(this._renderFormGroup(labelName, topLevelLabelName))
      }
    }

    return _renderFormItem1;
  };

  _getNestedFormItem2 = (keys, topLevelLabelName) => {
    const _renderFormItem2 = [];

    for (let i = 0; i < keys.length; i++) {
      const labelName = keys[i];

      _renderFormItem2.push(this._renderFormGroup(labelName, topLevelLabelName))
    }

    return _renderFormItem2;
  };

  _renderFormGroup = (inputLabel, topLevelLabelName) => {
    const { inputFileList = [], selectOptionList = [], editorList = [],
      nestedStateKey = [] } = this.props;
    
    const conditionalLabelName = inputLabel === 'id' ? 'Idn' : capitalizeFirstLetter(inputLabel);
    let stateKey = topLevelLabelName ? `${topLevelLabelName}${conditionalLabelName}` : inputLabel;
    if (nestedStateKey.indexOf(inputLabel) > -1) {
      stateKey = inputLabel;
    }

    const getSelectOption = selectOptionList.find(list => list.selectKey == inputLabel);
    if (!isEmpty(getSelectOption)) {
      const { options } = getSelectOption;
      return this._renderSelectOptions(stateKey, inputLabel, options);
    }

    if (editorList.indexOf(inputLabel) > -1) {
      return this._renderEditor(stateKey, inputLabel);
    }
    
    if (inputFileList.indexOf(topLevelLabelName) > -1 || inputFileList.indexOf(inputLabel) > -1) {
      return this._renderInputFile(stateKey, inputLabel);
    }

    return this._renderInputText(stateKey, inputLabel);
  };

  _renderEditor = (stateKey, label) => (
    <div className='form-group' key={stateKey}>
      <label>{capitalizeFirstLetter(label)}</label>
      <Editor
        apiKey="jktc2wwwpyroi3rpdx2qu4yf6zc2hxrjwnbk4if6w1xy0bsi"
        initialValue={this.state.formData[stateKey]}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
        onChange={event => this.handleEditorChange(event, stateKey)}
      />
    </div>
  );

  handleEditorChange = (event, stateKey) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [stateKey]: event.target.getContent()
      },
      isError: false
    }));
  }

  _renderSelectOptions = (stateKey, label, options) => {
    let optionsWithPlaceHolder = [...options];
    optionsWithPlaceHolder.unshift('placeholder');
    const value = this.state.formData[stateKey];

    return (
      <div className="form-group" key={stateKey}>
        <label htmlFor={stateKey}>{capitalizeFirstLetter(label)}</label>
        <select 
          id={stateKey} 
          className="form-control" 
          onChange={event => this.onInputChange(event, stateKey)} 
          value={value}
        >
          {optionsWithPlaceHolder.map((option, index) => index == 0 ? (
            <option key='placeholder'>- Choose Label -</option>  
          ) : (
            <option key={option} value={option}>{option}</option>  
          ))}
        </select>
      </div>
    )
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
    }, this.fetchCreate)
  };

  fetchCreate = async () => {
    const { apiCreateUrl, contentType, defaultFormData } = this.props;
    const { formData } = this.state;

    let fetchFormData = new FormData();
    for ( let key in formData ) {
      fetchFormData.append(key, formData[key]);
    }

    try {
      let options = {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data'
        },
        data: fetchFormData,
        url: apiCreateUrl
      };
      if (contentType === 'application/json') {
        options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          data: formData,
          url: apiCreateUrl
        }
      }

      const response = await axios(options);
      const successMessage = response.data.message;
      
      this.setState({ 
        isLoading: false, 
        isSuccess: true, 
        successMessage,
        formData: defaultFormData
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
    const { detailData } = this.props;

    return (
      <Fragment>
        {this._renderBreadCrumb()}
        {!isEmpty(detailData) ? this._renderFormContainer() : null}
        {this._renderSuccessInfo()}
        {this.state.isLoading ? <Loader /> : null}
      </Fragment>
    );
  }
}
