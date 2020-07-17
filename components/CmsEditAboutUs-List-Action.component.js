/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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
    const { apiGetListUrl: url, apiGetKey } = this.props;

    try {
      const { data: response } = await axios({
        method: 'get',
        url
      });
      const listData = response.data[apiGetKey];

      this.setState({ 
        isLoading: false, 
        listData
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDataError: true, errorMessage });
    }
  };

  _renderBreadCrumb = () => (
    <BreadCrumb data={this.props.breadCrumbList} />
  );

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
    const { listTitle } = this.props;
    const itemNumber = index + 1;
    const itemId = item.id;

    return (
      <li className='cmsList__item' key={itemId}>
        <p>{listTitle}-{itemNumber}</p>
        {this._renderListAction(itemId, itemNumber, index)}
      </li>
    );
  };

  _renderListAction = (itemId, itemNumber, index) => {
    const { linkActionList } = this.props;
    
    return (
      <div className='cmsList__action'>
        <Link 
          href={`${linkActionList}/${itemNumber}?itemId=${itemId}&itemIndex=${index}`}
        >
          <a className='btn btn-warning'>Edit</a>
        </Link>

        <button 
          className='btn btn-danger' 
          onClick={this._showRemoveListConfirmModal(itemId)}
        >
          <span>Remove</span>
        </button>
      </div>
    );
  };

  _showRemoveListConfirmModal = itemId => () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.setState({
          isLoading: true
        }, () => this.fetchRemoveList(itemId));
      }
    });
  };

  fetchRemoveList = async (itemId) => {
    const { apiRemoveListUrl } = this.props;
    const url = `${apiRemoveListUrl}/${itemId}`;

    try {
      await axios.delete(url);

      this.setState({ isLoading: false }, this.fetchListData);
    } catch(error) {
      this.setState({ isLoading: false }, this._showErrorRemoveListModal);
    }
  };

  _showErrorRemoveListModal = () => {
    MySwal.fire(
      'Oops',
      'Something Went Wrong!',
      'error'
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
    const { linkActionList, listTitle } = this.props;

    return (
    <Link 
      href={`${linkActionList}/create`}
    >
      <a className='btn btn-info my-3'>Add {listTitle}</a>
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
