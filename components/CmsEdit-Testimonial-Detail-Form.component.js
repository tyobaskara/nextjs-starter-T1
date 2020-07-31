/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react'; 
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

export default class CmsEditTestimonialDetailForm extends PureComponent {
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
        continue;
      } else if (topLevelLabelName !== 'id') {
        _renderFormItems.push(this._renderFormGroup(topLevelLabelName));
      }
    }

    return _renderFormItems;
  };

  _renderFormGroup = (inputLabel) => {
    const { inputFileList = [], selectOptionList = [], editorList = [] } = this.props;

    const getSelectOption = selectOptionList.find(list => list.selectKey == inputLabel);
    if (!isEmpty(getSelectOption)) {
      const { options } = getSelectOption;
      return this._renderSelectOptions(inputLabel, options);
    }
    
    if (inputFileList.indexOf(inputLabel) > -1) {
      return this._renderInputFile(inputLabel);
    }

    if (editorList.indexOf(inputLabel) > -1) {
      return this._renderEditor(inputLabel);
    }

    return this._renderInputText(inputLabel);
  };

  _renderEditor = (inputLabel) => {
    return (
      <div className='form-group' key={inputLabel}>
        <label>{capitalizeFirstLetter(inputLabel)}</label>
        <Editor
          apiKey="jktc2wwwpyroi3rpdx2qu4yf6zc2hxrjwnbk4if6w1xy0bsi"
          initialValue={this.state.formData[inputLabel]}
          init={{
            height: 500,
            plugins: [
              'advlist autolink lists link image', 
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic | \
              alignleft aligncenter alignright | \
              bullist numlist outdent indent | help',
            menubar: "tools"
          }}
          onChange={event => this.handleEditorChange(event, inputLabel)}
        />
      </div>
    );
  };

  handleEditorChange = (event, stateKey) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [stateKey]: event.target.getContent()
      },
      isError: false
    }));
  }

  _renderSelectOptions = (inputLabel, options) => {
    return (
      <div className="form-group" key={inputLabel}>
        <label htmlFor={inputLabel}>{capitalizeFirstLetter(inputLabel)}</label>
        <select 
          id={inputLabel} 
          className="form-control" 
          onChange={event => this.onInputChange(event, inputLabel)} 
          value={this.state.formData[inputLabel]}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>  
          ))}
        </select>
      </div>
    )
  };

  _renderInputFile = (inputLabel) => {
    const file = this.state.formData[inputLabel];
    const imageSrc = isObject(file) 
      ? URL.createObjectURL(file) 
      : file;

    return (
      <div className="form-group" key={inputLabel}>
        <label htmlFor={inputLabel}>{capitalizeFirstLetter(inputLabel)}</label>
        <Image className='preview-image' src={imageSrc} />

        <input 
          type="file" 
          className="form-control" 
          id={inputLabel} 
          name={inputLabel} 
          onChange={event => this.onInputFileChange(event, inputLabel)}
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

  _renderInputText = (inputLabel) => {
    return (
      <div className="form-group" key={inputLabel}>
        <label htmlFor={inputLabel}>{capitalizeFirstLetter(inputLabel)}</label>
        <input 
          type="text" 
          className="form-control" 
          id={inputLabel} 
          onChange={event => this.onInputChange(event, inputLabel)} 
          value={this.state.formData[inputLabel]}
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
    const { apiUpdateUrl, contentType } = this.props;

    let fetchFormData = new FormData();
    for ( let key in formData ) {
      fetchFormData.append(key, formData[key]);
    }

    try {
      let options = {};

      if (contentType === 'multipart/form-data') {
        options = {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data'
          },
          data: fetchFormData,
          url: apiUpdateUrl
        };
      }

      if (contentType === 'application/json') {
        options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          data: formData,
          url: apiUpdateUrl
        };
      }

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
