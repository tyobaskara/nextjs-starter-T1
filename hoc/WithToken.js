import { PureComponent } from 'react'
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

const withToken = props => WrappedComponent => {
  class withToken extends PureComponent {
    constructor() {
      super();

      this.state = {
        token: Cookies.get(props.name)
      }
    }

    componentDidMount() {
      if (!this.state.token) {
        this.props.router.push('/cms/signin');
      }
    }

    _onLogOut = () => {
      Cookies.set('loggedInToken', '');
      this.props.router.push('/cms/signin');
    };

    render() {
      return !!this.state.token && (
        <WrappedComponent 
          token={this.state.token} 
          onLogOut={this._onLogOut}   
        />
      );
    }
  }

  return withRouter(withToken);
};

export default withToken;
