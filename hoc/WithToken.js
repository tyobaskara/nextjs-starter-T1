import { PureComponent } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';
import { compose } from 'recompose';
import isObject from 'lodash/isObject';

const withToken = props => WrappedComponent => {
  const {
    connect: connectOpts = null
  } = props;

  const enhancers = [];

  if (isObject(connectOpts)) {
    const { mapStateToProps = null, mapDispatchToProps = null } = connectOpts;
    enhancers.push(connect(mapStateToProps, mapDispatchToProps));
  };

  class withToken extends PureComponent {
    constructor() {
      super();

      this.state = {
        token: Cookies.get(props.tokenName)
      }
    }

    componentDidMount() {
      const { redirectRoute, isLoginPage } = props;

      if (!this.state.token && !isLoginPage) {
        // if have not logged in , will redirect to login page
        this.props.router.push(redirectRoute);
      } 
      else if (this.state.token && isLoginPage) {
        // if already logged in , will redirect to dashboard on login page
        this.props.router.push(redirectRoute);
      }
    }

    _getActionProps = () => {
      const { isLoginPage } = props;

      return isLoginPage
        ? this._getLoginPageActionProps()
        : this._getNotLoginPageActionProps();
    }

    _getLoginPageActionProps = () => {
      return {
        onLogin: this._onLogin
      };
    }

    _getNotLoginPageActionProps = () => {
      return {
        onLogOut: this._onLogOut
      };
    }

    _onLogOut = () => {
      const { redirectRoute, tokenName } = props;
      
      Cookies.set(tokenName, '');
      this.props.router.push(redirectRoute);
    };

    _onLogin = value => {
      const { tokenName, redirectRoute } = props;
  
      Cookies.set(tokenName, value);
      this.props.router.push(redirectRoute);
    };

    render() {
      return (
        <WrappedComponent 
          token={this.state.token} 
          {...this.props}
          {...this._getActionProps()}
        />
      );
    }
  }

  enhancers.push(withRouter);

  return compose(...enhancers)(withToken);
};

export default withToken;
