import React, { PureComponent } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const isRememberMeDefaultValue = true;

// Component
import Loader from '@components/component.Loader';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

// Config
import Config from '@config/api';

export default class cmsLoginComponent extends PureComponent {
  state = {
    user: '',
    password: '',
    isRememberMe: isRememberMeDefaultValue,
    errorMessage: '',
    isLoginError: false,
    isLoading: false
  }

  componentDidMount() {
    this.setUserPasswordFromCookie();
    this.setIsRememberMeFromCookie();
  }

  setIsRememberMeFromCookie = () => {
    const isRememberMe = Cookies.get('isRememberMe');
    const isTrueSet = isRememberMe === 'true' ? true : false;

    this.setState({
      isRememberMe: isRememberMe ? isTrueSet : isRememberMeDefaultValue
    });
  };

  setUserPasswordFromCookie = () => {
    const user = Cookies.get('user');
    const password = Cookies.get('password');

    this.setState({
      user: user ? user : '',
      password: password ? password : ''
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true
    }, this.fetchLogin);
  };

  fetchLogin = async () => {
    const apiUrl = Config.apiUrl[process.env.NODE_ENV];
    const { onLogin } = this.props;
    const { user, password } = this.state;
    
    this.setUserAndPasswordCookie();

    try {
      const { data: { data: { token } } } = await axios.post(`${apiUrl}/users/login`, {
        email: user,
        password
      });
  
      onLogin(token);
      this.setState({ isLoading: false });
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      this.setState({ isLoading: false, isLoginError: true, errorMessage });
    }
  }

  setUserAndPasswordCookie = () => {
    const { user, password, isRememberMe } = this.state;

    if (isRememberMe) {
      Cookies.set('user', user);
      Cookies.set('password', password);
    } else {
      Cookies.set('user', '');
      Cookies.set('password', '');
    };
  };

  onCheckboxChange = () => {
    this.setState(prevState => ({
      isRememberMe: !prevState.isRememberMe,
      isLoginError: false
    }), () => {
      Cookies.set('isRememberMe', this.state.isRememberMe);
      this.setUserAndPasswordCookie();
    });
  };

  onInputChange = (event, stateName) => {
    const { value } = event.target;

    this.setState({
      [stateName]: value,
      isLoginError: false
    });
  };

  _renderForm = () => (
    <form className="cmsLoginForm" onSubmit={this.onSubmit}>
      <div className="container">
        <h1>d'health Admin Panel</h1>
        <label htmlFor="uname"><b>Username</b></label>
        <input 
          type="text" 
          placeholder="Enter Username" 
          name="uname" 
          onChange={event => this.onInputChange(event, 'user')}
          value={this.state.user}
          required  
        />

        <label htmlFor="psw"><b>Password</b></label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          name="psw" 
          onChange={event => this.onInputChange(event, 'password')}
          value={this.state.password}
          required 
        />
          
        <button type="submit">Login</button>

        {this.state.isLoginError && <span className='onError'>{this.state.errorMessage}</span>}

        <label>
          <input 
            type="checkbox" 
            name="remember" 
            checked={this.state.isRememberMe} 
            onChange={this.onCheckboxChange}
          /> Remember me
        </label>
      </div>
    </form>
  );

  render() {
    return (
      <div>
        {this._renderForm()}
        {this.state.isLoading ? <Loader /> : null}
      </div>
    );
  }
}
