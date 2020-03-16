import { PureComponent } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

// Component
import AdminLayout from '../../components/_layouts/AdminLayout';

export class signin extends PureComponent {
  _onSignIn = () => {
    const loggedInToken = 'token123';

    Cookies.set('loggedInToken', loggedInToken);

    Router.push('/cms/dashboard');
  };

  render() {
    return (
      <AdminLayout>
        <div className="container">
          <h1>Sign In Form</h1>
          <button className="btn btn-primary" onClick={this._onSignIn}>Sign In</button>
        </div>
      </AdminLayout>
    )
  }
}

export default signin
