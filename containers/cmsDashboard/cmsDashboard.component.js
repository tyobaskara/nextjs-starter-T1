/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent } from 'react';
import axios from 'axios';
import Link from 'next/link';

// layout
import CmsLayout from '../../components/_layouts/cms.layout';

// Component
import Loader from '../../components/loader/loader.component';

export default class CmsDashboard extends PureComponent {
  state = {
    user: '',
    isLoading: true
  }

  componentDidMount() {
    this.getUserDetail();  
  }

  getUserDetail = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;

    await axios.get('http://nonprod.dhealth.arinanda.com/api/v1/users/details')
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
          <div className='welcomeMessageWrapper'>
            {this._renderWelcomeMessage()}
          </div>
          {this._renderBreadCrumb()}
        </div>
      </div>
    );
  };

  render() {
    return (
      <CmsLayout 
        {...this.props}
        activeMenu='Dashboard'
      >
        {this._renderContent()}
      </CmsLayout>
    )
  }
}
