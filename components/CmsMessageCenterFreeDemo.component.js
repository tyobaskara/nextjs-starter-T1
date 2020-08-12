/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import Loader from '@components/component.Loader';
import MessageList from 'components/cms.MessageList.component';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      messageCenter
    }
  }
} = Constants;

const breadCrumbList = [
  {
    route: '/cms/message-center',
    name: messageCenter
  },
  {
    route: '/cms-message-center/free-demo',
    name: 'Free Demo'
  }
];

// Config
import Config from '@config/api';

export default class CmsMessageCenterFreeDemo extends PureComponent {
  state = {
    isLoading: true,
    isfetchMessageError: false,
    freeDemoData: [],
    pageNumber: 1,
    totalPages: 1,
    errorMessage: ''
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchMessage();
  }

  _renderBreadCrumb = () => (
    <BreadCrumb data={breadCrumbList} />
  );

  fetchMessage = async () => {
    const apiUrl = Config.apiUrl[process.env.NODE_ENV];
    const { pageNumber } = this.state;
    const url = `${apiUrl}/free-demo?pageNumber=${pageNumber}&type=DEMO`;

    try {
      const { data: response } = await axios.get(url);
      const freeDemoData = response.data;
      const paging = response.paging;

      this.setState({ 
        isLoading: false, 
        freeDemoData, 
        pageNumber: paging.pageNumber,
        totalPages: paging.totalPages
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isfetchMessageError: true, errorMessage });
    }
  };

  _renderPagination = () => (
    <nav>
      <ul className="pagination">
        {this._renderPaginationItem()}
      </ul>
    </nav>
  );

  _renderPaginationItem = () => {
    const { pageNumber, totalPages } = this.state;
    let numbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      const page = {
        value: i,
        isActive: i === pageNumber
      };

      numbers.push(page);
    };

    return numbers.map(item => {
      const pageItemClass = item.isActive ? 'page-item active' : 'page-item';

      return (
        <li key={item.value} className={pageItemClass}>
          <button 
            className="page-link" 
            onClick={this.onPaginationClick(item.value)}>
            {item.value}
          </button>
        </li>
      );
    });
  };

  onPaginationClick = pageNumber => () => {
    window.scrollTo(0, 0);

    this.setState({ pageNumber, isLoading: true }, this.fetchMessage);
  };

  _renderFreeDemoList = () => (
    <MessageList data={this.state.freeDemoData} />
  );

  _renderComponent = () => {
    const { errorMessage } = this.state;

    return errorMessage ? (
      <div className='error-message'>{errorMessage}</div>
    ) : (
      <Fragment>
        {this._renderFreeDemoList()}
        {this._renderPagination()}
      </Fragment>
    );
  };

  render() {
    return (
      <LayoutCms 
        {...this.props}
        activeMenu={messageCenter}
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            {this._renderBreadCrumb()}
            {this._renderComponent()}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </LayoutCms>
    )
  }
}
