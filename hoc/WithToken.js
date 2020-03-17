import { PureComponent } from 'react'
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

const withToken = props => WrappedComponent => {
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
        this.props.router.push(redirectRoute);
      } 
      else if (this.state.token && isLoginPage) {
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
          {...this._getActionProps()}
        />
      );
    }
  }

  return withRouter(withToken);
};

export default withToken;
