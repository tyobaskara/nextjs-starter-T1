/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import axios from 'axios';
import Link from 'next/link';

// layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import Loader from '@components/component.Loader';

import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      dashboard
    }
  }
} = Constants;

// Config
import Config from '@config/api';

export default class CmsDashboard extends PureComponent {
  state = {
    user: '',
    isLoading: true
  }

  componentDidMount() {
    this.getUserDetail();  
  }

  getUserDetail = async () => {
    const apiUrl = Config.apiUrl[process.env.NODE_ENV];
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;

    await axios.get(`${apiUrl}/users/details`)
      .then(resp => resp.data)
      .then(result => {
        this.setState({
          user: result.data.email,
          isLoading: false
        });
      });
  };

  _renderWelcomeMessage = () => {
    const { user } = this.state;
    const welcomeMessage = user ? `Welcome, ${user}` : 'Welcome';

    return user ? <p className='welcomeMessage'>{welcomeMessage}</p> : null;
  };

  _renderBreadCrumb = () => (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          <Link href="/cms/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
      </ol>
    </nav>
  );

  _renderContent = () => {
    const { isLoading } = this.state;

    return isLoading ? <Loader /> : (
      <div className='cms-wrapper'>
        <div className='cms-container'>
          {this._renderBreadCrumb()}
          <div className='welcomeMessageWrapper'>
            {this._renderWelcomeMessage()}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={dashboard}
      >
        {this._renderContent()}
      </LayoutCms>
    )
  }
}
