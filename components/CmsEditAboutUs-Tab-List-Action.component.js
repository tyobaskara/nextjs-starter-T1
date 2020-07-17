/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import Loader from '@components/component.Loader';

// Utils
import isEmpty from 'lodash/isEmpty';
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditAboutUsListAction extends PureComponent {
  state = {
    isLoading: true,
    isFetchDataError: false,
    errorMessage: '',
    listData: []
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchListData();
  }

  fetchListData = async () => {
    const { tabIndex, apiGetListUrl: url, apiGetKey } = this.props;

    try {
      const { data: response } = await axios({
        method: 'get',
        url
      });
      const listData = response.data[tabIndex][apiGetKey];

      this.setState({ 
        isLoading: false, 
        listData
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDataError: true, errorMessage });
    }
  };

  _renderBreadCrumb = () => {
    const { tabIndex } = this.props;

    const breadCrumbList = [
      ...this.props.breadCrumbList,
      {
        route: `/cms-edit-pages-about-us-section-6-tab-list/[tabIndex]?tabId=[tabId]`,
        name: `Tab ${parseInt(tabIndex) + 1} - List`
      }
    ];

    return (
      <BreadCrumb data={breadCrumbList} />
    );
  };

  _renderListContainer = () => {
    const { listData, isLoading } = this.state;

    if (isEmpty(listData) && !isLoading) {
      return (
        <div>
          <p>No Data Found</p>
        </div>
      );
    }

    return this._renderList();
  };

  _renderList = () => {
    const { listData, isLoading } = this.state;

    return !isLoading ? (
      <ul className="cmsList">
        {listData.map((item, index) => this._renderListItem(item, index))}
      </ul>
    ) : null;
  };

  _renderListItem = (item, index) => {
    const itemNumber = index + 1;
    const itemId = item.id;

    return (
      <li className='cmsList__item' key={itemId}>
        <p>Tab Item - {item.titleEn}</p>
        {this._renderListAction(itemId, itemNumber)}
      </li>
    );
  };

  _renderListAction = (itemId, itemNumber) => {
    const { linkActionList, tabIndex, tabId } = this.props;
    
    return (
      <div className='cmsList__action'>
        <Link 
          href={`${linkActionList}/${itemNumber}?itemId=${itemId}&tabIndex=${tabIndex}&tabId=${tabId}`}
        >
          <a className='btn btn-warning'>Edit</a>
        </Link>
      </div>
    );
  };

  _renderListAndButton = () => {
    const { isFetchListError, errorMessage } = this.state;

    if (isFetchListError) {
      return (
        <div className='form-error'>{errorMessage}</div>
      );
    }

    return (
      <Fragment>
        {this._renderListContainer()}
        {this._renderBtnAddList()}
      </Fragment>
    );
  };

  _renderBtnAddList = () => {
    const { linkActionList, tabId, tabIndex } = this.props;

    return (
    <Link 
      href={`${linkActionList}/create?tabId=${tabId}&tabIndex=${tabIndex}`}
    >
      <a className='btn btn-info my-3'>Add Tab Item</a>
    </Link>
  )};

  render() {
    return (
      <Fragment>
        {this._renderBreadCrumb()}
        {this._renderListAndButton()}
        {this.state.isLoading ? <Loader /> : null}
      </Fragment>
    );
  }
}
