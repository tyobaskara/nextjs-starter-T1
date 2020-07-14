import React, { PureComponent, Fragment } from 'react';
import axios from 'axios';
import isArray from 'lodash/isArray';

// Components
import Loader from '@components/Loader.component';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

class FormFreeDemo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formName: '',
      formEmail: '',
      formPhoneNumber: '',
      formCompanyName: '',
      formNotes: '',
      isError: false,
      isLoading: false,
      errorMessage: []
    }
  }

  onInputChange = (event, stateName) => {
    const { value } = event.target;

    this.setState({
      [stateName]: value,
      isError: false,
      errorMessage: []
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    
    this.setState({
      isLoading: true
    }, this.sendFormData);
  };

  sendFormData = async () => {
    const { type } = this.props;
    const {
      formName,
      formEmail,
      formPhoneNumber,
      formCompanyName,
      formNotes
    } = this.state;

    try {
      await axios.post('http://nonprod.dhealth.arinanda.com/api/v1/free-demo', {
        companyName: formCompanyName,
        email: formEmail,
        message: formNotes,
        name: formName,
        phone: formPhoneNumber,
        type
      });

      this.onSubmitSuccess();
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      this.setState({ isLoading: false, isError: true, errorMessage });
    }
  }

  onSubmitSuccess = () => {
    const noop = () => {};
    const { parentCallback = noop } = this.props;

    this._resetFormState();
    parentCallback();
  };

  _resetFormState = () => {
    this.setState({
      isLoading: false,
      formName: '',
      formEmail: '',
      formPhoneNumber: '',
      formCompanyName: '',
      formNotes: '',
    });
  };

  _renderErrorMessage = () => {
    const { errorMessage } = this.state;

    if (isArray(errorMessage)) {
      return errorMessage ? (
        <ul className='error-message'>
          {errorMessage.map(message => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : null;
    } else {
      return errorMessage ? (
        <div className='error-message'>{errorMessage}</div>
      ) : null;
    }
  };

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <form className='freeDemo' onSubmit={this.onFormSubmit}>
          <div className="container">
            <div className="row">
              <input 
                className="col freeDemo__input" 
                type="text" 
                placeholder="Name"
                onChange={event => this.onInputChange(event, 'formName')}
                value={this.state.formName}
              />
              <input 
                className="col freeDemo__input" 
                type="email" 
                placeholder="Email" 
                onChange={event => this.onInputChange(event, 'formEmail')}
                value={this.state.formEmail}
              />
            </div>
            <div className="row">
              <input 
                className="col freeDemo__input" 
                type="text" 
                placeholder={t('phone-number')}
                onChange={event => this.onInputChange(event, 'formPhoneNumber')}
                value={this.state.formPhoneNumber}
              />
              <input 
                className="col freeDemo__input" 
                type="text" 
                placeholder={t('company-name')}
                onChange={event => this.onInputChange(event, 'formCompanyName')}
                value={this.state.formCompanyName}
              />
            </div>
          </div>
          <textarea
            className="freeDemo__note"
            placeholder={t('notes')}
            rows="5"
            onChange={event => this.onInputChange(event, 'formNotes')}
            value={this.state.formNotes}
          ></textarea>

          {this._renderErrorMessage()}

          <div className="freeDemo__submit">
            <button className='btn-blue' type='submit'>{t('send')}</button>
          </div>
        </form>

        {this.state.isLoading ? <Loader /> : null}
      </Fragment>
    )
  }
}

export default FormFreeDemo;
