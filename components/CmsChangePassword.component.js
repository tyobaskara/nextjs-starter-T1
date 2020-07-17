/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import axios from 'axios';

// layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import Loader from '@components/component.Loader';
import Snagbar from '@components/component.Snagbar';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    },
    route: {
      userSettingPage
    }
  }
} = Constants;

const breadCrumbList = [
  {
    route: '/cms/user-setting',
    name: 'User Setting'
  },
  {
    route: '/cms/change-password',
    name: 'Change Password'
  }
];

export default class CmsChangePassword extends PureComponent {
  state = {
    inputnewPassword: '',
    inputConfirmPassword: '',
    errorMessage: '',
    isError: false,
    isSuccess: false
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
  }

  _renderBreadCrumb = () => (
    <BreadCrumb data={breadCrumbList} />
  );

  _renderChangePasswordForm = () => (
    <form onSubmit={this._submitForm}>
      <div className="form-group">
        <label htmlFor="inputnewPassword">New Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="inputnewPassword" 
          onChange={event => this.onInputChange(event, 'inputnewPassword')} 
          value={this.state.inputnewPassword}
          required  
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputConfirmPassword">Confirm Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="inputConfirmPassword" 
          onChange={event => this.onInputChange(event, 'inputConfirmPassword')}
          value={this.state.inputConfirmPassword}
          required  
        />
      </div>
      {this._renderErrorMessage()}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );

  _renderErrorMessage = () => this.state.isError ? (
    <div className="form-group">
      <span className='form-error'>{this.state.errorMessage}</span>
    </div>
  ) : null;

  onInputChange = (event, stateName) => {
    const { value } = event.target;

    this.setState({
      [stateName]: value,
      isError: false
    });
  };

  _submitForm = (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true
    }, this.fetchChangePassword)
  };

  fetchChangePassword = async () => {
    const { inputnewPassword, inputConfirmPassword } = this.state;

    try {
      const response = await axios.put('http://nonprod.dhealth.arinanda.com/api/v1/users/_change-password', {
        newPassword: inputnewPassword,
        confirmNewPassword: inputConfirmPassword
      });
      const successMessage = response.data.message;
      
      this.setState({ isLoading: false, isSuccess: true, successMessage, newPassword: '', confirmPassword: '' }, this._redirectAfterSuccess);
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      this.setState({ isLoading: false, isError: true, errorMessage });
    }
  };

  _redirectAfterSuccess = () => {
    setTimeout(() => {
      this.props.router.push(userSettingPage);
    }, 2500);
  };

  _renderSuccessInfo = () => {
    const { successMessage, isSuccess } = this.state;

    if (isSuccess) {
      setTimeout(() => {
        this.setState({ isSuccess: false, successMessage: '' });
      }, 2000);
    }

    return (
      <Snagbar 
        message={successMessage}
        isShow={isSuccess}
      />
    );
  };

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={userSetting}
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            {this._renderBreadCrumb()}
            {this._renderChangePasswordForm()}
            {this._renderSuccessInfo()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    )
  }
}
