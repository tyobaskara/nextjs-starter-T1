/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import axios from 'axios';

// layout
import LayoutCms from '@components/LayoutCms.layout';

// Component
import BreadCrumb from '@components/BreadCrumb.component';
import Loader from '@components/Loader.component';
import Snagbar from '@components/Snagbar.component';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    }
  }
} = Constants;

const breadCrumbList = [
  {
    route: '/cms/user-setting',
    name: 'User Setting'
  },
  {
    route: '/cms/create-user',
    name: 'Create User'
  }
];

export default class CmsCreateUser extends PureComponent {
  state = {
    email: '',
    password: '',
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

  _renderCreateUserForm = () => (
    <form onSubmit={this._submitForm}>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="inputEmail" 
          onChange={event => this.onInputChange(event, 'email')} 
          value={this.state.email}
          required  
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="inputPassword" 
          onChange={event => this.onInputChange(event, 'password')}
          value={this.state.password}
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
    }, this.fetchCreateUser)
  };

  fetchCreateUser = async () => {
    const { email, password } = this.state;

    try {
      const response = await axios.post('http://nonprod.dhealth.arinanda.com/api/v1/users', {
        email,
        defaultPassword: password
      });
      const successMessage = response.data.message;
      
      this.setState({ isLoading: false, isSuccess: true, successMessage, email: '', password: '' });
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      this.setState({ isLoading: false, isError: true, errorMessage });
    }
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
            {this._renderCreateUserForm()}
            {this._renderSuccessInfo()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    )
  }
}
